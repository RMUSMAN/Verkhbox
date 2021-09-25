import { types } from "../../types/product";

export function getProductList() {
  return {
    type: types.GET_PRODUCT_LIST_REQUEST,
  };
}

export function getUserList() {
  return {
    type: types.GET_USER_LIST_REQUEST,
  };
}
export function empManualTimer(payload) {
  return {
    type: types.ADD_MANUAL_TIMER_REQUEST,
    payload,
  };
}
export function getAllCustomers() {
  return {
    type: types.GET_CUSTOMER_LIST_REQUEST,
  };
}

export function getAllContacts() {
  return {
    type: types.GET_CONTACT_LIST_REQUEST,
  };
}

export function getTaskList(payload = null) {
  return {
    type: types.GET_TASK_LIST_REQUEST,
    payload,
  };
}

export function getOrderList(payload = null) {
  return {
    type: types.GET_ORDER_LIST_REQUEST,
    payload,
  };
}


export function startEmployeeTimer(payload) {
  return {
    type: types.START_EMPLOYEE_TIMER_REQUEST,
    payload,
  };
}
export function logEmployeeTimer(payload) {
  return {
    type: types.LOG_EMPLOYEE_TIMER_REQUEST,
    payload,
  };
}
export function empCompleteTimerAction(payload) {
  return {
    type: types.EMPLOYEE_COMPLETE_TIMER_REQUEST,
    payload,
  };
}
export function empMonthlyTrackerAction(payload) {
  return {
    type: types.EMPLOYEE_MONTHLY_TRACKER_REQUEST,
    payload,
  };
}
export function updateTaskProduct(payload) {
  return {
    type: types.UPDATE_TASK_PRODUCT_REQUEST,
    payload,
  };
}

export function deleteTaskProduct(payload) {
  return {
    type: types.DELETE_TASK_PRODUCT_REQUEST,
    payload,
  };
}

export function setActiveTask(payload) {
  return {
    type: types.SET_ACTIVE_TASK,
    payload,
  };
}

export function uploadTaskImage(payload) {
  return {
    type: types.UPLOAD_TASK_IMAGE_REQUEST,
    payload,
  };
}
export function uploadSignDoc(payload) {
  return {
    type: types.UPLOAD_SIGN_DOC_REQUEST,
    payload,
  };
}
export function setSignInfo(payload) {
  return {
    type: types.SET_SIGN_INFO,
    payload,
  };
}

export function updateTaskStatus(payload) {
  return {
    type: types.UPDATE_TASK_STATUS_REQUEST,
    payload,
  };
}

export function storeTaskWithoutDesp(payload) {
  return {
    type: types.STORE_TASK_WITHOUT_DESP_REQUEST,
    payload,
  };
}


export function editEmployeeTimer(payload) {
  return {
    type: types.EDIT_RECORDING_REQUEST,
    payload,
  };
}

export function addMeterReading(payload) {
  return {
    type: types.ADD_METER_READING_REQUEST,
    payload,
  };
}
