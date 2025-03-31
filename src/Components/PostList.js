import React, { useState } from "react";
import Post from "./Post";
import { Container } from "react-bootstrap";

const PostList = () => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <div>
                <h2 style={{padding: '10px'}}>Posts</h2>
                <Container fluid>
                    <Post />
                    <Post />
                    <Post />
                </Container>
            </div>
        </>
    );
}

export default PostList;