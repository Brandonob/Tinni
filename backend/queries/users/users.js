const db = require ("../../db/index")

const createUser = async(req, res, next)=>{
    try{
        let {id, first_name, last_name, email, password, phone, location, profile_pic} = req.body
        let user = await db.one(
            "INSERT INTO users(id, first_name, last_name, email, password, phone, location, profile_pic) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
            [id, first_name, last_name, email, password, phone, location, profile_pic ]
        );
        res.status(200).json({
            status:"success",
            message: "user created",
            payload: user

        })

    }catch(error){
        res.json({
            status:"error",
            message: "User Already Exists"
        })
        next(error);
    }
}

const getAllUsers = async(req, res, next)=>{
    try{
        const users = await db.any("SELECT * FROM users")
        res.status(200).json({
            payload: users,
            message:"Retrieved All Users"
        })
    }catch(error){
        res.json({
            status:"error",
            message:"couldn't get all users"
        })
        next(error)
    }
}

//  const loginUser = async(req, res, next)=>{
//      try{
//         let user = await db.one(
//             `SELECT * FROM users WHERE email = '${req.body.email} AND password = '${req.body.password}'`
//         )
//         res.status(200).json({
//             payload: user,
//             status:"success",
//             message:"user login succesful "
//         })
//      }catch(err){
//          res.json({
//              status:"error",
//              message:"The username or password you have entered is incorrect.",
//              payload: err
//          })
//          next(err)
//      }
//  }

 const deleteUser = async(req, res, next)=>{
    console.log(req.params.id)
     try{
         let user = await db.one(`DELETE FROM users WHERE id = ${req.params.id} RETURNING *`)

         res.status(200).json({
             payload: user,
             status:"success",
             message:"user deleted"
         })
         
     }catch(error){
         res.json({
             status: "error",
             message: "Could not delete user",
             payload:err
         })
         next(error)
     }
 }

 const getSingleUser = async (req, res, next) => {
    try {
        // debugger
        let user = await db.any(`SELECT * FROM users WHERE id = $1`, [req.params.id]);

        res.status(200).json({
            status: "success",
            message: " USER",
            payload: user
        })
    } catch (error) {
    //     res.status(555).json({
    //     status: error,
    //     message: "no active user",
    //     payload: null,
    //   });
      next(error);
    }
}


module.exports = {createUser, getAllUsers, deleteUser, getSingleUser}