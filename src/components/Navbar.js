import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { 
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Logo from "../assets/images/pet-sitting-logo.png";

const drawerWidth = 240;

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const closeDrawer = () => {
    setOpen(false);
  };

  const openDrawer = () => {
    setOpen(true)
  };

  return (
    <>
      <div style={{
          textAlign: 'center',  
          display: 'flex', 
          flexDirection: 'row',  
          backgroundColor: 'white',
          zIndex: 1,
          boxShadow: '0 8px 6px -6px grey',
          width: '100%', 
          justifyContent: 'space-between', 
          padding: '3px'}}>
        <div style={{
          paddingLeft: '10px', 
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'}}>
          <Link to='/' style={{
              content: `url(${Logo})`,
              width: '50%',
              height: 'auto',
              paddingLeft: '30px',
              marginTop: '10px',
              marginBottom: '10px'}}
          ></Link>
        </div>
        <IconButton className="d-lg-none d-md-none d-sm-flex" 
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={openDrawer}
              sx={{ mr: 2, display: { sm: 'none' } }} >
        <Menu />
        </IconButton>
              <Drawer 
                    variant="temporary" 
                    open={open}
                    onClose={closeDrawer}
                    sx={{
                      display: { xs: 'block', sm: 'block' },
                      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    <Divider />
                  <List>
                      <ListItem button key="home" to="/" component={Link}>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem button key="about" to="/about" component={Link}>
                        <ListItemText primary="About" />
                      </ListItem>
                      <ListItem button key="sitters" to="/listings" component={Link}>
                        <ListItemText primary="Find a Sitter" />
                      </ListItem>
                      <ListItem button key="addlisting" to="/addlisting" component={Link}>
                        <ListItemText primary="Become a Sitter" />
                      </ListItem>
                      {user && (
                          <>
                          <ListItem button key="messages" to="/messages" component={Link}>
                              <ListItemText primary="Messages" />
                          </ListItem>
                          <ListItem button key="profile" to="/profile" component={Link}>
                              <ListItemText primary="Profile" />
                          </ListItem>
                          </>
                      )}
                      <ListItem button key="help" to="/contact" component={Link}>
                        <ListItemText primary="Help" />
                      </ListItem>
                  </List>
              </Drawer>

        <div style={{
          width: '60%',
          paddingRight: '5%',
          paddingLeft: '10px'
        }}>
        <ul className="d-lg-flex d-md-flex d-sm-none" style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '3px',
          justifyContent: 'space-between',
          listStyleType: 'none',
          marginTop: '1em'}}>
            <li>
              <Button>
                <Link to='/' style={{
                  color: '#9C9F84',
                  textDecoration: 'none',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  fontSize: '18px',
                  }}>Home
                </Link>
              </Button>
            </li> 
            <li>
              <Button>
                <Link to='/about' style={{
                  color: '#9C9F84',
                  textDecoration: 'none',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  fontSize: '18px',
                  }}>About
                </Link>
              </Button>
            </li> 
            <li>
              <Button>
                <Link to='/listings' style={{
                  color: '#9C9F84',
                  textDecoration: 'none',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  fontSize: '18px',
                  }}>Find a Sitter
                </Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to='/addlisting' style={{
                  color: '#9C9F84',
                  textDecoration: 'none',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  fontSize: '18px',
                  }}>Become a Sitter
                </Link>
              </Button>
            </li>
            {user && (
              <>
              <li>
                <Button>
                  <Link to='/messages' style={{
                    color: '#9C9F84',
                    textDecoration: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    fontSize: '18px',
                    }}>Messages
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to='/profile' style={{
                    color: '#9C9F84',
                    textDecoration: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    fontSize: '18px',
                    }}>Profile
                  </Link>
                </Button>
              </li>
              </>
            )}
            <li>
              <Button>
                <Link to='/contact' style={{
                  color: '#9C9F84',
                  textDecoration: 'none',
                  paddingRight: '10px',
                  paddingLeft: '10px',
                  fontSize: '18px',
                  }}>Help
                </Link>
              </Button>
            </li>
        </ul>
        </div>
        <div style={{paddingTop: '1em', paddingRight: '1em'}}>
          {!user && (
            <>
              <ul style={{
                paddingRight: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: '3px',
                listStyleType: 'none'}}>
                <li>
                  <Button>
                    <Link to ="/login" style={{textDecoration: 'none', color: 'black'}}>
                      Login
                    </Link>
                  </Button>
                </li>
                <li>
                  <h4 style={{color: 'black', fontWeight: '1'}}>|</h4>
                </li>
                <li>
                  <Button>
                    <Link to = "/register" style={{textDecoration: 'none', color: 'black'}}>
                      Sign up
                    </Link>
                  </Button>
                </li>
              </ul>
            </>
            )}
            </div>
            <div style={{paddingTop: '1em', paddingRight: '1em'}}>
              {user && (
                <>
                  <span style={{
                    textDecoration: 'none',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    }}>
                    Signed in as {user.displayName || user.email }
                  </span>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => {
                      signOut(auth)
                      .then(navigate("/"))}}
                    >Logout
                  </Button>
                </>
              )}
            </div>
      </div>
    </>
  );
};