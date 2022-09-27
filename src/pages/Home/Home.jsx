/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { fetchComments } from '../../redux/slices/comment';
import styles from './Home.module.scss';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => {
  return {
    gridContainer: {
      [theme.breakpoints.down(565)]: {
        display: 'flex',
        flexDirection: 'column-reverse',
        background: 'black',
      },
      [theme.breakpoints.down(1044)]: {
        height: 30,
      },
    },
    sideBlockTitle: {
      marginLeft: 10,
      outline: 'none',
      border: 'none',
      height: 30,
      width: 30,
      borderRadius: 10,
      color: '#333',
      cursor: 'pointer',
    },
    sideBlock: {
      height: 65,
    },
    gridBlock: {
      width: 522,
      [theme.breakpoints.down(520)]: {
        width: 422,
      },
      [theme.breakpoints.down(420)]: {
        width: 322,
      },
    },
    fullPost: {
      width: '100%',
    },
    date: {
      color: 'gray',
      fontSize: 15,
      fontWeight: 400,
    },
  };
});

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const [value, setValue] = useState(0);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, []);

  return (
    <>
      <div className={styles.tabs}>
        <Tabs
          style={{ marginBottom: 15 }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Новые" />
          <Tab label="Популярные" />
        </Tabs>
      </div>

      <Grid container spacing={4} flexDirection={'column-reverse'} alignContent={'center'}>
        <Grid item>
          {value === 0
            ? (isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={index}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `https://fathomless-thicket-31979.herokuapp.com${obj.imageUrl}`
                        : ''
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ),
              )
            : isPostsLoading
            ? [...Array(5)]
            : [...posts.items]
                .sort((a, b) => {
                  return a.viewsCount < b.viewsCount ? 1 : -1;
                })
                .map((obj, index) =>
                  isPostsLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      key={index}
                      id={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `https://fathomless-thicket-31979.herokuapp.com${obj.imageUrl}`
                          : ''
                      }
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      tags={obj.tags}
                      isEditable={userData?._id === obj.user._id}
                    />
                  ),
                )}
        </Grid>
        <Grid item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock />
        </Grid>
      </Grid>
    </>
  );
};
