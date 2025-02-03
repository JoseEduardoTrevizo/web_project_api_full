export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const token = await response.json();
    return token;
  } catch (err) {
    console.error(err);
  }
}

export async function register(email, password) {
  try {
    const response = await fetch(
      "https://se-register-api.en.tripleten-services.com/v1/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/user/me`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Los parámetros se envuelven en un objeto, convertido en un string
    // JSON y se envían en el cuerpo de la solicitud.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
