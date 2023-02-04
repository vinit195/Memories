import React,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import {AppBar,Avatar,Toolbar,Typography,Button} from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import useStyles from './styles';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';

const Navbar =()=>{
const dispatch=useDispatch();
const history=useHistory();
const location=useLocation();
    const logout=()=>{
            dispatch({type:'LOGOUT'})
            setUser(null);
            history.push('/');
            
    }
const classes=useStyles();
const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
console.log(user);

useEffect(()=>{
    const token = user?.token;
    
    if(token){
        const decodetoken = decode(token);

        if(decodetoken.exp*1000<new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
},[location]);

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography  component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
                </div>
                <Toolbar className={classes.toolbar}>
                {user ? (
                        <div className={classes.profile}>
                       
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} imgProps={{ referrerPolicy: "no-referrer" }}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                ):(
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
                </Toolbar>
            </AppBar>
    );
};

export default Navbar;