import React, { useState } from "react";
import { AppBar,Toolbar,IconButton ,Typography, Stack, Button, Avatar, Link} from "@mui/material";
import "./Header.css";
import {CatchingPokemon} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // const dispatch = useDispatch();
 const { user} = useSelector((state) => state.user);
  return (
    
<AppBar position="ststic">
  <Toolbar>
    <IconButton size="large" edge="start" color="inherit" aria-label="logo">
    <a href="/">
    <i class="fa-solid fa-hand-peace logo"></i>
    </a>
    </IconButton>
    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>FriendZone</Typography>
    <Stack direction='row' spacing={10} className="Nav">
     <Link href="/" underline="none" color="inherit">Home</Link>
     <Link href="/friends" underline="none" color="inherit">Friends</Link>
     <Link href="/search" underline="none" color="inherit">Search</Link>
    
     <Link href="/newpost" underline="none" color="inherit">Create</Link>
     <Link href="/account" underline="none" color="inherit">
    <img src={user.avatar.url} alt="" className="Dp"/>
     </Link>
    </Stack>
  </Toolbar>
</AppBar>

  );
};

export default Header;
