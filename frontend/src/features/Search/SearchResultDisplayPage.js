import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSearchResults } from "../SearchBar/SearchBarSlice";
import { useHistory } from "react-router-dom";
// import SearchResult from "../Search/SearchResultsCard"
import ResultsDisplayCard from "../ResultsDisplay/ResultsDisplayCard";

const ItineraryDisplayPage = () => {
  const itineraryResult = useSelector(selectSearchResults);
  const history = useHistory();

  const displayResults = () => {
    return itineraryResult.map((result) => {
      if (result.rating > 3.5) {
        return (
          <ResultsDisplayCard
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
        );
      }
    });
  };

  debugger;
  return (
    <>
      {/* <Search/> */}
      <div className={"resultIndex"}>
        <div className={"topHeader"}>
          <h2 id={"heading"}>Search Results</h2>
        </div>
        {!itineraryResult.length ? <p>No Results Found</p> : displayResults()}
      </div>
    </>
  );
};
export default ItineraryDisplayPage;
