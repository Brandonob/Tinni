const db = require ("../../db/index")


const fetchUserItineraries = async(req, res, next)=>{
    try{
        const itineraries = await db.any(`SELECT * FROM itineraries JOIN users ON itineraries.user_id = users.id WHERE users.id = ${req.params.id}`)
        res.status(200).json({
            status:"success",
            message: "all itineraries present",
            payload: itineraries
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {fetchUserItineraries}