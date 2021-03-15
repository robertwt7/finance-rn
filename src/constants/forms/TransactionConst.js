import * as yup from "yup";

export const validationTransaction = yup.object().shape({
  name: yup.string().required("Required"),
  amount: yup.number().typeError("Must be a number").required("Required"),
});

const values = {
  name: "",
  income: 0,
  category_id: "",
  amount: 0,
};

export const formValues = values;
