import MainStore from "../Stores/Redux/MainStore";
import ConfigViewService from "../ViewService/ConfigViewService";

const {hideLoading}=ConfigViewService();
export class ServerHandlerError extends Error {

    constructor(err) {

        super(err.message);
        hideLoading();
        if(err.response)
        {
            switch (err.response.status) {
                case 404:
                    this.message = "not found"
                    break;
                case 400:
                    this.message = "The submitted information is incomplete"
                    break;
                case 403:
                    this.message = "You do not have the required access"
                    break;
                case 409:
                    this.message = "Duplicated Error"
                    break;
                case 500:
                    this.message = "Error In Server"
                    break;
                default:
                    break;
            }
        }
        else{
            this.message="خطا در برقراری ارتباط"
        }
        
    }
}

export class authServerHandlerError extends Error {

    constructor(err) {

        super(err.message);
        hideLoading();
        if(err.response)
        {
            switch (err.response.status) {
                case 404:
                    this.message = "not found"
                    break;
                case 400:
                    this.message = "نام کاربری یا کلمه عبور اشتباه است"
                    break;
                case 403:
                    this.message = "You do not have the required access"
                    break;
                case 409:
                    this.message = "Duplicated Error"
                    break;
                case 500:
                    this.message = "Error In Server"
                    break;
                default:
                    break;
            }
        }
        else{
            this.message="خطا در برقراری ارتباط"
        }
        
    }
}
export class LoginRequiredError extends Error
{
    constructor(err) {
        hideLoading();
        localStorage.removeItem("token");
        MainStore.dispatch({type:"logout"});
        MainStore.dispatch({type:"reset"});
        super("مجدد وارد شوید");
    }
}