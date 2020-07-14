import React from "react"
import {useDispatch, useSelector} from "react-redux"

const Itinerary = ({result})=>{
    const{
        id,
        name,
        image_url,
        review_count, 
        rating,
        price,
        display_phone,
        categories,
    } = result
    return(
        <div className={"restaurantCard"} key={id} value={id}>
        <div className={"basicInfo"}>
          <h2 id={"name"} title={id}  value={id}>
            {name}
          </h2>
          <img src={image_url} alt={"Restaurant"} id={"image"} />
          <h2 id={"address"}>
           Address
          </h2>
          <h2 id={"phone"}>Contact: {display_phone}</h2>
        </div>
        <div className={"information"}>
          <h2 id={"category"}>Category: {categories[0].title}</h2>
          <h2 id={"reviews"}>Reviews: {review_count}</h2>
          <h2 id={"rating"}>Rating: {rating}</h2>
          <h3 id={"price"}>Price: {price}</h3>
        </div>
        <br/>
      </div>
    )
}

export default Itinerary