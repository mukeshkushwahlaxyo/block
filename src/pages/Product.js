import React,{useState} from 'react';
import { Rate } from 'antd';
import "./Product.css";
import MobileHeader from "../components/MobileHeader";
import NonMobileHeader from "../components/NonMobileHeader";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router';
import Purchase from '../components/Purchase';

const Product = ({isgift}) => {
  let {state: book} = useLocation();
  const [denomination,setdDenomination] = useState(book.denomination[0])
  const isNonMobileDevice = useMediaQuery({
    query: "(min-device-width: 500px)"
  })
  return (
  <>
  <div className="container">
  {isNonMobileDevice ? <NonMobileHeader /> : <MobileHeader /> }
    <div className="product-content">
      <div>
        <div className="product-img">
          <img src={book.image} alt="product" width="100%"></img>
        </div>
        <p style={{ textAlign: "center" }}>Hover over image to zoom</p>
      </div>
      <div className="product-details">
        <h1>{book.name}</h1>
        {!isgift ? <Rate value={book.rating} disabled={true}></Rate>:''}
        <hr></hr>
        <p>
          Price:
          <span className="price"> ${isgift?denomination:book.price}</span>
        </p>
        {!isgift ?
          <p>
            No Import Fees & Free Shipping Included
          </p>
          :''}
        <hr></hr>
        <h3>About This Item</h3>
        <p>
          {book.about}
        </p>
      </div>
      <div className="purchase-details">
      <Purchase isgift={isgift} denomination={denomination} setdDenomination={(data)=>setdDenomination(data)} book={book}/>
      </div>
    </div>
  </div>
  </>
)
}

export default Product;
