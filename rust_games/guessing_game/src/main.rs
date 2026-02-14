// cargo doc --open - To know of the dependencies, traits of the modules we are using in tthe project

use rand::{thread_rng, Rng};
use std::io; // from standard library, bring in input/output library
//use rand::thread_rng;
use std::cmp::Ordering;

fn main() {
    println!("Guess the number!!"); // Printing title

    let secret_number = thread_rng().gen_range(1..=100);

    //println!("Secret number is {}", secret_number);

    loop {
        println!("Please input your guess."); // Prompting user to guess by printing

        let mut guess = String::new(); // Initialized Empty string // From String function :: refers to // Creating a heap

        io::stdin() // Actually asking user for input (?)
            .read_line(&mut guess) // put whatever the data passed by user into string guess // We use & to borrow the variable not to transfer the variable // we use mut to give the permission to write, not just read // then we pass the variable guess on which the action should be taken
            .expect("Failed to read line"); // Err handling

        /* Redifining the guess variable to copnvert it to an integer
        : refers that we want to define a type
        u32 is unsigned 32bit integer type
        guess is we are passing the original guess which is of string type
        trim() is we are trimming any whitespace or \n \r characters by user pressing enter   5    5\n  5\r\n
        parse() to check if the string can be converted [Alphanumerics or emojis cannot be converted]. It also returns a Result enum
        .expect we are checking Result of parse() and if error we are sending a msg
        */

        //let guess: u32 = guess.trim().parse().expect("Please type a number!");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        let distance = guess - secret_number;

        //println!("You guessed: {guess}");

        match (guess.cmp(&secret_number), distance) {
            (Ordering::Equal, _) => {
                println!("You Win!!!");
                break;
            },
            (Ordering::Less, 1) => println!("Too small, but you are BOILING RED HOT!!"),
            (Ordering::Greater, 1) => println!("Too big, but you are BOILING RED HOT!!"),
            (Ordering::Less, 2..=3) => println!("Too small, but you are burning up!!"),
            (Ordering::Greater, 2..=3) => println!("Too big, but you are burning up!!"),
            (Ordering::Less, 4..=6) => println!("Too small, but you are getting very warm!"),
            (Ordering::Greater, 4..=6) => println!("Too big, but you are getting very warm!"),
            (Ordering::Less, 7..=10) => println!("Too small, but you are feeling some warmth."),
            (Ordering::Greater, 7..=10) => println!("Too big, but you are feeling some warmth."),
            (Ordering::Less, 11..=15) => println!("Too small and it's starting to get chilly."),
            (Ordering::Greater, 11..=15) => println!("Too big and it's starting to get chilly."),
            (Ordering::Less, 16..=20) => println!("Too small and you are shivering... it's cold!"),
            (Ordering::Greater, 16..=20) => println!("Too big and you are shivering... it's cold!"),
            (Ordering::Less, _) => println!("Too small and you are freezing cold, What are you doing in Arcitic?"),
            (Ordering::Greater, _) => println!("Too big and you are freezing cold, What are you doing in Arcitic?"),
        }
    }
}

/* read_line generates a Result value - enum, Result variants are Ok and Err
.expect is the method defined on the Result type,

If the value of Result is an Err, the program
will crash and display whatever the data we fed into the .expect

If the value of Result is Ok, the .expect will take whatever the value the
Ok is holding and return that value to you, in this case number of bytes in the user's input

If we do not write the .expect we will get a warning that the error handling is not done
 */
