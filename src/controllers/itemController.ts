import Item from '../models/Item';
import { createPurchase } from './purchaseController';

interface Item {
    name: string;
    description?: string;
    price: number;
    quantity: number;
};

export interface ItemFilter {
    minPrice?: number;
    maxPrice?: number;
    minQuantity?: number;
    maxQuantity?: number;
};

export const createItem = async (newItemData: Item) => {
    const newItem = new Item({
        name: newItemData.name,
        description: newItemData.description,
        price: newItemData.price,
        quantity: newItemData.quantity
	});
	await newItem.save()
    return newItem;
}

export const findItem = async (itemId: string) => {
    const getItem = await Item.findOne({
        _id: itemId
    });
    return getItem;
};

export const findAllItems = async () => {
    const getAllItem = await Item.find();
    return getAllItem;
};

/**
 * 
 * @param {object} filter - An object containing fields that can be used to query for items
 * @param {number} filter.minPrice - An filter that grabs items greater than or equal to the set minPrice
 * @param {number} filter.maxPrice _ An filter that grabs items less than or equal to the set maxPrice
 * @param {number} filter.minQuantity - An filter that grabs items greater than or equal to the set minQuantity
 * @param {number} filter.maxQuantity - An filter that grabs items greater than or equal to the set maxQuantity
 * @return {object[]} an array of items that match the filters provided
 * 
 */
export const findItemsByQuery = async (filter: ItemFilter) => {
    const queryFilter = {
        price: {
            $gte: 0,
            $lte: Number.MAX_SAFE_INTEGER
        },
        quantity: {
            $gte: 0,
            $lte: Number.MAX_SAFE_INTEGER
        }
    };
    
    if (filter.minPrice) {
        queryFilter.price.$gte = Number(filter.minPrice);
    };
    
    if (filter.maxPrice) {
        queryFilter.price.$lte = Number(filter.maxPrice);
    };

    if (filter.minQuantity) {
        queryFilter.quantity.$gte = Number(filter.minQuantity);
    };

    if (filter.maxQuantity) {
        queryFilter.quantity.$lte = Number(filter.maxQuantity);
    };
    const foundItems = Item.find(queryFilter)
    
    return foundItems
}

export const updateItem = async (itemId: string, updates: Partial<Item>) => {
    const filter = { _id: itemId }
    const updatedItem = await Item.findOneAndUpdate(filter, updates, {new: true});
    return updatedItem;
};

export const deleteItem = (itemId: string) => {
    const removeItem = Item.deleteOne({
        _id: itemId
    });
    return removeItem;
};

export const purchaseItem = async(itemId: string, userId: string, description: string = '', quantity: number) => {
    const foundItem = await findItem(itemId);

    if(!foundItem) {
        throw new Error(`PurchaseItem Error: Item with ${itemId}`);
    }

    if  (foundItem.quantity >= quantity) {
        const newQuantity = foundItem.quantity - quantity;
        const updatedItem = await updateItem(itemId, {quantity: newQuantity});
        createPurchase({ 
            userId: userId,
            itemId: itemId,
            description: description,
            total: foundItem.price * quantity,
            quantity: quantity
        });
        return updatedItem
    } else {
        throw new Error("Not enough inventory to fullfil purchase")
    }
};