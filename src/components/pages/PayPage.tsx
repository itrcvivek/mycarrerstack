import React from 'react'
import { PaymentElement } from '@stripe/react-stripe-js';

function PayPage() {



    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
}

export default PayPage