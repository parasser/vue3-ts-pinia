import { userStore } from "../store/useStore";
import { decode } from "js-base64";
import cookie from 'js-cookie'
export default () => {
  let jwt = cookie.get('jwt') || ''
  // let jwt = sessionStorage.getItem("jwt") || "";
  if (jwt) {
    let token = null;
    try {
      token = JSON.parse(decode(jwt));
    } catch (e) {
      console.log("%c The user's JWT is error", "color:red");
    }
    !!token && userStore().setUser(token);
  }
};
