import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/Menu';
import moment from 'moment';
import '../styles/single.css';


function SingleWithComments() {
  const location = useLocation();
  const tripId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState([]);
  const [desc, setDesc] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editCommentShow, setEditCommentShow] = useState(true);
  const [editCommentCurrent, setEditCommentCurrent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips/${tripId}`);
        setTrip(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [tripId]);

  const handelDelete = async () => {
    try {
      await axios.delete(`/trips/${tripId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips/${tripId}`);
        setDesc(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [desc]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${tripId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditComment(e.target.value);
  };

  
  const handleCommentSubmit = async () => {
    try {
      if (!currentUser) {
        console.log('Korisnik nije prijavljen.');
        alert("Prijavite se da biste mogli komentarisat!")
        return;
      }


      const response = await axios.post(`/comments/${tripId}`, {
        content: newComment,
        userId: currentUser.id,
        tripId: tripId
       
      });

      console.log('Odgovor od servera:', response.data);

      const commentsResponse = await axios.get(`/comments/${tripId}`);
      setComments(commentsResponse.data);


      setNewComment('');

      console.log('Komentar je uspješno dodan.');
    } catch (error) {
      console.error('Greška prilikom dodavanja komentara:', error);
    }
  };

  
  
  

  useEffect(() => {
    setEditCommentShow(true);
  }, [editCommentCurrent]);

  const CommentEdit = (commentid) => {
    setEditCommentCurrent(commentid);
    setEditCommentShow(!editCommentShow);
  };

  const handleCommentEdit = async (commentId, commentUserId) => {
    try {
      await axios.put(`/comments/${tripId}/${commentId}`, {
        content: editComment,
        userId: commentUserId,
      });
      const res = await axios.get(`/comments/${tripId}`);
      setComments(res.data);
      setEditCommentShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    
    console.log(tripId);
    console.log(commentId);
    
    try {
      await axios.delete(`/comments/${tripId}/${commentId}`);
      const res = await axios.get(`/comments/${tripId}`);
      setComments(res.data);
      // res.send(`Deleted comment with id ${commentId} for trip with id ${tripId}`)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <div className='main-box-single'>
        <h1 className='title-single'>{trip.title}</h1>
        <div className='content-box-single'>
          <div className='user-info'>
            <img className='img-single' src={`../upload/${trip?.img || ''}`} alt="img here" />
            <div className='description-single'>
              
              <p>{trip?.desc}</p>
            </div>

            <div className='trip-info'>
              {trip.userImg && <img className='avatar-single' src={`../upload/${trip.userImg || ''}`} alt="user image" />}
              <div className='avatar-text-single'>
                <p>Objavljeno {moment(trip.date).fromNow()}</p>
                <p> {trip.username}</p>
              </div>
              
            </div>
            <p>Cijena: {trip?.price}</p>
              <p>Datum polaska: {trip?.tripDate}</p>

            {currentUser?.username === trip.username && (
              <div className='user-actions'>
                <Link className='button-single' to={`/write?edit=${tripId}`} state={trip}>
                  Uredi
                </Link>
                <Link className='button-delete-single' onClick={handelDelete}>Obriši</Link>
              </div>
            )}
          </div>
        </div>
        <div className='recomendations'>
          <Menu cat={trip.cat} />
        </div>
      </div>

      <div className="Forum">
        <div>
          <h2 className="headingForum">Komentari</h2>
          <div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Napišite komentar..."
            />
            <button onClick={handleCommentSubmit}>Potvrdi</button>
          </div>
          <div>
            {comments.map((comment) => (
              
              <div key={comment.id}>
               
                
                <div className="user">
                  
                  <div className="profile_picture">
                    {comment.userImg && (
                      <img
                        className="avatar-single"
                        src={`../upload/${comment.userImg}` || ''}
                        alt="user image"
                      />
                    )}
                  </div>
                  <div className="username">
                    <span>{comment.username}</span>
                  </div>
                  <br />
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
               
                {comment.userId == currentUser?.id && (
                  
                  <div className="user-actions">
                     
                    <Link className="button-single" onClick={() => CommentEdit(comment.id)}>
                      Uredi
                    </Link>
                    {editCommentShow && comment.id === editCommentCurrent && (
                      <div>
                        <textarea
                          value={editComment}
                          onChange={handleEditCommentChange}
                          placeholder="Uredi komentar..."
                        />
                        <button onClick={() => handleCommentEdit(comment.id, comment.userId)}>
                          Uredi
                        </button>
                      </div>
                    )}
                    <Link
                      className="button-delete-single"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      Obriši
                    </Link>
                    
                  </div>
                )}
                {currentUser?.is_admin == "admin" && (
                      <Link
                      className="button-delete-single"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      Obriši
                    </Link>
                    )}
              </div>
              
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleWithComments;
