import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore";

export const loginUser = (userData, history) =>async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    // dispatch(signin("user"))
    // Router.push("/")
  } catch (error) {
    console.log("error")
    alert(error)
  }

  // axios
  //   .post('/login', userData)
  //   .then((res) => {
  //     setAuthorizationHeader(res.data.token);
  //     dispatch(getUserData());
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/');
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};

export const signupUser = (newUserData, history) =>async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let userCredential=await createUserWithEmailAndPassword(auth, newUserData.email, newUserData.password)
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      username: newUserData.handle,
      email: user.email,
      createdAt: new Date(),
    });    
    dispatch(signin(userCredential.user))
    history.push('/');
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
  dispatch({ type: CLEAR_ERRORS });

  // axios
  //   .post('/signup', newUserData)
  //   .then((res) => {
  //     setAuthorizationHeader(res.data.token);
  //     dispatch(getUserData());
  //     dispatch({ type: CLEAR_ERRORS });
  //     history.push('/');
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_ERRORS,
  //       payload: err.response.data
  //     });
  //   });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const signin = (user) => (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
