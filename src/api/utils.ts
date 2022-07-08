import qs from "qs";

// ------------------------------------------------

export const getAuthHeaders = () => {
  const headers: any = {};
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// ------------------------------------------------

const stringifyConfig = {
  arrayFormat: "brackets" as const,
};

export const encodeQueryParams = (queryParameters: Object) => {
  const queryParams =
    queryParameters && Object.keys(queryParameters).length
      ? qs.stringify(queryParameters, stringifyConfig)
      : null;
  return queryParams ? `?${queryParams}` : "";
};

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

export const setToken = (token: string) => {
  window.localStorage.setItem(tokenStorageKey, token);
};

// ------------------------------------------------
