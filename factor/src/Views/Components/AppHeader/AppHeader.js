import { Container, Navbar, Dropdown } from "react-bootstrap";
import AccountViewService from "../../../ViewService/AccountViewService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AppHeader=({toggleButton})=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {logout}=AccountViewService(dispatch);
    const {user}=useSelector(state=>state.account);
    return(
        <Navbar bg="light" expand={false}>
            <Container fluid>
            <Dropdown style={{ direction: 'rtl' }} className="user-profile">
                        <Dropdown.Toggle variant="white" id="dropdown-basic" >
                            <img src="/images/avatar.png" width={30} height={30} alt="" />
                            <span >
                                {
                                   "پیمان تقی پور" + user.role
                                }
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">پروفایل</Dropdown.Item>
                            <Dropdown.Item onClick={async()=>{
                                await logout();
                                navigate("/");
                            }}>خروج</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                <Navbar.Brand href="#">
                
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleButton} />
            </Container>
        </Navbar>
    )
}

export default AppHeader;