import USER from './actionTypes';

const saveUser = (email) => ({
  type: USER,
  payload: email,
});

const loginUser = (email) => async (dispatch) => {
  dispatch(saveUser(email));
};

export default loginUser;
