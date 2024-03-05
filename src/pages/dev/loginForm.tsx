import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Icon } from "easemob-chat-uikit";
import i18next from "../../i18n";

import loading from "../../assets/loading.png";
import closeIcon from "../../assets/Xmark@2x.png";
import eyeOpen from "../../assets/eye@2x.png";
import eyeClose from "../../assets/eye_slash@2x.png";
import toast from "react-hot-toast";
const LoginForm = () => {
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });
  const [isLonging, setIsLoging] = useState(false);

  const handleChange =
    (type: "userId" | "password") => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValues({
        ...values,
        [type]: value,
      });
    };

  const clearuserId = () => {
    setValues({
      ...values,
      userId: "",
    });
  };

  const login = () => {
    setIsLoging(true);
    if (values.userId === "" || values.password === "") {
      setIsLoging(false);
      toast.error("用户名或密码不能为空");
      return;
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const switchPasswordVisible = () => {
    console.log("switchPasswordVisible");
    setPasswordVisible((value) => !value);
  };
  return (
    <div className="dev-form">
      <Icon type="FOLDER" className="language-switch"></Icon>
      <div className="dev-form-icon"></div>
      <div className="dev-form-AC">
        {i18next.t("easemob")} IM Demo <br />
        <div className="devMode">开发者模式</div>
      </div>

      <div className="input-box">
        <input
          disabled={isLonging}
          className="dev-form-input"
          placeholder={i18next.t("userId")}
          onChange={handleChange("userId")}
          value={values.userId}
          maxLength={32}
        ></input>
        {values.userId && (
          <img
            src={closeIcon}
            alt="close"
            onClick={clearuserId}
            className="close-btn"
          />
        )}
      </div>
      <div className="input-box">
        <input
          disabled={isLonging}
          type={passwordVisible ? "text" : "password"}
          maxLength={32}
          className="dev-form-input"
          placeholder={i18next.t("password")}
          value={values.password}
          onChange={handleChange("password")}
        ></input>
        {values.password && (
          <img
            onClick={switchPasswordVisible}
            src={passwordVisible ? eyeClose : eyeOpen}
            alt="close"
            className="close-btn"
          />
        )}
      </div>
      <div className="loading-box">
        <input
          disabled={false}
          type="button"
          className="dev-form-input dev-button"
          value={isLonging ? "" : i18next.t("login")}
          onClick={login}
        ></input>
        {isLonging && (
          <img className="loading-img" src={loading} alt="loading" />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
