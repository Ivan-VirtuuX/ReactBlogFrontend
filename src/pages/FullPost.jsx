/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkDown from 'react-markdown';
import axios from '../axios';

export const FullPost = ({ commentsCount }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  const { id } = useParams();

  useEffect(() => {
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
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl ? `https://fathomless-thicket-31979.herokuapp.com${data.imageUrl}` : ''
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isFullPost>
        <ReactMarkDown children={data.text} disablePast error={false} helperText={null} />
      </Post>
      <CommentsBlock
        width={'100%'}
        items={data.comments}
        user={data.user}
        newComment={newComment}
        isLoading={false}>
        <Index setCommentUpdateText={setCommentUpdateText} />
      </CommentsBlock>
    </>
  );
};
