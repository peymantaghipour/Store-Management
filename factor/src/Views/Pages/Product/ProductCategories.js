
import { Alert, Button, Col, Container, Row, Stack } from "react-bootstrap"
import { useSelector } from "react-redux";
import SelectInput from "../Components/Form/SelectInput";
import categoryViewService from "../../../ViewService/categoryViewService";
import { useEffect } from "react";
import productViewService from "../../../ViewService/productViewService";
import { AgGridColumn } from 'ag-grid-react';

import { Link } from "react-router-dom";
import GridView from "../Components/GridView/GridView";

const ProductCategories=()=>{

    const {productModel,productCategoryModel,productCategoriesListModel}=useSelector(state=>{return{productModel:state.product.productModel,
        productCategoryModel:state.product.productCategoryModel,
        productCategoriesListModel:state.product.productCategoriesListModel
    }});
    const categoryTreeListModel=useSelector(state=>state.category.categoryTreeListModel);
    const {SearchCategoryTreeList}=categoryViewService();
    const {RegisterProductCategory,GetProductCategories}=productViewService();

    useEffect(()=>{
        SearchCategoryTreeList();
    },[]);

    const renderHierarChicalName=(params)=>{
        return <Link to={"/category/"+params.data.id}>{params.data.hierarchicalName}</Link>
    }

    return(<Container fluid className="fade alert alert-light show">

        {
        productModel.id !==0 ?
        <>
        <Row>
        <div className='ag-theme-alpine' style={{height:550,width:"100%"}}>
            <GridView listModel={productCategoriesListModel.filter(p=>p.id!==1)} getData={GetProductCategories}
             frameworkComponents={{renderhierarChicalName:renderHierarChicalName}}>

            <AgGridColumn field="hierarchicalName" headerName="نام" width={400} cellRenderer="renderhierarChicalName" />
            </GridView>
        </div>
        </Row>
        <Row className="mt-4">
        <Col>
            <Stack gap={3}>
                
                <div className="text-center">
                    <Col sm={{span:2,offset:5}}>
               <SelectInput id="categoryID" model={productCategoryModel} description="دسته" list={categoryTreeListModel.filter(p=>p.id!==1)} text="hierarchicalName" />
                    </Col>
                </div>
                <div className="text-center">
                    <Button variant="success" onClick={RegisterProductCategory} >ثبت</Button>
                </div>
            </Stack>
        </Col>
    </Row>
        </>
        :
           
        <Row>
            <Col>
                <Alert variant="danger">ابتدا باید اطلاعات محصول ثبت شود</Alert>
            </Col>
        </Row>
        
        }
    
    </Container>)
}
export default ProductCategories;