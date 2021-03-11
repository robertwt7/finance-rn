import * as yup from "yup";

export const validationTransaction = yup.object().shape({});

const values = {
  name: "",
  income: 0,
  category_id: "",
  amount: 0,
};

export const formValues = values;
