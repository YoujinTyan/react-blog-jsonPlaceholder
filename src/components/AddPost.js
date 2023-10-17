import React from "react";
import "../style/AddPost.css";


export const AddPost = ({ onAdd }) => {
  const handleOnSubmit = (ev) => {
    ev.preventDefault();
    onAdd(ev.target.title.value, ev.target.email.value, ev.target.content.value);
    ev.target.title.value = "";
    ev.target.email.value = "";
    ev.target.content.value = "";
  };

  return (
    <div className="post-wrap">
      <form onSubmit={handleOnSubmit}>
        <h3>Add post</h3>
        <input placeholder="Title" name="title" />
        <input placeholder="Content" name="content" />
        <input placeholder="Email" name="email" />
        <button className="add-btn" onSubmit={handleOnSubmit}><span>Add</span></button>
        <hr />
      </form>
    </div>
  )
}
