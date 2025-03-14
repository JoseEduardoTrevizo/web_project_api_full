class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem("jwt");
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
    return headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      //Si devuelve error se rechaza el promise
      return Promise.reject(`Error:${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  updateProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }
  createCard({ link, name }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        link,
        name,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  deleteCardLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  addCardLike(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }

  editAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`);
    });
  }
}

export const getUserInfo = (token) => {
  return fetch(`${this.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

const api = new Api({
  baseUrl: "https://api.around.crabdance.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
