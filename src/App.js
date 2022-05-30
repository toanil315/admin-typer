import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLayout from './layouts/AdminLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home'
import CreatePostVer2 from './pages/CreatePostVer2';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path="/" element={<AdminLayout namePage={"Posts"}><Home /></AdminLayout>} />
        <Route path="/createpost" element={<AdminLayout namePage={"Create Post"}><CreatePost /></AdminLayout>} />
        <Route path="/publish" element={<AdminLayout namePage={"Publish Post"} />}>
          <Route index element={<CreatePostVer2 />} />
          <Route path='/publish/:id' element={<CreatePostVer2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
