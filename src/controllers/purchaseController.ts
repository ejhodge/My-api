import Purchase from '../models/Purchase';

interface ItemPurchase {
    userId: string;
    itemId: string;
    description?: string;
    total: number;
    quantity: number;
};

export const createPurchase = async (newPurchaseData: ItemPurchase) => {
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

export const findAllUsersPurchases = async (userId: string) => {
        const getAllPurchases = await Purchase.find({
            userId: userId
        });
        return getAllPurchases;
}