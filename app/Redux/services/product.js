import API from "./api";
import { store } from "../store";

export function getProductList(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.get(`/product-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getTaskList(action) {
  const token = store.getState().authReducer.loginUser?.token;
  const user_id = store.getState().authReducer.loginUser?.user_id;

  return API.get(`/filtered-task-lists?user_id=${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateTaskProduct(action) {
  const token = store.getState().authReducer.loginUser?.token;
  const user_id = store.getState().authReducer.loginUser?.user_id;
  let productData = action.payload;
  productData['user_id'] = user_id;

  return API.post(`/store-task-products`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

}

export function storeTaskWithoutDesp(action) {
  const token = store.getState().authReducer.loginUser?.token;
  const user_id = store.getState().authReducer.loginUser?.user_id;
  let productData = action.payload;
  productData['user_id'] = user_id;
  return API.post(`/store-task-products-without-disposition`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function empManualTimer(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/emp-manual-timer`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function editEmployeeTimer(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/edit-employee-timer`, action.payload?.editData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updateTaskStatus(action) {
  const token = store.getState().authReducer.loginUser?.token;
  return API.post(`/update-task-status`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteTaskProduct(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/delete-disposition`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getAllUsersList(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.get(`/all-employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function uploadTaskImage(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/upload-order-document`, action.payload.uploadValue, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function empCompleteTimer(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/emp-timerlog-complete`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function empMonthlyTracker(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/tracker-monthly`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function uploadSignDoc(action) {
  const token = store.getState().authReducer.loginUser?.token;
 
  return API.post(`/upload-sign-document`, action.payload.uploadValue, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function addMeterReading(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/add-meter-reading`, action.payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function startEmployeeTimer(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.post(`/employee-timer`, action.payload.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function logEmployeeTimer(action) {
  const token = store.getState().authReducer.loginUser?.token;
  if (action.payload?.data?.type === "pause") {
    delete action.payload?.data?.log_ids;
  }
  return API.post(`/employee-timer-log`, action.payload.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getAllCustomers(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.get(`/all-customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getAllContacts(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.get(`/all-contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getAllOrderList(action) {
  const token = store.getState().authReducer.loginUser?.token;

  return API.get(`/all-order-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
