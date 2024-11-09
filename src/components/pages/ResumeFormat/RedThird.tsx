import React from 'react'
import { Box, Button, Checkbox, Drawer, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
}
const RedThird: React.FC<ChildProps> = ({ personInfo, phoneNo, email, address, employerDetails, company, skill, hiring, skillArray, name, jobTitle,lastName, linkDin, imagePreview, DisplayHtmlContent, selectedFontFamily,
    education, educationList, experienceList, experience, }) => {

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
            <Box sx={{ background: "#fff" }}>
                <Box>
                    {/* //shapedividers_com-1790 */}
                    <Box className="shapedividers_com-7659" sx={{ width: "100%" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.28 2.17" preserveAspectRatio="none">
                            <path d="M0 .5c3.07.55 9.27-.42 16.14 0 6.88.4 13.75.57 19.14-.11V0H0z" fill="#00000026" />
                            <path d="M0 1c3.17.8 7.29-.38 10.04-.55 2.75-.17 9.25 1.47 12.67 1.3 3-.17 4.65-.84 7.05-.87 2.4-.02 5.52.88 5.52.88V0H0z" opacity=".5" fill="#ee5237d9" />
                            <path d="M0 1.85c2.56-.83 7.68-.30 11.79-.42 4.1-.12 6.86-.61 9.58-.28 2.73.33 5.61 1.17 8.61 1 3-.19 4.73-.82 5.3-.84V.1H0z" opacity=".5" fill="#f3a1c2" />
                        </svg>
                        <Box sx={{ padding: "0 30px", position: "relative", zIndex: "99" }}>
                            <Typography style={{ color: "#000", textTransform: "capitalize", fontFamily: selectedFontFamily }} variant='h5'>{name ? name : "NA"} {lastName}</Typography>
                            <Typography style={{ color: "#000", fontSize: "13px", fontFamily: selectedFontFamily }} variant='body1'>{jobTitle ? jobTitle : "NA"}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", boxSizing: "border-box", flexWrap: "nowrap", borderRadius: "10px", height: "100%" }}>

                        <Box sx={{ width: "65%", background: "#fff", padding: "20px" }}>
                            {DisplayHtmlContent}
                            {
                                experienceList.length > 0 &&
                                <Box className="boxUlEx">
                                    <h4 style={{ margin: "10px 0" }}>{experience}</h4>
                                    <Box sx={{ borderBottom: "1px solid #00000026" }}></Box>
                                    <ul style={{ padding: "0px 10px", listStyleType: "none" }}>
                                        {
                                            experienceList.map((item: any) => (
                                                <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>
                                                    <h4 style={{ margin: "0" }}>{item.title}, &nbsp;{item.company}, &nbsp;{item.location}</h4>
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
                        <Box sx={{ width: "35%", minHeight: "80vh", background: "#fff", padding: "0px" }}>
                            <Box sx={{ margin: "30px 0" }}>
                            {imagePreview ? (
                                <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
                                    <img
                                        src={imagePreview}
                                        alt="User Icon"
                                        className='templateProfileIcon'
                                    />
                                </Box>
                            ) : ""
                            }
                                <Typography style={{ color: "#000", fontSize: "16px", padding: "0px 20px", textTransform: "capitalize", marginTop: "0px", fontFamily: selectedFontFamily }} variant='h6'>{personInfo}</Typography>
                                <ul style={{ listStyleType: "none", padding: "0px 20px" }}>
                                    <li style={{ color: "#000", fontSize: "13px" }}>
                                        <Box sx={{ display: "flex", margin: "10px 0" }}>
                                            <LocalPhoneIcon style={{ fontSize: "13px", background: "#000", color: "#fff", borderRadius: "50%", padding: "3px" }} />&nbsp;{phoneNo ? phoneNo : "NA"}
                                        </Box>
                                    </li>
                                    <li style={{ color: "#000", fontSize: "13px" }}>
                                        <Box sx={{ display: "flex", margin: "10px 0" }}>
                                            <EmailIcon style={{ fontSize: "13px", background: "#000", color: "#fff", borderRadius: "50%", padding: "3px" }} />&nbsp;{email ? email : "NA"}
                                        </Box>
                                    </li>
                                    {
                                    linkDin ? <>
                                        <li style={{ color: "#000", fontSize: "13px", wordBreak: "break-all" }}>
                                            <Box sx={{ display: "flex", margin: "10px 0" }}>
                                                <LinkedInIcon style={{ fontSize: "13px", background: "#000", color: "#fff", borderRadius: "50%", padding: "3px" }} />&nbsp;{linkDin}
                                            </Box>
                                        </li></> : ""
                                }
                                    <li style={{ color: "#000", fontSize: "13px" }}>
                                        <Box sx={{ display: "flex", margin: "10px 0" }}>
                                            <HomeIcon style={{ fontSize: "13px", background: "#000", color: "#fff", borderRadius: "50%", padding: "3px" }} />&nbsp;{address ? address : "NA"}
                                        </Box>
                                    </li>
                                </ul>
                            </Box>
                            <Box sx={{ margin: "30px 0" }}>
                                <Typography style={{ fontSize: "16px", color: "#000", padding: "0px 20px", textTransform: "capitalize", fontFamily: selectedFontFamily }} variant='h6'>{employerDetails}</Typography>
                                <ul style={{ padding: "0px 20px", listStyleType: "none" }}>
                                    <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{company ? company : "NA"}</li>
                                    <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{hiring ? hiring : "NA"}</li>
                                </ul>
                            </Box>
                            <Box sx={{ margin: "30px 0" }}>
                                <Typography style={{ fontSize: "16px", color: "#000", padding: "0px 20px", textTransform: "capitalize", fontFamily: selectedFontFamily }} variant='h6'>{education}</Typography>

                                <ul style={{ padding: "0px 30px", listStyleType: "square" }}>
                                    {
                                        educationList.length > 0 && educationList.map((item: any) => (
                                            <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>
                                                <h4 style={{ margin: "0" }}>{item.degree ? item.degree : "NA"}</h4>
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
                                <Typography style={{ fontSize: "16px", color: "#000", padding: "0px 20px", textTransform: "capitalize", fontFamily: selectedFontFamily }} variant='h6'>{skill}</Typography>
                                <ul style={{ padding: "0px 20px", listStyleType: "none" }}>
                                    {
                                        skillArray.map((item: any) => (
                                            <li style={{ color: "#000", fontSize: "13px", margin: "10px 0" }}>{item.skillName ? item.skillName : "NA"}</li>
                                        ))
                                    }

                                </ul>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RedThird
