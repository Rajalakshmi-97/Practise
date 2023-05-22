import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminBook from "./pages/admin/AdminBook";
import AddBooks from "./pages/admin/AddBooks";
// import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBooks from "./pages/admin/EditBooks";
import AllStudents from "./pages/admin/AllStudents";
import AddStudents from "./pages/admin/AddStudents";
import EditStudents from "./pages/admin/EditStudents";
import UserLogin from "./pages/authPage/UserLogin";
import { user } from "./common/common";
import AllBooks from "./pages/students/AllBooks";
import Bookings from "./pages/students/Bookings";
import AllBookings from "./pages/admin/AllBookings";

console.log(user, "user");
// console.log(user.role, "user");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {user && user.role === "admin" ? (
            <Route path="/" element={<AdminBook />} />
          ) : (
            <Route path="*" element={<UserLogin />} />
          )}

          <Route path="/addBooks" element={<AddBooks />} />
          <Route path="/editBook/:id" element={<EditBooks />} />

          <Route path="/all-Students" element={<AllStudents />} />
          <Route path="/addStudents" element={<AddStudents />} />
          <Route path="/editStudent/:id" element={<EditStudents />} />

          {user && user.role === "admin" ? (
            <Route path="/all-bookings" element={<AllBookings />} />
          ) : (
            <Route path="*" element={<UserLogin />} />
          )}

          {/* Students Routes */}
          {user && user.role === "student" ? (
            <Route path="/student/book" element={<AllBooks />} />
          ) : (
            <Route path="*" element={<UserLogin />} />
          )}

          {user && user.role === "student" ? (
            <Route path="/student/bookings" element={<Bookings />} />
          ) : (
            <Route path="*" element={<UserLogin />} />
          )}

          {/* Auth Login */}
          <Route path="/login" element={<UserLogin />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
