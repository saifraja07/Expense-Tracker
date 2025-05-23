import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseTable } from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expense, setExpense] = useLocalStorage("expense", {
    title: "",
    category: "",
    amount: "",
  });
  const [editingRowId, setEditingRowId] = useLocalStorage("editingRowId", "");
  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
          expense={expense}
          setExpense={setExpense}
        />
        <ExpenseTable
          expenses={expenses}
          setEditingRowId={setEditingRowId}
          setExpenses={setExpenses}
          setExpense={setExpense}
        />
      </div>
    </main>
  );
}

export default App;
