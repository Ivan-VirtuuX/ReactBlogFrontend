/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SideBlock } from './SideBlock/SideBlock';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comment';
import avatar from './../assets/img/ava.png';
import { useStyles } from '../pages/Home/Home';

export const CommentsBlock = ({ children, newComment, width, comments, user, isLoading }) => {
  const { id } = useParams();
  const [postComments, setPostComments] = useState([]);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.comment);

  const [lastComments, setLastComments] = useState([]);

  const fetchData = async () => {
    if (id) {
      const { data } = await axios.get(`/posts/${id}/comments`);
      setPostComments(data);
    }
  };

  const fetchLastComments = async () => {
    const { data } = await axios.get(`/comments`);

    setLastComments(
      data
        .sort((a, b) => {
          return Date.parse(data[a]?.createdAt) < Date.parse(data[b]?.createdAt);
        })
        .reverse(),
    );
  };

  useEffect(() => {
    fetchLastComments();

    dispatch(fetchComments(id));

    if (id) {
      fetchData();
    }
  }, [newComment]);

  const classes = useStyles();

  return (
    <div className={classes.gridBlock} style={{ width: width }}>
      <SideBlock title="Последние комментарии">
        <List>
          {(status === 'loading' ? [...Array(3)] : id ? postComments : lastComments).map(
            (obj, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {status === 'loading' ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar alt={obj.author} src={avatar} />
                    )}
                  </ListItemAvatar>
                  {status === 'loading' ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton variant="text" height={25} width={120} />
                      <Skeleton variant="text" height={18} width={230} />
                    </div>
                  ) : (
                    <>
                      <ListItemText primary={obj.author} secondary={obj.comment} />
                      <div className={classes.date}>{obj.createdAt.slice(0, -14)}</div>
                    </>
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ),
          )}
        </List>
        {children}
      </SideBlock>
    </div>
  );
};
