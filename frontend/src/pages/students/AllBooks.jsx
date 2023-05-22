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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AppNavbar from "../../components/AppNavbar";
import { useEffect, useState } from "react";
import {
  applyBook,
  getBooks,
  getBooksById,
  updateBooksById,
} from "../../api/bookApi";
import { toast } from "react-toastify";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import { user } from "../../common/common";
import moment from "moment/moment";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  const [applyDate, setApplyDate] = useState({
    bookId: null,
    studentId: user.item.id,
    issueDate: "",
    period: "",
    returnDate: "",
    status: "Apply",
    fine: "",
    dueDate: "",
  });

  const [issuedBook, setIssuedBook] = useState([])
  const handleChange = (e) => {
    setApplyDate({
      ...applyDate,
      [e.target.name]: e.target.value,
    });
  };

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

  const [open, setOpen] = useState(false);
  const [book, setBook] = useState("");

  const handleClickOpen = async (id) => {
    console.log(id, "ggg");
    setBook(id);
    const {data} = await getBooksById(id)
    setIssuedBook(data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      // const issuedBook = await getBooksById(book);
      console.log(issuedBook, "iii");
      await updateBooksById(book, { ...issuedBook, status: "Booked" });
      applyDate.bookId = book;
      applyDate.issueDate = moment(new Date()).format("YYYY-MM-DD");
      await applyBook(applyDate);
      toast.success("Apply for Book");
      setOpen(false);

      setApplyDate({
        period: "",
        returnDate: "",
      });
      getAllBooks()
    } catch (error) {
      console.log(error);
    }
  };
  console.log(applyDate, "dataa");

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allBooks.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allBooks.length / recordsPerPage);

  const handleAlready = () => {
    toast.error("Already Has Been Booked");
  };
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Apply to Book</DialogTitle>
          <DialogContent>
            <form onSubmit={handleBook}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Period"
                type="number"
                fullWidth
                variant="standard"
                name="period"
                value={applyDate.period}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Return Date"
                type="date"
                fullWidth
                variant="standard"
                name="returnDate"
                value={applyDate.returnDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: "true",
                }}
              />
              <Button variant="contained" type="submit">
                Apply
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

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
            <Grid item xs={2}></Grid>
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
                    Status
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
                          {data.status === "Pending"
                            ? "Not Booked"
                            : data.status}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            {data.status === "Booked" ? (
                              <IconButton
                                sx={{ display: "inline" }}
                                style={{ color: "rgb(112 47 239)" }}
                                onClick={() => handleAlready()}
                              >
                                Book
                              </IconButton>
                            ) : (
                              <IconButton
                                sx={{ display: "inline" }}
                                style={{ color: "rgb(112 47 239)" }}
                                onClick={() => handleClickOpen(data.id)}
                              >
                                Book
                              </IconButton>
                            )}
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

export default AllBooks;
