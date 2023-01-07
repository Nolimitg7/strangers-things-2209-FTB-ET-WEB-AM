import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Login from "./Login";
import Register from "./Register";



const App = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch("https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts")
      .then((response) => response.json())
      .then((json) => setPosts(json.data.posts));
  }, []);
  return (
    <div>
      <h1>Strangers Things</h1>

      <nav>
        <Link to="/posts">Posts ({posts.length})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/home">Home</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
        <Route path="/home" element={<h1>Home</h1>} />
        <Route path="/posts" element={<Posts posts={posts} />} />
      </Routes>

      <Login />
      <Register />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
