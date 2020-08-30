import React, { Fragment } from "react";
import {Link, useHistory} from "react-router-dom"
import Cart from "../Cart/Cart";
import {Card} from "react-bootstrap"
import {Button} from "react-bootstrap"
import { Row, Col } from "reactstrap";
import { useMediaQuery } from 'react-responsive'

const MainPage=()=>{
  const history=useHistory();
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
    return(
        <Fragment>
  <div style={{position:"relative",marginLeft:"0px",marginBottom:"5px"}}>
    {isDesktopOrLaptop && <>
  <img src={require("../mainpage.jpg")}  alt="Norway" style={{width:"100%",height:"250px",borderRadius:"10px"}}/>
    </>
     }
     {isTabletOrMobileDevice && <>
  <img src={require("../mainpage.jpg")}  alt="Norway" style={{width:"100%",height:"200px",borderRadius:"10px"}}/>
    </>
     }
  <div class="text-block" style={{position:"absolute",color:"#fff",top: "20px",left: "40px",fontFamily: 'Lobster'}}>
    <div><h5 style={{fontSize:"160%"}}>Order Online With </h5></div>
    <div><h5 style={{fontSize:"160%"}}>Your Shop Name</h5></div>
  </div>
</div>
      <div class="scrolling-wrapper" style={{marginBottom:"10px"}}>
      <div class="card"><div class="card" style={{width:"18rem",cursor:"pointer"}} onClick={()=>history.push('/rings')}>
      <img src={require("../rings.jpg")} style={{height:"170px"}} class="card-img-top" alt="..."/>
      <div class="text-block" style={{position:"absolute",color:"#000",bottom: "20px",left: "20px",fontFamily: 'Lobster'}}>
    <div><h4 style={{fontSize:"160%"}}>Rings</h4></div>
  </div>
      </div>
      </div>
      <div class="card"><div class="card" style={{width:"18rem",cursor:"pointer"}} onClick={()=>history.push('/coins')}>
      <img src={require("../coins.jpg")} style={{height:"170px"}} class="card-img-top" alt="..."/>
      <div class="text-block" style={{position:"absolute",color:"#000",bottom: "20px",left: "20px",fontFamily: 'Lobster'}}>
    <div><h4 style={{fontSize:"160%"}}>Coins</h4></div>
  </div>
      </div>
      </div>
      <div class="card"><div class="card" style={{width:"18rem",cursor:"pointer"}} onClick={()=>history.push('/stirs')}>
      <img src={require("../stirs.jpg")} style={{height:"170px"}} class="card-img-top" alt="..."/>
      <div class="text-block" style={{position:"absolute",color:"#fff",bottom: "20px",left: "20px",fontFamily: 'Lobster'}}>
    <div><h4 style={{fontSize:"160%"}}>Ear Rings</h4></div>
  </div>
      </div>
      </div>
      <div class="card"><div class="card" style={{width:"18rem",cursor:"pointer"}} onClick={()=>history.push('/necklaces')}>
      <img src={require("../necklace.jpg")} style={{height:"170px"}} class="card-img-top" alt="..."/>
      <div class="text-block" style={{position:"absolute",color:"#000",bottom: "20px",left: "20px",fontFamily: 'Lobster'}}>
    <div><h4 style={{fontSize:"160%"}}>Necklace</h4></div>
  </div>
      </div></div>
    </div>
     {isDesktopOrLaptop && <>
      <ul class="list-group list-group-flush" style={{marginBottom:"20px",fontFamily: 'Lobster'}}>
      <Link to="/rings">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../rings.jpg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Rings</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/necklace">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../necklace.jpg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Necklace</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/bracelets">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../bracelet.jpeg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Bracelets</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/coins">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../coins.jpg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Coins</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/chains">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../chains.jpg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Chains</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/stirs">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../stirs.jpg")} style={{height:"130px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Ear Rings</h2>
        </div>
        
      </Col>
      </Row>
      </div>
      </Link>

      <Link to="/silver">
      <div class="card-header" style={{fontSize:"20px"}}>
        <Row>
          <Col >
      <img src={require("../silverring.jpg")} style={{height:"140px",width:"50%"}} class="card-img-top" alt="..."/>
        </Col>
      <Col >
        <div style={{marginTop:"8%",float:"left"}}>
        <h2 style={{color:"#000"}}>Silver Rings & Bracelets</h2>
        </div>
      </Col>
      </Row>
      </div>
      </Link>      
   
      </ul>
      </>
     }
     {
       isTabletOrMobileDevice && <>
        <ul class="list-group list-group-flush" style={{marginBottom:"20px",fontFamily: 'Lobster'}}>
        <Link to="/rings">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../rings.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Rings</h4>
          </div>
          
        </Col>
        </Row>
        </div>
        </Link>
  
        <Link to="/necklace">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../necklace.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Necklace</h4>
          </div>
        </Col>
        </Row>
        </div>
        </Link>

        <Link to="/coins">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../coins.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Coins</h4>
          </div>
        </Col>
        </Row>
        </div>
        </Link>

        <Link to="/bracelets">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../bracelet.jpeg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Bracelets</h4>
          </div>
        </Col>
        </Row>
        </div>
        </Link>

        <Link to="/chains">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../chains.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Chains</h4>
          </div>
        </Col>
        </Row>
        </div>
        </Link>
  
        <Link to="/stirs">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../stirs.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Ear Rings</h4>
          </div>
          
        </Col>
        </Row>
        </div>
        </Link>    

        <Link to="/silver">
        <div class="card-header" style={{fontSize:"20px"}}>
          <Row>
            <Col >
        <img src={require("../silverring.jpg")} style={{height:"70px",width:"80%"}} class="card-img-top" alt="..."/>
          </Col>
        <Col >
          <div style={{marginTop:"14%",float:"left"}}>
          <h4 style={{color:"#000"}}>Silver Rings & Bracelets</h4>
          </div>
        </Col>
        </Row>
        </div>
        </Link>
     
        </ul>
        </>
      }
      <div class="card" style={{width:"100%"}}>
        <Row>
          <Col>
    <img src={require("../sreenu.jpeg")} style={{width:"140px",height:"140px",borderRadius:"50%"}} class="card-img-top" alt="..."/>
          </Col>
          <Col>
          <div class="card-body">
        <h5 class="card-title">Thatavarthi Sreenivasulu</h5>
        <h6><Link to="/auth" style={{color:"#000",textDecoration:"none"}}>Proprietor,Siri Jewellers</Link></h6>
      </div>
          </Col>
        </Row>  
    </div>
    <div class="card" style={{width:"100%"}}>
        <Row>
          <Col>
          <div class="card-body" >
        <h7>Web App Designed by:</h7>
        <h5 class="card-title">Thatavarthi Sreeram</h5>
        <h6><a href="https://github.com/SreeramThatavarthi" style={{color:"#000"}}>Web Developer</a></h6>
      </div>
          </Col>
          <Col>
    <img src={require("../IMG-20190217-WA0031.jpg")} style={{width:"140px",height:"140px",borderRadius:"50%"}} class="card-img-top" alt="..."/>
          </Col>
        </Row>
    </div>
    </Fragment>
    )
}

export default MainPage;