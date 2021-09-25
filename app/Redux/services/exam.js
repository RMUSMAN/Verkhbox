import API from "./api";
import { store } from "../store";

export function getExamList(action) {
  const token = store.getState().authReducer.tokens?.access?.token;
  const examDate = action.payload;
  return API.get(`/questionSet?examDate=${examDate}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function postAnswer(action) {
  const token = store.getState().authReducer.tokens?.access?.token;

  return API.post(`/candidateAnswer`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function markExam(action) {
  const token = store.getState().authReducer.tokens?.access?.token;

  return API.patch(
    `/candidateAnswer/${action.payload.examId}`,
    action.payload.patchData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export function getAllCandidateAnsList(action) {
  const token = store.getState().authReducer.tokens?.access?.token;

  return API.get(`/candidateAnswer?limit=1000&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
