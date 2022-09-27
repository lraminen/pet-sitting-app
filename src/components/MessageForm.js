import React from "react";
import { AttachFile, Send } from "@material-ui/icons";

export default function MessageForm({ handleSubmit, text, setText, setImg }) {
  
  return (
    <form onSubmit={handleSubmit} style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10%',
        marginTop: '20px',
        left: '20%',
        width: '100%',
        height: '30px',}}>
      <label htmlFor="img" style={{
        cursor: 'pointer', 
        marginTop: '15px',
        marginRight: '5px',}}>
        <AttachFile />
      </label>
      <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ 
            display: "none",
            width: '40vw',
            margin: '0px 10px 10px',
            padding: '10px',
            borderRadius: '5px',
            outline: 'none',
            border: 'none' }}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '40vw',
            padding: '10px',
            borderRadius: '5px', 
            border: 'none',
            height: '60px',}}
        />
      </div>
      <div>
        <button 
            style={{
                marginTop: '15px',
                marginLeft: '5px',
                border: 'none',
                background: 'none',
                }}
            onclick={handleSubmit}>
        <Send/></button>
      </div>
    </form>
  );
};