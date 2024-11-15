import { Offcanvas } from "react-bootstrap";
import Menu from "./Menu";
import MenuProvider from "../../../Stores/Contexts/MenuContext";

const SideBar=({show})=>{
    return(
        <Offcanvas backdrop={false} show={show} scroll={true} placement="start" >
    <Offcanvas.Header >
        <img
            src="/logo.png"
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            
        />
        <Offcanvas.Title>
            <h6 style={{marginRight:20,marginTop:17}}>مدیریت فاکتور</h6>
        </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <MenuProvider>
        <Menu/>
        </MenuProvider>
    </Offcanvas.Body>
</Offcanvas>
    )
}

export default SideBar;