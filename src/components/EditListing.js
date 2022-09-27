import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Form, Modal } from "react-bootstrap";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  saveBtn: {
    backgroundColor: '#9c9f84',
    borderColor: '#9c9f84',
    color: 'white',
    width: '100px',
    margin: '1em',
    "&:hover": {
      backgroundColor: '#f2f3f5',
    },
  },
  cancelBtn: {
    color: '#9c9f84',
    width: '100px',
  },
});

export default function EditListing({id}) {
    const [isOpen, setIsOpen] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [experience, setExperience] = useState('');
    const [bio, setBio] = useState('');
    const [rate, setRate] = useState('');

    const classes = useStyles();

    const showModal = () => {
      setIsOpen(true);
    };

    const hideModal = () => {
      setIsOpen(false);
    };

      const handleUpdate = async (e) => {
        e.preventDefault()
        const listingDocRef = doc(db, 'Listings', id)
        try{
            await updateDoc(listingDocRef, {
                firstname: firstname,
                lastname: lastname,
                city: city,
                state: state, 
                zipcode: zipcode,
                experience: experience,
                bio: bio,
                rate: rate,
            })
            hideModal()
        } catch (err) {
            alert(err)
        }
    };

  return (
    <>
      <button 
        onClick={showModal}
        className="btn btn-outline-secondary"
        style={{width: '100px'}}>
        Edit</button>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Edit Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <Form>
            <Form.Group className='mb-3' controlId='firstname'>
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='lastname'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setCity(e.target.value)}
                value={city}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='state'>
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setState(e.target.value)}
                value={state}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='zipcode'>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setZipcode(e.target.value)}
                value={zipcode}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='experience'>
              <Form.Label>Experience</Form.Label>
              <Form.Control 
                type="number" 
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='bio'>
              <Form.Label>About You</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='rate'>
              <Form.Label>Rate</Form.Label>
              <Form.Control 
                type="number" 
                onChange={(e) => setRate(e.target.value)}
                value={rate}
                />
            </Form.Group>
          </Form> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal} className={classes.cancelBtn}>Cancel</Button>
          <Button onClick={handleUpdate} className={classes.saveBtn}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};