import React,{useState, useContext} from "react";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"
import {AdminContext} from "../Context/Context"
import firebase from "firebase/app"
import {toast} from "react-toastify"

const Auth=()=>{
    const {admin,setAdmin}=useContext(AdminContext);
    const [password,setPassword]=useState("")
    const [newpassword,setnewPassword]=useState("")
    const [defpassword,setdefPassword]=useState("")
    const [prev,setPrev]=useState("")
    const [user,setUser]=useState("")
    const getPassword=async ()=>{
        const passwordRef=await firebase.database().ref('/password');

        passwordRef.on('value',(snapshot)=>{
            setdefPassword(snapshot.val().value)
        })
    }
    getPassword()
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(11)
        console.log(password)
        if(password==defpassword && user=="user"){
        console.log(111)
            setPassword("");
            setUser("")
            setAdmin(true) 
        }
        else{
          toast("User Name or Password is not Correct",{type:"error"});
        }
    }
    const handleLogout=()=>{
        setAdmin(false);
    }
    const changePassword=(e)=>{
        e.preventDefault()
        if(prev==defpassword){
            firebase.database()
            .ref('/password')
            .update(
                {
                    value:newpassword
                },
                err=>{
                console.log(err);
              }
              )
              .then(()=>{
                toast("password updated",{type:"info"})
              })
              .catch(err=>{
                console.log(err);
              })
        }
    }
    
    return(
        <div>
       {
        admin==true ?(<button type="button" class="btn btn-warning" onClick={handleLogout}>Log Out</button>):(<div><form>
            <div class="form-group">
                <label for="username">User Name</label>
                <input type="text"  value={user} onChange={e=>setUser(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} class="form-control" id="exampleInputPassword1"/>
            </div>
            <h7>Note: Default User Name is user</h7>
            <h7>Note: Default Password is 123456</h7>
            <button type="submit" class="btn btn-primary" onClick={e=>handleSubmit(e)}>Submit</button>
            </form></div>)

       }
        {
            
           admin==true ?(
            <div>
           <ul class="list-group list-group-flush">
           <Link to="/auth/orderstatus">
           <div class="card-header">
             Accept Orders ?
           </div>
           </Link>
           <Link to="/auth/orders">
           <div class="card-header">
             Orders
           </div>
           </Link>
           <Link to="/auth/goldcost">
           <div class="card-header">
             Change Gold Rate
           </div>
           </Link>
           <Link to="/auth/silvercost">
           <div class="card-header">
             Change Silver Rate
           </div>
           </Link>
           <Link to="/auth/rings">
           <div class="card-header">
             Rings
           </div>
           </Link>
           <Link to="/auth/necklace">
           <div class="card-header">
             Necklace
           </div>
           </Link>
           <Link to="/auth/coins">
           <div class="card-header">
             Coins
           </div>
           </Link>
           <Link to="/auth/chains">
           <div class="card-header">
             Chains
           </div>
           </Link>
           <Link to="/auth/bracelets">
           <div class="card-header">
             Bracelets
           </div>
           </Link>
           <Link to="/auth/stirs">
           <div class="card-header">
             Stirs
           </div>
           </Link>
           <Link to="/auth/silver">
           <div class="card-header">
             Silver
           </div>
           </Link> 
           </ul>
           <form>
               <div>Change Password</div>
            <div class="form-group">
                <label for="prevv password">Prev Password</label>
                <input type="text" value={prev} onChange={e=>setPrev(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" value={newpassword} onChange={e=>setnewPassword(e.target.value)} class="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={e=>changePassword(e)}>Submit</button>
            </form>
            </div>):(<div></div>)
        }
     </div>
    )
}

export default Auth;