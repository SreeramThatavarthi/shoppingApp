import React, { Fragment,useState, useEffect } from 'react';
import {Row, Col, Container} from "reactstrap";
import firebase from "firebase/app";
import firebaseConfig from "./utils/firebaseconfig";
import "firebase/database"
import "firebase/storage"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link } from 'react-router-dom';
import { Necklace } from './components/Necklace';
import { Rings } from './components/Rings';
import { Stirs } from './components/Stirs';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { NotFound } from './components/NotFound';
import Auth from './Admin/Auth';
import {AdminContext,GoldContext,SilverContext} from "./Context/Context";
import {SignInContext} from "./Context/Context"
import MainPage from './components/MainPage';
import AdminRings from './Admin/AdminRings';
import AdminNecklace from './Admin/AdminNecklace';
import AdminStirs from './Admin/AdminStirs';
import Cart from './Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GoldCost} from './components/goldCost';
import {ContactUs} from './components/ContactUs';
import { Footer } from './components/Footer';
import SignIn  from './User/SignIn';
import  {AdminGoldRate}  from './Admin/AdminGoldRate';
import { OrderStatus } from './Admin/OrderStatus';
import {PlaceOrder} from './components/PlaceOrder';
import { UserOrders } from './User/UserOrders';
import { Orders } from './Admin/Orders';
import AdminCoins from './Admin/AdminCoins';
import { Coins } from './components/Coins';
import { Silver } from './components/Silver';
import { Chains } from './components/Chains';
import { Bracelets } from './components/Bracelets';
import AdminChains from './Admin/AdminChains';
import AdminBracelet from './Admin/AdminBracelet';
import AdminSilver from './Admin/AdminSilver';
import {AdminSilverRate} from './Admin/AdminSilverRate';

firebase.initializeApp(firebaseConfig)
const App=()=>{
  const [admin,setAdmin]=useState(false);
  const [signinuser,setSigninuser]=useState();
  const [goldRate,setGoldRate]=useState("");
  const [silverCost,setSilverCost]=useState("");
  const [user,setUser]=useState(null);
  const getGoldRate=async ()=>{
    var goldRef=await firebase.database().ref('/goldrate');
        goldRef.on('value',(snapshot)=>{
            setGoldRate(parseInt(snapshot.val().value));
            console.log(parseInt(snapshot.val().value))
        })
  }
  const getSilverCost=async ()=>{
    var silverRef=await firebase.database().ref('/silverrate');
        silverRef.on('value',(snapshot)=>{
            setSilverCost(parseInt(snapshot.val().value));
            console.log(parseInt(snapshot.val().value))
        })
  }
  useEffect(()=>{getGoldRate();
  getSilverCost();},
  []);
  return(
    
    <Router>
    <SignInContext.Provider value={{signinuser,setSigninuser}}>
    <AdminContext.Provider value={{admin,setAdmin}}>
    <GoldContext.Provider value={{goldRate,setGoldRate}}>
    <SilverContext.Provider value={{silverCost,setSilverCost}}>
    <Cart/>
    <ToastContainer/>
      <Container style={{paddingTop:"70px"}}>
      <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/necklace" component={Necklace}/>
      <Route exact path="/rings" component={Rings}/>
      <Route exact path="/stirs" component={Stirs}/>
      <Route exact path="/coins" component={Coins}/>
      <Route exact path="/silver" component={Silver}/>
      <Route exact path="/chains" component={Chains}/>
      <Route exact path="/bracelets" component={Bracelets}/>
      <Route exact path="/auth" component={Auth}/>
      <Route exact path="/auth/rings" component={AdminRings}/>
      <Route exact path="/auth/necklace" component={AdminNecklace}/>
      <Route exact path="/auth/stirs" component={AdminStirs}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/goldcost" component={GoldCost}/>
      <Route exact path="/contactus" component={ContactUs}/>
      <Route exact path="/auth/orderstatus" component={OrderStatus}/>
      <Route exact path="/orders" component={UserOrders}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/placeorder" component={PlaceOrder}/>
      <Route exact path="/auth/goldcost" component={AdminGoldRate}/>
      <Route exact path="/auth/silvercost" component={AdminSilverRate}/>
      <Route exact path="/auth/orders" component={Orders}/>
      <Route exact path="/auth/coins" component={AdminCoins}/>
      <Route exact path="/auth/chains" component={AdminChains}/>
      <Route exact path="/auth/bracelets" component={AdminBracelet}/>
      <Route exact path="/auth/silver" component={AdminSilver}/>

      <Route component={NotFound}/>
      </Switch>
      </Container>
      <Footer/>
    </SilverContext.Provider>
    </GoldContext.Provider>
    </AdminContext.Provider>
    </SignInContext.Provider>
  </Router>


    
  )
}
export default App;
