import React, { useState } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import {
  Button,
  Container,
  TextField,
  Typography
} from "@material-ui/core";
import "../App.css";

export default function Register() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fname, lname, email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data });
    if ( !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        fname,
        lname,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setData({
        fname: "",
        lname: "",
        email: "",
        password: "",
      });
      navigate(-1)
    } catch (err) {
      toast(err.code, { type: "error" });
      setData({ ...data });
    }
  };

  const signInWithGoogle = async () => {
    setData({ ...data });
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    return setDoc(doc(db, "users", credential.user.uid), {
      uid: credential.user.uid,
      email,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <>
    <div>
      <Container
        maxWidth="sm"
        style={ {marginTop: '2em', marginBottom: '2em' }}>
          <Typography style={{
            fontFamily: 'Roboto, arial, sans-serif',
            textAlign: 'center',
            fontSize: '2em'
            }}>Create an Account
          </Typography>
          <form >
            <TextField
              variant="outlined"
              margin="normal"
              label="First Name"
              name="fname"
              fullWidth
              valueLink={fname}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Last Name"
              name="lname"
              fullWidth
              valueLink={lname}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Email"
              name="email"
              fullWidth
              required
              valueLink={email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              label="Password"
              fullWidth
              required
              valueLink={password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              style={{
                marginTop: '20px',
                backgroundColor: '#4285F4',
                color: 'white',
                padding: '1em'
              }}> Sign up
            </Button>
          </form>
          <div style={{
            display: 'flex', 
            alignItems: 'center'}}>
              <div style={{
                flex: 1, 
                height: '1px', 
                backgroundColor: '#000', 
                marginBottom: '10px'}}>
              </div>
                <p style={{padding: '4rem 2rem'}}>or</p>
              <div style={{
                flex: 1, 
                height: '1px',
                backgroundColor: '#000', 
                marginBottom: '10px'}}>
              </div>
          </div>
          <GoogleButton 
              onClick={() => {
                signInWithGoogle()
                .then(navigate(-1))
                .catch(e => console.log(e.message))}}
              type="light"
              label="Sign up with Google"
              style={{width: '100%'}}>
          </GoogleButton>
          <div>
              <p style={{textAlign: 'center', marginTop: '2em'}}>
                  Already have an account?
                <Link to='/login' style={{marginLeft: '10px'}}>
                  Login
                </Link>
              </p>
          </div>
        </Container>
    </div>
    </>
  );
};