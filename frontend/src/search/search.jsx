import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css'

const CLIENT_ID = "fc00e50de4ed4be7bb06faa37378a36e";
const CLIENT_SECRET = "b4563d6250554cb4951d69b88848b4e5";

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);
    const [youTubeResults, setYouTubeResults] = useState([]);

    useEffect(() => {
        const fetchSpotifyAccessToken = async () => {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                    params: {
                        grant_type: 'client_credentials',
                    },
                    headers: {
                        Authorization: `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                setAccessToken(response.data.access_token);
            } catch (error) {
                console.error('Error fetching Spotify access token:', error);
            }
        };

        if (searchInput) {
            fetchSpotifyAccessToken();
        }
    }, [searchInput]);

    async function search() {
        console.log("Search for " + searchInput);
        var trackParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var tracks = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', trackParameters)
            .then(response => response.json())
            .then(data => data.tracks.items);

        console.log(tracks);
        setTracks(tracks);
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 6,
                    q: searchInput,
                    key: 'AIzaSyBjOUzjmLx_gtoGVkPXjtm8v39JGLOybNo',
                },
            });
            setYouTubeResults(response.data.items);
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    }

    return (
        <div className="container">
            <Container>
                <InputGroup className="mb-3" size='lg'>
                    <FormControl
                        placeholder="Search for Artist"
                        type='input'
                        onKeyPress={event => {
                            if (event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={event => { search() }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <div className="section-title">Music</div>
            <Row className="mx-2 row row-cols-3">
                {tracks.slice(0, 6).map(track => (
                    <Card key={track.id} className="card-item">
                        <Card.Img src={track.album.images[0].url} alt={track.album.name} className='img'/>
                        <Card.Body>
                            <Card.Title>{track.name}</Card.Title>
                            <Card.Text>{track.artists.map(artist => artist.name).join(", ")}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
            <div className="section-title">Videos</div>
            <Row className="mx-2 row row-cols-3">
                {youTubeResults.map((item) => (
                    <Card key={item.id.videoId} className="card-item">
                        <Card.Img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className='img'/>
                        <Card.Body>
                            <Card.Title>{item.snippet.title}</Card.Title>
                            <Card.Text>{item.snippet.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
            <Container>
            </Container>
        </div>
    );
}

export default Search;
