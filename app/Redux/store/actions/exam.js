import { types } from "../../types/exam";

export function getExamList(date) {
  return {
    type: types.GET_QUESTION_SET_REQUEST,
    payload: date,
  };
}

export function setInProgressTest(exam) {
  return {
    type: types.SET_IN_PROGRESS_TEST,
    payload: exam,
  };
}

export function removeInProgressTest(exam) {
  return {
    type: types.REMOVE_IN_PROGRESS_TEST,
    payload: exam,
  };
}

export function getAllCandidateAnsList() {
  return {
    type: types.GET_ALL_CANDIDATE_ANS_REQUEST,
  };
}

export function postExam(exam) {
  return {
    type: types.POST_CANDIDATE_ANS_REQUEST,
    payload: exam,
  };
}

export function markExam(exam) {
  return {
    type: types.MARK_CANDIDATE_ANS_REQUEST,
    payload: exam,
  };
}
