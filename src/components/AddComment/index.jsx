/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './AddComment.module.scss';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/slices/comment';
import avatar from './../../assets/img/ava.png';
import { fetchAuthMe } from '../../redux/slices/auth';

export const Index = ({ setCommentUpdateText }) => {
  const { id } = useParams();

  const [commentText, setCommentText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      setCommentUpdateText(commentText);
      dispatch(createComment({ id, commentText }));
      setCommentText('');
    } catch (err) {
      console.warn(err);
      alert('Ошибка при отправке комментария');
    }
  };

  const onChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.data && (
        <div className={styles.root}>
          <Avatar classes={{ root: styles.avatar }} src={avatar} />
          <div className={styles.form}>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              value={commentText}
              onChange={onChangeCommentText}
            />
            <Button onClick={onSubmit} variant="contained">
              Отправить
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
