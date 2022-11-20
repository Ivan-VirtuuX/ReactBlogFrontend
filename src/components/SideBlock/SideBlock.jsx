/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './SideBlock.module.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useStyles } from '../../pages/Home/Home';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

export const SideBlock = ({ title, children }) => {
  const classes = useStyles();

  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [isTags, setIsTags] = useState(false);
  const [isComments, setIsComments] = useState(false);

  const { tag } = useParams();

  const fetchTags = async () => {
    const tags = await axios.get(`/tags`);
    const comments = await axios.get(`/comments`);

    setIsTags(tags.data.length > 0 ? true : false);
    setIsComments(comments.data.length > 0 ? true : false);
  };

  useEffect(() => {
    tag ? setIsTagsOpen(true) : setIsTagsOpen(false);

    fetchTags();
  }, []);

  return (
    <Paper classes={{ root: styles.root }} className={!isTagsOpen ? classes.sideBlock : ''}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
        {isTags ? (
          <>
            {isTagsOpen ? (
              <>
                <button
                  className={classes.sideBlockTitle}
                  onClick={() => setIsTagsOpen(!isTagsOpen)}>
                  ▲
                </button>
                <>{children}</>
              </>
            ) : (
              <>
                <button
                  className={classes.sideBlockTitle}
                  onClick={() => setIsTagsOpen(!isTagsOpen)}>
                  ▼
                </button>
              </>
            )}
          </>
        ) : (
          isComments && (
            <>
              {isCommentsOpen ? (
                <>
                  <button
                    className={classes.sideBlockTitle}
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                    ▲
                  </button>
                  <>{children}</>
                </>
              ) : (
                <>
                  <button
                    className={classes.sideBlockTitle}
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                    ▼
                  </button>
                </>
              )}
            </>
          )
        )}
      </Typography>
    </Paper>
  );
};
