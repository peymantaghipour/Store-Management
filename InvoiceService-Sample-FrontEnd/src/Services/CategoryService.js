import {Get, Post, Put} from "../Adapters/Api"

export const getCategoryTreeListAction={url:"Category/searchTree",type:"get"};
export const registerCategoryAction={url:"Category",type:"post"};
export const updateCategoryAction={url:"Category",type:"put"};
export const findCategoryAction={url:"Category/find",type:"get"};

export default class CategoryService{
    searchCategoryTreeList(){
        return Get(getCategoryTreeListAction);
    }
    registerCategory(product){
        return Post(registerCategoryAction,product);
    }
    updateCategory(product){
        return Put(updateCategoryAction,product);
    }
    findCategory(id){
        return Get({url:findCategoryAction.url+"/"+id});
    }

}