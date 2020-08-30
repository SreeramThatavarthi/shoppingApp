import React from "react";
import {Row,Col} from "reactstrap";
const CartBody=({item,removefromcart})=>{
    return(
        <div class="card" style={{width:"100%"}}>
              <Row style={{padding:"2px"}}>
                  <Col className="md-7">
                  <img src={item.image} style={{width:"120px",height:"120px"}} class="card-img-top" alt="..."/>
                  </Col>
                  <Col className="md-5">
                  <div class="card-body" style={{marginTop:"4px"}} >
    <div><h6>Weight:{item.weight} {"g"}</h6></div>
                    <div><h6>Cost:{"₹"} {item.cost}</h6></div>
                    <button type="button" onClick={()=>removefromcart(item)} class="btn btn-success" style={{fontSize:"10px",marginTop:"4px"}}>Remove</button>
                  </div>
                  </Col>
              </Row>
          </div>    
    )
}

export default CartBody;