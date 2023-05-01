// import { Transaction, transactionsDb } from '@/data/transactionDbModel'
import { dbConnect, dbDisconnect } from '@/mongoDB/config/mongoose'
import transactionsModel from "@/mongoDB/models/transactionsModel";

dbConnect()
export const config = {
  runtime: 'nodejs',
}

export default async function handler({ method, body: { _id, amount, notes, category, type, userId }, url }, res) {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const getID = urlParams.get('id');
  const getRequest = urlParams.get('request');

  try {
    switch (method) {
      case 'GET':
        if (!getRequest) {
          const transactions = await transactionsModel.find({ userId: getID }).sort({ createdAt: -1 });
          return res.status(200).json({ transactions });
        } else {
          const transaction = await transactionsModel.findById(getID);
          return res.status(200).json({ transaction });
        }
        break;

      case 'POST':
        const newTransaction = new transactionsModel({ type, amount, category, notes, userId });
        const savedTransaction = await newTransaction.save();
        return res.status(201).json({ res: `/dashboard?id=${savedTransaction.userId}` });
        break;

      case 'DELETE':
        const deletedTransaction = await transactionsModel.findOneAndDelete({ _id: getID });
        if (!deletedTransaction) {
          return res.status(404).json({ msg: 'Transaction not found' });
        }
        return res.status(200).json({ msg: 'Transaction deleted successfully' });
        break;

      case 'PUT':
        const updatedTransaction = await transactionsModel.findOneAndUpdate(
          { _id }, { amount, notes, category, type }, { new: true }
        );
        if (!updatedTransaction) {
          return res.status(404).json({ msg: 'Transaction not found' });
        }
        return res.status(200).json({ res: `/dashboard?id=${updatedTransaction.userId}` });
        break;

      default:
        return res.status(400).json({ msg: 'Invalid method' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//#region TRANSACTIONS ARRAY DATA APIS

// export default async function handler(req) {
//   if (req.method === 'GET') {
//     console.log(transactionsDb.length + " transacciones de momento")
//     const getID = Number(req.url.split('?')[1].split("=")[1]);
//     let transactions = transactionsDb.filter(transaction => {
//       return transaction.userId === getID
//     } )
//     console.log(transactions.length + " transacciones propias del usuario ID ", getID)
//     return new Response(JSON.stringify({transactions}), { status: 200, headers: { 'content-type': 'application/json' } })
//   }

//   else if (req.method === 'POST') {
//     console.log(transactionsDb.length + " transacciones de momento")
//     const { amount, notes, category, type, userId } = await req.json()
//     const newTransaction = new Transaction(type, amount, category, notes, Number(userId))
//     transactionsDb.push(newTransaction)
//     console.log(newTransaction + " es enviada al servidor")
//     return new Response(JSON.stringify({ res: `/dashboard?id=${userId}` }), { status: 200, headers: { 'content-type': 'application/json' } })
//   }
// }
//
//#endregion