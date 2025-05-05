import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaUtensils } from 'react-icons/fa';

const API_URL = "http://localhost:5001";

const PostList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/recipes`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch recipes");
                return res.json();
            })
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    
    return (
        <Container fluid className="px-4">
            <div className="mb-5 text-center">
                <h1 className="display-4 mb-3">
                    <FaUtensils className="me-3" style={{ color: '#e74c3c' }} />
                    Latest Recipes
                </h1>
                <p className="lead text-muted">
                    Discover and share your favorite recipes with our community
                </p>
            </div>
            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col lg={8} className="mx-auto">
                    {recipes.map((post, index) => (
                        <div key={post.id || index} className="mb-4">
                            <Post
                                postId={post.id}
                                title={post.title}
                                author={post.author || "Anonymous"}
                                content={post.instructions}
                                tags={post.ingredients || []}
                                date={post.date || ""}
                                image_path={post.image_path}
                            />
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default PostList;