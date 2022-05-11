import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLayout from './layouts/AdminLayout';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout namePage={"Posts"}><Home /></AdminLayout>} />
        <Route path="/createpost" element={<AdminLayout namePage={"Create Post"}><CreatePost /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
