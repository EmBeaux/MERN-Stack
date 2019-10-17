const setAuthToken = token => {
  localStorage.token = "";
  if (token) {
    localStorage.token = token;
  }

  window.location.replace("/")
};
export default setAuthToken;
