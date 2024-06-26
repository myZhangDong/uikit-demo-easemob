import axios from "axios";
const isSandBox = false;
const domain =
  (window.location.protocol === "https:" ? "https:" : "http:") +
  (isSandBox ? "//a1-hsb.easemob.com" : "//a41-appserver-dev.easemob.com");

export const sendSms = (phoneNumber: string) => {
  return axios.post(domain + `/inside/app/sms/send/${phoneNumber}`, {
    phoneNumber,
  });
};

export const getChatToken = (phoneNumber: string, VCode: string) => {
  return axios.post(
    domain + "/inside/app/user/login/V2",
    {
      phoneNumber: phoneNumber,
      smsCode: VCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // .then(function (response) {
  //     console.log(response);
  //     const { token, chatUserName } = response.data
  //     let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
  //     message.success(I18N.loginSuccessfully, 1)
  //     dispatch(Creators.setLoginToken(chatUserName, token))
  //     dispatch(Creators.setLoginSuccess(chatUserName))
  //     window.localStorage.setItem('webImLogout', true)

  //     dispatch(Creators.loginByToken(chatUserName, token))
  // })
};

export const getToken = (agoraId: string, password: string) => {
  return axios.post(
    "https://a41-appserver-dev.easemob.com/app/chat/user/login",
    {
      userAccount: agoraId,
      userPassword: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // return postData('https://a41.chat.agora.io/app/chat/user/login', { "userAccount": agoraId, "userPassword": password })
};
export const signUp = (agoraId: string, password: string) => {
  return axios.post(
    "https://a41-appserver-dev.easemob.com/app/chat/user/register",
    {
      userAccount: agoraId,
      userPassword: password,
    }
  );
  // return postData('https://a41.chat.agora.io/app/chat/user/register', { "userAccount": agoraId, "userPassword": password })
};
