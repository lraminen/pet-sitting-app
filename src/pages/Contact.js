import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
  Button,
  Container, 
  TextField,
  Typography
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import "../App.css";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_77k6jx1',
      'template_oap7mor', 
      form.current, 
      'ARvsHxTAmEMI8QDzv'
    )
    .then(
      (result) => {
        console.log(result.text);
        toast("Message successfully sent", { type: "success" });
    }, (error) => {
      console.log(error.text);
      toast("Unable to send message", { type: "error" });
    });
      e.currentTarget.reset()
    };

  return (
    <Container
      maxWidth='sm'
      style={{
        border: '1px solid lightgrey', 
        backgroundColor: '#f8f9fa', 
        marginTop: '4em', 
        marginBottom: '4em',
        textAlign: 'center', 
        padding: '5rem',
        }}>
      <Typography style={{
        fontFamily: 'Roboto, arial, sans-serif', 
        textAlign: 'center', 
        fontSize:'2em'
        }}>Contact Us
      </Typography>
      <Typography style={{
        fontFamily: 'Roboto, arial, sans-serif', 
        textAlign: 'center', 
        fontSize:'1em', 
        paddingTop: '1em', 
        paddingBottom: '1em', 
        fontStyle: 'italic'
        }}>Please send us a message with questions, comments, or 
          concerns and we will get back to you within 5-7 business days.
      </Typography>
      <form ref={form}>
        <TextField
          variant="outlined"
          margin="normal"
          label="Name"
          fullWidth
          required
          style={{backgroundColor: 'white'}}
        />
        <TextField
          type="email"
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
          style={{backgroundColor: 'white'}}
        />
        <TextField
          multiline={true}
          rows={8}
          variant="outlined"
          margin="normal"
          label="Message"
          fullWidth
          required
          style={{backgroundColor: 'white'}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={sendEmail}
          endIcon={<Send />}
          style={{marginTop: '2em', width: '30%'}}
          >Send
        </Button>
      </form>
    </Container>
  );
};