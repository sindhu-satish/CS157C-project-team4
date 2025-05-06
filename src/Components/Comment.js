import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaUser, FaClock, FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

const Comment = ({ id, author, content, date, onDelete, isOwner }) => {
    return (
        <Card className="mb-2 shadow-sm" style={{ borderRadius: '8px', backgroundColor: '#f8f9fa', border: 'none' }}>
            <Card.Body className="p-2">
                <div className="d-flex align-items-center mb-1">
                    <div className="d-flex align-items-center">
                        <div className="comment-avatar">
                            <FaUser size={14} className="text-primary" />
                        </div>
                        <Card.Title className="mb-0 ms-2" style={{ color: '#2c3e50', fontSize: '0.9rem', fontWeight: '600' }}>
                            {author}
                        </Card.Title>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <div className="text-muted me-2">
                            <FaClock size={11} className="me-1" />
                            <small style={{ fontSize: '0.8rem' }}>{date}</small>
                        </div>
                        {isOwner && (
                            <Button
                                variant="link"
                                className="p-0 text-danger"
                                onClick={() => onDelete(id)}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <FaTrash size={12} />
                            </Button>
                        )}
                    </div>
                </div>
                <Card.Text style={{ 
                    color: '#495057',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    marginBottom: 0,
                    whiteSpace: 'pre-wrap'
                }}>
                    {content}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Comment;