

import PictureService from "../Services/PictureService";
import ProductService from "../Services/ProductService";
import MainStore from "../Stores/Redux/MainStore"
import { successMessage } from "../Utils/Alerts/alert";


const productService=new ProductService();
const pictureService=new PictureService();

const productViewService=(dispatch)=>{

    const SearchAllProducts=async ()=>{

        let list=await productService.searchAllProducts();
       dispatch({type:"setProductListModel",payload:list});
      
    }

    const SearchProducts=async ()=>{
      const{productFilterModel}=MainStore.getState().product;
        let list=await productService.searchProducts(productFilterModel);
        dispatch({type:"setProductListModel",payload:list});
       
    }

    const RegisterProducts=async ()=>{
        const{productModel}=MainStore.getState().product;
        if(productModel.id===0)
        {
        const product=await productService.registerProducts(productModel);
        productModel.id=product.id;
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

    const SelectImage=(file)=>{
        dispatch({type:"setPictureModel",payload:file});
    }

    const RegisterProductPicture= async()=>{
        const {pictureModel,productPictureModel,productModel}=MainStore.getState().product;
        let pictureID=await pictureService.registerPicture(pictureModel);
        productPictureModel.pictureID=pictureID;
        productPictureModel.productID=productModel.id;
        await productService.registerProductPicture(productPictureModel);
        await GetProductPictures();
        successMessage();
    }
    const GetProductPictures=async()=>{
        const{productModel}=MainStore.getState().product;
        const list= await productService.getPictures(productModel.id);
        dispatch({type:"setProductPicturesListModel",payload:list});
    }
    const RegisterProductCategory=async()=>{
        const {productModel,productCategoryModel}=MainStore.getState().product;
        productCategoryModel.categoryID=productModel.id;
        await productService.registerProductCategory(productCategoryModel);
        await GetProductCategories();
    }
    const GetProductCategories=async()=>{
        const{productModel}=MainStore.getState().product;

        const list=await productService.getCategories(productModel.id);
        dispatch({type:"setProductCategoriesListModel",payload:list})
    }
    return{SearchAllProducts,SearchProducts,RegisterProducts,FindProduct,NewProduct,SelectImage,RegisterProductPicture,GetProductPictures,RegisterProductCategory,GetProductCategories}
}

export default productViewService;