use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct TipCalculator {
    total_bill: f64,
    tip_percentage: f64,
    num_people: f64,
}

#[wasm_bindgen]
impl TipCalculator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> TipCalculator {
        TipCalculator {
            total_bill: 0.0,
            tip_percentage: 20.0,
            num_people: 2.0,
        }
    }

    pub fn set_bill(&mut self, amount: f64) {
        self.total_bill = amount;
    }

    pub fn set_tip_percentage(&mut self, percentage: f64) {
        self.tip_percentage = percentage;
    }

    pub fn set_num_people(&mut self, people: f64) {
        self.num_people = people;
    }

    pub fn calculate_tip(&self) -> f64 {
        (self.total_bill * self.tip_percentage) / 100.0
    }

    pub fn calculate_total(&self) -> f64 {
        self.total_bill + self.calculate_tip()
    }

    pub fn calculate_per_person(&self) -> f64 {
        self.calculate_total() / self.num_people
    }

    pub fn calculate_tip_per_person(&self) -> f64 {
        self.calculate_tip() / self.num_people
    }

    pub fn get_summary(&self) -> String {
        let tip = self.calculate_tip();
        let total = self.calculate_total();
        let per_person = self.calculate_per_person();
        let tip_per_person = self.calculate_tip_per_person();

        format!(
            "Total Bill: ${:.2}\nTip ({}%): ${:.2}\nTotal: ${:.2}\n\nSplit among {} people:\nPer Person: ${:.2}\nTip Per Person: ${:.2}",
            self.total_bill, self.tip_percentage, tip, total, self.num_people as i32, per_person, tip_per_person
        )
    }
}
