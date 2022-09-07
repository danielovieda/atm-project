import { useState } from "react";
import { Button } from "react-bootstrap";

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }



function AtmForm({selectedAction, balance, completeTransaction}) {
    

    const [confirm, setConfirm] = useState(false);
    const [amount, setAmount] = useState(0);
    const [accountBalance, setAccountBalance] = useState(balance);
    const [warning, setWarning] = useState(false)

    const confirmHandler = () => {
        if (confirm) {
            setAmount(0);
        }
        setConfirm(confirm => !confirm)
    }

    const amountHandler = e => {
        e.preventDefault();
        var newAmount = Number(e.target.value);
        if (newAmount >= 0) {
            setAmount(newAmount)
        } else {
            return
        }
    }

    const confirmTransaction = () => {
        setWarning(false);
        
        var newBalance = 0;
        if (selectedAction === 'withdrawal') {
            newBalance = accountBalance - amount;
            if (newBalance < 0) {
                setWarning(true);
                confirmHandler();
                return;
            }
            localStorage.setItem("accountBalance", newBalance);
            
        }

        if (selectedAction === 'deposit') {
            newBalance = accountBalance + amount;
            localStorage.setItem("accountBalance", newBalance);
        }

        completeTransaction(newBalance, amount, selectedAction);
        setAccountBalance(newBalance)
        confirmHandler();

        console.log('completed transaction', accountBalance)
    }


    return (
        <>
        <form className="form-inline">
            { warning &&
            <div className="mb-3 alert alert-danger">
                Insufficient funds to complete this withdrawal. Try again.
            </div>
            }
        <div className="input-group mb-3">
            <input type='text' className='form-control' value={amount} onChange={amountHandler} />
            {
                selectedAction &&
                <Button variant="primary" onClick={confirmHandler}>{toTitleCase(selectedAction)}</Button>
            }
            
        </div>
        
        
        </form>
        
        

        { confirm &&
        <div>
            <h4>Are you sure you want to <u>{toTitleCase(selectedAction)}</u> ${amount}? </h4>
            <div className="text-center">
            <Button variant="success" className="me-2" onClick={confirmTransaction}>Yes</Button>
            <Button variant="danger" onClick={confirmHandler}>No</Button>

            </div>
            
        </div>
        
        }
        
        </>
    )
}

export default AtmForm