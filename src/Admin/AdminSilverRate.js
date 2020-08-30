import React,{useState, useContext,useEffect} from "react";
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import {toast} from "react-toastify";
import { AdminContext, SilverContext } from "../Context/Context";

export const AdminSilverRate=()=>{
const {silverCost}=useContext(SilverContext)
    const [cost,setCost]=useState();
    const {admin}=useContext(AdminContext);
    const changeSilverRate=(e)=>{
        e.preventDefault()
        firebase.database()
            .ref('/silverrate')
            .update(
                {
                    value:cost
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast("Silver Rate Updated Successfully",{type:"info"})
              })
              .catch(err=>{
                console.log(err);
              })
    }

    const changeCosts=async ()=>{
        const silverRef=await firebase.database().ref('/silver');
        var rin=null;
        setTimeout(function(){silverRef.on('value',(snapshot)=>{
            console.log(snapshot.val());
            rin=snapshot.val();
          })},3000);
        console.log(rin);
        console.log(!1111);
        setTimeout(function(){if(rin!=null&&rin!=undefined&&rin){
          Object.entries(rin).map(([key,value])=> {
              console.log({key});
            console.log(parseFloat(value.weight));
            console.log(silverCost);
        var cost=(parseFloat(value.weight) +  parseFloat(value.wastage))*parseFloat(silverCost)+parseFloat(value.mc);
               console.log(cost);
              firebase.database().ref(`/silver/${key}`)
              .update({cost})
            })
        }},3000)
    }
   useEffect(()=>{changeCosts();},[silverCost]);

    return(
        <div>
        {
        admin==true?( <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Add Todays Silver Cost Per Gram</label>
            <input type="number" value={cost} onChange={e=>{setCost(e.target.value)}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Silver Cost"/>
        </div>
        <button type="submit" class="btn btn-primary" onClick={e=>changeSilverRate(e)}>Submit</button>
     </form>):(<Redirect to="/auth"/>)
        }
        </div>
    )
}