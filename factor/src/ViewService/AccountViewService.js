import AuthService from "../Services/AuthService";
import MainStore from "../Stores/Redux/MainStore";
import { errorMessage } from "../Utils/Alerts/alert";
const authService = new AuthService();
const AccountViewService = (dispatch) => {
  const autologin = () => {
    try {
      const user = authService.autoLogin();
      if(user)
      {
        dispatch({ type: "login", payload: user });
      }
      
    } catch (err) {
      errorMessage(err.message);
    }
  };
  const login = async () => {
    const { loginModel } = MainStore.getState().account;
    try {
      const user = await authService.login(loginModel);
      dispatch({ type: "login", payload: user });
    } catch (err) {
      errorMessage(err.message);
    }
  };
  const logout = async () => {
    await authService.logout();
    dispatch({ type: "logout" });
    dispatch({ type: "reset" });
  };
  return { login, logout,autologin };
};

export default AccountViewService;
