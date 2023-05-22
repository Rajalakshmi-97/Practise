import config from "./config";

// Adding Students
export const addStudents = async (data) => {
  return await config.post("/studentRegister", data);
};

// Get all Students
export const getStudents = async () => {
  return await config.get("/student");
};

// Get Students By ID
export const getStudentsById = async (id) => {
  return await config.get(`/student/${id}`);
};

// Update Students
export const updateStudentsById = async (id, data) => {
  return await config.patch(`/student/${id}`, data);
};

// Delete Students BY ID
export const deleteStudentsById = async (id) => {
  try {
    return await config.delete("/student/" + id);
  } catch (error) {
    return error;
  }
};

// Apply Book
export const applyBook = async () => {
  try {
    return await config.post("student/applyBook");
  } catch (error) {
    return error;
  }
};
