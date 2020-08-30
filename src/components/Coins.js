import React, { Fragment,useState,useReducer } from "react";
import Spinner from 'react-bootstrap/Spinner'
import {Modal} from "react-bootstrap"
import { useMediaQuery } from 'react-responsive'
import { Col,Row } from "reactstrap";
import { readAndCompressImage } from "browser-image-resizer";
import {toast} from "react-toastify"
import firebase from "firebase/app";
import {imageConfig} from "../utils/imageConfig"
import {v4} from "uuid"
import { useEffect } from "react";
export const Coins=()=>{
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [coins,setCoins]=useState({});
  const [loading,setLoading]=useState(true);
  const [image,setImage]=useState("");
  const [show, setShow] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })

  const handleClose = () => setShow(false);
  const handleShow = () =>{ 
    setShow(true);
  }
 const getData=async ()=>{
  const coinsRef=await firebase.database().ref('/coins');

  coinsRef.on('value',(snapshot)=>{
   setLoading(false);
   console.log(snapshot.val());
    setCoins(snapshot.val())
    console.log(coins);
  })
 };
 const twoImages=(value)=>{
  handleShow();
  console.log(value);
  setImage(value);
 }
 useEffect(()=>{getData()},[]);
 const addtocart=(value)=>{
   console.log(value);
   var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
            var newItem = 
            {
            'name': value.name,
            'cost': value.cost,
            'image':value.picture,
            'weight':value.weight,
             'id':v4(),
             'wastage':value.wastage,
            'mc':value.mc
            };
            oldItems.push(newItem);
            console.log(oldItems);
       localStorage.setItem('itemsArray', JSON.stringify(oldItems));
 }
    return(
        <Fragment >
          {
            loading==true?(
              <div>
              {
                isDesktopOrLaptop &&
                <Spinner animation="border" className="spinner" style={{left:"50%"}}/>
              }
              {
                isTabletOrMobileDevice &&
                <Spinner animation="border" className="spinner" style={{left:"57%"}}/>
              }
              </div>
            ):(<div></div>)
          }
          {
            (coins !=null&&coins!=[]) ?(Object.entries(coins).map(([key,value])=>(
              <>
                {
                  isDesktopOrLaptop &&
                  <>
                  <div class="card" style={{width:"50%"}} key={key}>
              <Row>
                  <Col className="md-6">
                  
                  <img src={value.picture} onClick={()=>{twoImages(value)}} style={{width:"250px",height:"190px"}} class="card-img-top" alt="..."/>
                  
                  </Col>
                  <Col className="md-6">
                  <div class="card-body" >
                  <div>
                  <h5>{value.name}</h5>
                  </div>
                    <div><h6><span style={{color:"#0A79DF"}}>Weight:</span>{value.weight} {"g"}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Cost:</span>{"₹"} {value.cost}</h6></div>
                    {
                      (value.del)?(
                    <button type="button"  onClick={()=>addtocart(value)} class="btn btn-success" style={{fontSize:"10px",marginTop:"4px"}}>Add to Cart</button>
                      ):(
                    <button class="btn btn-danger" style={{fontSize:"10px",marginTop:"4px"}}>Currently Unavialable</button>
                      )
                    }
                  </div>
                  </Col>
              </Row>
              </div> 
              </>
                }
                {
                  isTabletOrMobileDevice &&
                  <>
                  <div class="card" style={{width:"100%"}} key={key}>
              <Row>
                  <Col className="md-6">
                  
                  <img src={value.picture} onClick={()=>{twoImages(value)}} style={{width:"170px",height:"170px"}} class="card-img-top" alt="..."/>
                 
                  </Col>
                  <Col className="md-6">
                  <div class="card-body" >
                  <div>
                  <h5>{value.name}</h5>
                  </div>
                    <div><h6><span style={{color:"#0A79DF"}}>Weight:</span>{value.weight} {"g"}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Cost:</span>{"₹"} {value.cost}</h6></div>
                    {
                      (value.del)?(
                    <button type="button"  onClick={()=>addtocart(value)} class="btn btn-success" style={{fontSize:"10px",marginTop:"4px"}}>Add to Cart</button>
                      ):(
                    <button class="btn btn-danger" style={{fontSize:"10px",marginTop:"4px"}}>Currently Unavialable</button>
                      )
                    }
                  </div>
                  </Col>
              </Row>
              </div> 
              </>
                }
              </>
            ))):(<div>No Items to Show</div>)
            
          }
          {
            show==true?(
              <Modal show={show} onHide={handleClose} style={{marginTop:"70px"}}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
      <div class="scrolling-wrapper">
      {
        isDesktopOrLaptop && <>
        <div class="card">
        <div class="card">
      <img src={image.picture} style={{width:"350px" ,height:"300px"}} class="card-img-top"/>
      </div>
      <div class="card"><div class="card">
      <img src={image.picture} style={{width:"350px" ,height:"300px"}} class="card-img-top"/>
      </div>
      </div>
      </div>
      </>
      }
      {
        isTabletOrMobileDevice && <>
        <div class="card">
        <div class="card">
      <img src={image.picture} style={{width:"270px" ,height:"250px"}} class="card-img-top"/>
      </div>
      <div class="card"><div class="card">
      <img src={image.picture} style={{width:"270px" ,height:"250px"}} class="card-img-top"/>
      </div>
      </div>
      </div>
      </>
      }
      </div>
  </Modal.Body>
  <Modal.Footer>
    <div><h6><span style={{color:"#0A79DF"}}>Weight:</span>{image.weight} {"g"}</h6></div>
    <div><h6><span style={{color:"#0A79DF"}}>Cost: </span>{"₹"}{image.cost}</h6></div>
  </Modal.Footer>
      </Modal>
            ):(<></>)
          }
       </Fragment>

    )
}