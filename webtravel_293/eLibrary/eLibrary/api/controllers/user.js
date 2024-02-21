import jwt from "jsonwebtoken";
import {db} from "../db.js";
import bcrypt from "bcrypt";

export const getUser = (req,res) => {
    const q = "SELECT `username`, `email`, `img` FROM users WHERE id = ?" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data[0]);
    });
}

export const getUsers = (req,res) => {
    const q = "SELECT `id`, `username`, `email`, `img`, `status`, `is_admin`  FROM users" ;

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
}

export const deleteUser = (req, res) => {
    const userIdToDelete = req.params.id;
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json("Nije autentificirano!");
    }
  
    jwt.verify(token, "unama", (err, userInfo) => {
      if (err) {
        return res.status(403).json("Token nije validan!");
      }
  
      // Provjerite ima li trenutni korisnik pravo brisanja određenog korisnika
    //   if (userInfo.id !== userIdToDelete) {
    //     return res.status(403).json("Nemate pristup ovoj operaciji");
    //   }
  
      const q = "DELETE FROM users WHERE `id` = ?";
  
      db.query(q, [userIdToDelete], (err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
  
        return res.json("Korisnik je obrisan!");
      });
    });
  };
   

export const updateUser = (req,res) => {
    // const token = req.cookies.access_token
    //  if(!token) return res.status(401).json("Nije autentificirano!")

    //  jwt.verify(token,"unama", (err, userInfo)=>{
    //      if(err) return res.status(403).json("Token nije validan!")
    const userIdToEdit = req.params.id;

        const q = "UPDATE users SET `is_admin`=?, `status`=?  WHERE `id`=?";

        const values = [
            req.body.is_admin,
            req.body.status,
        ]
    
        db.query(q,[...values,[userIdToEdit]],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Korisnik je uređen!");
        })
    //  })
}

export const updateUserPhoto = (req,res) => { 
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Nije autentificirano!")

    jwt.verify(token,"unama", (err, userInfo)=>{
        if(err) return res.status(403).json("Token nije validan!")

        const q = "UPDATE users SET `img`=? WHERE `id`=?";

        const values = [
            req.body.img,        
        ]
    
        db.query(q,[...values,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)

            return res.json("Profilna slika je uređena!");
        })
    })
}


export const updateUserPassword = (req,res) => {

    //check user

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Korisnik ne postoji!") 
    
         //cehck password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    if(!isPasswordCorrect) return res.status(400).json("Pogrešno korisničko ime ili šifra!")

      //has the password and update a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);

      const q = "UPDATE users SET `password`=? WHERE `id`=?";

      db.query(q,[hash,req.body.id],(err,data)=>{
          if(err) return res.json(err);
          return res.status(200).json("Korisnička šifra je uređena.");
      })
    
    })
}