import { showMessage } from "react-native-flash-message";
import { call, put, takeLatest } from "redux-saga/effects";
import NavigationService from "../../navigation/NavigationService";
import * as Services from "../services/exam";
import { types } from "../types/exam";

// import toast from "../../shared/components/toast";
function* examSagas(action) {
  try {
    const response = yield call(Services.getExamList, action);
    yield put({
      type: types.GET_QUESTION_SET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_QUESTION_SET_FAILURE,
      payload: "There was some error",
    });
  }
}

function* allCandidateAnsSagas(action) {
  try {
    const response = yield call(Services.getAllCandidateAnsList, action);

    yield put({
      type: types.GET_ALL_CANDIDATE_ANS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: types.GET_ALL_CANDIDATE_ANS_FAILURE,
      payload: "There was some error",
    });
  }
}

function* postCandidateAnsSagas(action) {
  try {
    const response = yield call(Services.postAnswer, action);

    yield put({
      type: types.POST_CANDIDATE_ANS_SUCCESS,
      payload: action.payload.questionSet,
    });
    NavigationService.navigate("TestList");
    showMessage({
      message:
        "Your test has been submitted . You'll get result here once marked.",
      type: "success",
    });
  } catch (error) {

    yield put({
      type: types.POST_CANDIDATE_ANS_FAILURE,
      payload: "There was some error",
    });
    showMessage({
      message:
        "There was some Error.Please check your internet connection & try again",
      type: "danger",
    });
  }
}

function* markCandidateExamSagas(action) {
  try {
    const response = yield call(Services.markExam, action);

    yield put({
      type: types.MARK_CANDIDATE_ANS_SUCCESS,
      payload: response.data,
    });
    NavigationService.navigate("TestAnsList", {
      questionSetId: response.data.questionSet.id,
    });
  } catch (error) {
    yield put({
      type: types.MARK_CANDIDATE_ANS_FAILURE,
      payload: "There was some error",
    });
  }
}

export default function* examWatcher() {
  yield takeLatest(types.GET_QUESTION_SET_REQUEST, examSagas);
  yield takeLatest(types.GET_ALL_CANDIDATE_ANS_REQUEST, allCandidateAnsSagas);
  yield takeLatest(types.POST_CANDIDATE_ANS_REQUEST, postCandidateAnsSagas);
  yield takeLatest(types.MARK_CANDIDATE_ANS_REQUEST, markCandidateExamSagas);
}
