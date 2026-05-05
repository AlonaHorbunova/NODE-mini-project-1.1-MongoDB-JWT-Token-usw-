import React, { useState } from "react";
import { createPost } from "../api/posts";
import { useAppSelector } from "../redux/hooks"; // Наш типизированный хук
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";

const CreatePostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { token, isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!isAuth) {
    return (
      <Container maxWidth="sm">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Вы должны войти в систему, чтобы создавать посты.
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await createPost({ title, content }, token);
      alert("Пост успешно создан!");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при создании поста");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Новая публикация
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Заголовок"
              margin="normal"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Что у вас нового?"
              margin="normal"
              value={content}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
              ) => setContent(e.target.value)}
              required
              multiline
              rows={6}
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 3, py: 1.5, fontWeight: 600, textTransform: "none" }}
            >
              Опубликовать
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatePostPage;
