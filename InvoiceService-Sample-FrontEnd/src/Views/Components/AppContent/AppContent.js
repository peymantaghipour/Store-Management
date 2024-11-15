import { Outlet } from "react-router-dom";

const AppContent=()=>{
    return(
        <div style={{minHeight:850,backgroundColor:"#f7f7f7",padding:20}}>
            <Outlet />
        </div>
    )
}

export default AppContent;