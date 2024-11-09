import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import HomeBg from"../../assets/img/_197912_hero.gif"

import { auth } from "../../Firebase";

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding:"20px",
  background:"#040965",
minHeight:"100vh"
});

const InputField = styled(TextField)({
  marginBottom: '10px',
});

const Signup = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res:any) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/resume");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <Box>
      <FormContainer>
        <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={1}>
          </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Box  sx={{margin:"20px 0"}}>
              <Typography variant='h2' sx={{color:"#fff", fontSize:"30px"}}>
               Online Resume Builder<br /> <span style={{color:"rgb(239 210 84)", fontSize:"16px", fontWeight:"600"}}>in mycareerstack.com</span>
               </Typography>
               <Typography variant='body1' sx={{color:"#fff"}}>
               It takes only 5 seconds to screen your resume. Write it well.
               </Typography>
              </Box>
            <form style={{borderRadius:"20px", background:"#fff",display: "flex", padding:"20px", flexDirection: "column", flexWrap: "nowrap"}}>
       <InputField label="Full Name" variant="outlined" onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          } />
      <InputField label="Email" variant="outlined"  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } />
      <InputField label="Password" variant="outlined"  onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          } type="password" />
      {/* <Button fullWidth variant="contained" color="primary">
        Sign Up
      </Button> */}
       <div>
          <b>{errorMsg}</b>
          <Button onClick={handleSubmission} disabled={submitButtonDisabled} fullWidth variant="contained" color="primary">
        Sign Up
      </Button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
       </form>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <Box sx={{margin:{xs:"10px", sm:"10px", md:"100px 0"}}}>
                    <img src={HomeBg} style={{width:"100%"}} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={1}>
          </Grid>
        </Grid>
        {/* <Box sx={{background:"#fff", padding:"20px",display: "flex", flexDirection: "column", flexWrap: "nowrap", width:{xs:"270px", sm:"270px",md:"400px"}}}>
       <form style={{background:"#fff",display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
       <InputField label="Full Name" variant="outlined" onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          } />
      <InputField label="Email" variant="outlined"  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } />
      <InputField label="Password" variant="outlined"  onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          } type="password" />
      
       <div>
          <b>{errorMsg}</b>
          <Button onClick={handleSubmission} disabled={submitButtonDisabled} fullWidth variant="contained" color="primary">
        Sign Up
      </Button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
       </form>
        </Box> */}
    </FormContainer>
    </Box>
  );
};

export default Signup;