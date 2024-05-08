import React, { useState } from 'react';
import axios from 'axios';
import './videoCard.css';

function YouTubeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 5,
          q: query,
          key: 'AIzaSyBjOUzjmLx_gtoGVkPXjtm8v39JGLOybNo',
        },
      });
      setResults(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} placeholder="Rechercher sur YouTube" />
        <button type="submit">Rechercher</button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {results.map((item) => (
          <div key={item.id.videoId} style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} style={{ width: '100%' }} />
            <p>{item.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeSearch;
