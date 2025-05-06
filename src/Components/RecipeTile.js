import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5001";

const RecipeTile = ({ recipe }) => {
    return (
        <Link to={`/post/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className="h-100 shadow-sm" style={{ 
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                borderRadius: '12px',
                overflow: 'hidden'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ 
                    height: '200px', 
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <Card.Img
                        variant="top"
                        src={`${API_URL}/${recipe.image_path}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        alt={recipe.title}
                    />
                </div>
                <Card.Body>
                    <Card.Title style={{ 
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: '#2c3e50'
                    }}>
                        {recipe.title}
                    </Card.Title>
                    <Card.Text style={{ 
                        fontSize: '0.9rem',
                        color: '#6c757d',
                        marginBottom: '0'
                    }}>
                        Posted by {recipe.poster_name || 'Anonymous'}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default RecipeTile; 