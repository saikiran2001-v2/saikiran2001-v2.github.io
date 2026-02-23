use wasm_bindgen::prelude::*;
use std::collections::HashMap;

#[wasm_bindgen]
#[derive(Clone)]
pub struct Item {
    name: String,
    price: i32,
}

#[wasm_bindgen]
impl Item {
    #[wasm_bindgen(constructor)]
    pub fn new(name: &str, price: i32) -> Item {
        Item {
            name: name.to_string(),
            price,
        }
    }

    pub fn get_name(&self) -> String {
        self.name.clone()
    }

    pub fn get_price(&self) -> i32 {
        self.price
    }
}

#[wasm_bindgen]
pub struct ShoppingCart {
    items: Vec<Item>,
}

#[wasm_bindgen]
impl ShoppingCart {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ShoppingCart {
        ShoppingCart {
            items: Vec::new(),
        }
    }

    pub fn add_item(&mut self, name: &str, price: i32) {
        self.items.push(Item::new(name, price));
    }

    pub fn remove_item(&mut self, name: &str) -> bool {
        if let Some(pos) = self.items.iter().rposition(|item| item.name == name) {
            self.items.remove(pos);
            true
        } else {
            false
        }
    }

    pub fn get_item_count(&self) -> usize {
        self.items.len()
    }

    pub fn get_subtotal(&self) -> i32 {
        self.items.iter().map(|item| item.price).sum()
    }

    pub fn calculate_total(&self, promo_type: &str, promo_value: i32) -> i32 {
        let subtotal = self.get_subtotal();

        let discount = match promo_type {
            "flat" => promo_value,
            "percent" => subtotal * promo_value / 100,
            _ => 0,
        };

        (subtotal - discount).max(0)
    }

    pub fn get_discount_amount(&self, promo_type: &str, promo_value: i32) -> i32 {
        let subtotal = self.get_subtotal();
        match promo_type {
            "flat" => promo_value.min(subtotal),
            "percent" => subtotal * promo_value / 100,
            _ => 0,
        }
    }

    pub fn generate_receipt(&self, promo_type: &str, promo_value: i32) -> String {
        let mut item_counts: HashMap<&str, (i32, i32)> = HashMap::new();

        for item in &self.items {
            let entry = item_counts.entry(&item.name).or_insert((0, item.price));
            entry.0 += 1;
        }

        let mut receipt = String::from("╔══════════════════════════════════╗\n");
        receipt.push_str("║       ITEMIZED RECEIPT            ║\n");
        receipt.push_str("╠══════════════════════════════════╣\n");

        let mut sorted_items: Vec<_> = item_counts.iter().collect();
        sorted_items.sort_by_key(|(name, _)| name.to_string());

        for (name, (qty, unit_price)) in &sorted_items {
            let line_total = *qty * *unit_price;
            receipt.push_str(&format!(
                "  {}x {} @ ${:.2} = ${:.2}\n",
                qty,
                name,
                *unit_price as f64 / 100.0,
                line_total as f64 / 100.0
            ));
        }

        let subtotal = self.get_subtotal();
        receipt.push_str("╠══════════════════════════════════╣\n");
        receipt.push_str(&format!("  Subtotal:          ${:.2}\n", subtotal as f64 / 100.0));

        let discount = self.get_discount_amount(promo_type, promo_value);
        if discount > 0 {
            let promo_label = match promo_type {
                "flat" => format!("${:.2} off", promo_value as f64 / 100.0),
                "percent" => format!("{}% off", promo_value),
                _ => String::from("None"),
            };
            receipt.push_str(&format!("  Discount ({}): -${:.2}\n", promo_label, discount as f64 / 100.0));
        }

        let total = self.calculate_total(promo_type, promo_value);
        receipt.push_str(&format!("  ─────────────────────────\n"));
        receipt.push_str(&format!("  TOTAL:             ${:.2}\n", total as f64 / 100.0));
        receipt.push_str("╚══════════════════════════════════╝");

        receipt
    }

    pub fn get_items_json(&self) -> String {
        let mut item_counts: HashMap<&str, (i32, i32)> = HashMap::new();
        for item in &self.items {
            let entry = item_counts.entry(&item.name).or_insert((0, item.price));
            entry.0 += 1;
        }

        let mut parts: Vec<String> = Vec::new();
        let mut sorted_items: Vec<_> = item_counts.iter().collect();
        sorted_items.sort_by_key(|(name, _)| name.to_string());

        for (name, (qty, price)) in &sorted_items {
            parts.push(format!(
                "{{\"name\":\"{}\",\"qty\":{},\"price\":{}}}",
                name, qty, price
            ));
        }

        format!("[{}]", parts.join(","))
    }

    pub fn check_for_confetti(&self, promo_type: &str, promo_value: i32) -> String {
        match promo_type {
            "percent" => format!("CONFETTI! You saved {}%!", promo_value),
            "flat" => format!("Nice! ${:.2} discount applied!", promo_value as f64 / 100.0),
            _ => String::from("No promo applied"),
        }
    }

    pub fn clear(&mut self) {
        self.items.clear();
    }
}
