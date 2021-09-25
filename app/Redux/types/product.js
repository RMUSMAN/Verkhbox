const GET_PRODUCT_LIST_REQUEST = "GET_PRODUCT_LIST_REQUEST";
const GET_PRODUCT_LIST_SUCCESS = "GET_PRODUCT_LIST_SUCCESS";
const GET_PRODUCT_LIST_FAILURE = "GET_PRODUCT_LIST_FAILURE";
const GET_CUSTOMER_LIST_REQUEST = "GET_CUSTOMER_LIST_REQUEST";
const GET_CUSTOMER_LIST_SUCCESS = "GET_CUSTOMER_LIST_SUCCESS";
const GET_CUSTOMER_LIST_FAILURE = "GET_CUSTOMER_LIST_FAILURE";

const GET_CONTACT_LIST_REQUEST = "GET_CONTACT_LIST_REQUEST";
const GET_CONTACT_LIST_SUCCESS = "GET_CONTACT_LIST_SUCCESS";
const GET_CONTACT_LIST_FAILURE = "GET_CONTACT_LIST_FAILURE";
const GET_TASK_LIST_REQUEST = "GET_TASK_LIST_REQUEST";
const GET_TASK_LIST_SUCCESS = "GET_TASK_LIST_SUCCESS";
const GET_TASK_LIST_FAILURE = "GET_TASK_LIST_FAILURE";
const GET_ORDER_LIST_REQUEST = "GET_ORDER_LIST_REQUEST";
const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS";
const GET_ORDER_LIST_FAILURE = "GET_ORDER_LIST_FAILURE";
const GET_USER_LIST_REQUEST = "GET_USER_LIST_REQUEST";
const GET_USER_LIST_SUCCESS = "GET_USER_LIST_SUCCESS";
const GET_USER_LIST_FAILURE = "GET_USER_LIST_FAILURE";
const ADD_MANUAL_TIMER_REQUEST = "ADD_MANUAL_TIMER_REQUEST";
const ADD_MANUAL_TIMER_SUCCESS = "ADD_MANUAL_TIMER_SUCCESS";
const ADD_MANUAL_TIMER_FAILURE = "ADD_MANUAL_TIMER_FAILURE";

const STORE_TASK_WITHOUT_DESP_REQUEST = "STORE_TASK_WITHOUT_DESP_REQUEST";
const STORE_TASK_WITHOUT_DESP_SUCCESS = "STORE_TASK_WITHOUT_DESP_SUCCESS";
const STORE_TASK_WITHOUT_DESP_FAILURE = "STORE_TASK_WITHOUT_DESP_FAILURE";

const UPDATE_TASK_PRODUCT_REQUEST = "UPDATE_TASK_PRODUCT_REQUEST";
const UPDATE_TASK_PRODUCT_SUCCESS = "UPDATE_TASK_PRODUCT_SUCCESS";
const UPDATE_TASK_PRODUCT_FAILURE = "UPDATE_TASK_PRODUCT_FAILURE";
const DELETE_TASK_PRODUCT_REQUEST = "DELETE_TASK_PRODUCT_REQUEST";
const DELETE_TASK_PRODUCT_SUCCESS = "DELETE_TASK_PRODUCT_SUCCESS";
const DELETE_TASK_PRODUCT_FAILURE = "DELETE_TASK_PRODUCT_FAILURE";
const UPLOAD_TASK_IMAGE_REQUEST = "UPLOAD_TASK_IMAGE_REQUEST";
const UPLOAD_TASK_IMAGE_SUCCESS = "UPLOAD_TASK_IMAGE_SUCCESS";
const UPLOAD_TASK_IMAGE_FAILURE = "UPLOAD_TASK_IMAGE_FAILURE";
const UPLOAD_SIGN_DOC_REQUEST = "UPLOAD_SIGN_DOC_REQUEST";
const UPLOAD_SIGN_DOC_SUCCESS = "UPLOAD_SIGN_DOC_SUCCESS";
const UPLOAD_SIGN_DOC_FAILURE = "UPLOAD_SIGN_DOC_FAILURE";
const SET_ACTIVE_TASK = "SET_ACTIVE_TASK";
const SET_SIGN_INFO = "SET_SIGN_INFO";
const UPDATE_TASK_STATUS_REQUEST = "UPDATE_TASK_STATUS_REQUEST";
const UPDATE_TASK_STATUS_SUCCESS = "UPDATE_TASK_STATUS_SUCCESS";
const UPDATE_TASK_STATUS_FAILURE = "UPDATE_TASK_STATUS_FAILURE";

const START_EMPLOYEE_TIMER_REQUEST = "START_EMPLOYEE_TIMER_REQUEST";
const START_EMPLOYEE_TIMER_SUCCESS = "START_EMPLOYEE_TIMER_SUCCESS";
const START_EMPLOYEE_TIMER_FAILURE = "START_EMPLOYEE_TIMER_FAILURE";
const LOG_EMPLOYEE_TIMER_REQUEST = "LOG_EMPLOYEE_TIMER_REQUEST";
const LOG_EMPLOYEE_TIMER_SUCCESS = "LOG_EMPLOYEE_TIMER_SUCCESS";
const LOG_EMPLOYEE_TIMER_FAILURE = "LOG_EMPLOYEE_TIMER_FAILURE";
const EMPLOYEE_COMPLETE_TIMER_REQUEST = "EMPLOYEE_COMPLETE_TIMER_REQUEST";
const EMPLOYEE_COMPLETE_TIMER_SUCCESS = "EMPLOYEE_COMPLETE_TIMER_SUCCESS";
const EMPLOYEE_COMPLETE_TIMER_FAILURE = "EMPLOYEE_COMPLETE_TIMER_FAILURE";
const EMPLOYEE_MONTHLY_TRACKER_REQUEST = "EMPLOYEE_MONTHLY_TRACKER_REQUEST";
const EMPLOYEE_MONTHLY_TRACKER_SUCCESS = "EMPLOYEE_MONTHLY_TRACKER_SUCCESS";
const EMPLOYEE_MONTHLY_TRACKER_FAILURE = "EMPLOYEE_MONTHLY_TRACKER_FAILURE";
const ADD_METER_READING_REQUEST = "ADD_METER_READING_REQUEST";
const ADD_METER_READING_SUCCESS = "ADD_METER_READING_SUCCESS";
const ADD_METER_READING_FAILURE = "ADD_METER_READING_FAILURE";
const EDIT_RECORDING_REQUEST = "EDIT_RECORDING_REQUEST";
const EDIT_RECORDING_SUCCESS = "EDIT_RECORDING_SUCCESS";
const EDIT_RECORDING_FAILURE = "EDIT_RECORDING_FAILURE";
export const types = {
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,

  EDIT_RECORDING_FAILURE,
  EDIT_RECORDING_REQUEST,
  EDIT_RECORDING_SUCCESS,
  GET_CUSTOMER_LIST_FAILURE,
  GET_CUSTOMER_LIST_REQUEST,
  GET_CUSTOMER_LIST_SUCCESS,
  GET_CONTACT_LIST_FAILURE,
  GET_CONTACT_LIST_REQUEST,
  GET_CONTACT_LIST_SUCCESS,
  STORE_TASK_WITHOUT_DESP_FAILURE,
  STORE_TASK_WITHOUT_DESP_REQUEST,
  STORE_TASK_WITHOUT_DESP_SUCCESS,
  GET_TASK_LIST_FAILURE,
  GET_TASK_LIST_REQUEST,
  GET_TASK_LIST_SUCCESS,
  ADD_MANUAL_TIMER_FAILURE,
  ADD_MANUAL_TIMER_REQUEST,
  ADD_MANUAL_TIMER_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  ADD_METER_READING_REQUEST,
  ADD_METER_READING_SUCCESS,
  ADD_METER_READING_FAILURE,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  UPDATE_TASK_PRODUCT_REQUEST,
  UPDATE_TASK_PRODUCT_SUCCESS,
  UPDATE_TASK_PRODUCT_FAILURE,
  DELETE_TASK_PRODUCT_REQUEST,
  DELETE_TASK_PRODUCT_SUCCESS,
  DELETE_TASK_PRODUCT_FAILURE,
  UPLOAD_TASK_IMAGE_REQUEST,
  UPLOAD_TASK_IMAGE_SUCCESS,
  UPLOAD_TASK_IMAGE_FAILURE,
  UPLOAD_SIGN_DOC_REQUEST,
  UPLOAD_SIGN_DOC_SUCCESS,
  UPLOAD_SIGN_DOC_FAILURE,
  SET_ACTIVE_TASK,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  SET_SIGN_INFO,
  START_EMPLOYEE_TIMER_REQUEST,
  START_EMPLOYEE_TIMER_SUCCESS,
  START_EMPLOYEE_TIMER_FAILURE,
  LOG_EMPLOYEE_TIMER_REQUEST,
  LOG_EMPLOYEE_TIMER_SUCCESS,
  LOG_EMPLOYEE_TIMER_FAILURE,
  EMPLOYEE_COMPLETE_TIMER_REQUEST,
  EMPLOYEE_COMPLETE_TIMER_SUCCESS,
  EMPLOYEE_COMPLETE_TIMER_FAILURE,
  EMPLOYEE_MONTHLY_TRACKER_REQUEST,
  EMPLOYEE_MONTHLY_TRACKER_SUCCESS,
  EMPLOYEE_MONTHLY_TRACKER_FAILURE,
};
