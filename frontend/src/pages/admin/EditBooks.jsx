import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppNavbar from "../../components/AppNavbar";
import { getBooksById, updateBooksById } from "../../api/bookApi";

const EditBooks = () => {
  const [data, setData] = useState({
    bookName: "",
    author: "",
    publisher: "",
    quantity: null,
    edition: null,
    status: "Pending",
  });

  const navigate = useNavigate();
  //   const [errors, setErrors] = useState({});
  const { id } = useParams();

  const getBook = async () => {
    try {
      const res = await getBooksById(id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newErrors = Validate(data);
    // setErrors(newErrors);
    // if (!Object.keys(newErrors).length) {
    try {
      await updateBooksById(id, data);

      navigate("/");
      toast.success("Books Updated Successfully");
    } catch (error) {
      console.log(error);
    }
    // }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "rgb(181 229 237)",
        }}
      >
        <AppNavbar />

        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: '100vh',
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <Paper
            sx={{ width: "700px", overflow: "hidden", marginBottom: "2rem" }}
          >
            <Box
              sx={{
                width: "100%",
                marginBottom: "1rem",
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "primary",
                  marginLeft: "2rem",
                }}
              >
                Update Books
              </Typography>
            </Box>
            <Divider style={{ marginBottom: "1rem" }} />

            <FormControl style={{ paddingLeft: "2rem" }}>
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {/* {errors.bookName ? (
                        <AccountCircle
                          sx={{ color: "#ef2929f5", mr: 1 }}
                          style={{ paddingBottom: "1.5rem" }}
                        />
                      ) : ( */}
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      {/* )} */}
                      <TextField
                        id="input-with-sx"
                        label="Book Name"
                        variant="standard"
                        style={{
                          width: 250,
                        }}
                        name="bookName"
                        type="text"
                        value={data.bookName}
                        onChange={handleChange}
                        // helperText={
                        //   errors.bookName ? (
                        //     <span style={{ color: "red" }}>{errors.bookName}</span>
                        //   ) : (
                        //     ""
                        //   )
                        // }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {/* {errors.author ? (
                        <AccountCircle
                          sx={{ color: "#ef2929f5", mr: 1 }}
                          style={{ paddingBottom: "1.5rem" }}
                        />
                      ) : ( */}
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      {/* )} */}
                      <TextField
                        id="input-with-sx"
                        label="Book Author"
                        variant="standard"
                        style={{
                          width: 250,
                        }}
                        name="author"
                        type="text"
                        value={data.author}
                        onChange={handleChange}
                        // helperText={
                        //   errors.author ? (
                        //     <span style={{ color: "red" }}>
                        //       {errors.author}
                        //     </span>
                        //   ) : (
                        //     ""
                        //   )
                        // }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {/* {errors.publisher ? (
                        <DescriptionIcon
                          sx={{ color: "#ef2929f5", mr: 1 }}
                          style={{ paddingBottom: "1.5rem" }}
                        />
                      ) : ( */}
                      <DescriptionIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      {/* )} */}
                      <TextField
                        id="input-with-sx"
                        label="Publisher"
                        variant="standard"
                        style={{
                          width: 600,
                        }}
                        name="publisher"
                        type="text"
                        value={data.publisher}
                        onChange={handleChange}
                        // helperText={
                        //   errors.publisher ? (
                        //     <span style={{ color: "red" }}>
                        //       {errors.publisher}
                        //     </span>
                        //   ) : (
                        //     ""
                        //   )
                        // }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {/* {errors.quantity ? (
                        <AccountCircle
                          sx={{ color: "#ef2929f5", mr: 1 }}
                          style={{ paddingBottom: "1.5rem" }}
                        />
                      ) : ( */}
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      {/* )} */}
                      <TextField
                        id="input-with-sx"
                        label="Book Quantity"
                        variant="standard"
                        style={{
                          width: 250,
                        }}
                        name="quantity"
                        type="number"
                        value={data.quantity}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // helperText={
                        //   errors.quantity ? (
                        //     <span style={{ color: "red" }}>{errors.quantity}</span>
                        //   ) : (
                        //     ""
                        //   )
                        // }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      {/* {errors.edition ? (
                        <AccountCircle
                          sx={{ color: "#ef2929f5", mr: 1 }}
                          style={{ paddingBottom: "1.5rem" }}
                        />
                      ) : ( */}
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                      {/* )} */}
                      <TextField
                        id="input-with-sx"
                        label="Book Edition"
                        variant="standard"
                        style={{
                          width: 250,
                        }}
                        name="edition"
                        type="number"
                        value={data.edition}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // helperText={
                        //   errors.edition ? (
                        //     <span style={{ color: "red" }}>{errors.edition}</span>
                        //   ) : (
                        //     ""
                        //   )
                        // }
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        style={{
                          width: "150px",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </FormControl>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default EditBooks;
