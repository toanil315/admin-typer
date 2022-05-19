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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout namePage={"Posts"}><Home /></AdminLayout>} />
        <Route path="/createpost" element={<AdminLayout namePage={"Create Post"}><CreatePost /></AdminLayout>} />
        <Route path="/createpostv2" element={<AdminLayout namePage={"Create Post Version 2"}><CreatePostVer2 /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
