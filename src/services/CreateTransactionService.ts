import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      const saldo = balance.income - balance.outcome;

      if (value > saldo) {
        throw Error('Não há saldo suficiente');
      }
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
