import config from "./config";

// Adding Books
export const addBooks = async (data) => {
  return await config.post("/book", data);
};

// Get all Books
export const getBooks = async () => {
  return await config.get("/book");
};

// // Get Books By ID
export const getBooksById = async (id) => {
  return await config.get(`/book/${id}`);
};

// Update Books By ID
export const updateBooksById = async (id, data) => {
  return await config.patch(`/book/${id}`, data);
};

// Delete Books BY ID
export const deleteBooksById = async (id) => {
  try {
    return await config.delete("/book/" + id);
  } catch (error) {
    return error;
  }
};

// Apply Book to Book the student
export const applyBook = async (data) => {
  try {
    return await config.post("/bookIssue", data);
  } catch (error) {
    return error;
  }
};

export const getAllIssues = async () => {
  try {
    return await config.get("/bookIssue");
  } catch (error) {
    return error;
  }
};

export const getIssuesById = async (id, data) => {
  try {
    return await config.get(`/bookIssue/${id}`, data);
  } catch (error) {
    return error;
  }
};
export const updateIssue = async (id, data) => {
  try {
    return await config.patch(`/bookIssue/${id}`, data);
  } catch (error) {
    return error;
  }
};
