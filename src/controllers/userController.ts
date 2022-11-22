import User from '../models/User';

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    }
};

export const createUser = async (newUserData: UserInfo) => {
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

export const findUser = async (userId: string) => {
    const getUser = await User.findOne({
        _id: userId
    });
    return getUser;
};


export const findAllUsers = async () => {
    const getAllUsers = await User.find();
    return getAllUsers;
};

export const updateUser = async (userId: string, updates: Partial<UserInfo>) => {
    const filter = { _id: userId}
    const updatedUser = await User.findOneAndUpdate(filter, updates, {new: true});
    return updatedUser;
};

export const deleteUser = (userId: string) => {
    const executeUser = User.deleteOne({
        _id: userId
    });
    return executeUser;
};