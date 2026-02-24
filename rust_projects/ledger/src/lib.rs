use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub enum BankError {
    InsufficientFunds,
    NegativeAmount,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub enum TransactionType {
    Open,
    Deposit,
    Withdrawal,
}

#[derive(Debug, Clone)]
pub struct Transaction {
    pub amount: i32,
    pub action: TransactionType,
    pub memo: String,
}

#[wasm_bindgen]
pub struct BankAccount {
    balance: i32,
    history: Vec<Transaction>,
}

#[wasm_bindgen]
impl BankAccount {
    #[wasm_bindgen(constructor)]
    pub fn new(starting_balance: i32) -> BankAccount {
        BankAccount {
            balance: starting_balance,
            history: vec![Transaction {
                amount: starting_balance,
                action: TransactionType::Open,
                memo: String::from("Initial Opening"),
            }],
        }
    }

    pub fn get_balance(&self) -> i32 {
        self.balance
    }

    pub fn get_transaction_count(&self) -> usize {
        self.history.len()
    }

    pub fn deposit(&mut self, amount: i32, memo: &str) -> String {
        if amount < 0 {
            return String::from("ERROR: Cannot deposit a negative amount.");
        }
        self.balance += amount;
        self.history.push(Transaction {
            amount,
            action: TransactionType::Deposit,
            memo: String::from(memo),
        });
        format!("Deposited ${:.2}. New balance: ${:.2}", amount as f64 / 100.0, self.balance as f64 / 100.0)
    }

    pub fn withdraw(&mut self, amount: i32, memo: &str) -> String {
        if amount < 0 {
            return String::from("ERROR: Cannot withdraw a negative amount.");
        }
        if self.balance < amount {
            return format!(
                "ERROR: Insufficient funds. Balance: ${:.2}, Requested: ${:.2}",
                self.balance as f64 / 100.0,
                amount as f64 / 100.0
            );
        }
        self.balance -= amount;
        self.history.push(Transaction {
            amount,
            action: TransactionType::Withdrawal,
            memo: String::from(memo),
        });
        format!("Withdrew ${:.2}. New balance: ${:.2}", amount as f64 / 100.0, self.balance as f64 / 100.0)
    }

    pub fn generate_statement(&self) -> String {
        let mut report = String::from("╔══════════════════════════════════════════╗\n");
        report.push_str("║           BANK STATEMENT                 ║\n");
        report.push_str("╠══════════════════════════════════════════╣\n");

        for txn in &self.history {
            let action_str = match txn.action {
                TransactionType::Open => "OPEN    ",
                TransactionType::Deposit => "DEPOSIT ",
                TransactionType::Withdrawal => "WITHDRAW",
            };
            let sign = match txn.action {
                TransactionType::Withdrawal => "-",
                _ => "+",
            };
            report.push_str(&format!(
                "  {} {} ${:.2}  ({})\n",
                action_str,
                sign,
                txn.amount as f64 / 100.0,
                txn.memo
            ));
        }

        report.push_str("╠══════════════════════════════════════════╣\n");
        report.push_str(&format!(
            "  BALANCE: ${:.2}  |  Transactions: {}\n",
            self.balance as f64 / 100.0,
            self.history.len()
        ));
        report.push_str("╚══════════════════════════════════════════╝\n");
        report
    }
}
