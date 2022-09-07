var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

function Transactions({transactions}) {
    console.log('transactions?', transactions)
    return (
        <>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Transaction #</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Balance</th>
                </tr>
            </thead>
            { transactions &&
            <tbody>
            { transactions.map((entry, index) => (
                <tr key={index+1}>
                    <th scope="row">{index+1}</th>
                    <td>{entry.timestamp}</td>
                    <td>{entry.type}</td>
                    <td>{formatter.format(entry.amount)}</td>
                    <td>{formatter.format(entry.balance)}</td>
                </tr>
            )
            
            ) }
        </tbody>
            }
            
        </table>
        </>
    )
}

export default Transactions