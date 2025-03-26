import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions'; // Import all actions
import { addCaseWithLoading } from '../../utils/helpers';

const initialState = {
  expenses: [],
  categories: [],
  openingBalanceHistory: [],
  allOpeningBalances: [],
  summaryData: null,
  remainingAmount: null,
  totalExpenses: null,
  totalOpeningBalance: null,
  expensesByCategory: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle Categories
    addCaseWithLoading(builder, Actions.addCategory, {
      onCompleted: (state, action) => {
        let newCategory = action.payload.data.category;
        if (Array.isArray(state.categories)) {
          state.categories.unshift(newCategory);
        } else {
          state.categories = [newCategory];
        }
        state.successMessage = 'Category added successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload;
      },
    });

    addCaseWithLoading(builder, Actions.getCategories, {
      onCompleted: (state, action) => {
        state.categories = action.payload.data.categories;
      },
    });
    
    addCaseWithLoading(builder, Actions.deleteCategory, {
      onCompleted: (state, action) => {
        const deletedCategoryId = action.meta.arg.id;
        state.categories = state.categories.filter(
          (category) => category._id !== deletedCategoryId
        );
        state.successMessage = 'Category deleted successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload?.message || 'Failed to delete category';
      },
    });

    // Handle Expenses
    addCaseWithLoading(builder, Actions.addExpense, {
      onCompleted: (state, action) => {
        let newExpense = action.payload.data.expense;
        if (Array.isArray(state.expenses)) {
          state.expenses.unshift(newExpense);
        } else {
          state.expenses = [newExpense];
        }
        state.successMessage = 'Expense added successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload;
      },
    });

    addCaseWithLoading(builder, Actions.getAllExpenses, {
      onCompleted: (state, action) => {
        state.expenses = action.payload.data.expenses;
      },
    });
    
    addCaseWithLoading(builder, Actions.deleteExpense, {
      onCompleted: (state, action) => {
        const deletedExpenseId = action.meta.arg.id;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== deletedExpenseId
        );
        state.successMessage = 'Expense deleted successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload?.message || 'Failed to delete expense';
      },
    });

    // Handle Opening Balance
    addCaseWithLoading(builder, Actions.setOpeningBalance, {
      onCompleted: (state, action) => {
        state.successMessage = 'Opening balance set successfully';
        // If we're displaying all opening balances, add the new one
        if (state.allOpeningBalances.length > 0) {
          state.allOpeningBalances.push(action.payload.data.openingBalance);
        }
      },
      onReject: (state, action) => {
        state.error = action.payload;
      },
    });
    
    addCaseWithLoading(builder, Actions.getOpeningBalance, {
      onCompleted: (state, action) => {
        state.allOpeningBalances = action.payload.data;
      },
    });
    
    addCaseWithLoading(builder, Actions.deleteOpeningBalance, {
      onCompleted: (state, action) => {
        const deletedBalanceId = action.meta.arg.id;
        state.allOpeningBalances = state.allOpeningBalances.filter(
          (balance) => balance._id !== deletedBalanceId
        );
        state.successMessage = action.payload.adjustedFutureMonths
          ? 'Opening balance deleted and future months adjusted'
          : 'Opening balance deleted successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload?.message || 'Failed to delete opening balance';
      },
    });

    // Handle Reports
    addCaseWithLoading(builder, Actions.getReports, {
      onCompleted: (state, action) => {
        state.remainingAmount = action.payload.data.remainingBalance;
        state.totalExpenses = action.payload.data.totalExpenses;
        state.totalOpeningBalance = action.payload.data.openingBalance;
      },
    });
    
    addCaseWithLoading(builder, Actions.getReportsWithCategories, {
      onCompleted: (state, action) => {
        state.remainingAmount = action.payload.data.remainingBalance;
        state.totalExpenses = action.payload.data.totalExpenses;
        state.totalOpeningBalance = action.payload.data.openingBalance;
        state.expensesByCategory = action.payload.data.expensesByCategory;
      },
    });
    
    addCaseWithLoading(builder, Actions.getMonthlySummary, {
      onCompleted: (state, action) => {
        state.summaryData = action.payload.data;
      },
    });

    addCaseWithLoading(builder, Actions.updateExpense, {
      onCompleted: (state, action) => {
        const updatedExpense = action.payload.data.expense;
        state.expenses = state.expenses.map((expense) =>
          expense?._id === updatedExpense?._id ? updatedExpense : expense,
        );
        state.successMessage = 'Expense updated successfully';
      },
      onReject: (state, action) => {
        state.error = action.payload;
      },
    });
  },
});

export const { clearSuccessMessage, clearError } = expenseSlice.actions;

export const {
  addCategory,
  getCategories,
  deleteCategory,
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getOpeningBalance,
  setOpeningBalance,
  deleteOpeningBalance,
  getReports,
  getReportsWithCategories,
  getMonthlySummary,
} = Actions;

export default expenseSlice.reducer;