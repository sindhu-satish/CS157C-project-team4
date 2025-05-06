import React from "react";
import { Card, Stack, Badge, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const API_URL = "http://localhost:5001";

const Post = ({postId, title, author, content, tags, date, image_path}) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/post/${postId}`);
    };

    return (
        <Card className="post-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Card.Body className="p-4">
                <Row>
                    <Col md={8}>
                        <Card.Title className="mb-3" style={{ fontSize: '1.75rem' }}>{title}</Card.Title>
                        <div className="d-flex align-items-center mb-3">
                            <FaUser className="me-2" style={{ color: '#6c757d' }} />
                            <Card.Subtitle className="text-muted mb-0">{author}</Card.Subtitle>
                            <FaCalendarAlt className="ms-3 me-2" style={{ color: '#6c757d' }} />
                            <small className="text-muted">{date}</small>
                        </div>
                        <div className="mb-4">
                            <h6 className="mb-2">Instructions:</h6>
                            <div className="instructions-list">
                                {content.map((step, index) => (
                                    <div key={index} className="instruction-step mb-2" style={{ fontSize: '1.1rem', color: '#495057', lineHeight: '1.6' }}>
                                        <span className="step-number me-2">{index + 1}.</span>
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap">
                            <div className="me-3 mb-2">
                                <small className="text-muted">Ingredients:</small>
                            </div>
                            <Stack direction="horizontal" gap={2} className="flex-wrap">
                                {tags.map((tag, index) => (
                                    <Badge key={index} pill bg="light" text="dark" className="px-3 py-2">
                                        {tag}
                                    </Badge>
                                ))}
                            </Stack>
                        </div>
                    </Col>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img 
                            src={`${API_URL}/${image_path}`}
                            alt={title}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Post;