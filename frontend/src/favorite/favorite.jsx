import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch favorites from your API
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('YOUR_API_ENDPOINT_TO_FETCH_FAVORITES');
                setFavorites(response.data); // Assuming favorites are returned as an array of objects
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <h2>Your Favorites</h2>
            <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3">
                {favorites.map((favorite, index) => (
                    <Col key={index} xs={12} md={4} className="card-item mb-3">
                        <Card>
                            <Card.Img src={favorite.cover} alt={favorite.title} className='img'/>
                            <Card.Body>
                                <Card.Title>{favorite.title}</Card.Title>
                                <Card.Text>{favorite.artist}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Favorites;
