import React, { useState } from "react";
import Post from "./Post";
import { Container } from "react-bootstrap";

const PostList = () => {
    const dummyPostInfo = [
        {
            "title": "1985",
            "author": "Bowling for Soup",
            "content": "She's seen all the classics, she knows every line Breakfast Club, Pretty In Pink, even St. Elmo's Fire She rocked out to Wham, not a big Limp Bizkit fan Thought she'd get a hand on a member of Duran Duran",
            "tags": ["Pop Punk", "Music", "Bowling for Soup"],
            "date": "2 days ago"
        },
        {
            "title": "Welcome to the Black Parade",
            "author": "MCR",
            "content": 'When I was a young boy My father took me into the city To see a marching band He said, "Son, when you grow up Would you be the savior of the broken The beaten and the damned?"',
            "tags": ["Emo", "MCR", "WTTBP"],
            "date": "1 week ago"
        },
        {
            "title": "I Miss You",
            "author": "Blink-182",
            "content": "Where are you? And I'm so sorry I cannot sleep, I cannot dream tonight I need somebody and always This sick, strange darkness Comes creeping on, so haunting every time And as I stared, I counted The webs from all the spiders",
            "tags": ["Blink-182", "whereareyew", "inmyyead"],
            "date": "2 weeks ago"
        }
    ];
    
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            <div>
                <h2 style={{padding: '10px'}}>Posts</h2>
                <Container fluid>
                    {dummyPostInfo.map((post, index) => (
                        <div key={index} className="mb-3">
                            <Post
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