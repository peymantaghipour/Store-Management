import MainStore from "../Stores/Redux/MainStore";


const ConfigViewService=()=>{
    const dispatch=MainStore.dispatch;
    const showLoading=()=>{
        dispatch({type:"showLoding"});
    }
    const hideLoading=()=>{
        dispatch({type:"hideLoding"});
    }

    return{showLoading,hideLoading};
}

export default ConfigViewService;