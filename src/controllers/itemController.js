const { del } = require('express/lib/application');
const req = require('express/lib/request');
const Item = require('../models/Item');
const { remove } = require('../models/User');

const { createPurchase } = require('./purchaseController');

const createItem = async (newItemData) => {
    const newItem = new Item({
        name: newItemData.name,
        description: newItemData.description,
        price: newItemData.price,
        quantity: newItemData.quantity
	});
	await newItem.save()
    return newItem;
}

const findItem = async (itemId) => {
    const getItem = await Item.findOne({
        _id: itemId
    });
    return getItem;
};

const findAllItems = async () => {
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
const findItemsByQuery = async (filter) => {
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

const updateItem = async (itemId, updates) => {
    const filter = { _id: itemId}
    const updatedItem = await Item.findOneAndUpdate(filter, updates, {new: true});
    return updatedItem;
};

const deleteItem = (deletedItem) => {
    const removeItem = Item.deleteOne({
        _id: deletedItem.id
    });
    return removeItem;
};

const purchaseItem = async(itemId, userId, description = '', quantity) => {
    const foundItem = await findItem(itemId);
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
}

module.exports = { createItem, findItem, findAllItems, findItemsByQuery, updateItem, deleteItem, purchaseItem }