import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container, 
  InputAdornment,
  TextField,
  Typography
} from "@material-ui/core";
import "../App.css";

export default function AddListing() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    city: "",
    state: "",
    zipcode: "",
    experience: "",
    bio: "",
    rate: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.firstname) {
      alert("Please complete all fields");
      return;
    };

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
            firstname: "",
            lastname: "",
            city: "",
            state: "",
            zipcode: "",
            experience: "",
            bio: "",
            rate: "",
            image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const listingRef = collection(db, "Listings");
          addDoc(listingRef, {
            firstname: formData.firstname,
            lastname: formData.lastname,
            city: formData.city,
            state: formData.state,
            zipcode: formData.zipcode,
            experience: formData.experience,
            bio: formData.bio,
            rate: formData.rate,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            userId:user.uid,
          })
            .then(() => {
              toast("Successfully added listing", { type: "success" });
              setProgress(0);
              navigate("/listings")
            })
            .catch((err) => {
              toast("Error adding listing", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div>
      {!user ? (
        <Container maxWidth="sm" style={{
            border: '1px solid lightgrey', 
            backgroundColor: '#f8f9fa', 
            padding: '2em',
            marginTop: '4px',
            textAlign: 'center', 
            marginBottom: '30%'}}>
          <h2>
            <Link to="/login">Login</Link>
          </h2>
            Don't have an account? <Link to="/register">Signup</Link>
        </Container>
      ) : (
        <>
        <Container maxWidth="md" style={{
            border: '1px solid lightgrey', 
            backgroundColor: '#f8f9fa', 
            marginTop: '4em', 
            textAlign: 'center', 
            padding: '5em',
            marginBottom: '2em'}}>
              <Typography style={{
                fontFamily: 'Roboto, arial, sans-serif', 
                textAlign: 'center', 
                fontSize:'2em'
                }}>Add Listing
              </Typography>
              <Typography style={{
                fontFamily: 'Roboto, arial, sans-serif', 
                textAlign: 'justify', 
                fontSize:'1em', 
                fontStyle: 'italic', 
                marginTop: '1em', 
                marginBottom: '1em', 
                width: '91%', 
                margin: 'auto'}}>
                  Please fill out all of the information below to add a listing
                  to become a dog sitter. All visitors to the website will be 
                  able to view your listing in our current sitter and be able 
                  to contact you for a booking. Please <Link to="/contact">
                  contact us</Link> with any questions, comments, or concerns.
              </Typography>
                  <form>
                  <TextField 
                    variant="outlined"
                    margin="normal"
                    label="First Name"
                    name="firstname"
                    fullWidth
                    required
                    valueLink={formData.firstname}
                    onChange={(e) => handleChange(e)}
                    style={{width: '45%', marginRight: '1%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Last Name"
                    name="lastname"
                    fullWidth
                    required
                    valueLink={formData.lastname}
                    onChange={(e) => handleChange(e)}
                    style={{width: '45%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    variant="outlined"
                    margin="normal"
                    label="City"
                    name="city"
                    fullWidth
                    required
                    valueLink={formData.city}
                    onChange={(e) => handleChange(e)}
                    style={{width: '30%', marginRight: '1%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    variant="outlined"
                    margin="normal"
                    label="State"
                    name="state"
                    fullWidth
                    required
                    valueLink={formData.state}
                    onChange={(e) => handleChange(e)}
                    style={{width: '29%', marginRight: '1%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Zipcode"
                    name="zipcode"
                    fullWidth
                    required
                    valueLink={formData.zipcode}
                    onChange={(e) => handleChange(e)}
                    style={{width: '30%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    multiline={true}
                    rows={10}
                    variant="outlined"
                    margin="normal"
                    label="Describe Yourself"
                    name="bio"
                    fullWidth
                    required
                    valueLink={formData.bio}
                    onChange={(e) => handleChange(e)}
                    style={{width: '91%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    variant="outlined"
                    margin="normal"
                    label="Years of Experience"
                    name="experience"
                    fullWidth
                    required
                    valueLink={formData.experience}
                    onChange={(e) => handleChange(e)}
                    style={{width: '45%', marginRight: '1%', backgroundColor: 'white'}}
                  />
                  <TextField 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    variant="outlined"
                    margin="normal"
                    label="Rate per Day"
                    name="rate"
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>$</InputAdornment>
                    }}
                    valueLink={formData.rate}
                    onChange={(e) => handleChange(e)}
                    style={{width: '45%', backgroundColor: 'white'}}
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="form-control"
                    required
                    onChange={(e) => handleImageChange(e)}
                    style={{width: '50%', margin: 'auto', marginTop: '2em'}}
                  />
                  <p style={{
                    color: 'grey', 
                    fontStyle: 'italic', 
                    marginRight: '25%', 
                    marginTop: '2px'
                    }}>Upload a photo of yourself
                  </p>

                    {progress === 0 ? null : (
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped mt-2"
                          style={{ width: `${progress}%` }}
                        >
                          {`uploading image ${progress}%`}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handlePublish}
                      style={{marginTop: '2em', padding: '10px', width: '30%'}}
                    > Add Listing
                    </Button>
                    </form>
          </Container>
        </>
      )}
    </div>
  );
};