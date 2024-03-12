import "./dev.scss";
import i18next from "../../i18n";
import { useNavigate } from "react-router-dom";
import ConfigForm from "./configForm";
import LoginForm from "./loginForm";

const Dev = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="dev-container">
      <LoginForm></LoginForm>
      <ConfigForm></ConfigForm>
      <div className="dev-copyright">
        © 2024 环信，SDK版本：4.1.1 UIkit版本：1.0.1 Demo版本：2.0.0
        <span onDoubleClick={goLogin}>{"</>"}</span>
      </div>
    </div>
  );
};

export default Dev;
