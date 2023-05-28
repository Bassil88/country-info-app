import React, { useState } from 'react';
import './styles.css';

function App() {
  const [countryCode, setCountryCode] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [emptyInputError, setEmptyInputError] = useState(false);

  const APIKEY = '248|WnYBdxoDnScx74EUJIMcgqsrBl72lzOhaeEoih0c';

  const handleInputChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!countryCode.trim()) {
      setEmptyInputError(true);
      return;
    }
    try {
      const response = await fetch(
        `https://restfulcountries.com/api/v1/countries/${countryCode}`,
        {
          headers: {
            Authorization: `Bearer ${APIKEY}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status === 404) {
        console.log('Country not found');
      } else {
        setCountryInfo(data.data);
        setEmptyInputError(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBackgroundStyle = () => {
    if (countryInfo && countryInfo.href && countryInfo.href.flag) {
      return {
        backgroundImage: `url(${countryInfo.href.flag})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top' 
      };
    }
    return null;
  };

  return (
    <div className="App" style={getBackgroundStyle()}>
      <h1>Enter any Country's Name to get the Infos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={countryCode}
          onChange={handleInputChange}
          className="input-field"
        />
        <button type="submit" className="glow-on-hover">
          Fetch Country Information
        </button>
        {emptyInputError && (
          <p className="error-message">Please enter a country name.</p>
        )}
      </form>
      {countryInfo && (
        <div className="country-info">
          <h2>{countryInfo?.name || 'No country found'}</h2>
          <p>
            <strong>Capital:</strong> {countryInfo?.capital || 'N/A'}
          </p>
          <p>
            <strong>Population:</strong>{' '}
            {countryInfo?.population
              ? countryInfo.population.toLocaleString()
              : 'N/A'}
          </p>
          <p>
            <strong>Region:</strong> {countryInfo?.continent || 'N/A'}
          </p>
          <p>
            <strong>Calling code:</strong> {countryInfo?.phone_code || 'N/A'}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
