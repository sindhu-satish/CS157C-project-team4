import NavigationBar from '../Components/NavigationBar';
import PostList from '../Components/PostList';

function Home() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <div className="Home">
        <NavigationBar />
        <div style={{
          background: '#31353e',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 'calc(10px + 2vmin)',
          color: 'white'}}>
        <PostList />
        </div>
      </div>
    </>
  );
}

export default Home;
