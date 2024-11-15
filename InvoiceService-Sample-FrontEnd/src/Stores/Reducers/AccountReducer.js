const initialAccountState={
    isUserOnline:false,
    loginModel:{username:"",password:""},
    user:null
}

const AccountReducer=(state=initialAccountState,action)=>{
    switch (action.type) {
        case "login":
            {
                return{...state,isUserOnline:true,user:action.payload};
            }
        case "logout":
            {
                return{...state,isUserOnline:false};
            }
        default:
            {
                return state;
            }
            
    }
}

export default AccountReducer;