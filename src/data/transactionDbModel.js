export class Transaction {
    static id = 0;
    constructor(type, amount, category, notes, userId) {
        this.id = ++Transaction.id;
        this.type = type;
        this.amount = amount;
        this.date = new Date().toLocaleString();
        this.category = category;
        this.notes = notes;
        this.userId = userId;
    }
}

export const transactionsDb = [];
export const seeTransactionsDb = () => {
    console.log(transactionsDb)
}

const transactionData = {
    type: ['egreso', "egreso", "egreso", "ingreso", "egreso", "egreso", "egreso", "egreso"],
    amount: [100, 200, 100, 1250, 300, 125, 300, 50],
    category: ['alimentación', "salidas", "impuestos", "sueldo", "objetos", "alimentación", "perdidas", "regalos"],
    notes: ['Compra en el supermercado', 'Nafta del auto', "aportes", '', "monopatin", "kebab", "me robaron", "compras para familia"],
    userId: 1
};

for (let i = 0; i < transactionData.type.length; i++) {
    transactionsDb.push(new Transaction(transactionData.type[i], transactionData.amount[i], transactionData.category[i], transactionData.notes[i], transactionData.userId))
}

transactionsDb.push(new Transaction("error", 0, "categoria de error", "error", 2))