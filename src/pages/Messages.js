import React, { useEffect, useState } from "react";
import {
  addDoc,
  doc,
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import "../App.css";

export default function Messages() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));

    if (docSnap.data() && docSnap.data().from !== user1) {

      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      overflow: 'hidden',
      width: '100vw',
      marginBottom: '5%',
      marginTop: '2em',
      borderTop: '2px solid grey',
      borderBottom: '2px solid grey'
      }}>
      <div style={{
        borderRight: '2px solid grey',
        overflowY: 'auto',
        }}>
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div style={{ position: 'relative', width: '100%', backgroundColor: '#dee6d3'}}>
        {chat ? (
          <>
            <div style={{ 
              position: 'relative',
              backgroundColor: '#7d915e',
              padding: '10px',
              textAlign: 'center',
              boxShadow: '0 8px 6px -6px grey'
              }}>
              <h3 style={{color: 'white'}}>{chat.fname} {chat.lname}</h3>
            </div>
            <div style={{    
              height: '80%',
              overflowY: 'auto',
              borderBottom: '1px solid grey',
              marginTop: '1em', 
              marginLeft: '1em',
              marginRight: '1em'}}>
              {msgs.length
                ? msgs.map((msg, i) => (
                  <Message key={i} msg={msg} user1={user1} />
                ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 style={{    
            fontSize: '20px',
            fontStyle: 'italic',
            color: 'black',
            textAlign: 'center',
            marginTop: '25%',
            }}>Please select a user on the left to send message to.</h3>
          )}
      </div>
    </div>
  );
};