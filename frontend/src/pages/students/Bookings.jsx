import {
  Box,
  Button,
  Container,
  Grid,
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
  getAllIssues,
  getBooks,
  getBooksById,
  getIssuesById,
  updateBooksById,
  updateIssue,
} from "../../api/bookApi";
import { toast } from "react-toastify";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import { getStudents, getStudentsById } from "../../api/studentsApi";
import { user } from "../../common/common";
import moment from "moment";

const Bookings = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  const [applyDate, setApplyDate] = useState({
    period: "",
    returnDate: "",
  });

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

  const getAllBookings = async () => {
    try {
      const res = await getAllIssues();

      let item = [];
      for (let i of res.data) {
        if (i.studentId === user.item.id) {
          const student = await getStudentsById(i.studentId);
          i.studentId = student.data;
          const book = await getBooksById(i.bookId);
          i.bookId = book.data;
          item.push(i);
        }
      }
      setAllBooks(item);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const [open, setOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const handleClickOpen = (id) => {
    setBookId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allBooks.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allBooks.length / recordsPerPage);

  const handleCancel = async (id) => {
    try {
      const issue = await getIssuesById(id);
      console.log(issue.data.returnDate, "eee");

      const issuedBook = await getBooksById(issue.data.bookId);

      await updateBooksById(issue.data.bookId, {
        ...issuedBook.data,
        status: "Pending",
      });

      await updateIssue(id, {
        ...issue.data,
        status: "Cancel",
      });

      getAllBookings();
      toast.success("Cancel the Book");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = async (id) => {
    try {
      const issue = await getIssuesById(id);
      console.log(issue.data.returnDate, "eee");

      const issuedBook = await getBooksById(issue.data.bookId);

      await updateBooksById(issue.data.bookId, {
        ...issuedBook.data,
        status: "Pending",
      });

      if (issue.data.returnDate >= moment(new Date()).format("YYYY-MM-DD")) {
        await updateIssue(id, {
          ...issue.data,
          status: "Return",
        });

        getAllBookings();
        toast.success("Return the Book");
      } else {
        await updateIssue(id, {
          ...issue.data,
          dueDate: moment(new Date()).format("YYYY-MM-DD"),
          fine: 100,
          status: "Return",
        });

        getAllBookings();
        toast.error("As Return has Passed you had a fine");
        toast.success("Return the Book");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Apply to Book</DialogTitle>
          <DialogContent>
            <form>
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
                  {/* <TableCell
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
                  </TableCell> */}

                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Issue Date
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Period
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Return Date
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Fine
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
                      colSpan={15}
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
                          {data.bookId.bookName}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.bookId.author}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.issueDate}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.period}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.returnDate}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.dueDate === null
                            ? ""
                            : moment(data.dueDate).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.fine}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.status}
                        </TableCell>

                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              mx: 2,
                            }}
                          >
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ display: "inline" }}
                              onClick={() => handleCancel(data.id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ display: "inline" }}
                              onClick={() => handleReturn(data.id)}
                            >
                              Return
                            </Button>
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
                      colSpan={15}
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

export default Bookings;
