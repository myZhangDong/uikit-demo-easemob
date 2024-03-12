import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootStore } from "../UIKit/uikitListener";
import type { RootState } from "./store";
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    phoneNumber: "",
    chatToken: "",
    password: "",
    userId: "",
    loggedIn: false,
  },
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setChatToken: (state, action: PayloadAction<string>) => {
      state.chatToken = action.payload;
    },

    loginWithToken: (
      state,
      action: PayloadAction<{ userId: string; chatToken: string }>
    ) => {
      const { client } = rootStore;
      console.log("client >>>", client);
      console.log("loginWithToken", action.payload);
      client.open({
        user: action.payload.userId,
        accessToken: action.payload.chatToken,
      });
      //设置 userId
      state.userId = action.payload.userId;
      state.chatToken = action.payload.chatToken;
    },

    loginWithPassword: (
      state,
      action: PayloadAction<{ userId: string; password: string }>
    ) => {
      const { client } = rootStore;
      console.log("client >>>", client);
      console.log("loginWithPassword", action.payload);
      client.open({
        user: action.payload.userId,
        pwd: action.payload.password,
      });
      //设置 userId
      state.userId = action.payload.userId;
      state.password = action.payload.password;
    },

    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
      if (action.payload && state.userId) {
        window.sessionStorage.setItem(
          "webImAuth",
          JSON.stringify({
            userId: state.userId,
            chatToken: state.chatToken,
            password: state.password,
          })
        );
      }
    },
  },
});

export const {
  setPhoneNumber,
  setChatToken,
  loginWithToken,
  loginWithPassword,
  setLoggedIn,
} = loginSlice.actions;

export default loginSlice.reducer;
export const selectState = (state: RootState) => state.login;
