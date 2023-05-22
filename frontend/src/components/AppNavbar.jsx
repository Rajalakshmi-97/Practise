import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { user } from "../common/common";
// import { user } from "../common/common";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    // window.location.assign("/");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <Link to="/">
                <Avatar
                  alt="logo"
                  src="/src/assets/logo.png"
                  style={{
                    width: 60,
                    height: 60,
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    marginRight: "1rem",
                  }}
                />
              </Link> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
                style={{
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  marginRight: "5rem",
                }}
              >
                Library Management System
              </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {user.role === "admin" && (
                <Button
                  onClick={() => navigate("/")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Book
                </Button>
              )}
              {user.role === "admin" && (
                <Button
                  onClick={() => navigate("/all-Students")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Students
                </Button>
              )}

              {user.role === "admin" && (
                <Button
                  onClick={() => navigate("/all-bookings")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Bookings
                </Button>
              )}

              {user.role === "student" && (
                <Button
                  onClick={() => navigate("/student/book")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Book
                </Button>
              )}

              {user.role === "student" && (
                <Button
                  onClick={() => navigate("/student/bookings")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Bookings
                </Button>
              )}
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button color="inherit" sx={{ flexGrow: 0 }} onClick={handleLogout}>
              {user.role === "admin" ? "ADMIN" : user.item.name}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AppNavbar;
