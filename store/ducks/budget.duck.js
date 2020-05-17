import React from "react";

export const actionTypes = {
  addBudget: "[ADD BUDGET]",
  editBudget: "[EDIT BUDGET]",
  deleteBudget: "[DELETE BUDGET]",
};

const initialBudgetState = {
  budgetList: [],
  err: [],
};

export const reducer = (state = initialBudgetState, action) => {
  switch (action.type) {
    case actionTypes.addBudget: {
      const { budget } = action.payload;
      return {
        ...state,
        budgetList: [{ name: budget }, ...state.budgetList],
      };
    }
    case actionTypes.editBudget: {
      return state;
    }
    case actionTypes.deleteBudget: {
      return state;
    }
    default:
      return state;
  }
};

export const actions = {
  addBudget: (budget) => ({
    type: actionTypes.addBudget,
    payload: { budget },
  }),
};
