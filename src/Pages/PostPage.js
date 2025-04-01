import React, { useState, useEffect } from "react";
import NavigationBar from '../Components/NavigationBar.js';
import { useParams } from 'react-router-dom';
import data from "../data.json";
import { Container, Stack, Badge} from "react-bootstrap";
import './pageStyles.css';

const PostPage = () => {
    const { postId } = useParams();  

    const [dummyPostInfo, setDummyPostInfo] = useState([]);

    useEffect(() => {
        setDummyPostInfo(data);
    }, []);

    const postContent = data[postId];

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <NavigationBar />
            <div className="main-screen">
              <Container fluid>
                <h1>{postContent.title}</h1>
                <Stack direction="horizontal" gap={3}>
                  <div className="h-2">{postContent.author}</div>
                  <div className="h-2 ms-auto">{postContent.date}</div>
                </Stack>
                <Stack direction="horizontal" gap={3}>
                  {postContent.tags.map((tag, index) => (
                      <Badge key={index} pill bg="light" text="dark">
                          {tag}
                      </Badge>
                  ))}
                </Stack>
                <div className="p-2">
                  {postContent.content}
                </div>
              </Container>
              <footer >Post ID: {postId}</footer>
            </div>
        </>
    );
};

export default PostPage;
