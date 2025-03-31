import React, { useState } from "react";
import { Card, Stack, Badge } from "react-bootstrap";

const Post = ({title, author, content, tags, date}) => {
    //change this later when i set up routes
    const handleClick = () => {
        alert("Card clicked!");
    };

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <Card bg="secondary" style={{padding: '10px'}} onClick={handleClick}>
                <Card.Body>
                    <Card.Title style={{fontSize: '30px'}}>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <Card.Body style={{fontSize: '18px'}}>
                        {content}
                    </Card.Body>
                </Card.Body>
                <Card.Footer style={{fontSize: '12px'}}>
                    <div className="d-flex">
                        <div style={{paddingRight: '10px'}}>Tags:</div>
                        <Stack direction="horizontal" gap={3}>
                            {tags.map((tag, index) => (
                                <Badge key={index} pill bg="light" text="dark">
                                    {tag}
                                </Badge>
                            ))}
                        </Stack>
                        <div className="ms-auto">{date}</div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    );
}

export default Post;