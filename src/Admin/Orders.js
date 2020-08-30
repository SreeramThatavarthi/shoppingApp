import React,{useState,useEffect,useContext} from "react";
import Spinner from 'react-bootstrap/Spinner'
import {Row,Col} from "reactstrap";
import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { AdminContext } from "../Context/Context";

export const Orders=()=>{
    const [orders,setOrders]=useState({});
    const {admin}=useContext(AdminContext);
  const [loading,setLoading]=useState(true);
      const getData=async ()=>{
        const orderRef=await firebase.database().ref(`/authorders`);
    orderRef.on('value',(snapshot)=>{
      setOrders(snapshot.val());
      console.log(snapshot.val());
      setLoading(false);
    })
      }
    useEffect(()=>{getData()},[]);
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
                    <div><h6><span style={{color:"#0A79DF"}}>Cost:</span> {value[0].cost}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Email:</span> {value[1]}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Name:</span> {value[2]}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Phone Number:</span> {value[4]}</h6></div>
                  </div>
                  </Col>
              </Row>
              <Row>
                <Col className="md-6">
                <img src={value[3]} style={{width:"180px",height:"170px"}} class="card-img-top" alt="..."/>
                </Col>
              <Col className="md-6">
                <img src={value[5]} style={{width:"180px",height:"170px"}} class="card-img-top" alt="..."/>
                 </Col>
              </Row>
              </div> 
            ))):(<div>No Orders</div>)}
            {
              admin==true ?(<></>):(<Redirect to="/auth"/>)
            }
            </div>
    )
}