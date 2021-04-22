import * as yup from "yup";
import dayjs from "dayjs";

export const validationTransaction = yup.object().shape(
  {
    categoryId: yup.number().when("name", {
      is: (name) => !name,
      then: yup
        .number()
        .typeError("Must be filled if name is not filled")
        .required("Required"),
      otherwise: yup.number().nullable(),
    }),
    name: yup.string().when("categoryId", {
      is: (categoryId) => !categoryId,
      then: yup
        .string()
        .typeError("Must be filled if category is not choosed")
        .required("Required"),
      otherwise: yup.string().nullable(),
    }),
    amount: yup.number().typeError("Must be a number").required("Required"),
  },
  [["categoryId", "name"]]
);

const values = {
  name: "",
  income: 0,
  categoryId: "",
  recurringMonthly: 0,
  amount: 0,
  repeatId: 0,
  endRepeatDate: new Date("1990-01-01"),
  date: new Date(),
};

export const formValues = values;
