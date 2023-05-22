import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppNavbar from "../../components/AppNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteBooksById, getBooks } from "../../api/bookApi";
import { toast } from "react-toastify";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const AdminBook = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  const navigate = useNavigate();

  // Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getAllBooks = async () => {
    try {
      const res = await getBooks();
      setAllBooks(res.data);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  //   Delete th books
  const handleDelete = async (id) => {
    try {
      await deleteBooksById(id);
      getAllBooks();
      toast.success("Books Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allBooks.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allBooks.length / recordsPerPage);

  console.log(allBooks,"kk")
  return (
    <>
      <AppNavbar />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: '100vh',
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", marginBottom: "1rem", marginTop: "2rem" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Typography
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "primary",
                  marginLeft: "2rem",
                }}
              >
                ALL Books
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => navigate("/addBooks")}
              >
                Add Books
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden", marginBottom: "2rem" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Sr. No.
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Book Name
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Book Author
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Book Publisher
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Book Quantity
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Book Edition
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoding ? (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      style={{ paddingTop: "2rem" }}
                      colSpan={7}
                    >
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        style={{ fontSize: "2rem" }}
                      >
                        Loading...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : currentRecords.length > 0 ? (
                  currentRecords.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {(currentPage - 1) * recordsPerPage + index + 1}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.bookName}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.author}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.publisher}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.quantity}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.edition}
                        </TableCell>

                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {/* <IconButton
                              sx={{ display: "inline" }}
                              style={{ color: "rgb(112 47 239)" }}
                              onClick={() =>
                                navigate(`/viewBook/${data.id}`)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton> */}
                            <IconButton
                              sx={{ display: "inline" }}
                              aria-label="delete"
                              style={{ color: " rgb(49, 126, 235)" }}
                              onClick={() =>
                                navigate(`/editBook/${data.id}`)
                              }
                            >
                              <BorderColorIcon />
                            </IconButton>
                            <IconButton
                              sx={{ display: "inline" }}
                              aria-label="delete"
                              style={{ color: "red" }}
                              onClick={() => handleDelete(data.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{ paddingTop: "2rem" }}
                      colSpan={7}
                    >
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        style={{ fontSize: "2rem" }}
                      >
                        No Data to Display
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            m={2}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            //   sx={boxDefault}
          >
            <Pagination
              style={{
                display: "flex",
                alignItems: "right",
              }}
              count={nPages}
              color="success"
              onChange={handlePageChange}
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AdminBook;
