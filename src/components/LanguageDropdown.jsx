import React from 'react'
import { languageOptions } from '../constants/languageOptions';
import '../styles/dropdown.css';

const LanguageDropdown = ({ onSelectChange }) => {
    const [language, setLanguage] = React.useState('Choose language');

  const handleChange = (value) => {
    setLanguage(value);
    onSelectChange(value);
  };

    
  return (
    <div>
      <div className="dropdown">
  <button className="dropdown-button">{language}</button>
  <ul className="dropdown-menu">
    {languageOptions.map((option) => (
      <li key={option.id}>
        <a href="#" onClick={() => handleChange(option.name)}>
          {option.name}
        </a>
      </li>
    ))}
  </ul>
</div>
    </div>
  )
}

export default LanguageDropdown