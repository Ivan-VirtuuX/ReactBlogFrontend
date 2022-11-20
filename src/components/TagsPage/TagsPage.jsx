/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Post/Post';
import { TagsBlock } from '../TagsBlock/TagsBlock';
import { CommentsBlock } from '../CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { useParams } from 'react-router-dom';
import { PostSkeleton } from '../Post/Skeleton';

export const TagsPage = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  const { tag } = useParams();

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchPosts());
  }, []);

  if (isPostsLoading) {
    return <PostSkeleton />;
  }

  return (
    <Grid container spacing={4} flexDirection={'column-reverse'} alignContent={'center'}>
      <Grid item>
        {(isPostsLoading === 'loading' ? [...Array(5)] : posts.items)
          .filter((e) => {
            return e.tags.includes(tag);
          })
          .map((obj, index) =>
            isPostsLoading === 'loading' ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.cloudImageUrl ? obj.cloudImageUrl : ''}
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
        <CommentsBlock isLoading={false} />
      </Grid>
    </Grid>
  );
};
