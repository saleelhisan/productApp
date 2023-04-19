import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import Viewproducts from './components/Viewproducts';
import Editproduct from './components/Editproduct';


function App() {

  const islogin = useSelector((state) => Boolean(state.token));
  return (
    <Routes>
      <Route path="/" element={islogin ? <Home /> : <Navigate to="/login" />} />
      <Route path="/register" element={islogin ? <Navigate to="/" /> : <Signup />} />
      <Route path="/login" element={islogin ? <Navigate to="/" /> : <Login />} />
      <Route path="/viewproducts" element={islogin ? <Viewproducts /> : <Navigate to="/login" />} />
      <Route path="/editproduct/:id" element={islogin ? <Editproduct /> : <Navigate to="/login" />} />

    </Routes>

  );
}

export default App;


