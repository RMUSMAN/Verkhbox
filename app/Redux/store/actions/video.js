import { types } from "../../types/video";

export function getVideoList(id) {
  return {
    type: types.GET_VIDEOS_REQUEST,
    payload: id,
  };
}

export function getCategoriesList() {
  return {
    type: types.GET_CATEGORIES_REQUEST,
  };
}
