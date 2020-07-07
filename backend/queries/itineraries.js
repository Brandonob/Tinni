const db = require("../db/index.js")

const getAllItin = async (req, res, next) => {
  let itins = await db.any("SELECT * FROM itineraries")

  try {
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

