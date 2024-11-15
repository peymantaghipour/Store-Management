import { checkLogin, SignIn, SignOut } from "../Adapters/Api";


export default class AuthService
{
    login(userInfo)
    {
        return SignIn(userInfo);
    }
    logout()
    {
        return SignOut();
    }
    autoLogin()
    {
        return checkLogin();
    }
}