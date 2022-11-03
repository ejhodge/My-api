const express = require("express");
const userRouter = express.Router();
const { createUser, findUser, findAllUsers, updateUser, deleteUser} = require('../controllers/userController');
const { findAllUsersPurchases } = require("../controllers/purchaseController");
const { createPermissionCheck } = require("../middlewares/Auth-middleware");

userRouter.post("/", createPermissionCheck(['create:user']), async (req, res, next) => {
	try {
		const newUser = await createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address: {
              street: req.body.address.street,
              city: req.body.address.city,
              state: req.body.address.state,
              country: req.body.address.country,
              zip: req.body.address.zip
            }
    	});
    	res.status(200).send(newUser)
	} catch (error) {
		return next(error)
	}
});

userRouter.get("/:id", createPermissionCheck(['read:selfUser', 'read:allUsers']), async (req, res, next) => {
	try {
		const getUser = await findUser({ _id: req.params.id })
		res.status(200).send(getUser)
	} catch (error) {
		return next(error)
	}
});

userRouter.get("/", createPermissionCheck(['read:allUsers']), async (req, res, next) => {
	try {
		const getAllUsers = await findAllUsers()
			res.status(200).send(getAllUsers)
	} catch (error) {
		return next(error)
	}
});

userRouter.patch("/:id", createPermissionCheck(['update:selfUser', 'update:allUsers']), async (req, res, next) => {
	try {
		const updatedUser = await updateUser(req.params.id, req.body)
		res.status(200).send(updatedUser)
	} catch (error) {
		return next(error)
	}

});

userRouter.delete("/:id", createPermissionCheck(['delete:selfUser', 'delete:allUsers']), async (req, res, next) => {
	try {
		const executeUser = await deleteUser({ id: req.params.id })
		res.status(204).send(executeUser)
	} catch (error) {
		return next(error)
	}
});

userRouter.get("/:id/purchases", createPermissionCheck(['read:selfPurchases', 'read:allPurchases']), async (req, res) => {
	try {
		const getUserPurchases = await findAllUsersPurchases({ _id: req.params.id}) 
		res.status(200).send(getUserPurchases)
	} catch (error) {
		return next(error)
	}
});

module.exports = { userRouter: userRouter };