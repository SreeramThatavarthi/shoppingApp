import React,{useState,useEffect} from "react";
import {Row,Col,Button} from "reactstrap";
import firebase from "firebase/app";
import {toast} from "react-toastify";
import {v4} from "uuid"; 
import { readAndCompressImage } from "browser-image-resizer";
import {Redirect,Link, useHistory} from "react-router-dom";
import {imageConfig} from "../utils/imageConfig"

export const PlaceOrder=()=>{
    const [cartItems,setCartItems]=useState([]);
    const [cost,setCost]=useState();
    const [phoneNumber,setPhoneNumber]=useState();
    const [user,setUser]=useState(null);
    const [status,setStatus]=useState();
    const [downloadUrl,setDownloadUrl]=useState("");
    const [footer,setFooter]=useState(false);
    const history=useHistory();
    const imagePicker = async e => {
        // TODO: upload image and set D-URL to state
        try{
          const file=e.target.files[0];
          var metadata={
            contentType:file.type
          };
          let resizedImage=await readAndCompressImage(file,imageConfig);
          const storageRef=await firebase.storage().ref();
          var uploadTask=storageRef
          .child("phonepe/"+file.name)
          .put(resizedImage,metadata);
    
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,snapshot=>{
    
            switch(snapshot.state){
              case firebase.storage.TaskState.PAUSED:
                console.log("Uplaoding failed");
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log("Uploading is in progress");
                break;  
            }
          },
          error=>{
        toast("Sorry,Image uploading is failed",{type:"error"});
            
          },
          ()=>{
            uploadTask.snapshot.ref.getDownloadURL()
              .then(downloadURL=>{
                setDownloadUrl(downloadURL)
              })
              .catch(err=>console.log(err));
          }
          );
        }
        catch(error){
          console.log(error);
          toast("Something went wrong",{type:"error"})
        }
      };
    const setData=()=>{
        if(JSON.parse(localStorage.getItem('itemsArray')).length>0){
            console.log(1);
        setCartItems(JSON.parse(localStorage.getItem('itemsArray')))
        setFooter(true);
        }
        else{
        setCartItems([]);
        setFooter(false);
        }
        var total=0;
        JSON.parse(localStorage.getItem('itemsArray')) ?(JSON.parse(localStorage.getItem('itemsArray')).map((value)=>{
        total=total+parseInt(value.cost);
        setCost(total);
        })):(total=0)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!isNaN(cost)){
        if(status){
            getUser();
        if(user){
            get();
        }
        else{
            toast("Order failed,SignIn to place the order",{type:"error"});
        }
        }
        else
        {
            toast("Sorry,We are Currently not accepting any orders",{type:"info"});
        }
    }
    else
    {
        console.log(1);
            toast("Please reload the page and wait for 10 seconds and then place order again",{type:"error"});
            history.push('/');
            return;
    }
    }
    const getUser=async ()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
                setUser(user);
            } else {
              console.log(1);
              setUser(null);
            }
          });
          var status;
          var statusRef=await firebase.database().ref('/authorder');
          statusRef.on('value',(snapshot)=>{
           status=(snapshot.val().accept);
           setStatus(status);
          })
    }
    const get=()=>{
        cartItems.push(user.email);
        if(user.phoneNumber){cartItems.push(user.phoneNumber);}
        if(user.displayName){cartItems.push(user.displayName);}
        cartItems.push(downloadUrl);          
        cartItems.push(phoneNumber);          
        setDownloadUrl("");
        setPhoneNumber("");
        if(user.photoURL){cartItems.push(user.photoURL);}
        firebase.database()
        .ref(`order/${user.uid}/`+v4())
        .set(cartItems)
        .then(()=>{
           console.log("Order Placed")
           localStorage.setItem('itemsArray',JSON.stringify([]));
           setCartItems([])
           setFooter(false);
            toast("Order placed",{type:"success"});
            history.push('/');
        })
        .catch(err=>toast(err,{type:"error"}))
        firebase.database()
        .ref(`authorders/`+v4())
        .set(cartItems)
        .then(()=>{
           console.log("Order Placed")
           localStorage.setItem('itemsArray',JSON.stringify([]));
        })
        .catch(err=>toast(err,{type:"error"}))
    }
    useEffect(()=>{getUser();
        setData();},[])
    return(
        <div>
        {
        (cartItems!=null&&cartItems!=[])?(cartItems.map((item)=>(
            <div class="card" style={{width:"100%"}} key={item.id}>
              <Row style={{padding:"2px"}}>
                  <Col className="md-7">
                  <img src={item.image} style={{width:"120px",height:"120px"}} class="card-img-top" alt="..."/>
                  </Col>
                  <Col className="md-5">
                  <div class="card-body" style={{marginTop:"4px"}} >
                    <div><h6>Weight: {item.weight} {"g"}</h6></div>
                    <div><h6>Cost: {"₹"} {item.cost}</h6></div>
                  </div>
                  </Col>
              </Row>
          </div>
              ))
              ):(<></>)
        }
        <h5 style={{marginTop:"20px"}}>Terms and Conditions:</h5>
        <div style={{marginBottom:"10px",marginTop:"10px"}}>
        This is only a project.We are not selling anything.
        </div>
        <hr
        style={{
            color: "#000",
            backgroundColor: "",
            height: 5
        }}
    />
        {
        (footer)?(<form style={{marginTop:"20px"}} onSubmit={e=>handleSubmit(e)}>
            <div class="form-check">
           <div style={{marginBottom:"10px"}}>
           <label class="form-check-label" for="exampleCheck1" ><h6>Mobile Number</h6></label>
           <div >
           <input type="text"  id="exampleCheck1" placeHolder="Enter Phone Number" style={{height:"40px",fontSize:"18px"}} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required/>
           </div>
           </div>
           <div style={{marginTop:"30px"}}>
           <input  type="checkbox" class="form-check-input" id="exampleCheck1" required/>
           <label class="form-check-label" for="exampleCheck1" ><h6>I agree, to the above terms and conditions</h6></label>
           </div>         
       </div>
       <div style={{float:"right"}}>
       <h4 style={{marginTop:"15px"}}><span style={{color:"#0A79DF"}}>Total Cost:</span>{"₹"} {cost}</h4>
      <Button type="submit" style={{backgroundColor:"#019031",color:"#fff",alignItems:"center",marginTop:"10px",float:"right"}}>Place Order</Button>
       </div>
       </form>
       ):(<></>)
        }
        </div>
        
    )
}