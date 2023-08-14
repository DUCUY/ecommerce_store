const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Tao user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser){
        // Tạo ra một user mới
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
            // User da ton tai 
        throw new Error ("User Already Exists");
    }
});

// Dang nhap
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    // check user exists or not
    const findUser = await User.findOne({email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json(findUser);
    }else {
        throw new Error ("Thông tin không hợp lệ!");
    }
});

module.exports = {createUser, loginUser };