const Purchase = require('../models/Purchase');

const createPurchase = async (newPurchaseData) => {
    const newPurchase = new Purchase({
        userId: newPurchaseData.userId,
        itemId: newPurchaseData.itemId,
        description: newPurchaseData.description,
        total: newPurchaseData.total,
        quantity: newPurchaseData.quantity
	});
	await newPurchase.save()
    return newPurchase;
};

const findAllUsersPurchases = async (userId) => {
        const getAllPurchases = await Purchase.find({
            userId: userId
        });
        return getAllPurchases;
}

module.exports = { createPurchase, findAllUsersPurchases }