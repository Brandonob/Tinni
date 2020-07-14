import React, {useEffect} from "react"
import {useSelector} from "react-redux"
import {searchResults} from "../SearchBar/SearchBarSlice"
import {useHistory} from "react-router-dom"
import Itinerary from "./itinerary"

const ItineraryDisplayPage =()=>{
    const itinResult = useSelector(searchResults)
    const history = useHistory()

    useEffect(()=>{
        return !itinResult.length ? history.push("/home"): undefined
    }, [itinResult.length, history])

    const results = itinResult.map((result)=>{
        if(result.rating > 1){
            return <Itinerary key={result.id} result={result}/>
        }
    })

    return(
        <>
        {/* <Search/> */}
        <div className={"resultIndex"}>
          <div className={"topHeader"}>
            <h2 id={"heading"}>Search Results</h2>
          </div>
          {results}
        </div>
        
      </>
    )

}
export default ItineraryDisplayPage