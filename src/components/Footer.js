import React from "react";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import { Container } from "reactstrap";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


export const Footer=()=>(
    <Container fluid tag="footer" className="text-center text-white text-uppercase fixed-bottom p-3" style={{backgroundColor:"#4056d2"}}>
            JEWELLERY
            <div><a href={"whatsapp://send?phone=91"+"Mobile_Number"} style={{color:"#fff",marginRight:"11px"}}><WhatsAppIcon style={{textAlign:"center"}} /></a>
            <a href="mailto: mail@gmail.com" style={{color:"#fff",marginRight:"11px"}}><MailIcon style={{textAlign:"center"}} /></a>
            <a href="tel:Mobile_number" style={{color:"#fff",marginRight:"11px"}}><PhoneIcon style={{textAlign:"center"}} /></a></div>
        </Container>
)