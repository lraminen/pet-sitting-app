import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import DeleteListing from "../components/DeleteListing";
import EditListing from "../components/EditListing";
import SitterImg from "../assets/images/dog-sitter.jpg";
import DefaultImage from "../assets/images/default-profile-img.png";

export default function Listings() {

  const [listings, setListings] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const listingRef = collection(db, "Listings");
    const q = query(listingRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const listings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(listings);
      console.log(listings);
    });
  }, []);
  
  return (
    <>
      <div style={{position: 'relative', textAlign: 'center'}}>
        <img src={SitterImg} alt="" style={{
          display: 'flex',
          width: '100%',
          height: '70vh',
          top: 0,
          left: 0,
          objectFit: 'cover',
          opacity: '0.5',
          zIndex: -1        
          }}/>
      </div>
      <div>
        {listings.length === 0 ? (
          <p style={{textAlign: 'center', fontStyle: 'italic', marginTop: '2em'}}>No sitters found</p>
        ) : (
        listings.map(
          ({
            id,
            firstname,
            lastname,
            city,
            state,
            zipcode,
            experience,
            bio,
            rate,
            imageUrl,
            userId,
          }) => (
            <Container
              maxSize= 'md'
              style={{
              border: '1px solid lightgrey', 
              backgroundColor: '#f8f9fa', 
              marginTop: '4em', 
              marginBottom: '4em',
              textAlign: 'center', 
              padding: '4em',}}>
              <div key={id}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{paddingRight: '4em', paddingTop: '5%'}}>
                    <img src={imageUrl || DefaultImage} alt="" style={{ 
                      height: 150, 
                      width: 150, 
                      borderRadius: '50%', 
                      border: '1px solid grey'}}/>
                    <h4 style={{textAlign: 'center', marginTop: '2em'}}>$ {rate} /day</h4>
                  </div>
                  <div>
                    <h2 style={{color: '#5c755e', textAlign: 'left'}}>{firstname} {lastname}</h2>
                    <h5 style={{textAlign: 'left'}}>{city}, {state} {zipcode}</h5>
                    <h6 style={{textAlign: 'left'}}>{experience} years of experience</h6>
                    <hr />
                    <p style={{textAlign: 'justify'}}>{bio}</p>
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>

                        <div style={{marginRight: '2em'}}>
                          {user && user.uid === userId && (
                            <EditListing id={id}/>
                          )}
                        </div>

                        <div>
                          {user && user.uid === userId && (
                            <DeleteListing id={id} imageUrl={imageUrl} />
                          )}
                        </div>

                        <div>
                          {user && user.uid !== userId && (
                            <Button
                              variant = "outlined"
                              fullWidth>
                              <Link to="/messages" style={{textDecoration: 'none', color: '#9c9f84'}}>Message Sitter</Link>
                            </Button>
                          )}
                        </div>

                        <div>
                          {!user && (
                            <Button
                              variant = "outlined"
                              fullWidth>
                              <Link to="/register" style={{
                                textDecoration: 'none', 
                                color: '#9c9f84'
                                }}>Message Sitter
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </Container>
          )
        )
        )}
      </div>
    </>
  );
};