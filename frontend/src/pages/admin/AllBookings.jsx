import {
  Box,
  Button,
  Container,
  InputAdornment,
  Grid,
  FormControl,
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
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  applyBook,
  getAllIssues,
  getBooks,
  getBooksById,
  getIssuesById,
  updateIssue,
} from "../../api/bookApi";
import { toast } from "react-toastify";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import { getStudents, getStudentsById } from "../../api/studentsApi";
import { user } from "../../common/common";
import moment from "moment";

const AllBookings = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [search, setSearch] = useState("");

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
      console.log(res.data);
      for (let i of res.data) {
        const student = await getStudentsById(i.studentId);
        i.studentId = student.data;
        const book = await getBooksById(i.bookId);
        i.bookId = book.data;
      }
      setAllBooks(res.data);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allBooks.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allBooks.length / recordsPerPage);

  console.log(allBooks, "kkkk");

  const keys = ["status"];
  const handleSearch = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search))
    );
  };

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
            <Grid item xs={3}>
              <FormControl sx={{ width: "30ch" }} variant="outlined">
                <TextField
                  id="outlined-adornment-weight"
                  label="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  size="small"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </FormControl>
            </Grid>
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
                ) : handleSearch(currentRecords).length > 0 ? (
                  handleSearch(currentRecords).map((data, index) => {
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
                          {data.status === "cancel" ? (
                            <Typography sx={{ color: "red" }}>
                              {data.status}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "green" }}>
                              {data.status}
                            </Typography>
                          )}
                        </TableCell>

                        {/* <TableCell
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
                        </TableCell> */}
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

export default AllBookings;
