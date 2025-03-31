import NavigationBar from '../Components/NavigationBar.js';

function NewPost() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="NewPost">
        <NavigationBar />
        <h1>New Post</h1>
      </div>
    </>
  );
}

export default NewPost;
