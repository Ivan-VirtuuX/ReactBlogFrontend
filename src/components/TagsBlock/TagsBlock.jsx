import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { SideBlock } from '../SideBlock/SideBlock';
import { Link } from 'react-router-dom';

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <div>
      <SideBlock title="Тэги">
        <List>
          {(isLoading ? [...Array(5)] : items).map((name, index) => (
            <Link
              key={index}
              to={`/tags/${name}`}
              style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </SideBlock>
    </div>
  );
};
