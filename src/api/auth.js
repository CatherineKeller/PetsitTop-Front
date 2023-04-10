import { saveUserInfos } from '../store/reducers/user';
import { setErrorMessage } from '../store/reducers/error';
import { axiosInstance } from './index';

export const login = () => async (dispatch, getState) => {
  const state = getState();
  const { email, password } = state.user;

  try {
    const { data } = await axiosInstance.post('/login', {
      email,
      password,
    });

    localStorage.setItem('isLogged', data.logged);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('userId', data.userId);

    axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

    dispatch(saveUserInfos(data));
    dispatch(setErrorMessage(''));
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(setErrorMessage('L\'adresse e-mail ou le mot de passe est incorrect'));
    } else {
      dispatch(setErrorMessage('Une erreur est survenue, veuillez réessayer'));
    }
  }
};

export const loginAfterCreateAccount = (email, password) => async (dispatch, getState) => {
  const { data } = await axiosInstance.post('/login', {
    email,
    password,
  });

  localStorage.setItem('isLogged', data.logged);
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('userId', data.userId);

  axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

  dispatch(saveUserInfos(data));
};
