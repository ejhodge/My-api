import express, { Request, Response } from "express";
import { createItem, findItem, findAllItems, findItemsByQuery, deleteItem, updateItem, purchaseItem, ItemFilter } from '../controllers/itemController';
import { createPermissionCheck } from "../middlewares/Auth-middleware";

const itemRouter = express.Router();

itemRouter.post("/", createPermissionCheck(['create:item']), async (req: Request, res: Response) => {
	const newItem = await createItem({
            name: req.body.name,
            description: req.body.description,
			price: req.body.price,
            quantity: req.body.quantity,
    });
    res.status(200).send(newItem)
});

itemRouter.get("/:id", createPermissionCheck(['read:item']), async (req: Request, res: Response, next: Function) => {
	try {
		const getItem = await findItem( req.params.id)
		res.status(200).send(getItem)
	} catch (error) {
		return next(error);
	}
});

itemRouter.get("/", createPermissionCheck(['read:allItems']), async (req: Request, res: Response, next: Function) => {
	try {
		if(Object.keys(req.query).length === 0) {
			const getAllItems = await findAllItems()
			res.status(200).send(getAllItems)
		} else {
			const getAllItemsByQuery = await findItemsByQuery({
				minPrice: req.query.minPrice,
				maxPrice: req.query.maxPrice,
				minQuantity: req.query.minQuantity,
				maxQuantity: req.query.maxQuantity
			} as ItemFilter)
			res.status(200).send(getAllItemsByQuery)
		}
	} catch (error) {
		console.error
		return next(error)
	}
});

itemRouter.patch("/:id", createPermissionCheck(['update:item']), async (req: Request, res: Response, next: Function) => {
	try {
		const updatedItem = await updateItem(req.params.id, req.body)
		res.status(200).send(updatedItem)
	} catch(error) {
		return next(error)
	}

});

itemRouter.delete("/:id", createPermissionCheck(['delete:item']), async (req: Request, res: Response, next: Function) => {
	try {
		const removeItem = await deleteItem( req.params.id)
		res.status(204).send(removeItem)
	} catch (error) {
		return next(error)
	}
});

itemRouter.post("/:id/purchase", createPermissionCheck(['create:purchase']), async (req: Request, res: Response, next: Function) => {
	try {
		const newPurchase = await purchaseItem(
			req.params.id,
			req.body.userId,
			req.body.description,
			req.body.quantity
		);
    	res.status(200).send(newPurchase)
	} catch (error) {
		return next(error)
	}
});

export default itemRouter;