
import { useState } from "react";
import { Stack } from "react-bootstrap";
import AppHeader from '../Components/AppHeader/AppHeader'
import AppContent from "../Components/AppContent/AppContent";
import AppFooter from "../Components/AppFooter/AppFooter";
import SideBar from "../Components/SideBar/SideBar";


const Layout=()=>{
    const [showSidebar,setShowSidebar]=useState(true);
    const handleSidebar=()=>{
        setShowSidebar(!showSidebar);
    }

return(
    <>
    <Stack gap={1} className="main" style={{direction:"ltr",marginRight:showSidebar?230:0}}>
        <AppHeader toggleButton={handleSidebar} />
        <AppContent/>
        <AppFooter/>
    </Stack>
    <SideBar show={showSidebar}/>
</>
)
}

export default Layout;