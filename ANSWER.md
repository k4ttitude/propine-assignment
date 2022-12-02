## Assignment Answer

I divided the problem into 3 tasks:
### 1. Read CSV
At first I tent to use a 3rd party library (`csv-batch`). But that felt like out-soucing half of the resolution to someone else. So I decided to do it with native Node apis instead.

### 2. Process the transactions
Sort the transactions by timestamp, per token. Then sum all transactions amount to get a total value. Any **WITHDRAWAL** transaction with `amount > balance` is denied.

### 3. Fetch the prices
Make 1 single request to fetch multi prices.