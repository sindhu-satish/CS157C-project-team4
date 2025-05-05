import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { useParams } from 'react-router-dom';
import { Container, Stack, Badge, ListGroup, Form, Button, Row, Col, Alert, Spinner, FormCheck } from "react-bootstrap";
import './pageStyles.css';
import Comment from "../Components/Comment.js";

const API_URL = "http://localhost:5001";

const PostPage = () => {
    const { postId } = useParams();
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
            setUserName(user.username);
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

    const handleAddComment = async () => {
        if (!comment.trim()) return;

        try {
            const response = await fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipe_id: parseInt(postId),
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

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
            <NavigationBar />
            <div className="main-screen">
                <Container fluid>
                    <h1>{recipe.title}</h1>
                    <Stack direction="horizontal" gap={3}>
                        <div className="h-2">Posted on {recipe.date}</div>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="mt-3">
                        {recipe.ingredients.map((ingredient, index) => (
                            <Badge key={index} pill bg="light" text="dark" className="me-2" style={{ backgroundColor: '#f8f9fa' }}>
                                {ingredient}
                            </Badge>
                        ))}
                    </Stack>
                    <div className="p-2 mt-4">
                        <h4>Instructions:</h4>
                        <p>{recipe.instructions}</p>
                    </div>
                </Container>
                <Container fluid className="mt-3">
                    <div className="comments-section" style={{ maxWidth: '450px', marginLeft: '0' }}>
                        <h4 className="mb-2">Comments</h4>
                        <div className="comment-form mb-3">
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
                                                setUserName(e.target.checked ? 'Anonymous' : loggedInUser.username);
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
                </Container>
            </div>
        </>
    );
};

export default PostPage;
