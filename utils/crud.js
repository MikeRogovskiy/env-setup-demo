const fetch = require("node-fetch");

const BASE_URL = "https://crudcrud.com/api/3933340caddc4b3b82e02a6de8e88210";

async function fetchJSON(url, ...args) {
  const response = await fetch(`${BASE_URL}${url}`, ...args);
  return response.json();
}

export function createPerson(data) {
  return fetchJSON(`/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function readPerson(id) {
  return fetchJSON(`/people/${id}`);
}

export async function updatePerson(id, data) {
  const { _id, ...dataWithoutID } = data;
  return fetch(`${BASE_URL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataWithoutID),
  });
}

export async function deletePerson(id) {
  return fetch(`${BASE_URL}/people/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
