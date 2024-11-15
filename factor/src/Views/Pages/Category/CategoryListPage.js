import { Col, Container, Row } from "react-bootstrap"
import { AgGridColumn } from 'ag-grid-react';
import GridView from "../Components/GridView/GridView";
import { useDispatch, useSelector } from "react-redux";
import categoryViewService from "../../../ViewService/categoryViewService";
import { Link } from "react-router-dom";

const CateoryListPage=()=>{
    const categoryTreeListModel=useSelector(state=>state.category.categoryTreeListModel);
    const dispatch=useDispatch()
    const {SearchCategoryTreeList}=categoryViewService(dispatch);

    const renderHierarChicalName=(params)=>{
        return <Link to={"/category/"+params.data.id}>{params.data.hierarchicalName}</Link>
    }

    return <Container fluid className="page">
    <Row>
      <Col>
        <h4>لیست دسته ها</h4>
        <hr />
      </Col>
    </Row>
    <Row className="mt-4">
    <div className='ag-theme-alpine' style={{height:550,width:"100%"}}>
        <GridView listModel={categoryTreeListModel.filter(p=>p.id!==1)} getData={SearchCategoryTreeList}
             frameworkComponents={{renderhierarChicalName:renderHierarChicalName}}>

            <AgGridColumn field="hierarchicalName" headerName="نام" width={400} cellRenderer="renderhierarChicalName" />
           
        </GridView>
       </div>
    </Row>
    </Container>
}

export default CateoryListPage;