import { createContext, useState } from "react";

export const MenuContex=createContext(null);

const MenuProvider=({children})=>{
    const menuList=[
        {title:"داشبورد",icon:"fa fa-home",
            subMenus: [{ title: 'داشبورد', icon: "fa fa-bar-chart-o", to: "dashborad" },
                { title: 'آمار', icon: "fa fa-lightbulb-o", to: "Statistics" }]
        },
        {title:"کاتالوگ",icon:"fa fa-sitemap",
            subMenus: [{ title: 'مدیریت محصولات', icon: "fa fa-product-hunt", to: "product" },
                { title: 'لیست محصولات', icon: "fa fa-list-alt", to: "productlist" },
                { title: 'دسته بندی ', icon: "fa fa-list-alt", to: "category" },
                { title: ' لیست دسته بندی', icon: "fa fa-list-alt", to: "categorylist" }]
        },
        {title:"مشتریان",icon:"fa fa-user"},
        {title:"فروش",icon:"fa fa-shopping-bag"},
        {title:"مدیریت نرم افزار",icon:"fa fa-gear"},
        {title:"راهنما",icon:"fa fa-question"}
    ];

    const [activeMenu,setActiveMenu]=useState(-1);

    const selectMenu=(index)=>{
        if(index===activeMenu)
        {
            setActiveMenu(-1);
        }
        else
        setActiveMenu(index);
    }
    return(
        <MenuContex.Provider value={{selectMenu,activeMenu,menuList}}>
            {children}
        </MenuContex.Provider>
    )
}

export default MenuProvider;