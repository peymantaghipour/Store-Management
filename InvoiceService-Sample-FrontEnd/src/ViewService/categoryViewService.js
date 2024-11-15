import CategoryService from "../Services/CategoryService";
import MainStore from "../Stores/Redux/MainStore";
import { successMessage } from "../Utils/Alerts/alert";

const categoryService = new CategoryService();
const categoryViewService = (dispatch) => {

  const SearchCategoryTreeList = async () => {
    let list = await categoryService.searchCategoryTreeList();
    dispatch({ type: "categoryTreeListModel", payload: list });
  };

  const RegisterCategory=async ()=>{
    const{categoryModel}=MainStore.getState().category;
    if(categoryModel.id===0)
    {
    const category=await categoryService.registerCategory(categoryModel);
    categoryModel.id=category.id;
    }
    else
    {
        await categoryService.updateCategory(categoryModel);
    }
    successMessage();
    
};

const FindCategory=async(id)=>{
    let category=await categoryService.findCategory(id);
    dispatch({type:"setCategoryModel",payload:
        {id:category.id,name:category.name,parentId:category.parentId}
    });
}

const NewCategory=async()=>{
    dispatch({type:"newCategoryModel"})
}

  return { SearchCategoryTreeList , RegisterCategory , FindCategory , NewCategory };
};

export default categoryViewService;
