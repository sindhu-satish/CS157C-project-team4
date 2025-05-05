import React, { useState } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './pageStyles.css';

const API_URL = "http://localhost:5001";

const AddRecipe = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Convert ingredients and instructions strings to arrays
            const ingredientsArray = ingredients.split('\n').filter(item => item.trim() !== '');
            const instructionsArray = instructions.split('\n').filter(item => item.trim() !== '');

            const response = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    ingredients: ingredientsArray,
                    instructions: instructionsArray,
                    likes: 0
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            const data = await response.json();
            navigate(`/post/${data.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="main-screen">
                <Container className="mt-4">
                    <h1 className="mb-4">Add New Recipe</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipe Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recipe title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter ingredients (one per line)"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter each ingredient on a new line
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Enter cooking instructions (one step per line)"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                Enter each step on a new line
                            </Form.Text>
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                            className="w-100"
                        >
                            {loading ? 'Creating Recipe...' : 'Create Recipe'}
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default AddRecipe; 