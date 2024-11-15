import "./product.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  CheckBoxInput,
  DatePickerInput,
  NumberInput,
  TextInput,
} from "../Components/Form/Index";
import { useDispatch, useSelector } from "react-redux";
import productViewService from "../../../ViewService/productViewService";
import ProductGrid from "./ProductGrid";

const ProductListPage = () => {

  const dispatch=useDispatch();
  const {SearchProducts}=productViewService(dispatch);
  const productFilterModel = useSelector(state=>state.product.productFilterModel);

  return (
    <Container fluid className="productPage">
      <Row>
        <Col>
          <h4>لیست محصولات</h4>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col sm>
          <TextInput
            model={productFilterModel}
            description="نام محصول"
            id="ProductName"
          />
        </Col>
        <Col sm>
          <TextInput
            model={productFilterModel}
            description="کد محصول"
            id="sku"
          />
        </Col>
        <Col xs={0}></Col>
      </Row>
      <Row className="mt-2">
        <Col sm>
          <NumberInput
            model={productFilterModel}
            description="از قیمت"
            id="FromPrice"
          />
        </Col>
        <Col sm>
          <NumberInput
            model={productFilterModel}
            description="تا قیمت"
            id="ToPrice"
          />
        </Col>
        <Col xs={0}></Col>
      </Row>
      <Row className="mt-2">
        <Col sm>
          <DatePickerInput
            model={productFilterModel}
            description="از تاریخ"
            id="FromPublishDate"
          />
        </Col>
        <Col sm>
          <DatePickerInput
            model={productFilterModel}
            description="تا تاریخ"
            id="ToPublishDate"
          />
        </Col>
        <Col xs={0}></Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <CheckBoxInput
            model={productFilterModel}
            id="IsAvailable"
            description="موجودی"
          />
        </Col>
        <Col></Col>
        <Col>
          
          <Button
            style={{ float: "left" }}
            variant="success"
            onClick={SearchProducts}
          >
            <span>جستجو</span>
            <span className="ml-2 mr-2 fa fa-search"></span>
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <ProductGrid />
      </Row>
    </Container>
  );
};
export default ProductListPage;
// const mapStateToProp = (state) => {
//   return {
//     productFilterModel: state.product.productFilterModel,
//   };
// };

// export default connect(mapStateToProp, productViewService)(ProductListPage);
