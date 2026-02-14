use rand::{thread_rng, Rng};
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Welcome to Alphabets Guessing game!!");

    let secret_u8 = thread_rng().gen_range(b'A'..=b'Z');
    let secret_alpha = char::from(secret_u8);

    //println!("Secret alphabet is {}", secret_alpha);

    loop {
        println!("Please enter an alphabet or enter 9 to quit: ");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read the input");

        let guess: char = match guess.trim().parse::<char>() {
            Ok('9') => break,
            //Ok(char) => char.to_ascii_uppercase(),
            Ok(char) if char.is_alphabetic() => char.to_ascii_uppercase(),
            _ => {
                println!("Enter a valid alphabet!!!");
                continue;
            },
        };

        let guess_val = guess as i32;
        let secret_val = secret_alpha as i32;
        let distance = (guess_val - secret_val).abs();

        //let guess = guess.to_ascii_uppercase();

        //println!("You guessed {}", guess);

        match (guess.cmp(&secret_alpha), distance) {
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
