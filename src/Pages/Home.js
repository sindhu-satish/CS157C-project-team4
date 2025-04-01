import NavigationBar from '../Components/NavigationBar';
import PostList from '../Components/PostList';
import './pageStyles.css';

function Home() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="Home">
        <NavigationBar />
        <div className='main-screen'>
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Home;
