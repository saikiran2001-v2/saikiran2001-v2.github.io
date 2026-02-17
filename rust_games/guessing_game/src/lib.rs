use wasm_bindgen::prelude::*;
use rand::{thread_rng, Rng};
use std::cmp::Ordering;

#[wasm_bindgen]
pub struct NumberGuessGame {
    secret: i32,
    game_over: bool,
}

#[wasm_bindgen]
impl NumberGuessGame {
    #[wasm_bindgen(constructor)]
    pub fn new() -> NumberGuessGame {
        let secret = thread_rng().gen_range(1..=100);
        NumberGuessGame {
            secret,
            game_over: false,
        }
    }

    pub fn guess(&mut self, input: &str) -> String {
        if self.game_over {
            return "Game over! Create a new game to play again.".to_string();
        }

        let guess: i32 = match input.trim().parse() {
            Ok(num) => num,
            Err(_) => return "Please type a number!".to_string(),
        };

        let distance = (guess - self.secret).abs();

        match (guess.cmp(&self.secret), distance) {
            (Ordering::Equal, _) => {
                self.game_over = true;
                "You Win!!!".to_string()
            },
            (Ordering::Less, 1) => "Too small, but you are BOILING RED HOT!!".to_string(),
            (Ordering::Greater, 1) => "Too big, but you are BOILING RED HOT!!".to_string(),
            (Ordering::Less, 2..=3) => "Too small, but you are burning up!!".to_string(),
            (Ordering::Greater, 2..=3) => "Too big, but you are burning up!!".to_string(),
            (Ordering::Less, 4..=6) => "Too small, but you are getting very warm!".to_string(),
            (Ordering::Greater, 4..=6) => "Too big, but you are getting very warm!".to_string(),
            (Ordering::Less, 7..=10) => "Too small, but you are feeling some warmth.".to_string(),
            (Ordering::Greater, 7..=10) => "Too big, but you are feeling some warmth.".to_string(),
            (Ordering::Less, 11..=15) => "Too small and it's starting to get chilly.".to_string(),
            (Ordering::Greater, 11..=15) => "Too big and it's starting to get chilly.".to_string(),
            (Ordering::Less, 16..=20) => "Too small and you are shivering... it's cold!".to_string(),
            (Ordering::Greater, 16..=20) => "Too big and you are shivering... it's cold!".to_string(),
            (Ordering::Less, _) => "Too small and you are freezing cold, What are you doing in Arctic?".to_string(),
            (Ordering::Greater, _) => "Too big and you are freezing cold, What are you doing in Arctic?".to_string(),
        }
    }

    pub fn is_game_over(&self) -> bool {
        self.game_over
    }

    pub fn reset(&mut self) {
        self.secret = thread_rng().gen_range(1..=100);
        self.game_over = false;
    }
}
