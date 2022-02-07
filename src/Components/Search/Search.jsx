import React, { useState } from 'react';
import Result from './Result';
import './search.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'

export default function Search() {
  const [click, setClick] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dummyResults, setDummyResults] = useState([])

  const handlePostQuery = async () => {
    await axios.post('http://34.223.255.47/answer', {
      question: searchQuery,
      company: 'magnifio'
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const fetchDummyResults = () => {
    let options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
      params: {q: searchQuery, pageNumber: '1', pageSize: '10', autoCorrect: 'true'},
      headers: {
        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        'x-rapidapi-key': '89ad10091emshf5f1d5219661964p1bf1dfjsn0ac0497b27b2'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data.value);
      setDummyResults(response.data.value)
      setClick(false)
    }).catch(function (error) {
      console.error(error);
    });
  }


  const handleChange = (e) =>{
    // console.log(e)
    if(e.target.value === ''){
      setClick(false)
    } else {
      setClick(true)
    }
    setSearchQuery(e.target.value)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handlePostQuery()
      fetchDummyResults()
      setSearchQuery('')
    }
  }

  return (
    <div className="search-container" >
      <h1 className="search-bar-company-logo">Magnif.io</h1>
      <div className="Search-bar">
        <SearchIcon className="search-icon"/>
        <input 
          value={searchQuery}
          type="Search" 
          placeholder="Search" 
          onChange ={handleChange} 
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={ click ? 'search-suggestion' : 'search-suggestion-show'}></div>
      <div className="show-result">
        <Result data={dummyResults} />
      </div>
    </div>
  );
}
