import jwt from "jsonwebtoken";
import {db} from "../db.js";
import bcrypt from "bcrypt";

export const register = (req,res) =>{

    const q ="SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q,[req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("Korisnik već postoji!");

   
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`,`is_admin`) VALUES (?)";
        const values = [req.body.username,req.body.email,hash, req.body.isAdmin || false]

        db.query(q,[values],(err, data)=>{
            if(err) {
                console.log(err + "  GRESKA")
                return res.json(err);
            }else{
                console.log("Uspjesno registrovan!")
                return res.status(200).json("Korisnik je kreiran.");
            }
           
        })

    });
};

export const login = (req,res) =>{
    

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Korisnik ne postoji!") 

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    if(!isPasswordCorrect) return res.status(400).json("Pogrešno korisničko ime ili lozinka!")

    const token = jwt.sign({id: data[0].id}, "unama");
    const {password,...other} = data[0];

    res.cookie("access_token",token,{
        httpOnly:true,
    }).status(200).json(other)
    
    })
}

export const logout = (req,res) =>{
    
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("Korisnik je odjavljen.");
}