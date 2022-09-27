import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import DefaultImage from "../assets/images/default-profile-img.png";

export default function User({ user1, user, selectUser, chat }) {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper ${chat.fname === user.fname && "selected_user"}`}
        onClick={() => selectUser(user)}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 3px -3px grey',
          }}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <img src={user.profileImg || DefaultImage} alt="Profile Picture" style={{ 
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '1px solid grey',
              marginBottom: '1em'}} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <h4 style={{ marginLeft: '10px'}}>{user.fname} {user.lname}</h4>
            {data && (
              <p style={{    
                fontSize: '14px',
                whiteSpace: 'nowrap',
                width: '90%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',}}>
              <strong style={{ marginRight: '10px'}}>{data.from === user1 ? "Me:" : null}</strong>
                {data.text}
              </p>
            )}</div>
            {data?.from !== user1 && data?.unread && (
              <p style={{
                marginLeft: '10px',
                backgroundColor: '#9c9f84',
                color: 'white',
                padding: '2px 4px',
                borderRadius: '10px',
              }}>New</p>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${chat.fname === user.fname && "selected_user"}`}>
        <img
          src={user.profileImg || DefaultImage}
          alt="Profile Image"
          style={{ 
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '1px solid grey',
            display: 'none'}}/>
      </div>
    </>
  );
};