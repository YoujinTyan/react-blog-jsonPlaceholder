import React, { useState } from "react";
import "../style/Post.css";


function PostBlock({ title, content, email, handleEdit, handleDelete, handleOnEditSubmit, isEdit }) {
  title = title.toUpperCase();
  content = content[0].toUpperCase() + content.slice(1);

  return (
    <div id="wrap" className="post-wrap">
      {!isEdit ? (
        <div className="post-item">
          <div className="item-content">
            <div className="item-body">
              <h3>{title}</h3>
              <p>{content}</p>
              <p><hr /></p>
              <p>{email}</p>
              <div className="item-footer">
                <button onClick={handleEdit}><span>Edit</span></button>
                <button id="del-btn-id" className="del-btn" onClick={handleDelete}><span>Delete</span></button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="post-item">
          <div className="item-content">
            <div className="item-body">
              <h3>Post editing...</h3>
              <form onSubmit={handleOnEditSubmit}>
                <input placeholder="Title" name="title" defaultValue={title}></input>
                <input placeholder="Content" name="content" defaultValue={content}></input>
                <input placeholder="Email" name="email" defaultValue={email}></input>
                <div className="item-footer">
                  <button onSubmit={handleOnEditSubmit}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export const Post = ({ id, title, content, email, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);
  // console.log(id);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    // console.log(evt.target.content.value);
    onEdit(id, evt.target.title.value, evt.target.email.value, evt.target.content.value)
    setIsEdit(!isEdit);
  }

  return (
    <PostBlock 
      title={title} 
      content={content} 
      email={email} 
      handleEdit={handleEdit} 
      handleDelete={handleDelete} 
      handleOnEditSubmit={handleOnEditSubmit} 
      isEdit={isEdit} />
  );
};
