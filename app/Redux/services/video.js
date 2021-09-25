import API from "./api";
import { store } from "../store";

export function getVideoList(action) {
  const token = store.getState().authReducer.tokens?.access?.token;
  const categoryId = action.payload;
  return API.get(`/videos?category=${categoryId}&limit=100&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getCategoriesList(action) {
  const token = store.getState().authReducer.tokens?.access?.token;

  return API.get(`/categories?limit=100&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
