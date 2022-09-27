import React from "react";
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { 
    Copyright,
    Facebook,
    Instagram,
    Twitter,
    YouTube
} from "@material-ui/icons";
import Logo from "../assets/images/pet-sitting-logo.png";

const useStyles = makeStyles({
    link: {
        color: '#E2DFD2',
        textDecoration: 'none',
    },
    linkHover: {
        "&:hover": {
            color: '#5C755E',
            textDecoration: 'none',
        },
    },
});

export default function Footer() {
    
    const classes = useStyles();

    return (
        <>
            <footer>
                <div style={{
                display: 'flex', 
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-evenly',
                paddingTop: '2%',
                paddingBottom: '2%',
                backgroundColor: '#9C9F84'}}>
                    <div>
                        <img src={Logo} alt="Happy Paws Pet Sitters Logo" style={{width: '75%'}} />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '16px',
                        lineHeight: '2',
                    }}>
                        <Link to="/" className={`${classes.linkHover} ${classes.link}`}>Home</Link>
                        <Link to="/about" className={`${classes.linkHover} ${classes.link}`}>About</Link>
                        <Link to="/listings" className={`${classes.linkHover} ${classes.link}`}>Find a Sitter</Link>
                        <Link to="/addlisting" className={`${classes.linkHover} ${classes.link}`}>Become a Sitter</Link>
                        <Link to="/contact" className={`${classes.linkHover} ${classes.link}`}>Help</Link>
                    </div>
                    <div style={{borderRight: '1px solid #E2DFD2'}}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <h4 style={{color: '#E2DFD2'}}>Follow Us</h4>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            font: '0.6em',
                            paddingTop: '1%',
                            justifyContent: 'space-between'
                        }}>
                            <a href="#"><Facebook className={`${classes.linkHover} ${classes.link}`} /></a>
                            <a href="#"><Instagram className={`${classes.linkHover} ${classes.link}`} /></a>
                            <a href="#"><Twitter className={`${classes.linkHover} ${classes.link}`} /></a>
                            <a href="#"><YouTube className={`${classes.linkHover} ${classes.link}`} /></a>
                        </div>
                    </div>
                    <div style={{borderRight: '1px solid #E2DFD2'}}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                        }}>
                    <Button
                            variant="outlined"
                            margin="normal" >
                            <Link to="/contact" className={`${classes.linkHover} ${classes.link}`}>CONTACT US</Link>
                        </Button>
                    </div>
                </div>
                <div style={{
                    margin: 0,
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'center',
                    color: '#9C9F84',
                    backgroundColor: 'white',}}>
                    <Copyright />
                    <p> Marlisa Rebaum 2022</p>
                </div>
            </footer>
        </>
    );
};