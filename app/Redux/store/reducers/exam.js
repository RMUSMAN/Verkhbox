import { types } from "../../types/exam";

const examReducer = (
  state = {
    loading: false,
    questionSetList: [],
    message: "",
    allCandidateAnsList: [],
    inProgressTestList: {},
  },
  action
) => {
  switch (action.type) {
    case types.GET_QUESTION_SET_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case types.GET_QUESTION_SET_FAILURE:
      return {
        ...state,
        loading: false,
        questionSetList: [],
      };
    case types.GET_QUESTION_SET_SUCCESS:
      return {
        ...state,
        loading: false,
        questionSetList: action.payload.results,
      };
    case types.GET_ALL_CANDIDATE_ANS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_CANDIDATE_ANS_FAILURE:
      return {
        ...state,
        loading: false,
        allCandidateAnsList: [],
      };
    case types.GET_ALL_CANDIDATE_ANS_SUCCESS:
      return {
        ...state,
        loading: false,
        allCandidateAnsList: action.payload.results,
      };

    case types.POST_CANDIDATE_ANS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.POST_CANDIDATE_ANS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.POST_CANDIDATE_ANS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.MARK_CANDIDATE_ANS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.MARK_CANDIDATE_ANS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.MARK_CANDIDATE_ANS_SUCCESS:
      const examIndex = state.allCandidateAnsList.findIndex(
        (elem) => elem.id === action.payload.id
      );
      const allCandidateAnsListCopy = Object.assign(
        [],
        state.allCandidateAnsList
      );
      allCandidateAnsListCopy[examIndex] = action.payload;
      return {
        ...state,
        loading: false,
        allCandidateAnsList: allCandidateAnsListCopy,
      };

    case types.SET_IN_PROGRESS_TEST:
      const currentTest = action.payload;
      const inProgressTestListCopy = Object.assign(
        {},
        state.inProgressTestList
      );

      inProgressTestListCopy[currentTest.testId] = currentTest;

      return {
        ...state,
        inProgressTestList: inProgressTestListCopy,
      };

    default: {
      return state;
    }
  }
};

export default examReducer;
