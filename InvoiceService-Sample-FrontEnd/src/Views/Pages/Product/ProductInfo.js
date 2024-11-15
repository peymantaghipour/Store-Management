import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  TextInput,
  NumberInput,
  DatePickerInput,
} from "../Components/Form/Index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import productViewService from "../../../ViewService/productViewService";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const { RegisterProducts, FindProduct, NewProduct } =
    productViewService(dispatch);
  const productModel = useSelector((state) => state.product.productModel);

  const { productid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (productid) {
      FindProduct(productid);
    } else {
      NewProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productid]);

  // const handleChange=(value)=>{
  //     console.log(value.format('YYYY/MM/DD'));
  //     console.log(value.year+'/'+('0'+value.month).slice(-2)+'/'+('0'+value.day).slice(-2)+'');
  //     productModel.publishDate=value.year+'/'+('0'+value.month).slice(-2)+'/'+('0'+value.day).slice(-2);
  //     productModel.publishDate=value.format('YYYY/MM/DD');

  // }

  return (
    <Container
      fluid
      style={{ height: 600 }}
      className="fade alert alert-light show"
    >
      <Row>
        <Col xs={12} sm={4}>
          <Row>
            <Col>
              <form>
                <TextInput
                  model={productModel}
                  id="productName"
                  description="نام محصول"
                />
                <TextInput
                  model={productModel}
                  id="sku"
                  description="کد محصول"
                />
                <NumberInput
                  model={productModel}
                  id="price"
                  description="قیمت"
                />
                <NumberInput
                  model={productModel}
                  id="stockQuantity"
                  description="موجودی"
                />
                <DatePickerInput
                  model={productModel}
                  id="publishDate"
                  description="تاریخ انتشار"
                />
                {/* <label style={{marginTop:"4px"}} htmlFor="publishDate"><b>تاریخ انتشار:</b></label><br/>
        <DatePicker style={{ border: "1px solid #ced4da",
        borderRadius: "5px",padding: "10px",color: "#495057",width:"413px",
        height:"40px",backgroundClip:'padding-box'}}
        value={moment('1400/01/01 00:00', 'jYYYY/jM/jD HH:mm')} onChange={handleChange}
        calendar={persian} locale={persian_fa} calendarPosition="bottom-right" /> */}
                {/* <DatePickerInput model={productModel} id="publishDate" description="تاریخ انتشار"/> */}
              </form>
            </Col>
          </Row>
          <Row>
            <Col className="mt-4 btn-group">
              <Button
                variant="danger"
                style={{ float: "left" }}
                onClick={() => {
                  navigate("/product");
                }}
                className="btn-block"
              >
                ثبت جدید
              </Button>
              <Button
                variant="success"
                style={{ float: "left" }}
                onClick={async () => {
                  await RegisterProducts();
                  if (productModel.id && productModel.id !== 0) {
                    navigate("/product/" + productModel.id);
                  }
                }}
                className="btn-block"
              >
                ثبت
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={0} sm={4}></Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
// const mapStateToProp = (state) => {
//   return {
//     productModel: state.product.productModel,
//   };
// };

// export default connect(mapStateToProp, productViewService)(ProductInfo);
