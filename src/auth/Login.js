import React, { useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebaseConfig";
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

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setData({
        email: "",
        password: "",
      });
      navigate(-1);
    } catch (error) {
      toast(error.code, { type: "error" });
      setData({ ...data });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
  };

  return (
    <>
      <div>
        <Container
          maxWidth="sm"
          style={{
            marginTop: '2em',
            paddingTop: '5%',
            paddingBottom: '5%'
          }}>
            <Typography style={{
              fontFamily: 'Roboto, arial, sans-serif',
              textAlign: 'center',
              fontSize: '2em'
            }}>Sign In below
            </Typography>
            <form>
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
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                valueLink={password}
                onChange={handleChange}
              />
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#4285F4',
                  color: 'white',
                  padding: '1em'
                }}>
                  Login
              </Button>
            </form>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#000', 
              marginBottom: '10px' }}>
            </div>
            <p style={{ padding: '4rem 2rem' }}>or</p>
            <div style={{ 
              flex: 1, 
              height: '1px', 
              backgroundColor: '#000', 
              marginBottom: '10px' }}>
            </div>
        </div>
        <GoogleButton 
            onClick={() =>
              signInWithGoogle()
              .then(navigate(-1))
              .catch(e => console.log(e.message))}
            type="light"
            style={{ width: '100%' }}>
        </GoogleButton>
        <div>
            <p style={{ textAlign: 'center', marginTop: '2em' }}>
                Don't have an account?
              <Link to='/register' style={{marginLeft: '10px'}}>
                Create account
              </Link>
            </p>
        </div>
          </Container>
      </div>
    </>
  );
};