import React, {useEffect} from "react"
import Itinerary from "../Itinerary/itinerary"
import { useSelector } from "react-redux";
import { searchResults } from "../SearchBar/SearchBarSlice"
import { useHistory } from "react-router-dom";

const ItineraryDisplayPage = ()=>{
    const searchRes= useSelector(searchResults)
    // const history = useHistory()

    // useEffect(() => {
    //     return !searchResults.length ? history.push("/") : undefined;
    //   }, [searchResults.length, history]);
    
      const results = searchRes.map((result) => {
        if (result.rating > 3.5) {
          return <Itinerary key={result.id} result={result} />;
        }
      });

      return(
        <>
        {/* <Search/> */}
        <div className={"resultIndex"}>
          <div className={"topHeader"}>
            <h2 id={"heading"}>Search Results</h2>
          </div>
          {results}
        </div>
        {/* <ModalDisplay /> */}
      </>
      )

}

export default ItineraryDisplayPage