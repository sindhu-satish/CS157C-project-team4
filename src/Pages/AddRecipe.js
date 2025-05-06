import React, { useState } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './pageStyles.css';

const API_URL = "http://localhost:5001";

const AddRecipe = () => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        image_path: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL for the image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let imagePath = '';
            
            // If an image was selected, upload it first
            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                const uploadResponse = await fetch(`${API_URL}/upload-image`, {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload image');
                }

                const uploadData = await uploadResponse.json();
                imagePath = uploadData.image_path;
            }

            // Convert ingredients and instructions strings to arrays
            const ingredientsArray = recipe.ingredients.split('\n').filter(item => item.trim() !== '');
            const instructionsArray = recipe.instructions.split('\n').filter(item => item.trim() !== '');

            // Create the recipe with the image path and arrays
            const recipeData = {
                title: recipe.title,
                ingredients: ingredientsArray,
                instructions: instructionsArray,
                image_path: imagePath
            };

            const response = await fetch(`${API_URL}/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="main-screen">
                <Container className="py-4">
                    <h1 className="mb-4">Add New Recipe</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={recipe.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingredients (one per line)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="ingredients"
                                value={recipe.ingredients}
                                onChange={handleChange}
                                placeholder="Enter each ingredient on a new line"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Instructions (one per line)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="instructions"
                                value={recipe.instructions}
                                onChange={handleChange}
                                placeholder="Enter each instruction step on a new line"
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Add Recipe
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default AddRecipe; 