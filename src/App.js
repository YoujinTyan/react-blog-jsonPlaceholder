import { useEffect, useState } from "react";
import { Post } from "./components/Post";
import { AddPost } from "./components/AddPost";
import "./style/App.css";


export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/comments/?_limit=10')
    .then((response) => response.json())
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => console.log(error));
  };

  const onAdd = async (title, email, content) => {
    await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      body: JSON.stringify({
        name: title ? title : "empty",
        email: email ? email : "empty",
        body: content ? content : "empty",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      if (response.status !== 201) {
        return;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      setPosts((posts) => [...posts, data]);
    })
    .catch((error) => console.log(error));
  };

  const onEdit = async (id, title, email, content) => {
    // console.log(title, content);
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: title,
        email: email,
        body: email
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      if (response.status !== 200) {
        return;
      } else {
        console.log('success');
        return response.json();
      }
    })
    .then((data) => {
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          post.name = title;
          post.body = content;
          post.email = email;
        }
        return post;
      });

      setPosts((posts) => updatedPosts);
    })
    .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setPosts(
            posts.filter((post) => {
              return post.id !== id;
            })
          );
        }
      })
        .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <h1>Blog</h1>
      <AddPost onAdd={onAdd} />
      {posts.reverse().map((post) => (
        <Post
          id={post.id}
          key={post.id}
          title={post.name}
          content={post.body}
          email={post.email}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))};
    </div>
  );
}
