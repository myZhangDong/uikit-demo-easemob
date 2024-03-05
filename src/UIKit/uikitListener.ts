import { rootStore } from "easemob-chat-uikit";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../store/loginSlice";
import { store } from "../store/store";
const listener = (store: any) => {
  console.log(33);
  const { client } = rootStore;
  const dispatch = store.dispatch;

  client.addEventHandler("chatdemo", {
    onConnected: () => {
      console.log("登录成功");
      dispatch(setLoggedIn(true));
    },
  });
};

export { rootStore };

export default listener;
