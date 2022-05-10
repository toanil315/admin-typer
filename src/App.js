import logo from './logo.svg';
import './App.css';
import AdminLayout from './layouts/AdminLayout';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <AdminLayout namePage={"Post"}>
      <CreatePost />
    </AdminLayout>
  );
}

export default App;
