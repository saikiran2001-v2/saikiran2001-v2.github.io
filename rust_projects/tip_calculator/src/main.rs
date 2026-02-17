use std::io;

fn main() {
    let mut total_bill = String::new();
    let mut tip_percentage = String::new();
    let def_tip = 20.0;
    let mut num_people = String::new();

    println!("Enter the total bill amount:");

    io::stdin().read_line(&mut total_bill).expect("Failed");

    let total_bill: f64 = total_bill
        .trim()
        .parse()
        .expect("Failed to convert total bill");

    println!("Enter the percentage of the tip you want to tip. Press enter for default (20%)");

    io::stdin().read_line(&mut tip_percentage).expect("Failed");

    println!("Enter the number of people the bill and the split to be split. Press enter for default (2)");

    io::stdin().read_line(&mut num_people).expect("Failed to parse number of people");

    let num_people: f64 = {
        let n = num_people.trim();
        if n.is_empty() {
            2.0
        } else {
            match n.parse() {
                Ok(m) => m,
                Err(_) => {println!("Invalid number of people"); return;}
            }
        }
    };

    // let tip_percentage: isize = tip_percentage.trim().parse().expect("Failed to convert tip percentage");
    let tip_percentage: f64 = {
        let t = tip_percentage.trim();
        if t.is_empty() {
            def_tip
        } else {
            match t.parse() {
                Ok(num) => num,
                Err(_) => {
                    println!("Invalid percentage!");
                    return;
                }
            }
        }
    };

    let tip = tip_calc(total_bill, tip_percentage.try_into().unwrap());
    println!("Total bill is {}", total_bill);
    println!("Total tip is {}", tip);
    let split_total_bill: f64 = total_bill / num_people;
    let split_tip: f64 = tip / num_people;
    println!("Total bill split is {}", split_total_bill);
    println!("Total tip split is {}", split_tip);    
}

fn tip_calc(x: f64, y: f64) -> f64 {
    (x * y) / 100.0
}
