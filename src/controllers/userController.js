const User = require('../models/User');

const createUser = async (newUserData) => {
    if(!newUserData.email) {
        throw new Error("An email is required")
    }
    const newUser = new User({
        firstName: newUserData.firstName,
        lastName: newUserData.lastName,
        email: newUserData.email,
        address: {
        street: newUserData.address.street,
        city: newUserData.address.city,
        state: newUserData.address.state,
        country: newUserData.address.country,
        zip: newUserData.address.zip
        }
    });
    await newUser.save();
    return newUser;
}

const findUser = async (userId) => {
    const getUser = await User.findOne({
        _id: userId
    });
    return getUser;
};


const findAllUsers = async () => {
    const getAllUsers = await User.find();
    return getAllUsers;
};

const updateUser = async (userId, updates) => {
    const filter = { _id: userId}
    const updatedUser = await User.findOneAndUpdate(filter, updates, {new: true});
    return updatedUser;
};

const deleteUser = (deletedUser) => {
    const executeUser = User.deleteOne({
        _id: deletedUser.id
    });
    return executeUser;
};

module.exports = { createUser, findUser, findAllUsers, updateUser, deleteUser }