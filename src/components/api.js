const authToken = "73e89214-0c23-43f4-86c2-2071a55d95ef";

const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
};

function request(endpoint, method, body = null) {
  const options = {
    method: method,
    headers: config.headers,
  };
  if (body) {
    options.body = body;
  }
  return fetch(`${config.baseUrl}/${endpoint}`, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`${response.status} ${response.url}`);
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => console.error(error));
}

export const getUser = () => {
  return request("users/me", "GET");
};

export const patchUser = (body) => {
  return request("users/me", "PATCH", body);
};

export const patchUserAvatar = (body) => {
  return request("users/me/avatar", "PATCH", body);
};

export const getCards = () => {
  return request("cards", "GET");
};

export const postCard = (body) => {
  return request("cards", "POST", body);
};

export const deleteCard = (id) => {
  return request(`cards/${id}`, "DELETE");
};

export const putLikeOnCard = (id) => {
  return request(`cards/likes/${id}`, "PUT");
};

export const deleteLikeFromCard = (id) => {
  return request(`cards/likes/${id}`, "DELETE");
};
