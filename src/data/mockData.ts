export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export const initialTransactions: Transaction[] = [
  { id: '1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2023-10-02', amount: 120, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: '2023-10-04', amount: 50, category: 'Transport', type: 'expense', description: 'Gas Station' },
  { id: '4', date: '2023-10-05', amount: 200, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '5', date: '2023-10-08', amount: 1500, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: '6', date: '2023-10-10', amount: 300, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: '7', date: '2023-10-12', amount: 80, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '8', date: '2023-10-15', amount: 45, category: 'Food', type: 'expense', description: 'Restaurant' },
  { id: '9', date: '2023-10-20', amount: 60, category: 'Transport', type: 'expense', description: 'Train Ticket' },
  { id: '10', date: '2023-10-25', amount: 100, category: 'Shopping', type: 'expense', description: 'New Shoes' },
];

export const CATEGORIES = [
  'Salary', 'Freelance', 'Food', 'Transport', 'Utilities', 'Housing', 'Entertainment', 'Shopping', 'Other'
];
