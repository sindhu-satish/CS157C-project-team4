USE le;

DROP TABLE IF EXISTS recipes;

CREATE TABLE IF NOT EXISTS recipes (
    id INT PRIMARY KEY,
    title TEXT,
    ingredients LIST<TEXT>,
    instructions TEXT,
    likes INT
);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (1, 'Spaghetti Bolognese', ['spaghetti', 'ground beef', 'tomato sauce'], 'Cook spaghetti and mix with sauce.', 125);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (2, 'Pancakes', ['flour', 'milk', 'eggs', 'syrup'], 'Mix ingredients and cook on skillet.', 212);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (3, 'Chicken Curry', ['chicken', 'curry powder', 'coconut milk'], 'Cook chicken with curry powder and simmer in coconut milk.', 368);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (4, 'Grilled Cheese Sandwich', ['bread', 'cheese', 'butter'], 'Butter bread, add cheese, and grill until golden.', 97);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (5, 'Caesar Salad', ['romaine', 'croutons', 'parmesan', 'caesar dressing'], 'Toss ingredients together and serve chilled.', 143);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (6, 'Beef Tacos', ['tortillas', 'ground beef', 'lettuce', 'cheese'], 'Cook beef, fill tortillas, and add toppings.', 259);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (7, 'French Toast', ['bread', 'eggs', 'milk', 'cinnamon'], 'Dip bread in egg mix and cook until golden.', 185);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (8, 'Fried Rice', ['rice', 'soy sauce', 'eggs', 'vegetables'], 'Stir-fry rice with veggies and soy sauce.', 472);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (9, 'Tomato Soup', ['tomatoes', 'onion', 'garlic', 'cream'], 'Simmer ingredients and blend into soup.', 69);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (10, 'Mac and Cheese', ['macaroni', 'cheese', 'milk', 'butter'], 'Cook pasta and mix with cheese sauce.', 311);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (11, 'Omelette', ['eggs', 'milk', 'cheese', 'ham'], 'Beat eggs, cook with fillings in skillet.', 248);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (12, 'BBQ Chicken Wings', ['chicken wings', 'bbq sauce'], 'Bake wings and coat with BBQ sauce.', 384);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (13, 'Veggie Stir-Fry', ['broccoli', 'carrots', 'bell peppers', 'soy sauce'], 'Stir-fry vegetables in soy sauce.', 193);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (14, 'Baked Salmon', ['salmon', 'lemon', 'garlic', 'olive oil'], 'Bake salmon with seasoning at 375°F.', 423);

INSERT INTO recipes (id, title, ingredients, instructions, likes)
VALUES (15, 'Chili', ['ground beef', 'beans', 'tomato paste', 'chili powder'], 'Simmer ingredients in a pot until thick.', 337);
