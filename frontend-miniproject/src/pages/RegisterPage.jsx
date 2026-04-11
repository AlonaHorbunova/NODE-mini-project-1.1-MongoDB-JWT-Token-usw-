import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRegister } from "../api/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Сбрасываем старую ошибку
    try {
      await axiosRegister(formData);
      alert("Регистрация успешна!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при регистрации");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 1, fontWeight: 700, textAlign: "center" }}
        >
          Создать аккаунт
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
        >
          Присоединяйтесь к нашей ленте постов
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
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "action.active", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "action.active", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "action.active", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
