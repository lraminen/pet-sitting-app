import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function DeleteListing({ id, imageUrl }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteDoc(doc(db, "Listings", id));
        toast("Listing deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting listing", { type: "error" });
        console.log(error);
      }
    }
  };
  
  return (
    <div>
      <button
        onClick={handleDelete}
        style={{ 
          cursor: "pointer", 
          width: "100px", 
          backgroundColor: isHovering ? "rgba(220, 20, 60, 0.3" : "",
          border: isHovering ? "rgba(220, 20, 60, 0.3" : "",
         }}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
          className="btn btn-outline-danger">
          Delete
      </button>
    </div>
  );
};