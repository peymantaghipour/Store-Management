const initialCategoryState = {
  categoryTreeListModel: [],
  categoryModel:{id:0,name:"",parentId:0}
};
const CategoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case "setCategoryTreeListModel": {
      return { ...state, categoryTreeListModel: action.payload };
    }
    case "setCategoryModel":{
      return { ...state, categoryModel: action.payload };

    }
    case "newCategoryModel":{
      return { ...state, categoryModel:{id:0,name:"",parentId:0} };

    }

    default: {
      return state;
    }
  }
};
export default CategoryReducer;
