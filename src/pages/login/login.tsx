import "./login.scss";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import i18next from "../../i18n";
import loading from "../../assets/loading.png";
import closeIcon from "../../assets/Xmark@2x.png";
import { HuePicker } from "react-color";
import { Icon } from "easemob-chat-uikit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { sendSms, getChatToken } from "../../service/login";
import { loginWithToken } from "../../store/loginSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useDispatch } from "react-redux";
const Login = () => {
  console.log(222);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  useEffect(() => {
    if (state.loggedIn) {
      navigate("/main");
    }
  }, [state.loggedIn]);
  const [values, setValues] = useState({
    phoneNumber: "",
    vCode: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [agree, setAgree] = useState(false);
  const handleChange =
    (type: "phoneNumber" | "vCode") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (type === "phoneNumber") {
        if (/^[0-9\b]+$/.test(value) || value === "") {
          setValues({
            ...values,
            phoneNumber: value,
          });
        }
      } else if (type === "vCode") {
        setValues({
          ...values,
          vCode: event.target.value,
        });
      }
    };

  const clearPhoneNumber = () => {
    setValues({
      ...values,
      phoneNumber: "",
    });
  };
  const getVCode = () => {
    if (isCounting) {
      return;
    }
    if (values.phoneNumber.length !== 11) {
      toast.error("请输入正确的手机号码");
      return;
    }
    sendSms(values.phoneNumber)
      .then((res) => {
        setIsCounting(true);
        const timer = setInterval(() => {
          setCountdown((countdown) => {
            if (countdown === 0) {
              clearInterval(timer);
              setIsCounting(false);
              return 60;
            } else {
              return countdown - 1;
            }
          });
        }, 1000);
      })
      .catch(function (error) {
        console.log("error", error.response);
        if (error.response.status == "400") {
          if (error.response.data?.errorInfo == "phone number illegal") {
            toast.error("请输入正确的手机号！");
          } else if (
            error.response.data?.errorInfo ==
            "Please wait a moment while trying to send."
          ) {
            toast.error("你的操作过于频繁，请稍后再试！");
          } else if (
            error.response.data?.errorInfo.includes("exceed the limit")
          ) {
            toast.error("获取已达上限！");
          } else {
            toast.error(error.response.data?.errorInfo);
          }
        } else {
          toast.error("获取验证码失败！");
        }
      });
  };

  const handleAgreeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgree(event.target.checked);
  };
  const login = () => {
    setIsLogging(true);

    getChatToken(values.phoneNumber, values.vCode)
      .then((res) => {
        console.log("res", res);
        const { token, chatUserName } = res.data;

        dispatch(loginWithToken({ userId: chatUserName, chatToken: token }));
      })
      .catch(function (error) {
        switch (error.response?.data?.errorInfo) {
          case "UserId password error.":
            toast.error("用户名或密码错误！");
            break;
          case `UserId ${values.phoneNumber} does not exist.`:
            toast.error("登录用户不存在");
            break;
          case "phone number illegal":
            toast.error("请输入正确的手机号");
            break;
          case "SMS verification code error.":
            toast.error("验证码错误");
            break;
          case "Sms code cannot be empty":
            toast.error("验证码不能为空");
            break;
          case "Please send SMS to get mobile phone verification code.":
            toast.error("请使用短信验证码登录");
            break;
          default:
            toast.error("登录失败，请重试！");
            break;
        }
        setIsLogging(false);
      });
  };
  const navigate = useNavigate();
  const goDev = () => {
    navigate("/dev", { replace: true });
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <Icon type="GLOBE" className="language-switch"></Icon>
        <div className="login-form-icon"></div>
        <div className="login-form-AC">{i18next.t("easemob")} IM Demo</div>
        <div className="input-box">
          <input
            disabled={isLogging}
            className="login-form-input"
            placeholder={i18next.t("yourPhoneNumber")}
            onChange={handleChange("phoneNumber")}
            value={values.phoneNumber}
            maxLength={11}
          ></input>
          {values.phoneNumber && (
            <img
              src={closeIcon}
              alt="close"
              onClick={clearPhoneNumber}
              className="close-btn"
            />
          )}
        </div>
        <div className="input-box">
          <input
            disabled={isLogging}
            type={"text"}
            maxLength={6}
            className="login-form-input"
            placeholder={i18next.t("verificationCode")}
            value={values.vCode}
            onChange={handleChange("vCode")}
          ></input>
          <div className="login-form-getCode" onClick={getVCode}>
            {isCounting ? (
              <span style={{ color: "#ACB4B9" }}>
                {`${countdown}秒后重新获取`}
              </span>
            ) : (
              <span style={{ color: isLogging ? "#ACB4B9" : "#009EFF" }}>
                {i18next.t("getCode")}
              </span>
            )}
          </div>
        </div>
        <div className="loading-box">
          <input
            disabled={false}
            type="button"
            className="login-form-input login-button"
            value={isLogging ? "" : i18next.t("login")}
            onClick={login}
          ></input>
          {isLogging && (
            <img className="loading-img" src={loading} alt="loading" />
          )}
        </div>
        <div className="login-form-agreement">
          <input
            disabled={isLogging}
            checked={agree}
            type="checkbox"
            onChange={handleAgreeChange}
          ></input>
          <div>
            {i18next.t("agree")}{" "}
            <span style={{ color: isLogging ? "#ACB4B9" : "#009EFF" }}>
              《隐私和政策》
            </span>{" "}
          </div>
        </div>
      </div>
      <div className="login-copyright">
        © 2024 环信，SDK版本：4.1.1 UIkit版本：1.0.1 Demo版本：2.0.0
        <span onDoubleClick={goDev}>{"</>"}</span>
      </div>
    </div>
  );
};

export default Login;
