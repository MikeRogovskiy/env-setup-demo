const fetch = require("node-fetch");

const BASE_URL = "https://crudcrud.com/api/d6c5d270b6994da9bc4982d395ee3f17";

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
