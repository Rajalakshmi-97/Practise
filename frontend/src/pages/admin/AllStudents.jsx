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
import { toast } from "react-toastify";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  deleteStudentsById,
  getStudents,
  getStudentsById,
  updateStudentsById,
} from "../../api/studentsApi";

const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoding, setIsLoding] = useState(true);

  const navigate = useNavigate();

  // Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getAllStudents = async () => {
    try {
      const res = await getStudents();
      setAllStudents(res.data);
      setIsLoding(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  //   Delete th Students
  const handleDelete = async (id) => {
    try {
      await deleteStudentsById(id);
      getAllStudents();
      toast.success("Students Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allStudents.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(allStudents.length / recordsPerPage);

  const handleActivate = async (id) => {
    console.log(id,"idd")
    const res = await getStudentsById(id);

    const rr =await updateStudentsById(id, { ...res.data, status: false });
    console.log(rr.data,"kkk")
    getAllStudents();
    toast.success("You Activated the Students");
  };

  const handleDeactivate = async (id) => {
    const res = await getStudentsById(id);

    await updateStudentsById(id, { ...res.data, status: true });
    getAllStudents();
    toast.error("You Deactivate the Students");
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
                ALL Students
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => navigate("/addStudents")}
              >
                Add Students
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
                    Register Number
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Username
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Stream
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Adminssion Year
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Activate/Deactivate
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
                      colSpan={10}
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
                          {data.registerNumber}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.userName}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.name}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.email}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.phoneNumber}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.stream}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.admissionYear}
                        </TableCell>
                        <TableCell
                          style={{ textAlign: "center", fontSize: "14px" }}
                        >
                          {data.status ? (
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ display: "inline", mb: 1 }}
                              onClick={() => handleActivate(data.id)}
                            >
                              Activate
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ display: "inline" }}
                              onClick={() => handleDeactivate(data.id)}
                            >
                              Deactivate
                            </Button>
                          )}
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
                                  navigate(`/viewStudent/${data.id}`)
                                }
                              >
                                <VisibilityIcon />
                              </IconButton> */}
                            <IconButton
                              sx={{ display: "inline" }}
                              aria-label="delete"
                              style={{ color: " rgb(49, 126, 235)" }}
                              onClick={() =>
                                navigate(`/editStudent/${data.id}`)
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

export default AllStudents;
