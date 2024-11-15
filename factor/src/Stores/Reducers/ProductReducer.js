import { getNowPersianDate } from "../../Utils/Alerts/PersianDate";

const initialProductState={
    productListModel:[],
    productFilterModel:{ProductName: "", sku: "",IsAvailable:true, FromPrice: null, ToPrice: null, FromPublishDate: getNowPersianDate(), ToPublishDate: getNowPersianDate()},
    productModel:{id:0 , productName: "", price:0, sku:"", stockQuantity: 0, publishDate:getNowPersianDate()},
    pictureModel:{formFile:null},
    productPictureModel:{pictureID:0,productID:0,displayOrder:0},
    productPicturesListModel:[],
    productCategoryModel:{productID:0,categoryID:0},
    productCategoriesListModel:[]
}
const ProductReducer=(state=initialProductState,action)=>{
    switch (action.type) {
        case "setProductListModel":
            {
                return{...state,productListModel:action.payload};
            }
        case"setProductModel":
            {
                return{...state,productModel:action.payload};
            }
        case"newProductModel":
            {
                return{...state,productModel:{id:0 , productName: "", price:0, sku:"", stockQuantity: 0, publishDate:null}}
            }
        case"setPictureModel":
            {
                return{...state,pictureModel:{formFile:action.payload}};
            }
        case"setProductPictureModel":
            {
                return{...state,productPictureModel:{pictureID:0,productID:0,displayOrder:0}};
            }
        case"setProductPicturesListModel":
            {
                return{...state,productPicturesListModel:action.payload.map((value)=>{
                    return{...value,url:"https://localhost:7230/api/Pictures/"+value.pictureID}
                })};
            }
        case"setProductCategoriesListModel":
            {
                return{...state,productCategoriesListModel:action.payload}
            }
        
        default:
            {
                return state;
            }
        
    }
}

export default ProductReducer;
