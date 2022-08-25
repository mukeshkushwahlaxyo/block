import {Card, Rate} from 'antd';
import { Link } from 'react-router-dom';
import "./Results.css";
import {books} from "../books.js";

function MobileResults({category, rating, priceMin, priceMax}) {

 const bookCategory = books[category].filter(x => x.rating >= rating).filter(x => x.price > priceMin).filter(x => x.price <= priceMax);
 const isGift = category === 'Gift'?true:false 

  return (
    <>
  {bookCategory.map((e,i) => {
    return (
      <div className="categories-card-mob">
      <div style={{ display: "flex" }}>
        <img src={e.image} alt={i} width="auto" height="150px"></img>
        <div>
          <p className="title-mob">
            {e.name}
          </p>
          {!isGift?
           <>
              <Rate value={e.rating} disabled={true}></Rate>
              <h2> ${e.price}</h2>
              <p>
                Ships to Your Location
              </p>
            </>  :''}
          <Link to={category === 'Gift' ? "/gift":'/product'} state={e} style={{color:"#FF9900"}} >
          Got to {category === 'Gift' ? 'Gift':'Product'} Page
        </Link>
        </div>
      </div>
    </div>
    );
  })}
  </>
  )
}

export default MobileResults