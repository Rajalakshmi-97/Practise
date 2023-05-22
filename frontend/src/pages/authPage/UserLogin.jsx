import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Validate from "../../validations/StudentLoginValidate";
// import axios from "axios";
import { getStudents } from "../../api/studentsApi";

const UserLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("admin");

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = Validate(data);
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        if (role === "admin") {
          if (data.email === "admin@gmail.com" && data.password === "admin") {
            localStorage.setItem(
              "token",
              JSON.stringify({
                data,
                role: "admin",
                // email: "Admin",
              })
            );
            navigate("/");
            window.location.assign("/");
            toast.success("Logged IN Successfully");
          } else {
            toast.error("Invalid Credentials");
          }
        } else {
          // const res = await axios.post(
          //   "http://localhost:8081/api/v1/studentLogin",
          //   data
          // );

          const res = await getStudents();
          let item = "";
          for (let i of res.data) {
            if (i.email === data.email && i.password === data.password) {
              item = i;
            }
          }
          if (item) {
            if (!item.status) {
              localStorage.setItem(
                "token",
                JSON.stringify({
                  item,
                  role: "student",
                })
              );
              navigate("/student/book");
              window.location.assign("/student/book");
              toast.success("Logged IN Successfully");
            } else {
              toast.error("Admin Has Deactivated You");
            }
          } else {
            toast.error("Invalid Credentials");
          }
        }
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/148/392/948/1920x1080-px-books-interior-design-interiors-knowledge-library-shelves-anime-pokemon-hd-art-wallpaper-preview.jpg')`,
        backgroundPosition: "center",
        backgroundRepeat: "revert",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* <AppNavbar /> */}
      <Container
        style={{
          minWidth: "800px",
          paddingTop: "5rem",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}> */}
        <Box style={{ minWidth: "620px", maxHeight: "500px" }}>
          <Grid container>
            <Grid item xs={12} sm={5} md={5}>
              <div
                style={{
                  width: "100%",
                  minHeight: "20vh",
                  backgroundColor: "Highlight",
                }}
              >
                <Box
                  style={{
                    padding: "1rem",
                    marginTop: "5rem",
                    paddingTop: "2rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="#fff"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    Welcome to
                  </Typography>
                  <Typography
                    variant="h4"
                    color="#fff"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    Library Management System
                  </Typography>

                  <Typography
                    variant="h6"
                    color="#fff"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    Login to continue
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    paddingBottom: "1rem",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ width: 130 }}
                    onClick={() => {
                      setRole("admin");
                    }}
                  >
                    <Typography variant="h5" component="h3">
                      ADMIN
                    </Typography>
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ width: 130 }}
                    onClick={() => {
                      setRole("student");
                    }}
                  >
                    <Typography variant="h5" component="h3">
                      STUDENT
                    </Typography>
                  </Button>
                </Box>
              </div>
            </Grid>
            {/* <Divider orientation="vertical" flexItem>
                VERTICAL
              </Divider> */}
            <Divider orientation="vertical" flexItem />

            <Grid item xs={12} sm={6} md={6}>
              <Card style={{ padding: "1rem" }}>
                <CardMedia
                  sx={{ height: 100, width: 150, margin: "auto" }}
                  image="/src/assets/login.jpg"
                  title="Logo"
                />
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#757ce8"
                  >
                    Library Management
                  </Typography>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {role === "admin" ? "ADMIN LOGIN" : "STUDENT LOGIN"}
                  </Typography>

                  <FormControl>
                    <form onSubmit={handleSubmit}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        {errors.email ? (
                          <AccountCircle
                            sx={{ color: "#ef2929f5", mr: 1 }}
                            style={{ paddingBottom: "1.5rem" }}
                          />
                        ) : (
                          <AccountCircle
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                        )}
                        <TextField
                          id="input-with-password"
                          label="email"
                          variant="standard"
                          style={{
                            width: 250,
                          }}
                          name="email"
                          type="text"
                          value={data.email}
                          onChange={handleChange}
                          helperText={
                            errors.email ? (
                              <span style={{ color: "red" }}>
                                {errors.email}
                              </span>
                            ) : (
                              ""
                            )
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: "2rem",
                        }}
                      >
                        {errors.password ? (
                          <LockIcon
                            sx={{ color: "#ef2929f5", mr: 1 }}
                            style={{ paddingBottom: "1.5rem" }}
                          />
                        ) : (
                          <LockIcon
                            sx={{ color: "action.active", mr: 1, my: 0.5 }}
                          />
                        )}
                        <TextField
                          id="input-with-sx"
                          label="Password"
                          variant="standard"
                          style={{
                            width: 250,
                          }}
                          name="password"
                          type="password"
                          value={data.password}
                          onChange={handleChange}
                          helperText={
                            errors.password ? (
                              <span style={{ color: "red" }}>
                                {errors.password}
                              </span>
                            ) : (
                              ""
                            )
                          }
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: "1rem",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          size="small"
                          style={{ width: 250 }}
                        >
                          <LoginIcon sx={{ color: "white", mr: 1 }} />
                          <Typography variant="h5" component="h3">
                            Login
                          </Typography>
                        </Button>
                      </Box>
                    </form>
                  </FormControl>
                  {/* <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography component="div" style={{ marginTop: "0.5rem" }}>
                      Don't have an account?
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => navigate("/signup")}
                      style={{ marginTop: "0.1rem", marginLeft: "0.1rem" }}
                    >
                      SignUp
                    </Button>
                  </Box> */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* </Grid>
          </Grid> */}
      </Container>
    </div>
  );
};

export default UserLogin;
