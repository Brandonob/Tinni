import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { businessState } from "../BusinessInfo/BusinessInfoSlice";
import axios from "axios";
import BusinessInfo from "../BusinessInfo/BusinessInfo";
import Reviews from "../BusinessInfo/BusinessReview";
const API_KEY =
  "8qnMAZ-CZ90tKgmGIL0GXzVK-teEHMAmfu0f-NlSKYgA-dSxs5WzkUz5DEu293l2ccgEUx9VMFEB3rMRMGXh0d7uU2cuybWSC91zVpq7-1l7Zq8LXBzoMVe9L8XvXnYx";

const BusinessDisplay = ({ id }) => {
  const [buiss, setBuiss] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [hours, setHours] = useState([]);

  const apiCall = async () => {
    try {
      const buiss = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setBuiss(buiss.data);
      setHours(buiss.data.hours[0].open);
    } catch (error) {
      console.log(error);
    }

    try {
      let revs = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setReviews(revs.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  // const businessId = useSelector(businessState);

  useEffect(() => {
    // apiCall(id, setBuiss, setReviews, setHours);
    apiCall();
  }, [id]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <h1>{buiss.name}</h1> */}
      {/* <img
          style={{ height: "160px", width: " 263px", borderRadius: "20px" }}
          alt=""
          src={buiss.image_url}
        /> */}
      <div style={{ paddingTop: "10px" }}>
        {/* <div style={{ paddingBottom: "3px" }}>
            <span style={{ fontWeight: "bold" }}>Rating </span>
            <span>{buiss.rating}</span>
          </div> */}
        <div>
          <span style={{ fontWeight: "bold" }}>Price</span>
          <span> {buiss.price}</span>
        </div>
      </div>
      <div style={{ paddingTop: "10px" }}>
        <h2>Hours & Location</h2>
        {hours.length ? <BusinessInfo hours={hours} /> : null}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Reviews reviews={reviews} />
          </div>
          <div
            style={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <span>{location[0]}</span>
              <span>{location[1]}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDisplay;
