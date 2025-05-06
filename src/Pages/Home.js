import React, { useState, useEffect } from 'react';
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import RecipeTile from '../Components/RecipeTile';
import './pageStyles.css';

const API_URL = "http://localhost:5001";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return (
            <>
                <NavigationBar />
                <div className="main-screen">
                    <Container className="text-center mt-5">
                        <Spinner animation="border" />
                    </Container>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavigationBar />
                <div className="main-screen">
                    <Container className="mt-5">
                        <Alert variant="danger">{error}</Alert>
                    </Container>
                </div>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div className="main-screen">
                <Container className="py-4">
                    <h2 className="mb-4" style={{ color: '#2c3e50' }}>Discover Recipes</h2>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {recipes.map((recipe) => (
                            <Col key={recipe.id}>
                                <RecipeTile recipe={recipe} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Home;
