import axios from "axios";
import store from "../store/configStore";
import { clearCurrentUser } from "../store/actions/user";

const authHeader = () => {
  const currentUser = store.getState().user;
  return {
    "Content-Type": "application/json",
    authorization: "Bearer " + currentUser?.token,
  };
};

//401, 403 에러 발생시 로그인페이지로 이동
const handleResponseWithLoginCheck = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const currentUser = store.getState().user;
      const isLoggedIn = currentUser?.token;
      const status = error?.response?.status;

      //토큰이 있고 401, 403에러 발생시 로그인페이지로 이동
      if (isLoggedIn && [401, 403].includes(status)) {
        store.dispatch(clearCurrentUser());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export { authHeader, handleResponseWithLoginCheck };
