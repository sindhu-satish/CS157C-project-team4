import React from "react";
import { Card, Stack, Badge } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';

const Post = ({postId, title, author, content, tags, date}) => {
    const navigate = useNavigate();
    
    //change this later when i set up routes
    const handleClick = () => {
        navigate(`/post/${postId}`);
    };

    return (
        <Card className="post-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Card.Body className="p-4">
                <Card.Title className="mb-3" style={{ fontSize: '1.75rem' }}>{title}</Card.Title>
                <div className="d-flex align-items-center mb-3">
                    <FaUser className="me-2" style={{ color: '#6c757d' }} />
                    <Card.Subtitle className="text-muted mb-0">{author}</Card.Subtitle>
                    <FaCalendarAlt className="ms-3 me-2" style={{ color: '#6c757d' }} />
                    <small className="text-muted">{date}</small>
                </div>
                <Card.Text className="mb-4" style={{ 
                    fontSize: '1.1rem',
                    color: '#495057',
                    lineHeight: '1.6'
                }}>
                    {content}
                </Card.Text>
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
            </Card.Body>
        </Card>
    );
}

export default Post;