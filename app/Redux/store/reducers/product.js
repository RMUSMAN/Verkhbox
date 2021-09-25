import { types } from "../../types/product";

const videoReducer = (
  state = {
    loading: false,
    productList: [],
    message: "",
    taskList: {},
    activeTask: 0,
    reload: false,
    userList: [],
    contactList: [],
    taskTimerDetails: {},
    orderReload: false,
    orderList: [],
    customerList: [],
    signUploading: false,
    signatureInfo: { signDocs: [], orderDocs: [] },
    empMonthlyTracker: null,
    empCompleteTimer: [],
    addManualSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.payload.data,
      };

    case types.GET_CONTACT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CONTACT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        contactList: action.payload.data,
      };

    case types.EDIT_RECORDING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EDIT_RECORDING_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.EDIT_RECORDING_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.STORE_TASK_WITHOUT_DESP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.STORE_TASK_WITHOUT_DESP_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.EMPLOYEE_MONTHLY_TRACKER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EMPLOYEE_MONTHLY_TRACKER_FAILURE:
      return {
        ...state,
        loading: false,
        empMonthlyTracker: null,
      };
    case types.EMPLOYEE_MONTHLY_TRACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        empMonthlyTracker:
          action.payload?.length > 0 ? action.payload[0] : null,
      };

    case types.EMPLOYEE_COMPLETE_TIMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EMPLOYEE_COMPLETE_TIMER_FAILURE:
      return {
        ...state,
        loading: false,
        empCompleteTimer: [],
      };
    case types.EMPLOYEE_COMPLETE_TIMER_SUCCESS:
      return {
        ...state,
        loading: false,
        empCompleteTimer: action.payload,
      };

    case types.GET_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
      };
    case types.ADD_MANUAL_TIMER_REQUEST:
      return {
        ...state,
        loading: true,
        addManualSuccess: false,
      };
    case types.ADD_MANUAL_TIMER_FAILURE:
      return {
        ...state,
        loading: false,
        addManualSuccess: false,
      };
    case types.ADD_MANUAL_TIMER_SUCCESS:
      return {
        ...state,
        loading: false,
        addManualSuccess: true,
      };
    case types.GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        customerList: action.payload.data,
      };

    case types.GET_TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        reload: action.payload ? true : false,
        // taskList: action.payload ? [] : state.taskList,
      };
    case types.GET_TASK_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        reload: false,
        taskList: [],
      };
    case types.GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        taskLoading: false,
        imageUploading: false,
        taskList: action.payload.data,
        reload: false,
      };

    case types.GET_ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        orderReload: action.payload ? true : false,
      };
    case types.GET_ORDER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        orderReload: false,
        orderList: [],
      };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderLoading: false,
        imageUploading: false,
        orderList: action.payload.data,
        orderReload: false,
      };

    case types.UPDATE_TASK_PRODUCT_REQUEST:
      return {
        ...state,
        taskLoading: true,
      };
    case types.UPDATE_TASK_PRODUCT_FAILURE:
      return {
        ...state,
        taskLoading: false,
      };
    case types.UPDATE_TASK_PRODUCT_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_TASK_STATUS_REQUEST:
      return {
        ...state,
        taskLoading: true,
      };
    case types.UPDATE_TASK_STATUS_FAILURE:
      return {
        ...state,
        taskLoading: false,
      };
    case types.UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
      };

    case types.DELETE_TASK_PRODUCT_REQUEST:
      return {
        ...state,
        taskLoading: true,
      };
    case types.DELETE_TASK_PRODUCT_FAILURE:
      return {
        ...state,
        taskLoading: false,
      };
    case types.DELETE_TASK_PRODUCT_SUCCESS:
      return {
        ...state,
      };

    case types.UPLOAD_TASK_IMAGE_REQUEST:
      return {
        ...state,
        imageUploading: true,
      };
    case types.UPLOAD_TASK_IMAGE_FAILURE:
      return {
        ...state,
        imageUploading: false,
      };
    case types.UPLOAD_TASK_IMAGE_SUCCESS:
      return {
        ...state,
      };
    case types.SET_SIGN_INFO:
      return {
        ...state,
        signatureInfo: action.payload,
      };
    case types.UPLOAD_SIGN_DOC_REQUEST:
      return {
        ...state,
        signUploading: true,
      };
    case types.UPLOAD_SIGN_DOC_FAILURE:
      return {
        ...state,
        signUploading: false,
      };
    case types.UPLOAD_SIGN_DOC_SUCCESS: {
      const signCopy = Object.assign({}, state.signatureInfo);

      if (action.payload?.signData?.uploadValue?.doctype === "image") {
        signCopy.signDocs.push({
          path: action.payload?.response?.data?.path,
          customer: action.payload?.signData?.customer,
        });
      } else if (action.payload?.signData?.uploadValue?.doctype === "pdf") {
        signCopy.orderDocs.push({
          path: action.payload?.response?.data?.path,
          customer: action.payload?.signData?.customer,
        });
      }
      return {
        ...state,
        signUploading: false,
        signatureInfo: signCopy,
      };
    }
    case types.SET_ACTIVE_TASK:
      return {
        ...state,
        activeTask: action.payload,
      };
    case types.START_EMPLOYEE_TIMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.START_EMPLOYEE_TIMER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.START_EMPLOYEE_TIMER_SUCCESS: {
      const taskTimerDetailsCopy = JSON.parse(
        JSON.stringify(state.taskTimerDetails)
      );
      if (
        !taskTimerDetailsCopy[action.payload.taskId] &&
        action.payload.data.type === "start"
      ) {
        taskTimerDetailsCopy[action.payload.taskId] = action.payload;
        taskTimerDetailsCopy[action.payload.taskId].type =
          action.payload.data.type;
      } else if (
        taskTimerDetailsCopy[action.payload.taskId] &&
        action.payload.data.type === "stop"
      ) {
        delete taskTimerDetailsCopy[action.payload.taskId];
      }
      return {
        ...state,
        loading: false,
        taskTimerDetails: taskTimerDetailsCopy,
      };
    }
    case types.LOG_EMPLOYEE_TIMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOG_EMPLOYEE_TIMER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.LOG_EMPLOYEE_TIMER_SUCCESS: {
      const taskTimerDetailsCopy = JSON.parse(
        JSON.stringify(state.taskTimerDetails)
      );
      taskTimerDetailsCopy[action.payload.taskId].type =
        action?.payload?.data?.type;
      taskTimerDetailsCopy[action.payload.taskId].log_ids =
        action?.response?.data?.Logs;

      return {
        ...state,
        loading: false,
        taskTimerDetails: taskTimerDetailsCopy,
      };
    }

    case types.ADD_METER_READING_REQUEST:
      return {
        ...state,
        meterReadingLoading: true,
      };
    case types.ADD_METER_READING_FAILURE:
      return {
        ...state,
        meterReadingLoading: false,
      };
    case types.ADD_METER_READING_SUCCESS: {
      return {
        ...state,
        meterReadingLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default videoReducer;
