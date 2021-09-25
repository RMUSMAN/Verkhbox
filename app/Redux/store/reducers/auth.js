import { types } from "../../types/auth";
import { types as examTypes } from "../../types/exam";
const authReducer = (
  state = {
    loading: false,
    loginUser: {},
    message: "",
    selectedLanguage: "en",
  },
  action
) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        message: "",
        loginUser: {},
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: action.payload,

        message: "",
        loading: false,
      };

    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        message: "",
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginUser: {},
        tokens: { access: {}, refresh: {} },
        message: "",
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        loginUser: {},
        tokens: { access: {}, refresh: {} },
        message: "",
      };
    case types.TOGGLE_AUTH_MSG:
      return {
        ...state,
        loading: false,
        message: "",
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loginUser: {},
        message: "",
      };
    case types.REFRESH_TOKEN:
      return {
        ...state,
        tokens: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default authReducer;
