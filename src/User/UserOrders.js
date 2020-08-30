import React,{useState,useEffect} from "react";
import Spinner from 'react-bootstrap/Spinner'

import { toast } from "react-toastify";
import {Row,Col} from "reactstrap";
import firebase from "firebase/app";
export const UserOrders=()=>{
    const [orders,setOrders]=useState({});
    const [userId,setUserId]=useState();
  const [loading,setLoading]=useState(true);
    const getToast=()=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setUserId(user.uid);
        } else {
          toast("Sign In to get your Orders",{type:"info"});
        }
      });
    }
    const getData=async ()=>{
      const orderRef=await firebase.database().ref(`/order/${userId}/`);
  orderRef.on('value',(snapshot)=>{
    setOrders(snapshot.val());
    setLoading(false);
  })
    }
  useEffect(()=>{getData();
    getToast();
  },[userId]);

    return(
      <div>
         {
            loading==true?(<div><Spinner animation="border" className="spinner"/></div>):(<div></div>)
          }
      {(orders !=={}&&orders!=null) ?(Object.entries(orders).map(([key,value])=>
          (<div class="card" key={key} style={{width:"100%"}}>
              <Row>
                  <Col className="md-6">
                  <img src={value[0].picture} style={{width:"180px",height:"170px"}} class="card-img-top" alt="..."/>
                  </Col>
                  <Col className="md-6">
                  <div class="card-body" >
                    <div><h6><span style={{color:"#0A79DF"}}>Weight:</span>{value[0].weight} {"g"}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Cost:</span>{"₹"} {value[0].cost}</h6></div>
                  </div>
                  </Col>
              </Row>
              </div> 
            ))):(<div><h6>You have not Placed any orders till Now<div>(Or)</div><div>you may not signed in</div></h6></div>)}
            </div>
    )
}