import React,{useState,useContext,useEffect,Fragment} from "react";
import { Col,Row, Button } from "reactstrap";
import { readAndCompressImage } from "browser-image-resizer";
import { MdDelete } from "react-icons/md";
import {toast} from "react-toastify"
import firebase from "firebase/app";
import {imageConfig} from "../utils/imageConfig"
import {v4} from "uuid"
import { AdminContext } from "../Context/Context";
import { Redirect } from "react-router-dom";
import {GoldContext} from "../Context/Context"
const AdminRings=()=>{
    const {admin}=useContext(AdminContext);
    const {goldRate}=useContext(GoldContext)
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadUrll, setDownloadUrll] = useState(null);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [wastage, setWastage] = useState("");
  const [kdm,setKdm]=useState("");
  const [mc,setMc]=useState("");
  const [del,setDel]=useState(true);
  const [rings,setRings]=useState({});
  const imagePickerr = async e => {
    // TODO: upload image and set D-URL to state
    try{
      const file=e.target.files[0];
      var metadata={
        contentType:file.type
      };
      let resizedImage=await readAndCompressImage(file,imageConfig);
      const storageRef=await firebase.storage().ref();
      var uploadTask=storageRef
      .child("rings/"+file.name)
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
            setDownloadUrll(downloadURL)
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
          .child("rings/"+file.name)
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
      const handleSubmit=(e)=>{
          e.preventDefault();
          addItem()
          setName("")
          setDownloadUrl("")
          setDownloadUrll("")
          setWeight("")
          setKdm("")
          setMc("")
          setWastage("")
          setDel("")
      }

      const addItem =  () => {
        //TODO: add contact method
        if(kdm==true)
        {
        var cost=(parseFloat(weight) +  parseFloat(wastage))*parseFloat(goldRate)+parseFloat(mc)
        }
        else{
          var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
        var cost=(parseFloat(weight) +  parseFloat(wastage))*parseFloat(g)+parseFloat(mc);
        }
        try {
          firebase.database().ref("rings/"+v4()).set(
            {
              name,weight,wastage,cost,mc,kdm,del,picture:downloadUrl,picturee:downloadUrll
            }
          )
        } catch (error) {
          console.log(error)
          toast("Unable to add item",{type:"error"})
        }
      };
      const getData=async ()=>{
        const ringsref=await firebase.database().ref('/rings');
        ringsref.on('value',(snapshot)=>{
          console.log(snapshot.val());
          setRings(snapshot.val())
          console.log(rings);
        })
      };
   useEffect(()=>{getData()},[]);
   const deleteItem=(id)=>{
     console.log(id);
     firebase.database()
     .ref(`/rings/${id}`)
     .remove()
     .then(()=>{console.log("successfully removed")})
     .catch((err)=>console.log(err))
   }
      return(
          <div>
          {
              admin==true?(<div>
              
                <form onSubmit={e=>handleSubmit(e)}>
                <div className="form-group">
                    <label for="image1" style={{marginRight:"10px"}}>Image1</label>
                    <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    onChange={e => imagePicker(e)}
                    className="hidden"
                  />
                  <br/>
                  <label for="image" style={{marginRight:"10px"}}>Image2 </label>
                    <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    onChange={e => imagePickerr(e)}
                    className="hidden"
                  />
                </div>
                <div class="form-group">
                    <label for="name">Item Name</label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter ItemName"/>
                </div>
                <div class="form-group">
                    <label for="weight">Weight</label>
                    <input type="text" value={weight} onChange={e=>setWeight(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Weight"/>
                </div>
                <div class="form-group">
                    <label for="wastage">Wastage</label>
                    <input type="text" value={wastage} onChange={e=>setWastage(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Wastage"/>
                </div>
                <div class="form-group">
                    <label for="mc">Making Charges</label>
                    <input type="text" value={mc} onChange={e=>setMc(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Making Charges"/>
                </div>
                <div class="form-group">
                    <label for="kdm" style={{marginRight:"35px"}}>Kdm</label>
                    <Button style={{marginRight:"10px"}} onClick={()=>{setKdm(true)}}>Yes</Button>
                    <Button style={{marginRight:"10px"}} onClick={()=>{setKdm(false)}}>No</Button>
                </div>
                <div class="form-group">
                    <label for="deliver" style={{marginRight:"10px"}}>Available</label>
                    <Button style={{marginRight:"10px"}} onClick={()=>{setDel(true)}}>Yes</Button>
                    <Button style={{marginRight:"10px"}} onClick={()=>{setDel(false)}}>No</Button>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form> 
          </div>):(<div><Redirect to="/auth"/></div>)
          }
          <Fragment>
          {
            (rings!=null) ?(Object.entries(rings).map(([key,value])=>(
              <div class="card" style={{width:"100%"}} key={key}>
              <Row>
                  <Col className="md-7">
                  <img src={value.picture} style={{width:"180px",height:"170px"}} class="card-img-top" alt="..."/>
                  </Col>
                  <Col className="md-5">
                  <div class="card-body">
                    {(value.kdm)?(<div><h4>{`KDM ${value.name}`}</h4></div>):(<div><h4>{`22Ct ${value.name}`}</h4></div>)}
                    <div><h6><span style={{color:"#0A79DF"}}>Weight:</span>{value.weight} {"g"}</h6></div>
                    <div><h6><span style={{color:"#0A79DF"}}>Cost:</span>{"₹"} {value.cost}</h6></div>
                    {
                      (value.del)?(
                        <button type="button" onClick={()=>deleteItem(key)} class="btn btn-success" style={{fontSize:"15px",marginTop:"4px"}} ><MdDelete/></button>
                          ):(
                        <>
                        <button type="button" onClick={()=>deleteItem(key)} class="btn btn-success" style={{fontSize:"15px",marginTop:"4px"}} ><MdDelete/></button>
                        <button class="btn btn-danger" style={{fontSize:"10px",marginTop:"4px"}}>Currently Unavialable</button>
                        </>
                          )
                    }
                  </div>
                  </Col>
              </Row>
              </div> 
            ))):(<div>Loading</div>)
            
          }
       </Fragment>
        </div>
      )
}

export default AdminRings;