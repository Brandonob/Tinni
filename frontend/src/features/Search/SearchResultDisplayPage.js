import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSearchResults } from "../SearchBar/SearchBarSlice";
// import SearchResult from "../Search/SearchResultsCard"
import ResultsDisplayCard from "../ResultsDisplay/ResultsDisplayCard";

const ItineraryDisplayPage = () => {
  const itineraryResult = useSelector(selectSearchResults);

  const displayResults = () => {
    let count = 0;
    return itineraryResult.map((result, i) => {
      if (result.rating > 3.5) {
        count += 1;
        return (
          <>
            <ResultsDisplayCard
              cardNum={count}
              key={result.id}
              image_url={result.image_url}
              id={result.id}
              name={result.name}
              address={result.location.display_address.join(" ")}
              latitude={result.coordinates.latitude}
              longitude={result.coordinates.longitude}
              rating={result.rating}
              distance={result.distance}
            />
          </>
        );
      }
    });
  };

  return (
    <>
      {/* <Search/> */}
      <div
        className={"resultIndex"}
        style={{
          // paddingLeft: "20px",
          overflow: "scroll",
          height: "600px",
          marginRight: "2px",
          width: itineraryResult.length ? "none" : "500px",
        }}
      >
        <div className={"topHeader"}>
          {/* <h2 style={{ marginLeft: "60px" }} id={"heading"}>
            Search Results
          </h2> */}
        </div>
        {!itineraryResult.length ? <p>No Results Found</p> : displayResults()}
      </div>
    </>
  );
};
export default ItineraryDisplayPage;
