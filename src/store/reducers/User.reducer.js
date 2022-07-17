import axios from "axios";
const USERS_SUCCESS = "USERS_SUCCESS";
const USERS_LOADING = "USERS_LOADING";
const USERS_ERROR = "USERS_ERROR";
const GET_USERS = "GET_USERS";

const initialState = {
  users: [],
  loading: false,
  error: null,
};
//action creator

export const getUsers = () => {
  return async function (dispatch) {
    try {
      dispatch({ type: USERS_LOADING, payload: true });
      const users = await axios.get(`${process.env.REACT_APP_URL_BACK}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: USERS_SUCCESS, payload: users.data.data });
      dispatch({ type: USERS_LOADING, payload: false });
    } catch (err) {
      dispatch({ type: USERS_ERROR, payload: err });
    }
  };
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};
