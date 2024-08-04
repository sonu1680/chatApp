export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES="api/auth";
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/userInfo`;
export const UPDATE_USER_PROFILE = `${AUTH_ROUTES}/updateProfile`;
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/addProfileImage`;
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/removeProfileImage`;

