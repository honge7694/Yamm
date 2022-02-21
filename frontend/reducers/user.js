const dummyUser = {
  id: 1,
  nickname: '이1요르',
  Posts: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOG_IN = 'LOG_IN'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; 
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => {
  console.log("llll")
  return {
    type: SIGN_UP,
    data,
  };
};

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS,
};

export const loginAction = (data) => {
  console.log("rerere")
  return {
    type: LOG_IN,
    data,
  }
};
export const logoutAction = {
  type: LOG_OUT,
};
export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        loginData: action.data,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    case SIGN_UP: {
      console.log("sign_Up")
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    default: {
      console.log("not")
      return {
        ...state,
      }
    }
  }
};
