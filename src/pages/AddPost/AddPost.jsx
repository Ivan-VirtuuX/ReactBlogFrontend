/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import axios from '../../axios';
import cloudAxios from '../../cloudAxios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);
  const isEditing = Boolean(id);
  const [comments, setComments] = useState([]);
  const [imageFormData, setImageFormData] = useState([]);
  let cloudImageUrl = '';

  const handleChangeFile = async (files) => {
    try {
      const formData = new FormData();

      formData.append('file', files[0]);
      formData.append('upload_preset', 'cqxjdiz4');

      setImageFormData(formData);

      const { data } = await axios.post('/upload', formData);

      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      if (imageUrl) {
        const { data } = await cloudAxios.post(`/upload`, imageFormData);

        cloudImageUrl = data.secure_url;
      }

      const fields = {
        title,
        cloudImageUrl,
        tags,
        comments,
        text,
      };

      const tagsLength = [];
      let splitTags = tags.split(',');

      for (let i = 0; i < splitTags.length; i++) {
        tagsLength.push(splitTags[i].replace(' ', '').length);
      }

      if (tagsLength.some((e) => e <= 12)) {
        const { data } = await axios.post('/posts', fields);
        const id = data._id;
        navigate(`/posts/${id}`);
      } else if (tagsLength.some((e) => e > 12)) {
        alert('Теги слишком длинные');
      }
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи');
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.cloudImageUrl);
          setTags(data.tags.join(','));
          setComments(data.comments);
        })
        .catch((err) => {
          console.warn(err);
          console.log('Ошибка при получении статьи');
        });
    }
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
        style={{ marginRight: 15 }}>
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={(e) => handleChangeFile(e.target.files)}
        hidden
      />
      {imageUrl && (
        <>
          <div className={styles.delete}>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
          </div>
          <img
            className={styles.image}
            src={id ? imageUrl : `https://reactblogbackend-production.up.railway.app${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
        classes={{ root: styles.fullscreen }}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to={'/'}>
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
