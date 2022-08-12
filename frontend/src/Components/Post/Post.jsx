import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Post.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";
import { VscChromeClose } from "react-icons/vsc";
import DateFormet from "../DateFormet";


const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="PostContainer">
    
      {/* <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div> */}

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
            border: "2px solid blue",
           margin : "5px 1px 5px 5px"
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={600}  >{ownerName}</Typography>
          <p className="date">{<DateFormet/>}</p>
        </Link>

      </div>


      <div className="PostImg">
        <img src={postImage} alt="Post" />
     </div>
     
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} likes</Typography>
      </button>

      <div className="PostTag">
       <span className="username"> {ownerName} </span>
        <p className="caption">{caption}</p>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setCommentToggle(!commentToggle)}
        disabled={comments.length === 0 ? true : false}
      >
        <Typography>{comments.length} view all comments</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

      <Dialog 
      open={likesUser}
      onClose={() => setLikesUser(!likesUser)}
      >
        <div className="DialogBox">
         <div className="followTitle">
         <h2 className="followTag">Likes</h2>
             <VscChromeClose className="deleteIcon" onClick={() => setLikesUser(!likesUser)}/>
         </div>

          {likes.map((like) => (
            <div className="followingDiv">
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
             <button className="followBtn">Follow</button>
             </div>
          ))}
        </div>
      </Dialog>


      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox1">
          <div className="commentTitle">
            <h2 className="followTag">Comments</h2>
             <VscChromeClose className="deleteIcon"  onClick={() => setCommentToggle(!commentToggle)} />
          </div>

          <form className="commentForm" onSubmit={addCommentHandler}>
           <div className="userComments">
           {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                key={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
        
          <div className="addComments1" >
      
        <Avatar
          src={user.avatar.url}
          alt="User"
          sx={{
            height: "2.5vmax",
            width: "2.5vmax",
            border: "2px solid black",
            marginLeft:"5px"
          }} />
        
        <input
         type="text"
         className="text1"
         placeholder="Comment on post.."
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        required
        />
         <button type="submit" className="comtBtn">
              Post
        </button>
      </div>
          </form>
        </div>
      </Dialog>



      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  
  );
};

export default Post;
