import React, { useState, useContext ,useEffect} from 'react'
import firebase from 'firebase/app';
import { Button } from 'reactstrap';
import "firebase/auth";
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify';
import {SignInContext} from "../Context/Context"

const SignIn=()=>{
  const {signinuser,setSigninuser}=useContext(SignInContext);
    var provider = new firebase.auth.GoogleAuthProvider();
    const handleSubmit=(e)=>{
      e.preventDefault();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            setSigninuser(user.email);
            console.log(user.email);            // ...
          })
          .then(()=>{
           return toast("signed in successfully",{type:"success"});

          }).catch(function(error) {
            // Handle Errors here.
            return toast(error.message,{type:"error"})
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    const setUser=()=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setSigninuser(user.email);
          // User is signed in.
        } else {
          // No user is signed in.
        }
      });
    }
    useEffect(setUser,[]);
    return(
        <>
        <h4 style={{textAlign:"center",marginTop:"19px"}}>Sign In Form</h4>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:"35px"}}>
        <Button style={{backgroundColor:"#fff",border:"none"}} onClick={e=>handleSubmit(e)}>
        <GoogleButton/>
        </Button>
        </div>
        </>
    )
}

export default SignIn;
