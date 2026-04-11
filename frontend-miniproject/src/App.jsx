import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "./redux/auth/authSlice";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f8fafc" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

function App() {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    alert("Вы вышли из системы");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: "#fff",
            color: "#2d3436",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              sx={{ justifyContent: "space-between", px: "0 !important" }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon />}
                  sx={{ fontWeight: 600, textTransform: "none" }}
                >
                  Главная
                </Button>
                {isAuth && (
                  <Button
                    component={Link}
                    to="/create-post"
                    startIcon={<AddCircleIcon />}
                    sx={{ fontWeight: 600, textTransform: "none" }}
                  >
                    Создать
                  </Button>
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {isAuth ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "#f1f5f9",
                        px: 2,
                        py: 0.5,
                        borderRadius: 5,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "primary.main",
                          fontSize: "0.8rem",
                        }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {user?.username}
                      </Typography>
                    </Box>
                    <Tooltip title="Выйти">
                      <IconButton onClick={handleLogout} color="error">
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      component={Link}
                      to="/login"
                      startIcon={<LoginIcon />}
                      sx={{ textTransform: "none" }}
                    >
                      Вход
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      sx={{ textTransform: "none", borderRadius: 2 }}
                    >
                      Регистрация
                    </Button>
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
