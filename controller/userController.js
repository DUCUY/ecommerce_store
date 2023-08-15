const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

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
        res.json({
            _id: findUser?._id,
            name: findUser?.name,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    }else {
        throw new Error ("Thông tin không hợp lệ!");
    }
});

// Get all user
const getallUser = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find().populate("wishlist");
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });

// Get a user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});


// Delete a user
const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          name: req?.body?.name,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });


// Block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const blockusr = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json(blockusr);
    } catch (error) {
      throw new Error(error);
    }
});

// Unblock a user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
    createUser,
    loginUser, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updatedUser,
    blockUser,
    unblockUser
 };