import React,{useState,useEffect,useContext} from "react";
import firebase from "firebase/app";
import { Button } from "reactstrap";
import { AdminContext } from "../Context/Context";
import {Redirect} from "react-router-dom"

export const OrderStatus= ()=>{
    const {admin}=useContext(AdminContext);

    const [status,setStatus]=useState("");
    const intialStatus=async ()=>{
        var orderRef= await firebase.database().ref('/authorder');
        orderRef.on('value',(snapshot)=>{
            setStatus(snapshot.val().accept);
            console.log(snapshot.val().accept)
        })
    }
    const setOrderStatus=()=>{
        firebase.database()
    .ref('/authorder')
    .update({
        accept:!status
    })
    }
    useEffect(()=>{intialStatus()},[]);
    return(
        <div>
        {
            status==true?(<Button onClick={setOrderStatus}>Stop Accepting Orders</Button>):
            (<Button onClick={setOrderStatus}>Accept Orders</Button>)
        }
        {
              admin==true ?(<></>):(<Redirect to="/auth"/>)
            }
        </div>
    )
}