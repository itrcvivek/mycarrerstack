import { Box, Button, Checkbox, Drawer, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf';
import { storage } from '../../Firebase';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import html2canvas from 'html2canvas';
//@ts-ignore
import html2pdf from 'html2pdf.js';
import CloseIcon from '@mui/icons-material/Close';
import "./style.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import first from "../../assets/blue.png"
import red from "../../assets/red.png"
import orange from "../../assets/orange.png"
import green from "../../assets/green.png"
import shape1 from "../../assets/shap1.png"
import prof1 from "../../assets/prof1.png"
import user from "../../assets/img/icon/user.webp"
import { auth } from "../../Firebase";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import ReactToPrint from 'react-to-print';
import Blue from './ResumeFormat/Blue';
import Yellow from './ResumeFormat/Yellow';
import Red from './ResumeFormat/Red';
import Green from './ResumeFormat/Green';
import RedSec from './ResumeFormat/RedSec';
import RedThird from './ResumeFormat/RedThird';
import EducationForm from '../inc/EducationForm';
import ExperienceForm from '../inc/ExperienceForm';
import Prof1 from './ResumeFormat/Prof1';

import { loadStripe } from '@stripe/stripe-js';
import { ref, uploadBytes } from 'firebase/storage';
import PayPage from './PayPage';
const fontFamilies = ['Arial', 'Verdana', 'Times New Roman', 'Georgia', 'Courier New', 'Arial Black'];
const Resume = () => {
    const componentRef: any = useRef();
    const navigate = useNavigate();
    const [personInfo, setPersonInfo] = useState("Personal Info");
    const [personInfoC, setPersonInfoC] = useState(false);
    const [jobTitle, setJobTitle] = useState("");
    const [linkDin, setLinkDin] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [progress, setProgress] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [progress4, setProgress4] = useState(0);
    const [progress5, setProgress5] = useState(0);
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [employerDetails, setEmployerDetails] = useState("Employer Details");
    const [employerDetailsC, setEmployerDetailsC] = useState(false);
    const [company, setCompany] = useState("");
    const [hiring, setHiring] = useState("");
    const [skill, setSkill] = useState("Skill");
    const [education, setEducation] = useState("Education");
    const [career, setCareer] = useState("Career Objective");
    const [careerC, setCareerC] = useState(false);
    const [downloadPdf, setDownloadPdf] = useState(false);
    const [educationC, setEducationC] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [experience, setExperience] = useState("Experience");
    const [experienceC, setExperienceC] = useState(false);
    const [showFormEx, setShowFormEx] = useState(false);
    const [experienceList, setExperienceList] = useState([]);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [skillC, setSkillC] = useState(false);
    const [skillName, setSkillName] = useState('');
    const [skillArray, setSkillArray] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState(1);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedFontFamily, setSelectedFontFamily] = React.useState('');
    const [expanded, setExpanded] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            convertFromRaw({
                entityMap: {},
                blocks: [
                    {
                        key: 'foo',
                        text: 'Dear [Arvind kumar], I am writing to apply for the Web Developer position at [okoders.com]. With nearly two years of experience in the development industry, I am confident that I am the perfect fit for this position.',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
            })
        )
    );
    //@ts-ignore
    const profileDetails: any = JSON.parse(localStorage.getItem('profile'))
    const stripePromise =
        loadStripe('pk_test_51OVtVNSFkd4dZdFAvFhXd8i1TxFNabaK53eD3Fh2qpWgpV5MBdsTOot0voTKCDHFFGT9ItLqCOPiC1cpJzOXpbbb00ezxYkoBL');

    const handlePayment = () => {

        navigate('/paypage')

    };
    const handleImageChange = (e: any) => {
        const file: any = e.target.files[0];
        if (file) {

            const reader: any = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        // Trigger the file input when the user clicks the default user icon.
        //@ts-ignore
        const sss: any = document.getElementById('fileInput').click();
    };
    const handleDeleteClick = () => {
        // Clear the image preview
        setImagePreview(null);
    };
    const handleExpandIconClick = (panel: any) => (event: any) => {
        event.stopPropagation(); // Prevent propagation to the AccordionSummary
        setExpanded(expanded === panel ? null : panel);
    };
    const handleLogout = () => {
        auth.signOut().then(() => {
            // Handle successful logout
            console.log('User logged out successfully.');
            navigate("/");
            // You can redirect the user to a login page or update the UI accordingly
        }).catch((error) => {
            // Handle errors during logout
            console.error('Error logging out:', error.message);
        });
        localStorage.clear()
    };
    const personInfoCllick = () => {
        setPersonInfoC(true)
    }
    const inputTitle = (e: any) => {
        setPersonInfo(e.target.value)
    }
    const personInfoCSave = () => {
        setPersonInfoC(false)
    }

    const EmployerDetailsClick = () => {
        setEmployerDetailsC(true)
    }
    const inputEmployerDetails = (e: any) => {
        setEmployerDetails(e.target.value)
    }
    const employerDetailsSave = () => {
        setEmployerDetailsC(false)
    }

    const SkillClick = () => {
        setSkillC(true)
    }
    const inputSkill = (e: any) => {
        setSkill(e.target.value)
    }
    const inputEducation = (e: any) => {
        setEducation(e.target.value)
    }
    const EducationClick = () => {
        setEducationC(true)
    }
    const inputCareer = (e: any) => {
        setCareer(e.target.value)
    }
    const CareerClick = () => {
        setCareerC(true)
    }
    const careerSave = () => {
        setCareerC(false)
    }
    const educationSave = () => {
        setEducationC(false)
    }

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };

    const handleAddEducation = (education: any) => {
        //@ts-ignore
        setEducationList([...educationList, education]);
        setShowForm(!showForm);
    };

    const handleDeleteEducation = (index: any) => {
        const updatedEducationList: any = educationList.filter((_, i) => i !== index);
        setEducationList(updatedEducationList);
    };

    const handleAddExperience = (experience: any) => {
        console.log(experience)
        //@ts-ignore
        setExperienceList([...experienceList, experience]);
        setShowFormEx(!showFormEx);
    };
    const handleDeleteExperience = (index: any) => {
        const updatedExList: any = experienceList.filter((_, i) => i !== index);
        setExperienceList(updatedExList);
    };

    const inputExperience = (e: any) => {
        setExperience(e.target.value)
    }
    const ExperienceClick = () => {
        setExperienceC(true)
    }
    const experienceSave = () => {
        setExperienceC(false)
    }

    const handleToggleFormEx = () => {
        setShowFormEx(!showFormEx);
    };
    const skillSave = () => {
        setSkillC(false)
    }
    const inputJobTitle = (e: any) => {
        setJobTitle(e.target.value)
    }
    const inputlinkDin = (e: any) => {
        setLinkDin(e.target.value)
    }
    const inputFirstName = (e: any) => {
        setName(e.target.value)
    }
    const inputLastName = (e: any) => {
        setLastName(e.target.value)
    }
    const inputEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const inputPhoneNo = (e: any) => {
        setPhoneNo(e.target.value)
    }
    const inputAddress = (e: any) => {
        setAddress(e.target.value)
    }
    const inputCompany = (e: any) => {
        setCompany(e.target.value)
    }
    const inputHiring = (e: any) => {
        setHiring(e.target.value)
    }

    const handleSkillChange = (event: any) => {
        setSkillName(event.target.value);
    };
    const handleFontFamilyChange = (event: any) => {
        setSelectedFontFamily(event.target.value);
    };
    const handleAddSkill = () => {
        // Make a copy of the current array and add the new name
        //@ts-ignore
        setSkillArray([...skillArray, { skillName }]);
        // Clear the input field after adding the name
        setSkillName('');
    };

    const handleDeleteSkill = (index: any) => {
        const updatedSkills = skillArray.filter((item, i) => i !== index);
        setSkillArray(updatedSkills);
    };

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
    };
    const DisplayHtmlContent = (editorState: any) => {
        console.log(editorState)
        const contentState: any = editorState.getCurrentContent();
        console.log(contentState)
        const rawContentState: any = convertToRaw(contentState);
        const htmlContent: any = draftToHtml(rawContentState);

        return (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
    };

    const toggleDrawer = (open: any) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    const generatePdfsss = () => {
        const divToPrint: any = document.getElementById('contentToConvert');
        const a4Width = 595.28; // 8.27 inches in points
        const a4Height = 841.89; // 11.69 inches in points
        const pdf = new jsPDF('p', 'pt', [a4Width, a4Height]);

        // Set initial page height
        const pageHeight = divToPrint.scrollHeight;

        // Calculate the maximum allowed height in points (PDF height)
        const maxHeightPoints = a4Height;

        // Calculate the scale factor to fit the content within the maximum height
        const scaleFactor = maxHeightPoints / pageHeight;

        html2canvas(divToPrint, {
            width: divToPrint.offsetWidth,
            height: pageHeight * scaleFactor, // Limit the height to fit within the PDF
            backgroundColor: 'white', // Set the desired background color
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');

            // Add a page with the image of the content
            pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height);

            // Save the PDF
            pdf.save('generated.pdf');
        });
    };
    const clearAll = () => {
        setName(""); setLastName(""); setEmail(""); setPhoneNo(""); setJobTitle(""); setLinkDin(""); setImagePreview(null); setCompany("");
        setHiring(""); setEducationList([]); setExperienceList([]); setPersonInfo("Personal Info"); setEmployerDetails("Employer Details"); setEducation("Education");
        setSkill("Skill"); setSkillArray([]); setAddress("");
        setEditorState(EditorState.createWithContent(
            convertFromRaw({
                entityMap: {},
                blocks: [
                    {
                        key: 'foo',
                        text: 'Dear [Arvind kumar], I am writing to apply for the Web Developer position at [okoders.com]. With nearly two years of experience in the development industry, I am confident that I am the perfect fit for this position.',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
            })
        ))
    }
    const saveAll = () => {
        setDownloadPdf(true)
        const stateToSave = {
            name, lastName, linkDin, imagePreview, email, phoneNo, jobTitle, address, company, hiring, educationList,
            personInfo, employerDetails, education, skill, skillArray, experienceList,
            editorState: editorState ? JSON.stringify(convertToRaw(editorState.getCurrentContent())) : null
            ,
            // ... Include other states here
        };

        // Convert the state object to JSON
        const serializedState = JSON.stringify(stateToSave);

        // Store the serialized state in localStorage
        localStorage.setItem('savedState', serializedState);
    }
    useEffect(() => {
        const savedState = localStorage.getItem('savedState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setName(parsedState?.name);
            setEmail(parsedState?.email);
            setPhoneNo(parsedState?.phoneNo)
            setAddress(parsedState?.address)
            setCompany(parsedState?.company)
            setJobTitle(parsedState?.jobTitle)
            setLastName(parsedState?.lastName);
            setLinkDin(parsedState?.linkDin)
            setImagePreview(parsedState?.imagePreview)
            setHiring(parsedState?.hiring)
            setEducationList(parsedState?.educationList)
            setExperienceList(parsedState?.experienceList)
            setSkillArray(parsedState?.skillArray)
            setEditorState(
                parsedState?.editorState
                    ? EditorState.createWithContent(convertFromRaw(JSON.parse(parsedState.editorState)))
                    : EditorState.createEmpty()
            );

            //   setAddress(parsedState?.address)
            // ... Set other states based on the parsed state
        }
    }, []);
    useEffect(() => {
        if (jobTitle != "" && linkDin != "" && email != "" && name != "") {
            setProgress(20)
        } else {
            setProgress(0)
        }
    }, [jobTitle, linkDin, email, name])
    useEffect(() => {
        if (company != "" && hiring != "") {
            setProgress1(20)
        } else {
            setProgress1(0)
        }
    }, [company, hiring])
    useEffect(() => {
        if (educationList.length > 0) {
            setProgress2(20)
        } else {
            setProgress2(0)
        }
    }, [educationList])

    useEffect(() => {
        if (skillArray.length > 0) {
            setProgress3(20)
        } else {
            setProgress3(0)
        }
    }, [skillArray])
    useEffect(() => {
        if (experienceList.length > 0) {
            setProgress4(20)
        } else {
            setProgress4(0)
        }
    }, [experienceList])

    const overallProgress = (progress + progress1 + progress2 + progress3 + progress4);
    const HtmlTooltip: any = styled(({ className, ...props }: TooltipProps) => (

        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }: any) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));
    const generatePdf = async () => {
        // Implement the logic to generate the PDF here.
        // Make sure to generate a Blob representing the PDF content.
        // For example, you can use a library like jsPDF.

        // Example using jsPDF:
        const pdf = new jsPDF();
        pdf.text('Hello, this is your PDF!', 10, 10);
        const blob = pdf.output('blob');

        return blob;
    };

    const handlePrint = async (file: any) => {

        const element = document.getElementById('html-content');
        const pdfOptions = {
            margin: 10,
            filename: 'my_generated_pdf.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        let pdfBlob = await html2pdf().set(pdfOptions).from(element).toPdf().output('blob').then((data: Blob) => {
            return data
        })
        const storageRef = ref(storage, `${name}_${uuidv4()}`);
        let metadata = {
            contentType: 'application/pdf'
        };
        uploadBytes(storageRef, pdfBlob, metadata).then((snapshot) => {
            // console.log('Uploaded a blob or file!');
        }).catch((error: any) => {
            console.error('Error uploading PDF: ', error);
        });
        // pdfFileRef.put(pdfBlob).then((snapshot:any) => {
        //     console.log('PDF uploaded successfully');
        // })

    };









    return (
        <>
            <Box>
                <Grid container>
                    <Grid xs={12} sm={12} md={6}>
                        <Box sx={{ padding: { xs: "9px", sm: "9px", md: "30px" }, background: "#b763631f", minHeight: { xs: "auto", sm: "auto", md: "100vh" }, }}>
                            <Box className="fffffff" sx={{ margin: "10px 0", position: "relative" }}>
                                <HtmlTooltip
                                    title={
                                        <>
                                            {overallProgress === 100 ? "save all" : "please fill all input field after that Save All Button enable"}
                                        </>
                                    }
                                >
                                    <Button title={overallProgress === 100 ? "" : "please fill all input field"} disabled={overallProgress === 100 ? false : true} onClick={saveAll} variant="outlined"> Save All</Button> &nbsp;
                                </HtmlTooltip>

                                <Button onClick={clearAll} variant="outlined"> Clear All</Button>&nbsp;
                                <Box sx={{ display: { xs: "inline-block", sm: "inline-block", md: "none" } }}>

                                    <Button style={{ marginRight: "10px" }} variant="outlined" onClick={toggleDrawer(true)}>Template</Button>
                                </Box>

                                <div className="circle" style={{ backgroundColor: overallProgress === 20 ? "#fc2c03" : overallProgress === 40 ? "#fc2c03" : overallProgress === 60 ? "rgb(220 225 58)" : overallProgress === 80 ? "rgb(220 225 58)" : overallProgress === 100 ? "rgb(54 151 46)" : "#000" }}>
                                    <span className="centered-text">{overallProgress + "%"}</span>
                                </div>
                            </Box>
                            <Accordion
                                expanded={expanded === 'panel1'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel1')} />}
                                    sx={{ margin: "0" }}
                                >
                                    <Typography> {personInfoC ? <>
                                        <Box sx={{ display: "flex" }}>
                                            <TextField fullWidth type="text" onChange={inputTitle} id="outlined-basic" label="Personal Info" variant="outlined" />
                                            <Button type="button" onClick={personInfoCSave}>save</Button>
                                        </Box>
                                    </> : <>
                                        {personInfo}
                                        <Button type="button" onClick={personInfoCllick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                    </>}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange}
                                                />
                                                <div
                                                    className="user-icon"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {imagePreview ? (
                                                        <img
                                                            src={imagePreview}
                                                            alt="User Icon"
                                                            className='cutomUserIcon'
                                                        />
                                                    ) : (
                                                        <img
                                                            src={user}
                                                            alt="Default User Icon"
                                                            className='cutomUserIcon'
                                                        />
                                                    )}
                                                    <div className="edit-icon">
                                                        <EditIcon onClick={handleImageClick} className="iconEditImag" />
                                                        <div className="delete-icon" onClick={handleDeleteClick}>
                                                            <DeleteIcon className="iconDeleteImage" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <TextField value={jobTitle} fullWidth type="text" onChange={inputJobTitle} id="outlined-basic" label="Job Title" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={linkDin} fullWidth type="text" onChange={inputlinkDin} id="outlined-basic" label="linkedin profile id" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={name} fullWidth type="text" onChange={inputFirstName} id="outlined-basic" label="First Name" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={lastName} fullWidth type="text" onChange={inputLastName} id="outlined-basic" label="Last Name" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={email} fullWidth type="text" onChange={inputEmail} id="outlined-basic" label="Email" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={phoneNo} fullWidth type="text" onChange={inputPhoneNo} id="outlined-basic" label="Phone No" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={address} fullWidth type="text" onChange={inputAddress} id="outlined-basic" label="Address" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === 'panel2'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel2')} />}
                                    sx={{ margin: "0" }}
                                >
                                    <Typography>
                                        {employerDetailsC ? <>
                                            <Box sx={{ display: "flex" }}>
                                                <TextField fullWidth type="text" onChange={inputEmployerDetails} id="outlined-basic" label="Employer Details" variant="outlined" />
                                                <Button type="button" onClick={employerDetailsSave}>save</Button>
                                            </Box>
                                        </> : <>
                                            {employerDetails}
                                            <Button type="button" onClick={EmployerDetailsClick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                        </>}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField value={company} fullWidth type="text" onChange={inputCompany} id="outlined-basic" label="Company Name" variant="outlined" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField value={hiring} fullWidth type="text" onChange={inputHiring} id="outlined-basic" label="Hiring Manager Name" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === 'panel5'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel5')} />}
                                    sx={{ margin: "0" }}
                                >
                                    <Typography>
                                        {educationC ? <>
                                            <Box sx={{ display: "flex" }}>
                                                <TextField fullWidth type="text" onChange={inputEducation} id="outlined-basic" label="Education" variant="outlined" />
                                                <Button type="button" onClick={educationSave}>save</Button>
                                            </Box>
                                        </> : <>
                                            {education}
                                            <Button type="button" onClick={EducationClick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                        </>}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box>
                                                {showForm && (
                                                    <EducationForm onAddEducation={handleAddEducation} />
                                                )}
                                            </Box>
                                            <Button onClick={handleToggleForm}>Education +</Button>
                                            <ul style={{ listStyleType: "none", padding: "0" }}>
                                                {educationList.map((education: any, index: any) => (
                                                    <li key={index}>
                                                        <Box className="eduSection">
                                                            <Box> <Typography sx={{ fontWeight: "bold", fontSize: "16px" }} variant='h6'>{education.degree + ", " + education.school}</Typography>
                                                                <Typography sx={{ fontWeight: "400", fontSize: "13px" }} variant='body1'>
                                                                    {`${education.startDate} ${education.startTime} - ${education.persent ? 'Persent' : `${education.endDate} ${education.endTime}`}`}
                                                                </Typography></Box>
                                                            <Button onClick={() => handleDeleteEducation(index)}><CloseIcon /></Button>
                                                        </Box>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === 'panel3'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel3')} />}
                                    sx={{ margin: "0" }}
                                >
                                    <Typography>
                                        {skillC ? <>
                                            <Box sx={{ display: "flex" }}>
                                                <TextField fullWidth type="text" onChange={inputSkill} id="outlined-basic" label="Skill" variant="outlined" />
                                                <Button type="button" onClick={skillSave}>save</Button>
                                            </Box>
                                        </> : <>
                                            {skill}
                                            <Button type="button" onClick={SkillClick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                        </>}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: "flex" }}>
                                                <TextField fullWidth value={skillName} onChange={handleSkillChange} placeholder="Enter a skill" id="outlined-basic" label="Enter a skill" variant="outlined" />
                                                <Button type="button" onClick={handleAddSkill}>Add</Button>
                                            </Box>
                                            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
                                                {skillArray.map((item: any, index: any) => (
                                                    <li style={{
                                                        display: "inline-block", background: "#615d5d42", padding: " 5px 20px", borderRadius: "30px", margin: "5px"
                                                    }} key={index}>{item.skillName}{' '}
                                                        <button style={{ background: "none", color: "#000", border: "none" }} onClick={() => handleDeleteSkill(index)}>X</button></li>
                                                ))}
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === 'panel6'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel6')} />}
                                    sx={{ margin: "0" }}
                                >
                                    <Typography>
                                        {experienceC ? <>
                                            <Box sx={{ display: "flex" }}>
                                                <TextField fullWidth type="text" onChange={inputExperience} id="outlined-basic" label="Experience" variant="outlined" />
                                                <Button type="button" onClick={experienceSave}>save</Button>
                                            </Box>
                                        </> : <>
                                            {experience}
                                            <Button type="button" onClick={ExperienceClick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                        </>}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box>
                                                {showFormEx && (
                                                    <ExperienceForm onAddExperience={handleAddExperience} />
                                                )}
                                            </Box>
                                            <Button onClick={handleToggleFormEx}>Experience +</Button>
                                            <ul style={{ listStyleType: "none", padding: "0" }}>
                                                {experienceList.map((exp: any, index: any) => (
                                                    <li key={index}>
                                                        <Box className="eduSection">
                                                            <Box> <Typography sx={{ fontWeight: "bold", fontSize: "16px" }} variant='h6'>{exp.title + ", " + exp.company}</Typography>
                                                                <Typography sx={{ fontWeight: "400", fontSize: "13px" }} variant='body1'>
                                                                    {`${exp.startDate} ${exp.startTime} - ${exp.persent ? 'Persent' : `${exp.endDate} ${exp.endTime}`}`}
                                                                </Typography></Box>
                                                            <Button onClick={() => handleDeleteExperience(index)}><CloseIcon /></Button>
                                                        </Box>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion
                                expanded={expanded === 'panel4'}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon onClick={handleExpandIconClick('panel4')} />}
                                    sx={{ margin: "0" }}
                                >
                                    {careerC ? <>
                                        <Box sx={{ display: "flex" }}>
                                            <TextField fullWidth type="text" onChange={inputCareer} id="outlined-basic" label="Career Objective" variant="outlined" />
                                            <Button type="button" onClick={careerSave}>save</Button>
                                        </Box>
                                    </> : <>
                                        {career}
                                        <Button type="button" onClick={CareerClick}><EditIcon sx={{ color: "#757575", fontSize: "18px" }} /></Button>
                                    </>}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ borderBottom: "2px solid #000", margin: "-5px 0px 14px 0" }}></Box>
                                    <DraftEditor
                                        editorState={editorState}
                                        onEditorStateChange={onEditorStateChange}
                                        wrapperClassName="wrapper-class"
                                        editorClassName="editor-class"
                                        toolbarClassName="toolbar-class"
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            history: { inDropdown: true },
                                        }}
                                    //   toolbar={
                                    //     {
                                    //         options: [
                                    //         'inline',
                                    //         'blockType',
                                    //         'fontSize',
                                    //         'fontFamily',
                                    //         'list',
                                    //         'textAlign',
                                    //         'link',
                                    //         'embedded',
                                    //         ],
                                    //         inline: {
                                    //         options: ['bold', 'italic', 'underline', 'strikethrough'],
                                    //         },
                                    //         blockType: {
                                    //         options: [
                                    //             { label: 'Normal', style: 'unstyled' },
                                    //             { label: 'Heading 1', style: 'header-one' },
                                    //             { label: 'Heading 2', style: 'header-two' },
                                    //             { label: 'Heading 3', style: 'header-three' },
                                    //             { label: 'Heading 4', style: 'header-four' },
                                    //             { label: 'Heading 5', style: 'header-five' },
                                    //             { label: 'Heading 6', style: 'header-six' },
                                    //         ],
                                    //         },
                                    //         fontSize: {
                                    //         options: [8, 12, 16, 20, 24, 28, 32, 36],
                                    //         },
                                    //         fontFamily: {
                                    //         options: [
                                    //             'Arial',
                                    //             'Georgia',
                                    //             'Impact',
                                    //             'Tahoma',
                                    //             'Times New Roman',
                                    //             'Verdana',
                                    //         ],
                                    //         },
                                    //         list: {
                                    //         options: ['unordered', 'ordered'],
                                    //         },
                                    //         textAlign: {
                                    //         options: ['left', 'center', 'right', 'justify'],
                                    //         },
                                    //   }
                                    // }
                                    />
                                </AccordionDetails>
                            </Accordion>

                        </Box>

                    </Grid>
                    <Grid xs={12} sm={12} md={6}>
                        <Box className="boxDridside" sx={{ background: "#be3dbb0d", padding: "5px 20px" }}>
                            <Box sx={{ marginBottom: "7px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Button sx={{ display: { xs: "none", sm: "none", md: "inline-block" } }} style={{ marginRight: "10px" }} variant="outlined" onClick={toggleDrawer(true)}>Template</Button>
                                {overallProgress === 100 && downloadPdf ?
                                    <Button
                                        sx={{ width: { xs: "100%", sm: "100%", md: "auto", background: "#36972e", color: "#fff" } }}
                                        disabled={overallProgress === 100 && downloadPdf ? false : true}
                                        variant="outlined"
                                        onClick={handlePayment}
                                    >
                                        Download CV
                                    </Button>
                                    // <ReactToPrint
                                    //     trigger={() =>
                                    //         <HtmlTooltip
                                    //             title={
                                    //                 <>
                                    //                     {overallProgress === 100 && downloadPdf ? "Download CV" : "please fillup all input field after that click Save All button After that the Download CV button will be enabled "}
                                    //                 </>
                                    //             }
                                    //         >
                                    //             <Button
                                    //                 sx={{ width: { xs: "100%", sm: "100%", md: "auto", background: "#36972e", color: "#fff" } }}
                                    //                 disabled={overallProgress === 100 && downloadPdf ? false : true}
                                    //                 variant="outlined"
                                    //                 onClick={handlePrint}
                                    //             >
                                    //                 Download CV
                                    //             </Button> &nbsp;
                                    //         </HtmlTooltip>}


                                    //     // <Button sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }} variant="outlined">Download CV</Button>}
                                    //     content={() => componentRef.current}
                                    // /> 
                                    :
                                    <HtmlTooltip
                                        title={"please fillup all input field after that click Save All button After that the Download CV button will be enabled "}>
                                        <span>
                                            <Button sx={{ width: { xs: "100%", sm: "100%", md: "auto" } }} disabled={overallProgress === 100 && downloadPdf ? false : true} variant="outlined">Download CV</Button>
                                        </span>
                                    </HtmlTooltip>
                                }
                                {/* <Button variant="outlined" onClick={handlePayment}>Download CV</Button> */}
                                <Button sx={{ display: { xs: "none", sm: "none", md: "flex" } }} variant="outlined" style={{ textTransform: "capitalize" }}>
                                    <AccountCircleIcon />&nbsp;{profileDetails["name"]}</Button>
                                <Button sx={{ display: { xs: "none", sm: "none", md: "flex" } }} variant="outlined" onClick={handleLogout}>LogOut</Button>
                            </Box>
                            <div id="html-content" ref={componentRef} className='print-preview' style={{ fontFamily: selectedFontFamily, }}>
                                {/* <div style={{background:"#000", height:"100vh"}}> fgfgf</div> */}
                                {selectedCheckbox === 1 &&

                                    <Blue personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} education={education} experienceList={experienceList} educationList={educationList} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle}
                                        lastName={lastName}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)} experience={experience} selectedFontFamily={selectedFontFamily} />
                                }
                                {selectedCheckbox === 2 &&
                                    <Yellow
                                        personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle} lastName={lastName}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)}
                                        selectedFontFamily={selectedFontFamily}
                                        educationList={educationList} education={education}
                                        experience={experience} experienceList={experienceList}
                                    />
                                }

                                {selectedCheckbox === 3 &&
                                    <Red
                                        personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle} lastName={lastName}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)}
                                        selectedFontFamily={selectedFontFamily}
                                        educationList={educationList} education={education}
                                        experience={experience} experienceList={experienceList}
                                    />
                                }

                                {selectedCheckbox === 4 &&
                                    <Green
                                        personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle}
                                        lastName={lastName}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)}
                                        selectedFontFamily={selectedFontFamily}
                                        educationList={educationList} education={education}
                                        experience={experience} experienceList={experienceList}
                                    />
                                }

                                {selectedCheckbox === 5 &&
                                    <RedSec
                                        personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle}
                                        lastName={lastName} career={career}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)}
                                        selectedFontFamily={selectedFontFamily}
                                        educationList={educationList} education={education}
                                        experience={experience} experienceList={experienceList}
                                    />
                                }

                                {selectedCheckbox === 6 &&
                                    <RedThird
                                        personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle}
                                        lastName={lastName}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)}
                                        selectedFontFamily={selectedFontFamily}
                                        educationList={educationList} education={education}
                                        experience={experience} experienceList={experienceList}
                                    />
                                }
                                {selectedCheckbox === 7 &&

                                    <Prof1 personInfo={personInfo} phoneNo={phoneNo} email={email} address={address} employerDetails={employerDetails} company={company} education={education} experienceList={experienceList} educationList={educationList} skill={skill} hiring={hiring} skillArray={skillArray} name={name} jobTitle={jobTitle}
                                        lastName={lastName} career={career}
                                        linkDin={linkDin} imagePreview={imagePreview} DisplayHtmlContent={DisplayHtmlContent(editorState)} experience={experience} selectedFontFamily={selectedFontFamily} />
                                }
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    sx={{ width: "300px" }}
                >
                    <div
                        role="presentation"
                    //   onClick={toggleDrawer(false)}
                    //   onKeyDown={toggleDrawer(false)}
                    >
                        {/* Content you want to display in the Drawer */}
                        <div style={{ padding: '16px' }}>
                            <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }} >
                                <Button variant="outlined" style={{ textTransform: "capitalize" }}>
                                    <AccountCircleIcon />&nbsp;{profileDetails["name"]}</Button>&nbsp;
                                <Button variant="outlined" onClick={handleLogout}>LogOut</Button>
                            </Box>
                            <h2>Font Family</h2>
                            <Select fullWidth value={selectedFontFamily} onChange={handleFontFamilyChange}>
                                {fontFamilies.map((fontFamily: any, index: any) => (
                                    <MenuItem key={index} value={fontFamily}>
                                        {fontFamily}
                                    </MenuItem>
                                ))}
                            </Select>
                            <h2>Template</h2>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 1}
                                                onChange={() => setSelectedCheckbox(1)}
                                            />
                                            <img src={first} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 1" />
                                        </label>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 2}
                                                onChange={() => setSelectedCheckbox(2)}
                                            />
                                            <img src={red} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 2" />
                                        </label>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 3}
                                                onChange={() => setSelectedCheckbox(3)}
                                            />
                                            <img src={orange} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 3" />
                                        </label>
                                    </Grid>

                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 4}
                                                onChange={() => setSelectedCheckbox(4)}
                                            />
                                            <img src={green} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 3" />
                                        </label>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 5}
                                                onChange={() => setSelectedCheckbox(5)}
                                            />
                                            <img src={shape1} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 3" />
                                        </label>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 6}
                                                onChange={() => setSelectedCheckbox(6)}
                                            />
                                            <img src={shape1} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 3" />
                                        </label>
                                    </Grid>
                                    <Grid xs={6} item>
                                        <label style={{ position: "relative", marginRight: "5px" }}>
                                            <Checkbox
                                                className='textSelectIcon'
                                                checked={selectedCheckbox === 7}
                                                onChange={() => setSelectedCheckbox(7)}
                                            />
                                            <img src={prof1} style={{ width: "100px", border: "1px solid" }} alt="Checkbox 3" />
                                        </label>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </Drawer>
            </Box>
        </>
    )
}


export default Resume
