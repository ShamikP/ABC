import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function EditBlog() {
  const [createdby, setCreatedby] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImgUrl] = useState('');
  const [createdat, setCreatedat] = useState(Timestamp.now().toDate().toString());

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'blogs'), {
        createdby,
        title,
        desc,
        img,
        createdat
      });

      alert('Success');
      navigate('/display');
    } catch (error) {
      alert(error.message);
    }

    setCreatedby('');
    setTitle('');
    setDesc('');
    setImgUrl('');
    setCreatedat('');
  };

  return (
    <div className="editblog-form">
      EditBlog
      <p>Add a new blog</p>
      <form onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input
          name="username"
          placeholder="ENTER YOUR NAME"
          type="text"
          onChange={(e) => {
            setCreatedby(e.target.value);
          }}
        />
        <br />

        <label>Enter Title</label>
        <input
          name="title"
          placeholder="ENTER TITLE"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />

        <label>Enter description</label>
        <textarea placeholder="enter description" type="text" onChange={(e) => { setDesc(e.target.value); }} />
        <br />

        <label>Paste image link</label>
        <input
          name="img"
          placeholder="PASTE IMAGE URL"
          type="text"
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
        />

        <div className="btn-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;


