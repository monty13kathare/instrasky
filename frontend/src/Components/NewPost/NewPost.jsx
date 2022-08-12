import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createNewPost } from "../../Actions/Post";
import { loadUser } from "../../Actions/User";
import "./NewPost.css";
import {MdFontDownload} from "react-icons/md";
import {BsFillEmojiSmileFill} from "react-icons/bs";
import {IoIosImages} from "react-icons/io";
import {FaUserTag} from "react-icons/fa";
import {MdAddLocationAlt} from "react-icons/md";
import {GiMicrophone} from "react-icons/gi";




const NewPost = (
  ownerImage,
  ownerName,
  isAccount,
) => {

   const Category =(e) =>{
     setChoose(e.target.value);
   }

   const { user} = useSelector((state) => state.user);



  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [choose, setChoose] = useState("Public");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
  <div className="container">
    <div className="wrapper">
      <section className="post">
        <header>Create Post</header>
        <form className="postForm" onSubmit={submitHandler}>
          <div className="content">
         <img src={user.avatar.url} />
            <div className="details">
              <p>{user.name}</p>
          
            <select value={choose} onChange={Category}>
                 <option value="Privacy"> Private </option>
                 <option value="Public"> Public </option>
                 <option value="friends">Friends </option>
            </select>
            
            </div>
          </div>
        
          <textarea placeholder="What's on your mind?"
            value={caption}
          onChange={(e) => setCaption(e.target.value)}
           required >
           </textarea>
          <div className="imageDiv">
          {image && <img src={image} alt="post" />}
          </div>
         
          <div className="options">
            <p>Add to Your Post</p>
            <ul className="list">
            <li><IoIosImages className="gallery"/>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            </li>
            <li><FaUserTag className="tagFrd"/></li>
            <li><MdAddLocationAlt className="location" /></li>
            <li><GiMicrophone className="host"/></li>
            </ul>
          </div>
          <button disabled={loading} type="submit">Post</button>
        </form>
      </section>
    
    </div>
  </div>



 








  );
};

export default NewPost;