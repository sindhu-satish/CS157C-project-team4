import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './pageStyles.css';

const API_URL = "http://localhost:5001";

const MyRecipes = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }
        setLoggedInUser(user);

        const fetchMyRecipes = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipes');
                }
                const allRecipes = await response.json();
                // Filter recipes to only show those posted by the logged-in user
                const myRecipes = allRecipes.filter(recipe => recipe.user_id === user.id);
                setRecipes(myRecipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyRecipes();
    }, [navigate]);

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
                <Container className="py-4 px-4" style={{ maxWidth: '1200px' }}>
                    <h1 className="mb-4">My Recipes</h1>
                    {recipes.length === 0 ? (
                        <Alert variant="info">
                            You haven't posted any recipes yet. 
                            <a href="/new-post" className="ms-2">Create your first recipe!</a>
                        </Alert>
                    ) : (
                        <Row>
                            {recipes.map((recipe) => (
                                <Col key={recipe.id} md={6} lg={4} className="mb-4">
                                    <div 
                                        className="recipe-card p-3 border rounded shadow-sm"
                                        style={{ 
                                            cursor: 'pointer',
                                            height: '100%',
                                            transition: 'transform 0.2s ease-in-out'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        onClick={() => navigate(`/post/${recipe.id}`)}
                                    >
                                        <img 
                                            src={`${API_URL}/${recipe.image_path}`}
                                            alt={recipe.title}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                marginBottom: '1rem'
                                            }}
                                        />
                                        <h3 className="h5 mb-2">{recipe.title}</h3>
                                        <p className="text-muted mb-2">
                                            Posted on {recipe.date}
                                        </p>
                                        <div className="d-flex flex-wrap gap-1">
                                            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                                                <span 
                                                    key={index}
                                                    className="badge bg-light text-dark"
                                                    style={{ fontSize: '0.8rem' }}
                                                >
                                                    {ingredient}
                                                </span>
                                            ))}
                                            {recipe.ingredients.length > 3 && (
                                                <span className="badge bg-light text-dark" style={{ fontSize: '0.8rem' }}>
                                                    +{recipe.ingredients.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </div>
        </>
    );
};

export default MyRecipes; 