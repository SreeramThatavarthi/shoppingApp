import React,{useState, useContext,useEffect} from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import {toast} from "react-toastify";
import { AdminContext } from "../Context/Context";
import {Auth} from "./Auth";
import {GoldContext} from "../Context/Context"




export const AdminGoldRate=()=>{
const {goldRate}=useContext(GoldContext)
    const [cost,setCost]=useState();
    const {admin}=useContext(AdminContext);
    const changeGoldRate=(e)=>{
        e.preventDefault()
        firebase.database()
            .ref('/goldrate')
            .update(
                {
                    value:cost
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast("Gold Rate Updated Successfully",{type:"info"})
              })
              .catch(err=>{
                console.log(err);
              })
    }



    const changeCosts=async ()=>{
        const ringsref=await firebase.database().ref('/rings');
        var rin=null;
        setTimeout(function(){ringsref.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
            if(value.kdm==true)
              {
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc)
              }
              else{
                var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(g)+parseFloat(value.mc);
              }
               console.log(cost);
              firebase.database().ref(`/rings/${key}`)
              .update({cost})
            })
        }},3000)


        const necklaceRef=await firebase.database().ref('/necklace');
        var rin=null;
        setTimeout(function(){necklaceRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
            if(value.kdm==true)
              {
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc)
              }
              else{
                var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(g)+parseFloat(value.mc);
              }
               console.log(cost);
              firebase.database().ref(`/necklace/${key}`)
              .update({cost})
            })
        }},3000)
        const stirsRef=await firebase.database().ref('/stirs');
        var rin=null;
        setTimeout(function(){stirsRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
            if(value.kdm==true)
              {
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc)
              }
              else{
                var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(g)+parseFloat(value.mc);
              }
               console.log(cost);
              firebase.database().ref(`/stirs/${key}`)
              .update({cost})
            })
        }},3000)

        const braceletRef=await firebase.database().ref('/bracelets');
        var rin=null;
        setTimeout(function(){braceletRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
            if(value.kdm==true)
              {
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc)
              }
              else{
                var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(g)+parseFloat(value.mc);
              }
               console.log(cost);
              firebase.database().ref(`/bracelets/${key}`)
              .update({cost})
            })
        }},3000)
        
        const chainsRef=await firebase.database().ref('/chains');
        var rin=null;
        setTimeout(function(){chainsRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
            if(value.kdm==true)
              {
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc)
              }
              else{
                var g=parseFloat(goldRate)-parseFloat(goldRate)*(0.1);
              var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(g)+parseFloat(value.mc);
              }
               console.log(cost);
              firebase.database().ref(`/chains/${key}`)
              .update({cost})
            })
        }},3000)

        const coinsRef=await firebase.database().ref('/coins');
        var rin=null;
        setTimeout(function(){coinsRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(goldRate);
        var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(goldRate)+parseFloat(value.mc);
               console.log(cost);
              firebase.database().ref(`/coins/${key}`)
              .update({cost})
            })
        }},3000)

      }

   useEffect(()=>{changeCosts();},[goldRate]);

    return(
        <div>
        {
        admin==true?( <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Add Todays Gold Cost Per Gram</label>
            <input type="number" value={cost} onChange={e=>{setCost(e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Gold Cost"/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={e=>changeGoldRate(e)}>Submit</button>
     </form>):(<Redirect to="/auth"/>)
        }
        </div>
    )
}