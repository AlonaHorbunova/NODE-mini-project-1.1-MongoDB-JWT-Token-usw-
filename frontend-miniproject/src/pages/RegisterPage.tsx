import React, { useState } from "react";
import { axiosRegister } from "../api/auth";
import { setCredentials } from "../redux/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
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

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await axiosRegister({ username, email, password });
      dispatch(setCredentials(data));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при регистрации");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Регистрация
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Имя пользователя"
              margin="normal"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              type="password"
              margin="normal"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="success"
              sx={{ mt: 3, py: 1.5, fontWeight: 600, textTransform: "none" }}
            >
              Создать аккаунт
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
