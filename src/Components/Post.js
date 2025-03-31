import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Post = () => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <Card bg="secondary" style={{padding: '10px'}}>
                <Card.Title>Post Title</Card.Title>
                <Card.Subtitle>Author</Card.Subtitle>
                <Card.Body>Post Content</Card.Body>
            </Card>
        </>
    );
}

export default Post;