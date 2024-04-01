import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "easemob-chat-uikit";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    <ReduxProvider store={store}>
      <App></App>
    </ReduxProvider>
    {/* <Provider
      initConfig={{
        appKey: "easemob#easeim",
        useUserInfo: true,
        // userId: "zd2",
        // password: "1",
      }}
      theme={{
        mode: "dark",
        bubbleShape: "square",
        avatarShape: "square",
        componentsShape: "square",
      }}
      local={{
        fallbackLng: "en",
        lng: "zh",
      }}
      features={{
        conversationList: {
          search: true,
          item: {
            // moreAction: true,
            // deleteConversation: true,
          },
        },
        chat: {
          header: {
            threadList: false,
            moreAction: true,
            clearMessage: true,
            deleteConversation: true,
            audioCall: true,
          },
          message: {
            status: true,
            reaction: true,
            thread: false,
            recall: true,
            translate: true,
            edit: true,
          },
          messageInput: {
            mention: true,
            typing: true,
            record: true,
            emoji: true,
            moreAction: true,
            picture: true,
          },
        },
      }}
    >
      <App></App>
    </Provider> */}
  </div>
);
