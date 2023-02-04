import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { Avatar,Button,Paper,Grid,Typography,Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import  jwt_decode from 'jwt-decode';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import { useHistory } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';
const IntialState={FirstName:'',lastName:'',email:'',password:'',confirmPassword:''};
const Auth =()=>{
    
    const classes=useStyles();
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(IntialState)
    const [isSignup,setIsSignup]=useState(true);
    const dispatch= useDispatch();
    const history=useHistory();
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }

    }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const switchMode=()=>{
            setIsSignup((prevIsSignup)=>!prevIsSignup);
            handleShowPassword(false)
    }

    const googleSuccess=async (res)=>{

        // optional chaining operator ?.
        const decode =jwt_decode(res.credential);
        const result=decode;
        // const token = decode.sub;
        // console.log(res);
        // console.log(decode)

        //After changes
       const token = res.credential
        try{
            dispatch({type:'AUTH',data:{result,token}})
            history.push('/');
        }catch (error){
            console.log(error)
        }


    }
    const googleFailure=async(error)=>{
        console.log("Google sign is failed")
        console.log(error)
    }

    return(
        <GoogleOAuthProvider clientId="1060072180961-uv5lcihv3bjaq545i3no6olns45lpg7b.apps.googleusercontent.com">
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                    </Avatar>
            <Typography variant="h5">{isSignup ?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                        { isSignup && (
                                <>
                                    <Input name="FirstName" label="FirstName" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="lastName" handleChange={handleChange} half/>

                                </>
                            ) }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                            <Input name="password" label="password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                         {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}       
                </Grid>
                           
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ?'Sign Up':'Sign In'}
                </Button>
               
                
            <GoogleLogin
    onSuccess={googleSuccess}
        onError={googleFailure}
    
/>
                          
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup?'Already have an account? Sign In':"Dont't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>

            </form>
            </Paper>
        </Container>
        </GoogleOAuthProvider>
    ) 
}

export default Auth;
