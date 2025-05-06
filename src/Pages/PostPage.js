import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Stack, Badge, Form, Button, Alert, Spinner, FormCheck, Row, Col } from "react-bootstrap";
import './pageStyles.css';
import Comment from "../Components/Comment.js";

const API_URL = "http://localhost:5001";

const PostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('Anonymous');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoggedInUser(user);
            setUserName(user.full_name);
            setIsAnonymous(false);
        }

        const fetchRecipeAndComments = async () => {
            try {
                // Fetch recipe
                const recipeResponse = await fetch(`${API_URL}/recipes/${postId}`);
                if (!recipeResponse.ok) {
                    throw new Error('Recipe not found');
                }
                const recipeData = await recipeResponse.json();
                console.log('Recipe data:', recipeData);
                console.log('Image path:', recipeData.image_path);
                setRecipe(recipeData);

                // Fetch comments
                const commentsResponse = await fetch(`${API_URL}/comments/${postId}`);
                if (!commentsResponse.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeAndComments();
    }, [postId]);

    const handleDeleteRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                const response = await fetch(`${API_URL}/recipes/${postId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete recipe');
                }

                // Redirect to home page after successful deletion
                navigate('/');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEditRecipe = () => {
        navigate(`/edit-recipe/${postId}`);
    };

    const handleAddComment = async () => {
        if (!comment.trim()) return;

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipe_id: postId,
                    user_name: isAnonymous ? 'Anonymous' : userName,
                    comment: comment.trim()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            // Refresh comments
            const commentsResponse = await fetch(`${API_URL}/comments/${postId}`);
            if (!commentsResponse.ok) {
                throw new Error('Failed to fetch comments');
            }
            const commentsData = await commentsResponse.json();
            setComments(commentsData);
            setComment(''); // Clear the comment input
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

    if (!recipe) {
        return (
            <>
                <NavigationBar />
                <div className="main-screen">
                    <Container className="mt-5">
                        <Alert variant="warning">Recipe not found</Alert>
                    </Container>
                </div>
            </>
        );
    }

    const isRecipeOwner = loggedInUser && recipe.user_id === loggedInUser.id;

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <NavigationBar />
            <div className="main-screen">
                <Container className="py-4 px-4" style={{ maxWidth: '1200px' }}>
                    <Row>
                        <Col md={8}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h1 className="mb-0">{recipe.title}</h1>
                                {isRecipeOwner && (
                                    <div>
                                        <Button 
                                            variant="outline-primary" 
                                            className="me-2"
                                            onClick={handleEditRecipe}
                                        >
                                            Edit Recipe
                                        </Button>
                                        <Button 
                                            variant="outline-danger"
                                            onClick={handleDeleteRecipe}
                                        >
                                            Delete Recipe
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <Stack direction="horizontal" gap={3} className="mb-3">
                                <div className="h-2">Posted on {recipe.date}</div>
                            </Stack>
                            <Stack direction="horizontal" gap={3} className="mb-4">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <Badge key={index} pill bg="light" text="dark" className="me-2" style={{ backgroundColor: '#f8f9fa' }}>
                                        {ingredient}
                                    </Badge>
                                ))}
                            </Stack>
                            <div className="p-2 mb-4">
                                <h4>Instructions:</h4>
                                <div className="instructions-list">
                                    {recipe.instructions.map((step, index) => (
                                        <div key={index} className="instruction-step mb-2">
                                            <span className="step-number me-2">{index + 1}.</span>
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="sticky-top" style={{ top: '20px' }}>
                                <img 
                                    src={`${API_URL}/${recipe.image_path}`}
                                    alt={recipe.title}
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={8}>
                            <div className="comments-section">
                                <h4 className="mb-3">Comments</h4>
                                <div className="comment-form mb-4">
                                    <Form>
                                        <Form.Group className="mb-2">
                                            <Form.Control
                                                as="textarea"
                                                rows={2}
                                                placeholder="Share your thoughts..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                style={{ 
                                                    borderRadius: '8px',
                                                    resize: 'none',
                                                    fontSize: '0.9rem'
                                                }}
                                            />
                                        </Form.Group>
                                        <div className="d-flex flex-column gap-2">
                                            {loggedInUser && (
                                                <FormCheck
                                                    type="switch"
                                                    id="anonymous-switch"
                                                    label="Post as Anonymous"
                                                    checked={isAnonymous}
                                                    onChange={(e) => {
                                                        setIsAnonymous(e.target.checked);
                                                        setUserName(e.target.checked ? 'Anonymous' : loggedInUser.full_name);
                                                    }}
                                                    className="mb-1"
                                                    style={{ fontSize: '0.9rem' }}
                                                />
                                            )}
                                            <div className="d-flex justify-content-between align-items-center">
                                                {!loggedInUser && (
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Your name"
                                                        value={userName}
                                                        onChange={(e) => setUserName(e.target.value)}
                                                        style={{ 
                                                            maxWidth: '150px',
                                                            marginRight: '10px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    />
                                                )}
                                                <Button 
                                                    variant="primary" 
                                                    onClick={handleAddComment}
                                                    style={{ borderRadius: '8px', fontSize: '0.9rem', padding: '0.375rem 0.75rem' }}
                                                >
                                                    Post Comment
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="comments-list">
                                    {comments.length === 0 ? (
                                        <div className="text-muted my-3">
                                            <p className="mb-0" style={{ fontSize: '0.9rem' }}>No comments yet. Be the first to share your thoughts!</p>
                                        </div>
                                    ) : (
                                        comments.map((comment) => (
                                            <Comment
                                                key={comment.id}
                                                author={comment.user_name}
                                                content={comment.comment}
                                                date={new Date(comment.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default PostPage;
