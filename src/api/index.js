import axios from "axios";

export const getEntries = () => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/entries/myentries`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const postEntry = ({ description, picture, audio }) => {
  return axios
    .post(
      `${process.env.REACT_APP_URL_BACK}/entries`,
      {
        description: description,
        picture: picture,
        audio: audio,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => console.log(res.data.data))
    .catch((err) => console.log(err));
};

export const deleteEntry = (id) => {
  return axios
    .delete(`${process.env.REACT_APP_URL_BACK}/entries/${id}`)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const searchUsers = ({ role, location }) => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/users/${role}/${location}`)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const getUser = (artist) => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/users/${artist}`)
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const followUser = (follower, following, action) => {
  return axios
    .put(`${process.env.REACT_APP_URL_BACK}/users/`, {
      follower: follower,
      following: following,
      action: action,
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const getFollow = () => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/users/myuser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const getFeed = () => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/entries`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};

export const getUsers = () => {
  return axios
    .get(`${process.env.REACT_APP_URL_BACK}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data.data)
    .catch((err) => console.log(err));
};
