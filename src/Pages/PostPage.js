import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { useParams } from 'react-router-dom';
import { Container, Stack, Badge, ListGroup, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import './pageStyles.css';
import Comment from "../Components/Comment.js";

const API_URL = "http://localhost:5001";

const PostPage = () => {
    const { postId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${API_URL}/recipes/${postId}`);
                if (!response.ok) {
                    throw new Error('Recipe not found');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [postId]);

    const handleAddComment = () => {
        console.log("comment: ", comment);
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
                            <Badge key={index} pill bg="light" text="dark">
                                {ingredient}
                            </Badge>
                        ))}
                    </Stack>
                    <div className="p-2 mt-4">
                        <h4>Instructions:</h4>
                        <p>{recipe.instructions}</p>
                    </div>
                </Container>
                <Container fluid>
                    <h2><br/>Comments</h2>
                    <Form>
                        <Form.Label className="h4">Post Comment</Form.Label>
                        <Row>
                            <Col md={11}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="textarea"
                                        placeholder="Type something..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <div className="mb-3 text-center">
                                    <Button variant="primary" onClick={handleAddComment}>
                                        Post
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <ListGroup>
                        {/* Comments will be added here when the comments API is implemented */}
                    </ListGroup>
                </Container>
            </div>
        </>
    );
};

export default PostPage;
