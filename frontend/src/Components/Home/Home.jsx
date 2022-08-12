import React, { useEffect } from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Container, Grid, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { Status } from "./Status";
import { Link } from "react-router-dom";
import Friends from "../Friends/Friends";
import NewPost from "../NewPost/NewPost";
import Search from "../Search/Search";
import Account from "../Account/Account";


const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user} = useSelector((state) => state.user);

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">

     <div className="homeleft">
       <div className="Profile">
      
         <img src={user.avatar.url} alt="" className="Dp1"/>
         <div className="Name">
         <Link to="/account" element={<Account/>}>
           <h3>{user.name}</h3>
           <p>{user.nameId} </p>
           <p>{user.email} </p>
           </Link>
         </div>
         
       </div>

       <h3 className="menuText">MENU</h3>
       <div className="menu">
      
       <Link to="/" element={<Home/>}>
       <p className="menu-items active"><i class="fa-solid fa-house"></i>Home</p>
       </Link>
       <Link to="/friends" element={<Friends/>}>
       <p className="menu-items"><i class="fa-solid fa-user-group frd"></i>Fiends</p>
       </Link>
      
       <Link to="/newpost" element={<NewPost/>}>
       <p className="menu-items"><i class="fa-solid fa-circle-plus np"></i>New Post</p>
       </Link>
      
      
       <a href="https://monty13kathare.github.io/Random-Quote-Generator" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-feather-pointed q"></i> Quotes</p>
       </a>
       <a href="https://monty13kathare.github.io/Notes-App/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-book add"></i>Add Notes</p>
       </a>
       <a href="https://monty13kathare.github.io/Movies-Collection/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-circle-play mv"></i>Movies</p>
       </a>
       <a href="https://monty13kathare.github.io/Weather-Game/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-cloud wr"></i>Weather</p>
       </a>
       <a href="https://monty13kathare.github.io/Typing-Test-Game/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-keyboard tg"></i>Typing Game</p>
       </a>
       <a href="https://monty13kathare.github.io/Language-Translator/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-language lt"></i>Language translator</p>
       </a>
       <a href="https://monty13kathare.github.io/QR-Generator/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-qrcode qr"></i>QR Code</p>
       </a>
       <a href="https://www.linkedin.com/in/arvind-kathare-01955b213/" target="_blank">
       <p className="menu-items"><i class="fa-brands fa-linkedin ln"></i>Linkedin</p>
       </a>
       <a href="https://github.com/monty13kathare" target="_blank">
       <p className="menu-items"><i class="fa-brands fa-github gb"></i>Github</p>
       </a>
       <a href="https://www.linkedin.com/in/arvind-kathare-01955b213/" target="_blank">
       <p className="menu-items"><i class="fa-brands fa-instagram ig"></i>Instragram</p>
       </a>
       <a href="https://www.linkedin.com/in/arvind-kathare-01955b213/" target="_blank">
       <p className="menu-items"><i class="fa-brands fa-twitter twi"></i>Twitter</p>
       </a>
       <a href="https://www.linkedin.com/in/arvind-kathare-01955b213/" target="_blank">
       <p className="menu-items"><i class="fa-solid fa-address-card twi"></i>About</p>
       </a>
        
        
       </div>

       
      
      </div>

      <div className="homeCenter">
      <div className="Status">
      <Status
       ImgSrc="https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=600" 
       NameSrc="Priya"  
       DpSrc="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
      <Status 
        ImgSrc="https://images.pexels.com/photos/921284/pexels-photo-921284.png?auto=compress&cs=tinysrgb&w=600" 
       NameSrc="Gulshan"  
       DpSrc="https://images.pexels.com/photos/2977738/pexels-photo-2977738.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Status 
        ImgSrc="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600" 
       NameSrc="Seema"  
       DpSrc="https://images.pexels.com/photos/1382728/pexels-photo-1382728.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Status
        ImgSrc="https://images.pexels.com/photos/1964970/pexels-photo-1964970.jpeg?auto=compress&cs=tinysrgb&w=600" 
       NameSrc="Khilendra"  
       DpSrc="https://images.pexels.com/photos/977662/pexels-photo-977662.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      <Status 
        ImgSrc="https://images.pexels.com/photos/730055/pexels-photo-730055.jpeg?auto=compress&cs=tinysrgb&w=600" 
       NameSrc="Uma"  
       DpSrc="https://images.pexels.com/photos/91218/pexels-photo-91218.jpeg?auto=compress&cs=tinysrgb&w=600"
      />
      </div>
      
      
      {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>

     <div className="homeright">
     <h3>All Users</h3>
         {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )} 
      </div> 
     
    </div>

    
  );
};

export default Home;
