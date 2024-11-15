import { Button, Col, Container, Row } from "react-bootstrap";
import {TextInput,PasswordInput} from "../Components/Form/Index"
import { useDispatch, useSelector } from "react-redux";
import AccountViewService from "../../../ViewService/AccountViewService";

const LoginPage=()=>{
    const dispatch=useDispatch();
    const loginModel=useSelector(state=>state.account.loginModel);
    const{login,autologin}=AccountViewService(dispatch);

    autologin();
    return(
        <Container style={{marginTop:280}}>
            <Row className="mt-5">
                <Col xs={0} sm={4}></Col>
                <Col className="bg-white p-5 text-dark" style={{borderRadius:20}}>
                    <form>
                        <TextInput model={loginModel} id="username" description="نام کاربری" />
                        <PasswordInput model={loginModel} id="password" description="رمز عبور"/>
                        <div>
                            <Button onClick={login} style={{float:"left"}} variant="success" className="mt-4">ورود</Button>
                        </div>
                    </form>
                </Col>
                <Col xs={0} sm={4}></Col>
            </Row>
        </Container>
    )
}

export default LoginPage;