import { ProfileData } from "../module/Profile.js"
import bcrypt, { genSalt, hash } from "bcrypt"
import dotnev from "dotenv"
import  jwt  from "jsonwebtoken"
dotnev.config()

export const Register = async (req, res) => {
  const { email, username, password, gender, role } = req.body;
  const lenghtofsalt = 10;
  console.log("Role received from frontend:", role);

  try {
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await ProfileData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await genSalt(lenghtofsalt);
    const hashedPassword = await hash(password, salt);

    // 🟢 agar username nahi aaya to automatic generate kar do
    const finalUsername = username || email.split("@")[0];

    const profiledata = new ProfileData({
      email,
      username: finalUsername,
      password: hashedPassword,
      gender: gender || "Not specified",
      role: role || "user",
    });

    const data = await profiledata.save();

    console.log("✅ Data Saved:", data);
    return res.status(201).json(data);
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json(err);
  }
};


export const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await ProfileData.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found for login");
    }
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){

    return res.status(401).send("user invalid bro ")
}

const payload = { _id:user._id , email:user.email , role:user.role}
const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' });
return res.status(200).json({
    token,
    isMatch
})

  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};
