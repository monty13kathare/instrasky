import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { VscChromeClose, VscDebugRestart } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import {BiLogOut} from "react-icons/bi";
import {RiLockPasswordFill} from "react-icons/ri";
import {MdDelete} from "react-icons/md";
import {IoMdNotifications} from "react-icons/io";
import {FaEdit} from "react-icons/fa";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [settingToggle, setSettingToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPosts());
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

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>

<div className="AccountRight">
  <div className="profile-card">
    <img src="https://wallpaperaccess.com/full/1930498.jpg" alt="" className="cover-pic" />
    <img src={user.avatar.url} alt="" className="profile-pic" />
    <h2 className="Acc-name">{user.name}</h2>
    <h3 className="Acc-username">{user.nameId}</h3>
    <p className="tagline">{user.tag}</p>
    {/* <a href="" className="follow-btn">Follow</a> */}

    <div className="AccountRow">
      <div className="AccountFollowBtn">
        <h4>{user.followers.length}</h4>
        <button className="btn3" onClick={() => setFollowersToggle(!followersToggle)}>
        Followers
        </button>
      </div>

      <div className="AccountFollowBtn">
      <h4>{user.following.length}</h4>
        <button className="btn3" onClick={() => setFollowingToggle(!followingToggle)}>
        Following
        </button>
      </div>

      <div className="AccountFollowBtn">
        <h4>{user.posts.length}</h4>
        <button className="btn3">Post</button>
      </div>
    </div>
    <div className="AccountSetting">
      <Link to="/update/profile" className="AEdit">Edit Profile</Link>
      <button className="ASetting" onClick={() => setSettingToggle(!settingToggle)}>Setting</button>
      <button  className="ASetting" onClick={logoutHandler}>Logout</button>
    </div>

  </div>
</div>

<Dialog 
      open={followersToggle}
      onClose={() => setFollowersToggle(!followersToggle)}
      >
        <div className="DialogBox">
         <div className="followTitle">
         <h2 className="followTag">Followers</h2>
             <VscChromeClose className="deleteIcon"  onClick ={() => setFollowersToggle(!followersToggle)}/>
         </div>

         {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
        
            <div className="followingDiv">
            <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
             <button className="followBtn">Follow</button>
             </div>
             ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not follower anyone
              </Typography>
          )}
        </div>
      </Dialog>

        <Dialog 
      open={followingToggle}
      onClose={() => setFollowingToggle(!followingToggle)}
      >
        <div className="DialogBox">
         <div className="followTitle">
         <h2 className="followTag">Following</h2>
             <VscChromeClose className="deleteIcon" onClick={() => setFollowingToggle(!followingToggle)}/>
         </div>

         {user && user.following.length > 0 ? (
              user.following.map((follow) => (
        
            <div className="followingDiv">
            <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
             <button className="followBtn">Follow</button>
             </div>
             ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
          )}
        </div>
      </Dialog>

                  {/*Setting Dialog box  */}

      <Dialog
        open={settingToggle}
        onClose={() => setSettingToggle(!settingToggle)}
      >
        <div className="DialogBoxSetting">
        <div className="SettingTitle">
            <h2 className="settingTag">Setting</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setSettingToggle(!settingToggle)} />
          </div>
          <div className="menu">
      <Link to="/password/reset/:token">
  <VscDebugRestart className="icons rp"/>
    Reset Password
  </Link>

  <Link to="/update/password" >
    <RiLockPasswordFill className="icons cp"/>
    Change Password
  </Link>
  
  <Link to="#"  
  onClick={deleteProfileHandler}
  disabled={deleteLoading}
  >
  <MdDelete className="icons dmp"/>
    Delete My Profile
  </Link>
  
  
  <a href="/update/profile" >
    <FaEdit className="icons ep"/>
    Edit Profile
  </a>
  <a href="#" >
    <IoMdNotifications className="icons noti"/>
    notifications
  </a>
  
  
  <Link to="#"
   onClick={logoutHandler}>
  <BiLogOut className="icons log"/>
    Logout
  </Link>
  
      </div>
        </div>
 </Dialog>                  


    </div>
  );
};

export default Account;
