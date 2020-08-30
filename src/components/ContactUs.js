import React from "react";
import TelegramIcon from '@material-ui/icons/Telegram';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Container } from "reactstrap";

export const ContactUs=()=>{
    return(
        <div>
            <TelegramIcon style={{fontSize:"40px",marginBottom:"15px"}}/>
             <h3 style={{marginBottom:"15px"}}>Contact Us</h3>
             <h6 style={{marginBottom:"15px"}}>Telephone:<a href="tel:Mobile_Number">Mobile_Number</a></h6>
             <h6 ><a href = "mailto: Mail">Mail</a></h6>
             <LocationOnIcon style={{fontSize:"40px",marginTop:"40px",marginBottom:"15px"}}/>
             <h3 style={{marginBottom:"15px"}}>Visit Us</h3>
             <h6 style={{marginBottom:"15px"}}>Address</h6>
             <h6 >State,Pincode</h6>
        </div>

    )
}