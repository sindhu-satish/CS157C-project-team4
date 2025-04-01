import NavigationBar from '../Components/NavigationBar.js';
import { Button, Form } from 'react-bootstrap';
import './pageStyles.css';
import { useState } from 'react';

function NewPost() {

  function handleSubmit(e) {
    alert("Submit clicked!");
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="NewPost">
        <NavigationBar />
        <div className='main-screen'>
          <h1>New Post</h1>
          <div>
            <Form onSubmit={handleSubmit} id="postForm">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" type="title" placeholder="Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control name="content" as="textarea" rows={3} />
              </Form.Group>
              <Button variant="primary" type="submit" form="postForm">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;
