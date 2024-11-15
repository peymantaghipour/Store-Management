import { Nav } from "react-bootstrap";

import './product.css'
import ProductInfo from "./ProductInfo";
import { useState } from "react";
import ProductPictures from "./ProductPictures";
import ProductCategories from "./ProductCategories";

const ProductPage=()=>{
    const [activeTab,setActiveTab]=useState(1);
    return(
    <div className="productPage">
        <h4>محصولات</h4>
        <hr />
        <Nav variant="tabs" defaultActiveKey={activeTab} style={{ direction: "rtl" }}>
            <Nav.Item>
                <Nav.Link eventKey="1" onClick={()=>{setActiveTab(1)}}>اطلاعات محصول</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="2" onClick={()=>{setActiveTab(2)}}>تصاویر محصول</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="3" onClick={()=>{setActiveTab(3)}}>
                    گروه بندی محصول
                </Nav.Link>
            </Nav.Item>
        </Nav>
        {
            activeTab===1?<ProductInfo/>:
            activeTab===2?<ProductPictures/>:<ProductCategories/>
        }
        
    </div>
    )
}

export default ProductPage;