import "./App.css";
import Button from "react-bootstrap/Button";
import AtmForm from "./Form";
import { useState } from "react";
import Transactions from "./Transactions";

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

function App() {
  const getBalance = () => {
    const savedBalance = localStorage.getItem("accountBalance");
    const initialValue = JSON.parse(savedBalance);
    return initialValue || 0;
}

  const [selectedAction, setSelectedAction] = useState('');
  const [balance, setBalance] = useState(getBalance);
  const [transactions, setTransactions] = useState([]);

  

  const updateActionWithdrawal = () => {
    setSelectedAction('withdrawal')
  }

  const updateActionDeposit = () => {
    setSelectedAction('deposit')
  }
  
  const completeTransaction = (newBalance, amount, selectedAction) => {
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    setBalance(newBalance);

    setTransactions(transactions => [...transactions, {timestamp: date, type: selectedAction, amount: amount, balance: newBalance}])
    
  }

  


  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <h1>Account Balance: {formatter.format(balance)}</h1>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 text-center">
            <Button
              variant={
                selectedAction === "deposit" ? "success" : "outline-success"
              }
              className="deposit-button me-3"
              onClick={updateActionDeposit}
            >
              Deposit
            </Button>

            <Button
              variant={
                selectedAction === "withdrawal" ? "danger" : "outline-danger"
              }
              className="withdrawal-button"
              onClick={updateActionWithdrawal}
            >
              Withdrawal
            </Button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <AtmForm selectedAction={selectedAction} completeTransaction={completeTransaction} balance={balance} />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-center">Transactions</h2>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            { typeof transactions === 'object' &&
            <Transactions transactions={transactions}/>
            }
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
