import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, makeStyles } from "@material-ui/core";
import { 
  BeachAccess,
  CameraAlt,
  EventNote,
  Favorite,
  MailOutline,
  Search
} from "@material-ui/icons";
import AboutImg from "../assets/images/about-puppy.jpg";

const useStyles = makeStyles({
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
});

export default function About() {

  const classes = useStyles();

  return (
    <>
      <div style={{position: 'relative', textAlign: 'center'}}>
        <img src={AboutImg} alt="" style={{
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
      <Container 
        maxWidth='md'
        style={{
          marginTop: '4em', 
          textAlign: 'center', 
          padding: '5rem'}}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          color: '#9C9F84'
          }}>Dog Sitters at Your Convenience
        </h2>
        <br />
        <p style={{
          textAlign: 'justify', 
          lineHeight: '2',
          fontSize: '18px'
          }}>Happy Paws Sitters wants to take the stress out of finding a trusted 
            sitter for your fur-baby. We understand that it is not always easy 
            to find a caring home for your dog when you are away. Happy Paws 
            Sitters wants to make it easy and accessible for you to find a dog 
            sitter so you can relax without any worries. Simply search our list 
            of sitters and message sitters once you find the perfect match for 
            your fur baby, drop the sitter a message. 
            Interested in dog sitting? 
            <Link to="/addlisting" className={`${classes.linkHover} ${classes.link}`}> Create a listing 
            </Link> to become a sitter today.
        </p>
        <Button
          variant="contained"
          margin="normal"
          style={{ backgroundColor: '#9C9F84' }}>
          <Link to="/listings" style={{ color: 'white', textDecoration: 'none' }}>
            Find a Sitter
          </Link>
        </Button>
      </Container>
      <hr />
      <Container>
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          textAlign: 'center', 
          padding: '10px', 
          marginTop: '4em', 
          marginBottom: '4em'}}>
          <div style={{ margin: '20px' }}>
            <EventNote style={{ 
              fontSize: '50px', 
              marginBottom: '20px', 
              color: '#9C9F84'
              }}
            />
            <p style={{ fontSize: '18px', lineHeight: '2' }}>
              Care for every occasion. From a quick walk around the park to a 
              month-long vacation, you can find a pet sitter with the right 
              availability all year round.
            </p>
          </div>
          <div style={{ margin: '20px' }}>
            <CameraAlt style={{
              fontSize: '50px', 
              marginBottom: '20px', 
              color: '#9C9F84'
              }}
            />
            <p style={{ fontSize: '18px', lineHeight: '2' }}>
              Receive picture updates of your pet while you are away directly 
              through messaging in our app so you never have to miss out on the 
              special moments.
            </p>
          </div>
          <div style={{ margin: '20px' }}>
            <Favorite style={{
              fontSize: '50px', 
              marginBottom: '20px', 
              color: '#9C9F84'
              }}
            />
            <p style={{fontSize: '18px', lineHeight: '2'}}>
              Find a sitter who treat your fur baby like family. Be rest assured 
              that your pet is getting more than enough cuddles, treats, and 
              playtime while you are away.
            </p>
          </div>
        </div>
      </Container>
      <hr />
      <div style={{
        display: 'flex', 
        flexDirection: 'row', 
        marginLeft: '10%', 
        marginRight: '10%', 
        marginTop: '4em', 
        marginBottom: '6%'
        }}>
        <Container 
          maxWidth='sm'
          style={{
            border: '1px solid lightgrey', 
            backgroundColor: '#f8f9fa', 
            marginTop: '4em', 
            textAlign: 'center', 
            padding: '5rem'
            }}>
          <div>
            <p style={{
              fontStyle: 'italic', 
              color: '#5C755E', 
              fontSize: '20px'
              }}>"Happy Paws Sitters helped me out in a bind. My sitter was flexible, 
                reliable (even on the worst rainy cold days), professional, 
                knowledgeable, trustworthy, and just a joy to work with! I am now 
                able to manage my German Shepherd, and more importantly, enjoy her 
                on our walks. He truly loves dogs and I could tell he loves my Abby."</p>
            <h3 style={{color: '#9C9F84', fontStyle: 'italic'}}>~ Marissa E.</h3>
          </div>
        </Container>
        <Container
          maxWidth='sm'
          style={{
            border: '1px solid lightgrey', 
            backgroundColor: '#f8f9fa', 
            marginTop: '4em', 
            textAlign: 'center', 
            padding: '5rem'}}>
          <div>
            <p style={{
              fontStyle: 'italic', 
              color: '#5C755E', 
              fontSize: '18px'}}>"I would strongly recommend the services of Happy 
                Paws Sitters for all of your pet care needs. I had never used pet 
                sitting services in the past, but we planned a vacation and had no 
                friends available to dog sit. One of my friends recommended that I 
                check Happy Paws Sitters. They are knowledgeable about animals, 
                responsible, dependable and attentive to our dog's needs. I am 
                largely satisfied and grateful for their care of my dog Mindy. This 
                service is a great alternative to dog boarding, where the pets 
                usually have to be in kennels most of the time. I can finally leave 
                home with the peace of mind that comes from knowing that your loved 
                ones are in good hands when you can't be there."
            </p>
            <h3 style={{color: '#9C9F84', fontStyle: 'italic'}}>~ Jack S.</h3>
          </div>
        </Container>
      </div>
      <hr />
      <Container style={{            
        marginTop: '4em', 
        marginBottom: '4em'}}>
        <br />
        <h2 style={{
          fontFamily: 'Georgia, serif',
          color: '#9C9F84',
          textAlign: 'center',
          }}>3 Simple Steps:
        </h2>
        <br />
        <div style={{textAlign: 'center'}}>
          <Search style={{
            fontSize: '50px', 
            marginBottom: '20px', 
            color: '#9C9F84'
            }}/>
          <p style={{marginBottom: '3em', fontSize: '18px'}}>
            <Link to="/listings" className={`${classes.linkHover} ${classes.link}`}
            >Search</Link> our extensive list of wonderful dog sitters in your area. 
          </p>

          <MailOutline style={{
            fontSize: '50px', 
            marginBottom: '20px', 
            color: '#9C9F84'
            }}/>
          <p style={{marginBottom: '3em', fontSize: '18px'}}>
            Once you find the perfect match, send the sitter a message and 
            introduce yourself and your dog. 
          </p>
          
          <BeachAccess style={{
            fontSize: '50px', 
            marginBottom: '20px', 
            color: '#9C9F84'
            }}/>
          <p style={{marginBottom: '3em', fontSize: '18px'}}>
            Drop your dog off at the sitter's house and enjoy your vacation! Be 
            at ease knowing that your dog is getting the care it needs and the 
            love it deserves while you are away.
          </p>
        </div>
      </Container>
      <hr />
      <Container style={{
        textAlign: 'center', 
        marginTop: '2em', 
        marginBottom: '10%'
        }}>
        <h2 style={{
          marginBottom: '1em', 
          color: '#9C9F84', 
          marginTop: '4em',
          fontFamily: 'Georgia, serif'
          }}>Questions?
        </h2>
        <Button
          variant="contained"
          margin="normal"
          size="large"
          style={{ backgroundColor: '#9C9F84' }}>
          <Link to="/contact" style={{textDecoration: 'none', color: 'white'}}>Contact Us</Link>
        </Button>
      </Container>
    </>
  );
};