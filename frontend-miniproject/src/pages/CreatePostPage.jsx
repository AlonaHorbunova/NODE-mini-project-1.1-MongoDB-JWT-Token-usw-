import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { token, isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) return setError("Нужно войти в систему");
    try {
      await createPost({ title, content }, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при создании");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 600, borderRadius: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Создать новый пост
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Заголовок поста"
            sx={{ mb: 3 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Текст поста..."
            multiline
            rows={6}
            sx={{ mb: 3 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              bgcolor: "#2d3436",
            }}
          >
            Опубликовать
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreatePostPage;
