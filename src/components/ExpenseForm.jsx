import { useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

export const ExpenseForm = ({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) => {
  const [error, setError] = useState({});
  const emptyExpense = { title: "", category: "", amount: "" };

  const validateRule = {
    title: [
      { required: true, message: "Please Enter Title" },
      { minLength: 2, message: "Title should be at least 2 characters long" },
    ],
    category: [{ required: true, message: "Please Select a Category" }],
    amount: [
      { required: true, message: "Please Enter an Amount" },
      {
        pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
        message: "Please Enter a Valid Amount",
      },
    ],
  };

  const validate = (FormData) => {
    const errorData = {};

    Object.entries(FormData).forEach(([key, value]) => {
      validateRule[key].some((rule) => {
        const valueToCheck = value.trim();
        if (rule.required && !valueToCheck) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.minLength && valueToCheck.length < rule.minLength) {
          errorData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(valueToCheck)) {
          errorData[key] = rule.message;
          return true;
        }
      });
    });
    setError(errorData);
    return errorData;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    const formattedExpense = {
      ...expense,
      title: expense.title
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      amount: parseFloat(expense.amount.trim()),
    };

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...formattedExpense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense(emptyExpense);
      setEditingRowId("");
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...formattedExpense, id: crypto.randomUUID() },
    ]);
    setExpense(emptyExpense);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <InputField
        id="Title"
        label="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={error.title}
      />
      <SelectField
        id="Category"
        label="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        error={error.category}
        defaultOption={"Select Category"}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
      />
      <InputField
        id="Amount"
        label="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={error.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
};
