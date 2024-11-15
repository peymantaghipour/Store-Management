
const initialConfigState={
    isShowLoding:false
}

const ConfigReducer=(state=initialConfigState,action)=>{
    switch (action.type) {
        case "showLoding":
            {
                return{...state,isShowLoding:true}
            }
            case "hideLoding":
                {
                    return{...state,isShowLoding:false}
                }
            
        default:
        {
            return state;
        }
    }
}

export default ConfigReducer;