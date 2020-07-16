import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllItins } from '../Itinerary/itinerarySlice'

const Itinerary = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllItins)
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Itinerary;
