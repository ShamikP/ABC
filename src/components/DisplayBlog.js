import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const DisplayBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState('');
  const [blogComments, setBlogComments] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  const handleCommentSubmit = async (event, blogId) => {
    event.preventDefault();

    if (comment.trim() === '') {
      return;
    }

    const newComment = {
      text: comment,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    };

    try {
      const commentsRef = collection(db, `blogs/${blogId}/comments`);
      const docRef = await addDoc(commentsRef, newComment);
      const addedComment = { id: docRef.id, ...newComment };
      setBlogComments((prevComments) => ({
        ...prevComments,
        [blogId]: [...(prevComments[blogId] || []), addedComment],
      }));
      setComment('');
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const fetchComments = async (blogId) => {
    const commentsRef = collection(db, `blogs/${blogId}/comments`);
    const snapshot = await getDocs(commentsRef);
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      userId: doc.data().userId,
    }));
    setBlogComments((prevComments) => ({ ...prevComments, [blogId]: comments }));
  };

  useEffect(() => {
    const blogRef = collection(db, 'blogs');
    const q = query(blogRef, orderBy('title', 'desc', 'username', 'setImgUrl', 'createdat'));

    onSnapshot(q, (snapshot) => {
      const allBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(allBlogs);
    });
  }, []);

  useEffect(() => {
    blogs.forEach((blog) => {
      fetchComments(blog.id);
    });
  }, [blogs]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <>
          {blogs.map((blog) => (
            <div key={blog.id} style={{ width: '80%', backgroundColor: '#f9f9f9', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{blog.title}</h2>
                <p style={{ fontSize: '14px', color: '#888' }}>Created by - {blog.createdby}</p>
              </div>
              <hr />
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: '1', marginRight: '20px' }}>
                  <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} src={blog.img} alt="Blog" />
                </div>
                <div style={{ flex: '2' }}>
                  <p>{blog.desc}</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>Posted on - {blog.createdat}</div>
              <div style={{ marginTop: '20px' }}>
                {isLoggedIn ? (
                  <form onSubmit={(e) => handleCommentSubmit(e, blog.id)}>
                    <div style={{ display: 'flex' }}>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginRight: '10px' }}
                      />
                      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#555', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Login to add comments</p>
                )}
                <p>comments</p>
                <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                  {blogComments[blog.id] &&
                    blogComments[blog.id].map((comment) => (
                      <li key={comment.id} style={{ marginBottom: '5px', fontSize: '14px', color: '#333' }}>
                        {comment.userId === auth.currentUser.uid ? 'You' : comment.userId}: {comment.text}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default DisplayBlog;
