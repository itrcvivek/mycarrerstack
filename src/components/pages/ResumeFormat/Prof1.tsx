import React from 'react'
import { Box, Button, Checkbox, Drawer, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

interface ChildProps {
    personInfo: string;
    phoneNo: string;
    email: string;
    address: string;
    employerDetails: string;
    company: string;
    skill: any;
    hiring: string;
    skillArray: any;
    name: string;
    jobTitle: string;
    DisplayHtmlContent: any;
    selectedFontFamily: any;
    education: any;
    educationList: any;
    experienceList: any;
    experience: any;
    linkDin: any;
    imagePreview: any;
    lastName: any;
    career:any;
}
const Prof1: React.FC<ChildProps> = ({ personInfo, phoneNo, email, address, employerDetails, company, education, educationList, skill, hiring, skillArray, name, jobTitle, lastName, linkDin, imagePreview, experienceList, experience, career,
    DisplayHtmlContent, selectedFontFamily }) => {

    const DisplayHtmlContentExp = (item: any) => {
        const contentState: any = item.getCurrentContent();
        const rawContentState: any = convertToRaw(contentState);
        const htmlContent: any = draftToHtml(rawContentState);

        return (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );

    };
    return (
        <>
            <Box sx={{minHeight: "100vh",}}>
            <Box sx={{ display: "flex",}}>
                   <Box sx={{ width: "60%", background: "#ffffff", padding: "30px",}}>
                   <Typography style={{ color: "rgb(0 0 0 / 65%)", fontSize:"43px", fontWeight:"bold", textTransform: "capitalize", fontFamily: selectedFontFamily }} variant='h5'>{name ? name : "NA"} {lastName}</Typography>
                        <Typography style={{ color: "#000", fontSize: "13px", fontFamily: selectedFontFamily }} variant='body1'>{jobTitle ? jobTitle : "NA"}</Typography>

                    </Box>
                    <Box sx={{ width: "40%", background: "#ffffff", padding: "0px",}}>
                    <ul style={{ listStyleType: "none", padding: "0px 20px" }}>
                                <li style={{ color: "#000", fontSize: "13px" }}>
                                    <Box sx={{ display: "flex", margin: "10px 0" }}>
                                        <LocalPhoneIcon style={{ fontSize: "13px", background: "#fff", color: "#000", borderRadius: "50%", padding: "3px" }} />&nbsp;{phoneNo ? phoneNo : "NA"}
                                    </Box>
                                </li>
                                <li style={{ color: "#000", fontSize: "13px" }}>
                                    <Box sx={{ display: "flex", margin: "10px 0" }}>
                                        <EmailIcon style={{ fontSize: "13px", background: "#fff", color: "#000", borderRadius: "50%", padding: "3px" }} />&nbsp;{email ? email : "NA"}
                                    </Box>
                                </li>
                                {
                                    linkDin ? <>
                                        <li style={{ color: "#000", fontSize: "13px", wordBreak: "break-all" }}>
                                            <Box sx={{ display: "flex", margin: "10px 0" }}>
                                                <LinkedInIcon style={{ fontSize: "13px", background: "#fff", color: "#000", borderRadius: "50%", padding: "3px" }} />&nbsp;{linkDin}
                                            </Box>
                                        </li></> : ""
                                }

                                <li style={{ color: "#000", fontSize: "13px" }}>
                                    <Box sx={{ display: "flex", margin: "10px 0" }}>
                                        <HomeIcon style={{ fontSize: "13px", background: "#fff", color: "#000", borderRadius: "50%", padding: "3px" }} />&nbsp;{address ? address : "NA"}
                                    </Box>
                                </li>
                            </ul>
                    </Box>
                   </Box>
                <Box sx={{ display: "flex", boxSizing: "border-box", flexWrap: "nowrap", borderRadius: "10px", }}>
                   
                    <Box className="sidenav" sx={{ width: "35%", minHeight: "85vh", background: "#ffffff", padding: "0px", borderRight:"2px #0000001f solid" }}>
                        

                            {imagePreview ? (
                                <Box sx={{ marginBottom: "30px" }}>
                                <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
                                    <img
                                        src={imagePreview}
                                        alt="User Icon"
                                        className='templateProfileIcon'
                                    />
                                </Box>
                                </Box>
                            ) : ""
                            }

                            
                           
                        
                        
                        <Box sx={{ marginBottom: "30px" }}>
                            <Typography style={{ fontSize: "16px", color: "rgb(0 0 0 / 65%)", padding: "0px 20px", textTransform: "capitalize", fontWeight:"700", fontFamily: selectedFontFamily }} variant='h6'>{education}</Typography>
                            <Box sx={{ borderBottom: "1px solid #ffffff4d" }}></Box>
                            <ul style={{ padding: "0px 30px", listStyleType: "square" }}>
                                {
                                    educationList.length > 0 && educationList.map((item: any) => (
                                        <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>
                                            <h4 style={{ margin: "0",color:"rgb(0 0 0 / 65%)" }}>{item.degree ? item.degree : "NA"}</h4>
                                            <Box className="borderLeft">
                                                <p style={{ margin: "0" }}>{item.school ? item.school : "NA"}</p>
                                                <p style={{ margin: "0" }}>
                                                    {`${item.startDate} ${item.startTime} - ${item.persent ? 'Persent' : `${item.endDate} ${item.endTime}`}`}
                                                </p>
                                            </Box>
                                        </li>
                                    ))
                                }

                            </ul>
                        </Box>
                        <Box sx={{ margin: "30px 0" }}>
                            <Typography style={{ fontSize: "16px", color: "rgb(0 0 0 / 65%)", padding: "0px 20px", textTransform: "capitalize", fontWeight:"700", fontFamily: selectedFontFamily }} variant='h6'>{employerDetails}</Typography>
                            <Box sx={{ borderBottom: "1px solid #ffffff4d" }}></Box>
                            <ul style={{ padding: "0px 20px", listStyleType: "none" }}>
                                <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{company ? company : "NA"}</li>
                                <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{hiring ? hiring : "NA"}</li>
                            </ul>
                        </Box>
                        <Box sx={{ margin: "30px 0" }}>
                            <Typography style={{ fontSize: "16px", color: "rgb(0 0 0 / 65%)", padding: "0px 20px", textTransform: "capitalize",fontWeight:"700", fontFamily: selectedFontFamily }} variant='h6'>{skill}</Typography>
                            <Box sx={{ borderBottom: "1px solid #ffffff4d" }}></Box>
                            <ul style={{ padding: "0px 20px", listStyleType: "none" }}>
                                {
                                    skillArray.map((item: any) => (
                                        <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{item.skillName ? item.skillName : "NA"}</li>
                                    ))
                                }

                            </ul>
                        </Box>
                    </Box>
                    <Box sx={{ width: "65%", background: "#fff", padding: "0 20px", }}>
                                <h4 style={{ margin: "0px 0", color:"rgb(0 0 0 / 65%)", fontWeight:"600" }}>{career}</h4>
                        {DisplayHtmlContent}

                        {
                            experienceList.length > 0 &&
                            <Box className="boxUlEx">
                                <h4 style={{ margin: "10px 0", color:"rgb(0 0 0 / 65%)", fontWeight:"600" }}>{experience}</h4>
                                {/* <Box sx={{ borderBottom: "1px solid #00000026" }}></Box> */}
                                <ul style={{ padding: "0px 10px", listStyleType: "none" }}>
                                    {
                                        experienceList.map((item: any) => (
                                            <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>
                                                <h4 style={{ margin: "0",color:"rgb(0 0 0 / 65%)", }}>{item.title}, &nbsp;{item.company}, &nbsp;{item.location}</h4>
                                                <Box className="borderLeft">
                                                    <p style={{ margin: "0", fontSize: "11px", color: "#000000b8" }}>
                                                        {`${item.startDate} ${item.startTime} - ${item.persent ? 'Persent' : `${item.endDate} ${item.endTime}`}`}
                                                    </p>
                                                    <Box>
                                                        {item.editorState ? DisplayHtmlContentExp(EditorState.createWithContent(convertFromRaw(JSON.parse(item.editorState)))) : ""}
                                                    </Box>
                                                </Box>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Prof1
