import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { followAndUnfollowUser, getAllUsers, getFollowingPosts, getUserProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';
import User from '../User/User';
import "./Friends.css";

const Friends = () => {

  
  
  

    const dispatch = useDispatch();
    const alert = useAlert();

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
    
    
    <div className='friends'>

{users && users.length > 0 ? (
          users.map((user) => (
            <div className="card" >
           
            
        <Link to={`/user/${user._id}`} className="UserCard">
      <img src={user.avatar.url} alt="Pic" />
      <div className="UserCardName">
      <h3 className='name'>{user.name}</h3>
      <span className='nameId'>{user.nameId}</span>
      </div>
    </Link>
        <Link to={`/user/${user._id}`} className="btn1">View Profile</Link>
       
   
</div>
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}






    </div>
   
  )
}

export default Friends