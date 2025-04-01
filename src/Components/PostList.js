import React, { useState, useEffect } from "react";
import Post from "./Post";
import { Container } from "react-bootstrap";
import data from "../data.json";

const PostList = () => {
    const [dummyPostInfo, setDummyPostInfo] = useState([]);

    useEffect(() => {
        setDummyPostInfo(data);
    }, []);
    
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <div>
                <h2 style={{padding: '10px'}}>Posts</h2>
                <Container fluid>
                    {dummyPostInfo.map((post, index) => (
                        <div key={index} className="mb-3">
                            <Post
                                postId={post.postId}
                                title={post.title}
                                author={post.author}
                                content={post.content}
                                tags={post.tags}
                                date={post.date}
                            />
                        </div>
                    ))}
                </Container>
            </div>
        </>
    );
}

export default PostList;