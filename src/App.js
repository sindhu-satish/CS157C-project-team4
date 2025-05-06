import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NewPost from './Pages/NewPost';
import PostPage from './Pages/PostPage';
import AddRecipe from './Pages/AddRecipe';
import EditRecipe from './Pages/EditRecipe';
import MyRecipes from './Pages/MyRecipes';
import SearchResults from './Pages/SearchResults';

function App() {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-post" element={<AddRecipe />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/edit-recipe/:postId" element={<EditRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
