import { dbConnect, dbDisconnect } from '@/mongoDB/config/mongoose'
import transactionsModel from "@/mongoDB/models/transactionsModel";

dbConnect()
export const config = {
  runtime: 'nodejs',
}

export default async function handler({ method, body: { transactionIds } }, res) {
  try {
    switch (method) {
      case 'PUT':
        const transactions = await transactionsModel.find({ _id: { $in: transactionIds } }).sort({ createdAt: -1 });
        if (transactions.length === 0) {
          return res.status(404).json({ msg: 'Transactions not found' });
        }

        const transactionIdsToDelete = transactions.slice(1).map(transaction => transaction._id);
        const firstTransactionIdToUpdate = transactions[0]._id;
        let newNote = "";
        const createdAtTimes = transactions.map(transaction => {
          const createdAtDate = new Date(transaction.createdAt);
          const createdAtTime = `${createdAtDate.getHours().toString().padStart(2, '0')}:${createdAtDate.getMinutes().toString().padStart(2, '0')}`;
          newNote += `//${createdAtTime}hs// ${transaction.notes} - $${transaction.amount} `;
        });

        const amount = transactions.reduce((total, transaction) => total + transaction.amount, 0);

        await transactionsModel.deleteMany({ _id: { $in: transactionIdsToDelete } });
        const updatedTransaction = await transactionsModel.findOneAndUpdate(
          { _id: firstTransactionIdToUpdate }, { amount, notes: newNote }, { new: true }
        );

        return res.status(200).json({ res: transactions });

      default:
        return res.status(400).json({ msg: 'Invalid method' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}