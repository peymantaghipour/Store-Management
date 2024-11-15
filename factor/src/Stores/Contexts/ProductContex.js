import { createContext, useReducer } from "react";
import ProductReducer from "../Reducers/ProductReducer";
import ProductService from "../../Services/ProductService";
import { successMessage } from "../../Utils/Alerts/alert";
import { getNowPersianDate } from "../../Utils/Alerts/PersianDate";

const initialProductState={
    productListModel:[],
    productFilterModel:{ProductName: "", sku: "",IsAvailable:false, FromPrice: null, ToPrice: null, FromPublishDate: getNowPersianDate(), ToPublishDate: getNowPersianDate()},
    productModel:{id:0 , productName: "", price:0, sku:"", stockQuantity: 0, publishDate:getNowPersianDate()}
}
export const ProductContex=createContext(null);
const productService=new ProductService();

const ProductProvider=({children})=>{

    const [productState,dispatch]=useReducer(ProductReducer,initialProductState);

    const {productListModel,productFilterModel,productModel}=productState;

    const SearchAllProducts=async ()=>{

      
        let list=await productService.searchAllProducts();
       dispatch({type:"setProductListModel",payload:list});
       
    }
    const SearchProducts=async ()=>{
      
        let list=await productService.searchProducts(productFilterModel);
       dispatch({type:"setProductListModel",payload:list});
       
       
    }
    const RegisterProducts=async ()=>{
        if(productModel.id===0)
        {
        let id=await productService.registerProducts(productModel);
        productModel.id=id;
        }
        else
        {
            await productService.updateProducts(productModel);
        }
        successMessage();
        dispatch({type:"newProductModel"});
    }
    const FindProduct=async(id)=>{
        let product=await productService.find(id);
        dispatch({type:"setProductModel",payload:product
        });
    }
    const NewProduct=async()=>{
        dispatch({type:"newProductModel"});
    }

    return <ProductContex.Provider value={{productListModel,productFilterModel,productModel,
        SearchAllProducts,SearchProducts,RegisterProducts,FindProduct,NewProduct
    }}>
        {children}
    </ProductContex.Provider>
}

export default ProductProvider;