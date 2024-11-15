
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';

const GridView=(props)=>{

    const onGridReady=()=>{
        
        if(props.getData)
        {
            props.getData();
        }
        if(document.getElementsByClassName("ag-paging-row-summary-panel").item(0)){
        document.getElementsByClassName("ag-paging-row-summary-panel").item(0).childNodes.item(3).innerHTML = "از";
        document.getElementsByClassName("ag-paging-row-summary-panel").item(0).childNodes.item(7).innerHTML = "تا";
        document.getElementsByClassName("ag-paging-description").item(0).childNodes.item(1).innerHTML = "صفحه";
        document.getElementsByClassName("ag-paging-description").item(0).childNodes.item(5).innerHTML = "از";
        }
    }

    return(
        <AgGridReact rowData={props.listModel}
        enableRtl
        pagination={true} paginationPageSize={10} 
        rowClass="agRowStyle" 
        onGridReady={onGridReady}
        rowSelection={'multiple'} rowMultiSelectWithClick={true} {...props}
        >
           {
            props.children
           }
        </AgGridReact>
    )
}

export default GridView;