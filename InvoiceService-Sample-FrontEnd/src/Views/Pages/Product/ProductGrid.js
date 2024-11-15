import {  useDispatch, useSelector } from "react-redux"
import { AgGridColumn } from 'ag-grid-react';
import { Link } from 'react-router-dom';
import productViewService from "../../../ViewService/productViewService";
import GridView from "../Components/GridView/GridView";

const ProductGrid=()=>{ 

    const productListModel=useSelector(state=>state.product.productListModel);
    const dispatch=useDispatch();
    const {SearchAllProducts}=productViewService(dispatch);

    const renderProductName=(params)=>{
        return <Link to={"/product/"+params.data.id}>{params.data.productName}</Link>
    }

return(
    <div className='ag-theme-alpine' style={{height:550,width:"100%"}}>
        <GridView listModel={productListModel} getData={SearchAllProducts}
        frameworkComponents={{renderproductName:renderProductName}} >
            <AgGridColumn field="productName" headerName="نام محصول" cellRenderer="renderproductName" />
            <AgGridColumn field="sku" headerName="کد محصول" />
            <AgGridColumn field="price" headerName="قیمت" />
            <AgGridColumn field="stockQuantity" headerName="موجودی" />
            <AgGridColumn field="localPublishDate" headerName="تاریخ انتشار" />
            <AgGridColumn field="localCreateOn" headerName="تاریخ ایجاد" />
        </GridView>
       </div>
)
}

export default ProductGrid;
// const mapStateToProp=(state)=>{
//     return{
//         productListModel:state.product.productListModel
//     }
// }
// export default connect(mapStateToProp,productViewService)(ProductGrid);