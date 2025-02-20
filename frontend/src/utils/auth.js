class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { "content-type": "application/json" },
    };

    const token = localStorage.getItem("jwt");
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options).then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const json = await res.json();
      return Promise.reject(`Error: ${json.error}}`);
    });
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  register(email, password) {
    return this._makeRequest("/signup", "POST", { email, password });
  }

  login(email, password) {
    return this._makeRequest("/signin", "POST", { email, password });
  }
}

const auth = new Api({
  baseUrl: "http://localhost:3000",
});
export default auth;
