import { dbConnect, dbDisconnect } from '@/mongoDB/config/mongoose'
import eventsModel from '@/mongoDB/models/eventsModel';

dbConnect()
export const config = {
    runtime: 'nodejs',
}

export default async function handler({ method, body, url }, res) {
    const { eventTitle, eventStartDate, eventDuration, recurrence, eventUntilDate, estimatedCost, eventDescription, creatorId, friendNames } = body;
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const getID = urlParams.get('id');
    const getRequest = urlParams.get('request');


    try {
        switch (method) {
          case 'GET':
            if (!getRequest) {
              const events = await eventsModel.find({ creator: getID }).sort({ start: 1 });
              const eventsToReturn = events.filter(event => new Date(event.start) >= new Date());
              return res.status(200).json({ events: eventsToReturn });
            } else {
                    const selfEvent = await eventsModel.findById(getID);
                    return res.status(200).json({ selfEvent });
                }
                break;

            case 'POST':
                const newEvent = new eventsModel({
                    title: eventTitle,
                    start: eventStartDate,
                    oneDay: eventDuration === 'oneDay',
                    recurrence: recurrence,
                    until: eventUntilDate,
                    estimatedCost: estimatedCost,
                    description: eventDescription,
                    creator: creatorId,
                    // friends: friendNames
                });
                const savedEvent = await newEvent.save();
                return res.status(201).json({ res: `/dashboard?id=${creatorId}` });

            case 'DELETE':
                const deletedTransaction = await eventsModel.findOneAndDelete({ _id: getID });
                if (!deletedTransaction) {
                    return res.status(404).json({ msg: 'Transaction not found' });
                }
                return res.status(200).json({ msg: 'Transaction deleted successfully' });
                break;

            case 'PUT':
                const updatedTransaction = await eventsModel.findOneAndUpdate(
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