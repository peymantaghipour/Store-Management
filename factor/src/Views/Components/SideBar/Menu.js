import { useContext } from "react";
import MenuItem from "./MenuItem";
import { MenuContex } from "../../../Stores/Contexts/MenuContext";

const Menu=()=>{
    
    const {menuList}=useContext(MenuContex);
    return( <div className="menu_section">
        <ul className="nav side-menu page-sidebar-menu side-show">
            {
                menuList && menuList.map((value,index)=>{
                    return(<MenuItem index={index} title={value.title} icon={value.icon} key={index} subMenus={value.subMenus}/>)
                })
            }
            
        </ul>
    </div>

    )
}

export default Menu;