import React,{useContext,useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import "react-alert-confirm/dist/index.css";
import confirm, { Button as btn, alert } from "react-alert-confirm";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import {Button} from "react-bootstrap"
import { Redirect, Link } from 'react-router-dom';
import {SignInContext} from "../Context/Context"
import { toast } from 'react-toastify';
import firebase from "firebase/app";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Search } from './Search';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({handleShow}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {signinuser,setSigninuser}=useContext(SignInContext);
  const [user,setUser]=useState("");
  const getUser=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      setUser(user);
    }
  )}
  const id=()=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log(user);
          setSigninuser(user.email);
      } else {
        // No user is signed in.
      }
    });
  }
  const handleClickConfirm = () => {
    confirm({
      title: "Sign Out",
      content: "Are you surely want to sign out!",
      lang: "en",
      onOk: () => {
        {
          getUser();
          console.log(user)
          if (user!=null) {
            firebase.auth().signOut().then(function() {
              setSigninuser("")
            })
            .then(()=>{
              return toast("You have Signed Out Successfully",{type:"success"});
            })
            .catch(function(error) {
              return toast("Signed Out failed",{type:"error"});
            });
          } 
          else {
            return toast("You have not signedin to signout",{type:"info"});
          }
        }
      },
      onCancel: () => {
        console.log("cancel");
      }
    });
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(id,[]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Jewellery Shop
          </Typography>
          {/* <Search/> */}
          <Button onClick={handleShow} style={{backgroundColor:"#fff",position: 'absolute', right:20}}> 
              <img src={require('../icon-12.png')} style={{height:"25px",width:"25px",backgroundColor:"#fff"}}/>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {signinuser}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

        <Link to="/" onClick={handleDrawerClose} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} >
       <ListItem button >
         <HomeIcon style={{marginRight:"14px"}}/>
          Home
          </ListItem>
       </Link>
        
        <Link to="/orders" onClick={handleDrawerClose} style={{color:"#000",textDecoration:"none",fontSize:"17px"}} >
        <ListItem button>
          <ListAltIcon style={{marginRight:"14px"}}/>
         My Orders
         </ListItem>
       </Link>
        
        
        <Link to="/signin" onClick={handleDrawerClose} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} >
        <ListItem button >
          <AccountCircleIcon style={{marginRight:"14px"}}/>
         Sign In
         </ListItem>
       </Link>
       
       
       <Link  onClick={()=>{handleClickConfirm();
        handleDrawerClose();}} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} >
       <ListItem button >
       <ExitToAppIcon style={{marginRight:"14px"}}/>
         Sign Out
         </ListItem>
       </Link>
        
        
        <Link to="/goldcost" onClick={handleDrawerClose} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} >
        <ListItem button>
          <RateReviewIcon style={{marginRight:"14px"}}/>
         Todays Gold Rate
         </ListItem>
       </Link>
       <Link to="/contactus" onClick={handleDrawerClose} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} >
       <ListItem button >
         <ContactSupportIcon style={{marginRight:"14px"}}/>
          Contact Us
          </ListItem>
       </Link>
       <Link to="/auth" onClick={handleDrawerClose} style={{fontSize:"17px",color:"#000",textDecoration:"none"}} > 
       <ListItem button >
         <ContactSupportIcon style={{marginRight:"14px"}}/>
          Admin
          </ListItem>
       </Link>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            
          ))} */}
        </List>
       
      </Drawer>
    </div>
  );
}
