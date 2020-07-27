const db = require("../db/index.js")

const getAllItin = async (req, res, next) => {
  try {
    let itins = await db.any("SELECT * FROM itineraries")

    res.status(200).json({
      status: "Success",
      message: "All itineraries have been retrieved.",
      payload: itins
    })
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: "Unable to fetch itineraries",
      payload: null
    })
  }
}

const getItinById = async (req, res, next) => {
  try {
    let {id} = req.params
    let itin = await db.one("SELECT * FROM itineraries WHERE id = $1", [id])

    res.status(200).json({
      status: "Success",
      message: "Requested itinerary has been successfully retrieved.",
      payload: itin
    })
  } catch(err) {
    res.status(404).json({
      status: "Error",
      message: "Unable to retrieve requested itinerary.",
      payload: null
    })
  }
}

const addItin = async (req, res, next) => {
  try {
    let data = req.body
    console.log(data)
    console.log(data.user_id)
    let itin = await db.any("INSERT INTO itineraries (user_id,itinerary_date,title) VALUES (${user_id}, ${itinerary_date}, ${title}) RETURNING *", data)
    
    res.status(200).json({
      status: "Success",
      message: "Itinerary has been successfully created.",
      payload: itin
    })
  } catch(err) {
    res.status(500).json({
      status: "Error",
      message: "Unable to create new itinerary.",
      payload: null
    })
  }
}

const deleteItin = async (req, res, next) => {
  try {
    let {id} = req.params
    let itin = await db.one("DELETE FROM itineraries WHERE id = $1 RETURNING *", [id])

    res.status(200).json({
      status: "Success",
      message: "Itinerary has been deleted.",
      payload: itin
    })
  } catch(err) {
    res.status(404).json({
      status: "Error",
      message: "Itinerary does not exist.",
      payload: null
    })
  }
}

const editItin = async (req, res, next) => {
  try {
    let {title} = req.body
    let {id} = req.params
    let itin = await db.one(`UPDATE itineraries SET title = '${title}' WHERE id = ${id} RETURNING *`)

    res.status(200).json({
      status: "Success",
      message: "Itinerary has been successfully updated.",
      payload: itin
    })
  } catch(err) {
    res.status(500).json({
      status: "Error",
      message: "Unable to edit itinerary.",
      payload: err
    })
  }
}

module.exports = {getAllItin, getItinById, addItin, deleteItin, editItin}