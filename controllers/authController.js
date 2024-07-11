import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        // handle duplicate
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 12);



        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });


        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                name,
                email,
            },
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

}