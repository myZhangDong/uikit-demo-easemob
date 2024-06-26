import React, { useContext } from "react";
import i18next from "../../../i18n";
import { Icon, Switch, RootContext } from "easemob-chat-uikit";
import classNames from "classnames";
import {
  DEMO_VERSION,
  SDK_VERSION,
  UIKIT_VERSION,
  appKey,
} from "../../../config";
const About = () => {
  const prefixCls = "user-info";

  const context = useContext(RootContext);
  const { theme } = context;
  const themeMode = theme?.mode;
  return (
    <div
      className={classNames("setting-personal", {
        "setting-personal-dark": themeMode === "dark",
      })}
    >
      <header className="setting-personal-header">{i18next.t("about")}</header>
      <main className="setting-personal-main">
        <section className="setting-personal-content">
          <div className="user-info-content">
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("SDK version")}</span>
                <div>{SDK_VERSION}</div>
              </div>
            </div>
            <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("uikitVersion")}</span>
                <div>{UIKIT_VERSION}</div>
              </div>
            </div>
            {/* <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("officialWebsite")}</span>
                <div>
                  
                </div>
              </div>
            </div> */}
            {/* <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("hotline")}</span>
                <div>
                  <a href=""></a>
                </div>
              </div>
            </div> */}
            {/* <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("businessDevelopment")}</span>
                <div>
                  <a href=""></a>
                </div>
              </div>
            </div> */}
            {/* <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("channelCooperation")}</span>
                <div>
                  <a href=""></a>
                </div>
              </div>
            </div> */}
            {/* <div className={`${prefixCls}-content-item`}>
              <div
                className={`${prefixCls}-content-item-box`}
                style={{ cursor: "default" }}
              >
                <span>{i18next.t("issues")}</span>
                <div>
                  <a href=""></a>
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
