const _user = localStorage.getItem("token");

export const user = _user ? JSON.parse(_user) : null;
