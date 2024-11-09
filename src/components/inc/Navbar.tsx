import React, { useEffect, useState } from "react";
import { Box,Button as MuiButton, IconButton, Toolbar,
    ListItem,
    ListItemButton,
    ListItemIcon,
    List,
    ListItemText,
    Divider,

 } from "@mui/material";
 import InboxIcon from '@mui/icons-material/MoveToInbox';
 import MailIcon from '@mui/icons-material/Mail';
import Grid from "@mui/material/Grid";
import MenuIcon from '@mui/icons-material/Menu';
import "./style.css"
import Drawer from '@mui/material/Drawer';
import { NavLink, useLocation } from "react-router-dom";
//@ts-ignore
import { Link, animateScroll as scroll  } from 'react-scroll';
import Logo from "../../assets/img/logo.png"
import Logo2 from "../../assets/img/logo.png"

interface MenuOptionModel {
    label: string,
    link: string,
    type: string,
    onClick?:()=>void;
  }
  const drawerWidth = 240;
function Navbar() {
  const [activeLink, setActiveLink] = useState('Home');
  const history = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation();
    const scrollToSection = (id:any) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 90; // Adjust this value to set the desired offset from the top
        const elementPosition = element.offsetTop - offset;
  
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        setMobileOpen(false)
        setActiveLink(id);
      }
    };
    const menuOptions:MenuOptionModel[] = [
        {
          label: "Home",
          link: "Home",
          type: "text",
        },
        {
          label: "Our Campaign",
          link: "OurCampaign",
          type: "text",
        },
        {
          label: "Services",
          link: "Services",
          type: "text",
        },
        {
          label: "Get Involved",
          link: "GetInvolved",
          type: "text",
        },
        {
          label: "Advisory Board",
          link: "AdvisoryBoard",
          type: "text",
        },
        {
          label: "Contact Us",
          link: "ContactUs",
          type: "text",
        },
        
      ];
      
      const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };
      const currentPath = location.pathname;
  return (
    <Box className="home_container">
        <Box
          sx={{ flexGrow: 1 }}
          className="web_Navbar_grid"
        >
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <Grid
              item
              xs={11}
              sm={11}
              md={11}
              lg={5}
              className="web_grid_prop logo_grid"
            >
              <Link to="/" className="logoHead">
                <img src={Logo} style={{width:"52px"}} />
              </Link>
            </Grid>
            <Grid 
            item
            sm={1}
            xs={1}
            md={1}
            lg={6}
            className="toggleBtn"
            display={{ xs: "flex", sm: "flex", md:"flex", lg: "none" }}
            >
                <Box>
                <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="navBarMin"
            sx={{ mr: {xs:"0",sm:"0", md:"2"}, display: { sm: 'flex' }, color:"#f68b33" }}
          >
            <MenuIcon />
          </IconButton>
                </Box>
            </Grid>
            <Grid
              item
              sm={1}
              xs={1}
              md={6}
              display={{ xs: "none", sm: "none", md: "none", lg:"flex" }}
              className="web_grid_prop options_grid"
            >
             {menuOptions.map((option:any, i) => {
                return (
                    <Link to="#" onClick={() => scrollToSection(option.link)} smooth={true} duration={500} className="nav_link">
          <h4
            className={
              activeLink === option.link ? 'nav_text active' : 'nav_text'
              // location.pathname === option.link ? "nav_text active" : "nav_text"
            }
          >
            {option.label}
          </h4>
        </Link>
                    
                );
              })}
            </Grid>
          </Grid>
        </Box>
         <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md:"block", lg:'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background:"#0e0c15" },
            
          }}
        >
           <div>
        <div style={{backgroundColor:"#0E0C15", padding:"4px"}}>
        <Link to="/" style={{padding:"10px"}}>
                <img src={Logo2} />
              </Link>
        </div>
       
      <Divider style={{border:"1px solid rgb(172 167 167 / 7%)"}} />
      <Box sx={{padding:"10px"}}>
      {menuOptions.map((option:any, i) => {
                return (
                    <Link to="#" onClick={() => scrollToSection(option.link)} smooth={true} duration={500} className="nav_link">
          <h4
            className={
              activeLink === option.link ? 'nav_text active' : 'nav_text'
              // location.pathname === option.link ? "nav_text active" : "nav_text"
            }
          >
            {option.label}
          </h4>
        </Link>
                )
          }
      )}
      </Box>
      <Divider style={{border:"1px solid rgb(172 167 167 / 7%)"}} />
    </div>
        </Drawer>
      </Box>
  )
}


export default Navbar
