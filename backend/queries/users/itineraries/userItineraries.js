const db = require ("../../../db/index")


const getUserItins = async(req, res, next)=>{
    try{
        let {id} = req.params
        const itins = await db.any("SELECT users.id AS user_id, users.first_name || ' ' || users.last_name AS full_name,itineraries.id AS itinerary_id, itineraries.title, itinerary_date, private FROM users JOIN itineraries ON users.id = itineraries.user_id WHERE users.id = $1", [id])
        res.status(200).json({
            status:"Success",
            message: "Retrieved all itineraries for requested user.",
            payload: itins
        })
    }catch(err){
        res.status(404).json({
            status: "Error",
            message: "Unable to retrieve itineraries for requested user.",
            payload: null
        })
    }
}

module.exports = {getUserItins}