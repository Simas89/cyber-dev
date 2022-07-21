import qs from "qs";

// ------------------------------------------------

const tokenStorageKey = "__cyber-axis-auth__";

export const makeLogout = () => {
  window.localStorage.removeItem(tokenStorageKey);
  window.location.href = "/auth";
};

export const getToken = () => {
  const token = window.localStorage.getItem(tokenStorageKey);
  if (!token) {
    return undefined;
  }
  return token;
};

export const setToken = (token) => {
  window.localStorage.setItem(tokenStorageKey, token);
};

// ------------------------------------------------

export const getAuthHeaders = () => {
  const headers = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// ------------------------------------------------

export const encodeQueryParams = (queryParameters) => {
  const queryParams =
    queryParameters && Object.keys(queryParameters).length
      ? qs.stringify(queryParameters, { arrayFormat: "brackets" })
      : null;
  return queryParams ? `?${queryParams}` : "";
};

// ------------------------------------------------
