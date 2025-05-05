import React from 'react';
import Card from 'react-bootstrap/Card';

const Comment = ({author, content, date}) => {
    return (
        <Card bg={'dark'} className="mb-3 shadow-sm">
            <Card.Body>
                <div className="d-flex align-items-center mb-2">
                    <Card.Title className="m-0">{author}</Card.Title>
                </div>
                <Card.Text>{content}</Card.Text>
                <Card.Footer className="text-muted" style={{ fontSize: '15px' }}>
                    {date}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default Comment;