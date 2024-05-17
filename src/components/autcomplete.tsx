import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AutocompleteSearch({handleClose,setWeatherPreferenceList}:any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&language=en&format=json`
        );
        console.log('the search is =>', response.data.results)
        setSearchResults( response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleInputChange = (e:any) => {
    setSearchQuery(e.target.value);
  };

  const handleItemSelected = (result:any) => {
        const existingList = localStorage.getItem('weatherPreferenceList');
        const parsedList = existingList ? JSON.parse(existingList) : [];

        if (!parsedList.some((item:any) => item.name === result.name)) {
          const updatedList = [...parsedList, result];
          localStorage.setItem('weatherPreferenceList', JSON.stringify(updatedList));
        }
        setWeatherPreferenceList((prev:any)=>[...prev,result])


        handleClose();
  }

  return (
    <div className='w-[35rem]'>
      <h1>Type the city name here.....</h1>
      <div className='p-4'>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
            <input
              type="text"
              placeholder="Enter city name"
              value={searchQuery}
              onChange={handleInputChange}
              className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {searchResults?.length > 0 && (
        <ul>
          {searchResults.map((result:any,i) => (
            <div key={i}
                onClick={()=>handleItemSelected(result)}
                className='grid gap-12 items-center grid-cols-[1fr_1fr] p-4 itm'>
                <li key={result.id}>{result.name}</li>
                <div >
                    <li>lat: {result.latitude}</li>
                    <li>long: {result.longitude}</li>
                </div>
            </div>
          ))}
        </ul>
      )}
      <style jsx>{`
      .itm:hover{
        border: 1px solid gray;
        border-radius: 1rem;
        background-color: #e2e6df9e;
        cursor:pointer
      }`}

      </style>
    </div>
  );
}

export default AutocompleteSearch;
