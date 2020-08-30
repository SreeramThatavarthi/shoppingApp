import React,{useState,useReducer,useEffect,useContext} from "react";
import { Container } from 'react-floating-action-button'
import {Button} from "reactstrap";
import {Modal} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav,NavItem,NavbarBrand,Navbar,NavbarText,NavbarToggler,Collapse,NavLink} from "reactstrap";
import { Col,Row } from "reactstrap";
import CartBody from "./CartBody";
import firebase from "firebase/app";
import {v4} from "uuid";
import {toast} from "react-toastify";
import {UserContext, GoldContext} from "../Context/Context";
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import PersistentDrawerLeft from "./NavBar";
import {Link,Redirect,useHistory} from "react-router-dom";
import { PlaceOrder } from "../components/PlaceOrder";

const Cart=(props)=>{ 
  const [oldItemss,setOldItemss]=useState([]);
  const history=useHistory();
  const {goldRate}=useContext(GoldContext);
  const [status,setStatus]=useState();
  const [show, setShow] = useState(false);
  const [totalCost,settotalCost]=useState(0);
  const [showNav, setShowNav] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () =>{ 
    setShow(true);
    var items=JSON.parse(localStorage.getItem('itemsArray'));
    setOldItemss(JSON.parse(localStorage.getItem('itemsArray')))
    setTimeout(function(){
    items.map((it)=>{
      console.log(it.weight);
      console.log(goldRate);
      it.cost=(parseFloat(it.weight)+parseFloat(it.wastage))*parseFloat(goldRate)+parseFloat(it.mc);
      console.log(it.cost)
    localStorage.setItem('itemsArray', JSON.stringify(items));
    });
    });
     var total=0;
     JSON.parse(localStorage.getItem('itemsArray')) ?(JSON.parse(localStorage.getItem('itemsArray')).map((value)=>{
      total=total+parseInt(value.cost);
    })):(total=0)
    settotalCost(total);
  }

  const removefromcart=(value)=>{
    console.log(value);
             var oldItems = JSON.parse(localStorage.getItem('itemsArray'));
            var Items=oldItems.filter(item=>item.id!=value.id)
            console.log(Items)
            setOldItemss(Items);
            localStorage.setItem('itemsArray', JSON.stringify(Items));
            console.log(localStorage)
            var total=0;
            JSON.parse(localStorage.getItem('itemsArray')) ?(JSON.parse(localStorage.getItem('itemsArray')).map((value)=>{
              total=total+parseInt(value.cost);
            })):(total=0)
            settotalCost(total);
            console.log(totalCost)
  }
  const statusData=()=>{
    if(!isNaN(totalCost)){
      if(status){
        handleClose();
        history.push("/placeorder");    
      }
      else{
        handleClose();
        toast("Currently Orders are not accepting");
      }
    }
    else{
      toast("You are so hurry , Please close the cart and open it after 2 sec",{type:'error'});
    }
  }
  useEffect(async ()=>{var status;
    var statusRef=await firebase.database().ref('/authorder');
    statusRef.on('value',(snapshot)=>{
     status=(snapshot.val().accept);
     setStatus(status);
    })},[]);
  return (
    <>
   <div>
  <PersistentDrawerLeft handleShow={handleShow}/>
  </div> 
      <Modal show={show} onHide={handleClose} style={{marginTop:"70px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            (oldItemss!=null)?(oldItemss.map((item)=>(
              <CartBody item={item} removefromcart={removefromcart}/>
            ))):(<div>Go and Add Items</div>)
         }
  </Modal.Body>
   <Modal.Footer style={{paddingBottom:"60px"}}>
   <div>
            <h5><span style={{color:"#0A79DF"}}>TotalCost:</span>{"₹"} {totalCost}</h5>
          </div>
          <Button className="primary" variant="secondary"> 
          <Link  style={{color:"#fff",textDecoration:"none"}} onClick={statusData}>
            Buy now
          </Link>
          </Button>        
   </Modal.Footer>
      </Modal>
  </>
  );
}
        
export default Cart;