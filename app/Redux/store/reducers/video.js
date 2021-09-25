import { types } from "../../types/video";

const videoReducer = (
  state = {
    loading: false,
    videoList: [],
    message: "",
    categoriesList: [],
  },
  action
) => {
  switch (action.type) {
    case types.GET_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videoList: action.payload,
      };
    case types.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesList: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default videoReducer;
