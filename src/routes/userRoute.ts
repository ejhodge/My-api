import express, { Request, Response } from "express";
import { createUser, findUser, findAllUsers, updateUser, deleteUser} from '../controllers/userController';
import { findAllUsersPurchases } from "../controllers/purchaseController";
import { createPermissionCheck } from "../middlewares/Auth-middleware";

const userRouter = express.Router();

userRouter.post("/", createPermissionCheck(['create:user']), async (req: Request, res: Response, next: Function) => {
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

userRouter.get("/:id", createPermissionCheck(['read:selfUser', 'read:allUsers']), async (req: Request, res: Response, next: Function) => {
	try {
		const getUser = await findUser( req.params.id )
		res.status(200).send(getUser)
	} catch (error) {
		return next(error)
	}
});

userRouter.get("/", createPermissionCheck(['read:allUsers']), async (_req: Request, res: Response, next: Function) => {
	try {
		const getAllUsers = await findAllUsers()
			res.status(200).send(getAllUsers)
	} catch (error) {
		return next(error)
	}
});

userRouter.patch("/:id", createPermissionCheck(['update:selfUser', 'update:allUsers']), async (req: Request, res: Response, next: Function) => {
	try {
		const updatedUser = await updateUser(req.params.id, req.body)
		res.status(200).send(updatedUser)
	} catch (error) {
		return next(error)
	}

});

userRouter.delete("/:id", createPermissionCheck(['delete:selfUser', 'delete:allUsers']), async (req: Request, res: Response, next: Function) => {
	try {
		const executeUser = await deleteUser( req.params.id)
		res.status(204).send(executeUser)
	} catch (error) {
		return next(error)
	}
});

userRouter.get("/:id/purchases", createPermissionCheck(['read:selfPurchases', 'read:allPurchases']), async (req: Request, res: Response, next: Function) => {
	try {
		const getUserPurchases = await findAllUsersPurchases( req.params.id ) 
		res.status(200).send(getUserPurchases)
	} catch (error) {
		return next(error)
	}
});

export default userRouter;