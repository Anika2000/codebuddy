import { languageOptions } from '../constants/languageOptions';
import '../styles/dropdown.css';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({selectChange}) {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
    selectChange(event.target.value);
  };

  return (
    <Box height={10} sx={{ minWidth: 250}}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label" sx={{ color: '#fff' }}>Choose Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Choose Language"
          onChange={handleChange}
          style={{height: 30 }}
          sx={{borderBottom: '1px solid #fff'
          }}
          renderValue={(selectedValue) => (
            <span style={{ color: '#fff' }}>{selectedValue}</span>
          )}
        >
          {languageOptions.map((lang) => ( 
            <MenuItem key={lang.id} value={lang.value}>{lang.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}