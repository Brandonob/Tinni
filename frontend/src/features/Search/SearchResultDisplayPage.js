import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {selectSearchResults} from "../SearchBar/SearchBarSlice"
import {useHistory} from "react-router-dom"
import SearchResult from "../Search/SearchResultsCard"


const ItineraryDisplayPage =()=>{
    const itineraryResult = useSelector(selectSearchResults)
    const history = useHistory()
   const displayResults = ()=>{
     return(
        itineraryResult.map((result)=>{
      
        if(result.rating > 3.5){
          return <SearchResult key={result.id} result={result}/>
        }
      })
     )
   }
   
    
   debugger
    return(
        <>
        {/* <Search/> */}
        <div className={"resultIndex"}>
          <div className={"topHeader"}>
            <h2 id={"heading"}>Search Results</h2>
          </div>
          {!itineraryResult.length ? <p>No Results Found</p>: displayResults()}
        </div>
        
      </>
    )

}
export default ItineraryDisplayPage