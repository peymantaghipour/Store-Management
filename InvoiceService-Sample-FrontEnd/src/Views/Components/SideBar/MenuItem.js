import { useContext } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuContex } from "../../../Stores/Contexts/MenuContext";

const MenuItem=({title,icon,subMenus,index})=>{
    const {selectMenu,activeMenu}=useContext(MenuContex);
    return(
        <li className={activeMenu===index ? "active" : ""}>
                <a className="nav-link" onClick={()=>{selectMenu(index)}}>
                    <i className={icon}></i>
                    <span className="title">{title}</span>
                    <span className="fa fa-chevron-left"></span>
                </a>
                <div className="nav child_menu">
                    <Collapse in={activeMenu===index}>
                    <ul>
                        {
                            subMenus && subMenus.map((value,i)=>{
                                return(
                                    <li>
                            <Link to={value.to} className="nav-link">
                            <i className={value.icon}></i>
                            <span className="title">{value.title}</span>
                            </Link>
                        </li>
                                )
                            })
                        }
                        
                    </ul>
                    </Collapse>
                </div>
            </li>
    )
}

export default MenuItem;