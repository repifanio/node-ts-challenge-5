import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (currentValue: number, totalValue: number): number =>
      currentValue + totalValue;

    const retIncome = this.transactions
      .map(el => {
        if (el.type === 'income') {
          return el.value;
        }
        return 0;
      })
      .reduce(reducer);

    const retOutcome = this.transactions
      .map(el => {
        if (el.type === 'outcome') {
          return el.value;
        }
        return 0;
      })
      .reduce(reducer);

    const ret = {
      income: retIncome,
      outcome: retOutcome,
      total: retIncome - retOutcome,
    };

    return ret;
  }

  public create({ title, value, type }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
