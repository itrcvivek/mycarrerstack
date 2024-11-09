import { Grid, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
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
const EducationForm = ({ onAddEducation }: any,) => {
  const [education, setEducation] = useState({
    degree: '',
    school: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    persent: false,
  });
  const handleInputChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: newValue,
    }));
  };
//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setEducation((prevEducation) => ({
//       ...prevEducation,
//       [name]: value,
//     }));
//   };

  const handleAddEducation = () => {
    onAddEducation(education);
    setEducation({
      degree: '',
      school: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      persent: false,
    });
  };
  const years = getYearOptions();
  return (
    <>
      <form onSubmit={handleAddEducation}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="text"
            required
            placeholder="Degree"
            value={education.degree}
            onChange={handleInputChange}
            name="degree"
            label="Degree"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="text"
            required
            placeholder="School"
            value={education.school}
            onChange={handleInputChange}
            name="school"
            label="School"
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
        value={education.startDate}
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
        value={education.startTime}
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
            <Grid item xs={6}>
        <FormControl fullWidth>
      <InputLabel id="month-label">End Date</InputLabel>
      <Select
        labelId="month-label"
        id="month-select"
        name="endDate"
        value={education.endDate}
        onChange={handleInputChange}
        disabled={education.persent?true:false}
      >
        {months.map((month, index) => (
          <MenuItem key={index} value={month}>{month}</MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel id="month-label">End Year</InputLabel>
      <Select
        labelId="month-label"
        id="month-select"
        name="endTime"
        value={education.endTime}
        onChange={handleInputChange}
        disabled={education.persent?true:false}
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
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormControlLabel value={education.persent}
        onChange={handleInputChange} name="persent" control={<Checkbox />} label="Persent" />
        <Button type="submit" style={{ marginTop: '10px' }} variant="outlined">
          Save
        </Button>
      </Box>
      </form>
    </>
  );
};

export default EducationForm;
