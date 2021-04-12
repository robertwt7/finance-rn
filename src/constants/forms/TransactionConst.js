import * as yup from "yup";
import dayjs from "dayjs";

export const validationTransaction = yup.object().shape({
  name: yup.string().required("Required"),
  amount: yup.number().typeError("Must be a number").required("Required"),
});

const values = {
  name: "",
  income: 0,
  categoryId: "",
  amount: 0,
  date: new Date(),
};

export const formValues = values;
