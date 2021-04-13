import { apiSettings } from "./utils";

export const BASE_URL = apiSettings.mainUrl;

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, email }),
  })
    .then((res) => {
      if (
        !res ||
        res.status === 400 ||
        res.status === 500 ||
        res.status === 409
      ) {
        throw new Error(res);
      }

      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return err;
    });
};

export function getContent(jwt) {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {});
}

export function login(email, password) {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {});
}
