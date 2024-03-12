import { useEffect, useState, FC } from "react";
import "./index.css";
import { observer } from "mobx-react-lite";
import { Toaster } from "react-hot-toast";
import { rootStore, Provider } from "easemob-chat-uikit";
import "easemob-chat-uikit/style.css";
import "./App.css";
import AppRoutes from "./routes/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import listener from "./UIKit/uikitListener";
// @ts-ignore
window.rootStore = rootStore;

const ChatApp: FC<any> = () => {
  useEffect(() => {
    listener(store);
  }, []);
  return (
    <ReduxProvider store={store}>
      <Provider
        initConfig={{
          appKey: "easemob#easeim",
          useUserInfo: true,
        }}
        features={{
          chat: {
            header: {
              threadList: true,
              audioCall: true,
              videoCall: true,
            },
          },
        }}
      >
        <AppRoutes></AppRoutes>
        <Toaster></Toaster>
      </Provider>
    </ReduxProvider>
  );
};

export default observer(ChatApp);
