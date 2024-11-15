import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.css";
import Layout from "./Views/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerPage from "./Views/Pages/Customer/CustomerPage";
import InvoicePage from "./Views/Pages/Invoice/InvoicPage";
import ProductPage from "./Views/Pages/Product/ProductPage";
import ProductListPage from "./Views/Pages/Product/ProductList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-multi-date-picker/styles/colors/teal.css";
import CategoryPage from "./Views/Pages/Category/CategoryPage";
import CateoryListPage from "./Views/Pages/Category/CategoryListPage";
import { useSelector } from "react-redux";
import LoginPage from "./Views/Pages/Account/LoginPage";
import Loading from "./Views/Pages/Shared/Loading";
import NotFound from "./Views/Pages/Shared/NotFound";

function App() {

  const isUserOnline=useSelector(state=>state.account.isUserOnline);
  const {isShowLoding}=useSelector(state=>state.config);


  return (
    <div>
      <ToastContainer />
      {
        isShowLoding?<Loading/>:<></>
      }
      {
        isUserOnline?
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:productid" element={<ProductPage />} />
            <Route path="/productlist" element={<ProductListPage />} />
            <Route path="/category" element={<CategoryPage/>} />
            <Route path="/category/:categoryid" element={<CategoryPage/>} />
            <Route path="/categorylist" element={<CateoryListPage/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      :
      <LoginPage/>
      }
      
    </div>
  );
}

export default App;
