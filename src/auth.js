import axios from "axios";

export function login(credentials) {
  const url = "http://localhost:8080/Gestoque/login";

  return new Promise((res, rej) => {
    axios.post(url, credentials).then((response => {
      res(response.headers);
      console.log(response.headers);
    }))
      .catch((err) => {
        rej("Login ou senha inválidos.")
      })
  })
}

export function getLocalUser() {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return null;
  }

  return userStr
}