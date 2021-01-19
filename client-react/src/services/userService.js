import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  return null;
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getMyDetails() {
  //console.log("userService user is: " + user._id);
  return http.get(`${apiUrl}/users/me`);
}

// export async function getMyName(userId) {
//   return http.get(`${apiUrl}/users/my-name`, { userId });
// }

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);

  return null;
}

export async function updateCards(cards) {
  return http.patch(`${apiUrl}/users/cards`, { cards });
}

export async function getFavList() {
  const favs = await http.get(`${apiUrl}/users/favs`);
  //console.log("favs are: ", favs);
  return favs;
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  getMyDetails,
  updateCards,
  getFavList,
  // getMyName,
};
