import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { Form, Modal } from "react-bootstrap";
import { Button, Container, makeStyles } from "@material-ui/core";
import { CameraAlt, Delete } from "@material-ui/icons";
import DefaultImage from "../assets/images/default-profile-img.png";

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

export default function Profile() {
  const [img, setImg] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const classes = useStyles();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `profileImg/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user.profileImgPath) {
            await deleteObject(ref(storage, user.profileImgPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            profileImg: url,
            profileImgPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete your profile image?");
      if (confirm) {
        await deleteObject(ref(storage, user.profileImgPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          profileImg: "",
          profileImgPath: "",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    const userDocRef = doc(db, 'users', auth.currentUser.uid)
    try{
        await updateDoc(userDocRef, {
            fname: fname,
            lname: lname
        })
        hideModal()
    } catch (err) {
        alert(err)
    }
};

  return user ? (
    <Container 
      maxWidth= 'sm'
      style={{
        margin: '5% auto',
        boxShadow: '1px 2px 10px grey',
        borderRadius: '5px',
        marginBottom: '18%',
        }}>
      <div style={{display: 'flex', flexDirection: 'column', paddingTop: '4em'}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '100px',}}>
          <div style={{
            position: 'relative',
            marginRight: '10%',}}>
            <img src={user.profileImg || DefaultImage} alt="Profile Picture" style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '1px solid grey',
              opacity: isHovering ? "50%" : "100%"
              }}/>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                opacity: isHovering ? "80%" : "0%"
                }}  
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                  <label htmlFor="photo" style={{ cursor: 'pointer' }}>
                    <CameraAlt/>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                  {user.profileImg ? <Delete style={{
                    cursor: 'pointer', 
                    color: '#F4364C'}} 
                    onClick={deleteImage}/> : null}
              </div>
          </div>
        <div>
          <h3 style={{color: 'grey', padding: '5px', textAlign: 'center'}}>{user.fname} {user.lname}</h3>
          <hr />
          <br />
          <button 
            onClick={showModal}
            style={{width: '300px'}}>
            Update Name
          </button>
          <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
              <Modal.Title>Update Name</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
              <Form>
                <Form.Group className='mb-3' controlId='fname'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    onChange={(e) => setFirstName(e.target.value)}
                    value={fname}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='lname'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    onChange={(e) => setLastName(e.target.value)}
                    value={lname}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="outlined"
                onClick={hideModal}
                className={classes.cancelBtn}>Cancel
              </Button>
              <Button 
                variant="outlined"
                onClick={handleUpdate} 
                className={classes.saveBtn}>Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        </div>
      </div>
    </Container>
  ) : null;
};