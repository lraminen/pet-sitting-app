import React from "react";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import BackgroundVideo from "../assets/videos/dog-video.mp4";

const useStyles = makeStyles((theme) => {
  return {
    link: {
      color: '#9C9F84',
      textDecoration: 'none',
    },
    linkHover: {
      "&:hover": {
        color: '#5C755E',
        textDecoration: 'none',
      },
    },
    mainText : {
      color: '#9C9F84',
      fontStyle: 'italic',
      fontFamily: 'Georgia, serif',
      fontSize: '85px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '20px'
      }
    },
}});

export default function Home() {
  
  const classes = useStyles();
  
  return (
    <>
      <div style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
        <video src={BackgroundVideo} autoPlay loop muted style={{ 
          width: '100%',
          objectFit: 'cover',
          zIndex: -1,
          position: 'absolute',
          top: 0,
          left: 0
          }}/>
        <div style={{
          position: 'relative',
          width: '100%',
          top: 0,
          textAlign: 'center',
          color: '#6D9775',
          zIndex: 20,
          }}>
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)'}}>
            <h1 className={classes.mainText}>Happy Paws Sitters</h1>
            <Button
              variant="outlined"
              size="large"
              style={{ marginTop: '2rem', border: '3px solid #9C9F84' }}>
              <Link to="./listings" style={{
                textDecoration: 'none', 
                color: "#9C9F84",
                fontSize: '18px' 
                }}>Find a Sitter
              </Link>
            </Button>
          </div>
        </div>
      </div>
        <div>
          <p style={{
            textAlign: 'right',
            color: '#9C9F84',
            backgroundColor: '#E2DFD2',
            margin: 0,
            paddingRight: '15px',
            paddingBottom: '15px',
            paddingTop: '15px'
            }}>Stock footage provided by 
            <a href="https://www.videvo.net/profile/videvo" target="_blank" 
              className={`${classes.linkHover} ${classes.link}`}> Videvo
            </a> downloaded from 
            <a href="https://www.videvo.net" target="_blank" 
              className={`${classes.linkHover} ${classes.link}`}> videvo.net
            </a>
          </p>
        </div>
    </>
  );
};