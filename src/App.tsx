import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/inc/Navbar';
import Footer from './components/inc/Footer';
import Error from './components/pages/Error';
import Resume from './components/pages/Resume';
import Signup from './components/pages/SignUp';
import Login from './components/pages/Login';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayPage from './components/pages/PayPage';
import customAxios, { CLIENT_SECRET, paymentIntentApi, tokenStr } from './network/customAxios';
import Dummy from './components/pages/Dummy';
function App() {
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const secret = await paymentIntentApi()
        setClientSecret(secret);
      } catch (error) {
        console.log(error)
      }
    }
    fetchClientSecret()
  }, [])
  const stripePromise = loadStripe('pk_test_51OVtVNSFkd4dZdFAvFhXd8i1TxFNabaK53eD3Fh2qpWgpV5MBdsTOot0voTKCDHFFGT9ItLqCOPiC1cpJzOXpbbb00ezxYkoBL')
  // paymentIntentApi()
  // const paymentIntentApi = async () => {

  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //       "Authorization": `Bearer ${tokenStr}`
  //     }
  //   }
  //   const data = await customAxios.post('v1/payment_intents',
  //     new URLSearchParams({
  //       amount: '10000',
  //       currency: 'inr'
  //     }).toString(),
  //     config
  //   )
  //   // CLIENT_SECRET = data.data.client_secret
  //   return data.data.client_secret;
  // }
  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${clientSecret}`,
  };
  if (clientSecret === null) {
    return <h1>loading....</h1>
  }
  return (
    <Elements stripe={stripePromise} options={options} >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/resume" element={<ProtectedRoute path="/resume"
            element={<Resume />} />} />
          <Route path='/payPage' element={<ProtectedRoute path="/payPage" element={<PayPage />} />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Elements>

  );
}

export default App;
