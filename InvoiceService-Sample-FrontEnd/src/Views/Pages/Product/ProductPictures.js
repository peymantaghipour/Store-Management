import { useRef} from "react";
import { Alert, Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import productViewService from "../../../ViewService/productViewService";
import {NumberInput} from "../Components/Form/Index";
import GridView from "../Components/GridView/GridView";
import { AgGridColumn } from 'ag-grid-react';


const ProductPictures = () => {

    const {productModel,pictureModel,productPictureModel,productPicturesListModel} = useSelector(state=>{return {productModel:state.product.productModel
        ,pictureModel:state.product.pictureModel,productPictureModel:state.product.productPictureModel,
        productPicturesListModel:state.product.productPicturesListModel
    }});
    const btnUploadRef=useRef();
    
    const dispatch=useDispatch();
    const {SelectImage,RegisterProductPicture,GetProductPictures}=productViewService(dispatch);
    const openFileDialogClick=()=>{
        btnUploadRef.current.click();
    }
    const handleFileChange=(event)=>{
        SelectImage(event.target.files[0]);
    }
    const renderPicture=(params)=>{
       return <Image thumbnail style={{height:150,width:150}} src={params.data.url} />
    }
  return( <Container fluid className="fade alert alert-light show">
    {
    productModel.id !== 0 ?
    <>
    <Row>
        <Col>
        <div className='ag-theme-alpine' style={{height:500,width:"100%"}}>
        <GridView frameworkComponents={{renderpicture:renderPicture}}
         listModel={productPicturesListModel} getData={GetProductPictures} rowHeight={150} >
            <AgGridColumn field="pictureID" width="300" headerName="تصویر" cellRenderer="renderpicture"  />
            <AgGridColumn field="displayOrder" width="200" headerName="ترتیب نمایش" />
        </GridView>
       </div>
        </Col>
    </Row>
    <Row className="mt-4">
        <Col>
            <Stack gap={3}>
                <div className="text-center">
                <Image thumbnail style={{width:140,height:140,cursor:"pointer"}} src={pictureModel.formFile?URL.createObjectURL(pictureModel.formFile):"/images/no-image.png"} onClick={openFileDialogClick} />
                </div>
                <div className="text-center">
                    <span className="fa fa-upload text-danger fa-2x" style={{cursor:"pointer"}}
                    onClick={openFileDialogClick}></span>
                    <input onChange={handleFileChange} ref={btnUploadRef} type="file" style={{display:"none"}} />
                </div>
                <div className="text-center">
                    <Col sm={{span:2,offset:5}}>
                        <NumberInput description="ترتیب تمایش" model={productPictureModel} id="displayOrder" />
                    </Col>
                </div>
                <div className="text-center">
                    <Button onClick={RegisterProductPicture} variant="success" >ثبت</Button>
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
  </Container>
  )
}
export default ProductPictures;
