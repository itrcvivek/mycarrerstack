import { Grid,Box ,Typography} from '@mui/material'
import React from 'react'
import { Link as NavLink} from "react-router-dom";
import footerLogo from '../../assets/img/footerLogo.png'
import FacebookIcon from '../../assets/img/fb.png';
import InstagramIcon from '../../assets/img/instagram.png';
import linkedinIcon from '../../assets/img/linkedin.png';
import Twitter from '../../assets/img/ri_twitter-x-fill.png';
//@ts-ignore
import { Link, animateScroll as scroll  } from 'react-scroll';
export default function Footer() {
  const scrollToSection = (id:any) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // Adjust this value to set the desired offset from the top
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <>
      <Box className="footerBG boxPaddingGrid">
        <Grid container>
          <Grid xs={12} sm={12} md={3} order={{ xs: 3, sm: 3, md:1 }}>
              <Box>
                  <img src={footerLogo} className='imgFooter' />
              </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md:1 }}>
              <Grid container>
                  <Grid xs={4}>
                  <Box>
                <Box sx={{fontSize:{xs:"14px", sm:"14px",md:"16px"}}}>
                  <ul className='footerBoxUl'>
                    <li><Link to="#" onClick={() => scrollToSection("Home")} smooth={true} duration={500}>Home</Link></li>
                    <li><Link to="#" onClick={() => scrollToSection("OurCampaign")} smooth={true} duration={500}>Our Campaign</Link></li>
                    <li><Link to="#" onClick={() => scrollToSection("Impact")} smooth={true} duration={500} >Impact</Link></li>
                  </ul>
                </Box>
            </Box>
                  </Grid>
                  <Grid xs={4}>
                  <Box>
                <Box sx={{fontSize:{xs:"14px", sm:"14px",md:"16px"}}}>
                  <ul className='footerBoxUl'>
                    <li><Link to="#" onClick={() => scrollToSection("Services")} smooth={true} duration={500}>Services</Link></li>
                    <li><Link to="#" onClick={() => scrollToSection("GetInvolved")} smooth={true} duration={500}>Get Involved</Link></li>
                  </ul>
                </Box>
            </Box>
                  </Grid>
                  <Grid xs={4}>
                  <Box>
                <Box sx={{fontSize:{xs:"14px", sm:"14px",md:"16px"}}}>
                  <ul className='footerBoxUl'>
                    <li><Link to="#" onClick={() => scrollToSection("ContactUs")} smooth={true} duration={500}>Contact Us</Link></li>
                    <li><Link to="#">Privacy Policy</Link></li>
                  </ul>
                </Box>
            </Box>
                  </Grid>
              </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={3} order={{ xs: 1, sm: 1, md:1 }}>
          <Box>
                <Box sx={{fontSize:{xs:"14px", sm:"14px",md:"16px"}}}>
                  <ul className='footerUlSocial'>
                  <li><NavLink target='blank' to="https://www.facebook.com/iamnikhilnanda/about"><img src={FacebookIcon} /></NavLink></li>
                    <li><NavLink target='blank' to="https://instagram.com/iamnikhilnanda?igshid=MzRlODBiNWFlZA=="><img src={InstagramIcon} /></NavLink></li>
                    <li><NavLink target='blank' to="https://www.linkedin.com/in/nikhil-nanda-734a643"> <img src={linkedinIcon} /></NavLink></li>
                    <li><NavLink target='blank' to="https://x.com/iamnikhilnanda?s=20"> <img src={Twitter} /></NavLink></li>
                  </ul>
                </Box>
            </Box>
          </Grid>
          
        </Grid>
        <Grid container>
        <Grid xs={12}>
              <Box className='borderBottomColor' sx={{margin:"20px 0"}}>

              </Box>
              <Typography variant='body1' sx={{color:"#7A726C", fontSize:"13px"}}>
              © 2023 SASHAKT YUVA ABHIYAAN. All rights reserved.
              </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
