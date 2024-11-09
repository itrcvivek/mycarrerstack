import { Grid, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import React, { useState } from 'react';
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(i);
    }
    return years;
  };
const ExperienceForm = ({ onAddExperience }: any,) => {
  const [experience, setExperience] = useState({
    title: '',
    company: '',
    employmentType:"",
    location:'',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    persent: false,
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  const handleInputChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setExperience((prevExperience) => ({
      ...prevExperience,
      [name]: newValue,
    }));
  };
//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setexperience((prevexperience) => ({
//       ...prevexperience,
//       [name]: value,
//     }));
//   };

  const handleAddExperience = () => {
    onAddExperience({
        ...experience,
        editorState: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      });
  
    setExperience({
      title: '',
      company: '',
      employmentType:'',
      location:'',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      persent: false,
    });
    setEditorState(EditorState.createEmpty())
  };
  const years = getYearOptions();
  return (
    <>
      <form onSubmit={handleAddExperience}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="text"
            required
            placeholder="title"
            value={experience.title}
            onChange={handleInputChange}
            name="title"
            label="title"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="text"
            required
            placeholder="company"
            value={experience.company}
            onChange={handleInputChange}
            name="company"
            label="company"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
        <FormControl fullWidth>
      <InputLabel id="employment-type-label">Employment Type</InputLabel>
      <Select
        labelId="employment-type-label"
        id="employment-type-select"
        name="employmentType"
        value={experience.employmentType}
        onChange={handleInputChange}
      >
        <MenuItem value="full-time">Full Time</MenuItem>
        <MenuItem value="part-time">Part Time</MenuItem>
        <MenuItem value="contract">Contract</MenuItem>
        <MenuItem value="freelance">Freelance</MenuItem>
      </Select>
    </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="text"
            required
            placeholder="location"
            value={experience.location}
            onChange={handleInputChange}
            name="location"
            label="location"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
        <FormControl fullWidth>
      <InputLabel id="month-label">Start Date</InputLabel>
      <Select
        required
        labelId="month-label"
        id="month-select"
        name="startDate"
        value={experience.startDate}
        onChange={handleInputChange}
      >
        {months.map((month, index) => (
          <MenuItem key={index} value={month}>{month}</MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
        <FormControl fullWidth>
        <InputLabel id="month-label">Start Year</InputLabel>
      <Select
      required
        labelId="month-label"
        id="month-select"
        name="startTime"
        value={experience.startTime}
        onChange={handleInputChange}
      >
        {years.map((year:any) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
        <>
        <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
        <FormControl fullWidth>
      <InputLabel id="month-label">End Date</InputLabel>
      <Select
        labelId="month-label"
        id="month-select"
        name="endDate"
        value={experience.endDate}
        onChange={handleInputChange}
        disabled={experience.persent?true:false}
      >
        {months.map((month, index) => (
          <MenuItem key={index} value={month}>{month}</MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
        <FormControl fullWidth>
        <InputLabel id="month-label">End Year</InputLabel>
      <Select
        labelId="month-label"
        id="month-select"
        name="endTime"
        value={experience.endTime}
        onChange={handleInputChange}
        disabled={experience.persent?true:false}
      >
        {years.map((year:any) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
            </Grid>
        </Grid>
        </>
        <Grid xs={12}>
        <DraftEditor
                                        editorState={editorState}
                                        onEditorStateChange={handleEditorStateChange}
                                        toolbar={{
                                            options: [
                                                'inline',
                                                'blockType',
                                                'fontSize',
                                                'fontFamily',
                                                'list',
                                                'textAlign',
                                                'link',
                                                'embedded',
                                            ],
                                            inline: {
                                                options: ['bold', 'italic', 'underline', 'strikethrough'],
                                            },
                                            blockType: {
                                                options: [
                                                    { label: 'Normal', style: 'unstyled' },
                                                    { label: 'Heading 1', style: 'header-one' },
                                                    { label: 'Heading 2', style: 'header-two' },
                                                    { label: 'Heading 3', style: 'header-three' },
                                                    { label: 'Heading 4', style: 'header-four' },
                                                    { label: 'Heading 5', style: 'header-five' },
                                                    { label: 'Heading 6', style: 'header-six' },
                                                ],
                                            },
                                            fontSize: {
                                                options: [8, 12, 16, 20, 24, 28, 32, 36],
                                            },
                                            fontFamily: {
                                                options: [
                                                    'Arial',
                                                    'Georgia',
                                                    'Impact',
                                                    'Tahoma',
                                                    'Times New Roman',
                                                    'Verdana',
                                                ],
                                            },
                                            list: {
                                                options: ['unordered', 'ordered'],
                                            },
                                            textAlign: {
                                                options: ['left', 'center', 'right', 'justify'],
                                            },
                                        }}
                                    />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormControlLabel value={experience.persent}
        onChange={handleInputChange} name="persent" control={<Checkbox />} label="Currently work here" />
        <Button type="submit" style={{ marginTop: '10px' }} variant="outlined">
          Save
        </Button>
      </Box>
      </form>
    </>
  );
};

export default ExperienceForm;
