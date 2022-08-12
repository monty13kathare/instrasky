import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);

  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const params = useParams();
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

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
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </div>
      <div className="AccountRight">
        {user && (
          
            
      <div className="profile-card">
    <img src="https://wallpaperaccess.com/full/6181087.jpg" alt="" className="cover-pic" />
    <img src={user.avatar.url} alt="" className="profile-pic" />
    <h2 className="Acc-name">{user.name}</h2>
    <h3 className="Acc-username">{user.nameId}</h3>
    <p className="tagline">{user.tag}</p>
  

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

    {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "rgb(30, 114, 216)" : "rgb(30, 114, 216)" , margin: "20px 0 30px 0"}}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )} 
   
    </div>
         
        )}
      
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




      </div>
    </div>
  );
};

export default UserProfile;
