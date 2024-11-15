import { Get, Post, Put } from "../Adapters/Api"

export const getAllProductListAction={url:"Products",type:"get"};
export const getSearchProductListAction={url:"Products/Search",type:"get"};
export const registerProductAction={url:"Products",type:"post"};
export const updateProductAction={url:"Products",type:"put"};
export const findProductAction={url:"Products",type:"get"};
export const registerProductPictureAction={url:"Products/AddProductToPicture",type:"post"};
export const getProductPictureListAction={url:"Products/picture",type:"get"};
export const registerProductCategoryAction={url:"Products/AddProductToCategory",type:"post"};
export const getProductCategoriesListAction={url:"Products/categories",type:"get"};




export default class ProductService
{
    searchAllProducts()
    {
       return Get(getAllProductListAction);
    }
    
    searchProducts(productFilter)
    {
        return Get(getSearchProductListAction,productFilter);
    }
    registerProducts(product)
    {
        return Post(registerProductAction,product);
    }
    updateProducts(product)
    {
        return Put(updateProductAction,product);
    }
    find(id)
    {
        return Get({url:findProductAction.url+"/"+id});
    }
    registerProductPicture(productPicture)
    {
        return Post(registerProductPictureAction,productPicture)
    }
    getPictures(id)
    {
        return Get({url:getProductPictureListAction.url+"/"+id});
    }
    registerProductCategory(productCategory)
    {
        return Post(registerProductCategoryAction,productCategory)
    }
    getCategories(id)
    {
        return Get({url:getProductCategoriesListAction.url+"/"+id});
    }
}