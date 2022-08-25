import React,{useState} from 'react';
import { Rate } from 'antd';
import "./Product.css";
import MobileHeader from "../components/MobileHeader";
import NonMobileHeader from "../components/NonMobileHeader";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router';
import Purchase from '../components/Purchase';

const MobileProduct = ({isgift}) => {
  
  let {state: book} = useLocation();
  const [denomination,setdDenomination] = useState(book.denomination[0])

  const isNonMobileDevice = useMediaQuery({
    query: "(min-device-width: 500px)"
  })

  return (
  <>
  <div className="container">
  {isNonMobileDevice ? <NonMobileHeader /> : <MobileHeader /> }
        <div className="product-img-div-mob">
            <div className="product-img-mob">
            <img src={book.image} alt="product" width="100%"></img>
            </div>
        </div>
        <p style={{ textAlign: "center" }}>Click image to zoom</p>
    
    <div className="product-content-mob">
        <h4>{book.name}</h4>
        {!isgift ? <Rate value={book.rating} disabled={true}></Rate>:''}
          <p>
          Price:
          <span className="price"> ${denomination-((denomination*2)/100)}</span>
          </p>
         {!isgift ? 
          <p>
            No Import Fees & Free Shipping Included
          </p>
          :''}
          <h3>About This Item</h3>
          <p>
          {book.about}
          </p>
        <div className="purchase-details-mob">
          <Purchase isgift={isgift} denomination={denomination-((denomination*2)/100)} setdDenomination={(data)=>setdDenomination(data)} book={book}/>
        </div>
    </div>
  </div>
  </>
)
}

export default MobileProduct;
