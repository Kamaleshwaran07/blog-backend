import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  const query = "SELECT * FROM users WHERE email = ? or username = ?";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hashing password

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    // console.log(values);
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Registered Successfully");
    });
  });
};

export const login = (req, res) => {
  //Check user
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
    });
    console.log(other)
   
    res.status(200).json(other);
  });
};

export const logout = (req, res) => {
res.clearCookie("token",{sameSite:"none", secure:true}).status(200).json("Logged out successfully")

};
