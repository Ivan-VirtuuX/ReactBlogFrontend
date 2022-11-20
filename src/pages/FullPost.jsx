/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post/Post';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkDown from 'react-markdown';
import axios from '../axios';
import { AddComment } from '../components';

export const FullPost = ({ commentsCount }) => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setData(res.data);

          setLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи');
        });
    }
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  const setCommentUpdateText = (commentText) => {
    setTimeout(() => {
      setNewComment(commentText);
    }, 200);
  };

  return (
    <>
      <Post
        commentsCount={commentsCount}
        {...data}
        isFullPost
        imageUrl={data.cloudImageUrl ? data.cloudImageUrl : ''}>
        <ReactMarkDown children={data.text} disablePast error={false} helperText={null} />
      </Post>
      <CommentsBlock width={'100%'} {...data} newComment={newComment} isLoading={false}>
        <AddComment setCommentUpdateText={setCommentUpdateText} />
      </CommentsBlock>
    </>
  );
};
