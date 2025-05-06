import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import './pageStyles.css';

const API_URL = "http://localhost:5001";

const EditRecipe = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        image_path: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
                setImagePreview(data.image_path ? `${API_URL}/${data.image_path}` : null);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [postId]);

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
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let imagePath = recipe.image_path;
            
            // If a new image was selected, upload it
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

            // Convert ingredients and instructions to arrays if they're strings
            const ingredientsArray = Array.isArray(recipe.ingredients) 
                ? recipe.ingredients 
                : recipe.ingredients.split('\n').filter(item => item.trim() !== '');
            
            const instructionsArray = Array.isArray(recipe.instructions)
                ? recipe.instructions
                : recipe.instructions.split('\n').filter(item => item.trim() !== '');

            // Update the recipe
            const recipeData = {
                title: recipe.title,
                ingredients: ingredientsArray,
                instructions: instructionsArray,
                image_path: imagePath
            };

            const response = await fetch(`${API_URL}/recipes/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }

            navigate(`/post/${postId}`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <>
                <NavigationBar />
                <div className="main-screen">
                    <Container className="text-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </Container>
                </div>
            </>
        );
    }

    return (
        <>
            <NavigationBar />
            <div className="main-screen">
                <Container className="py-4 px-4" style={{ maxWidth: '800px' }}>
                    <h1 className="mb-4">Edit Recipe</h1>
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
                            <Form.Label>Ingredients (one per line)</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="ingredients"
                                value={Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients}
                                onChange={handleChange}
                                rows={5}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Instructions (one per line)</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="instructions"
                                value={Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : recipe.instructions}
                                onChange={handleChange}
                                rows={10}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
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

                        <div className="d-flex gap-2">
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={() => navigate(`/post/${postId}`)}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default EditRecipe; 