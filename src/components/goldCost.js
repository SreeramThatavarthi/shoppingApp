import React,{useContext} from "react";
import { GoldContext, SilverContext } from "../Context/Context";
import { Container } from "reactstrap";

export const GoldCost=()=>{
    const {goldRate}=useContext(GoldContext);
const {silverCost}=useContext(SilverContext);

    return(
        <>
        <Container style={{textAlign:"center",marginTop:"20px"}}>
            <div><h2 style={{color:"#2475B0"}}>Today Gold Rate:</h2></div>
            <div><h3 >{goldRate}/gram</h3></div>
        </Container>
        <Container style={{textAlign:"center",marginTop:"20px"}}>
            <div><h2 style={{color:"#2475B0"}}>Today Silver Rate:</h2></div>
            <div><h3 >{silverCost}/gram</h3></div>
            <div style={{marginTop:"25px"}}><h6>Note:The Gold and Silver Cost will be changing everyday.Sometimes the gold cost might be changing more than one time per day depending upon the gold market. </h6></div>
        </Container>
        </>
    )
}