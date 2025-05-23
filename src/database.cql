USE cs157;

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT,
    full_name TEXT
);

-- Create the 'recipes' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,  -- The unique ID for each recipe
    title TEXT,          -- The title of the recipe
    ingredients LIST<TEXT>,  -- A list of ingredients required for the recipe
    instructions LIST<TEXT>,  -- A list of instructions for preparing the recipe
    likes INT,           -- The number of likes for this recipe
    date DATE,           -- The date the recipe was created
    image_path TEXT,     -- The path to the recipe's image
    user_id TEXT      -- The ID of the user who posted the recipe
);

-- Create the 'comments' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,        -- The unique ID for each comment
    recipe_id TEXT,             -- The ID of the recipe this comment is linked to
    user_name TEXT,             -- The user who made the comment
    comment TEXT,               -- The content of the comment
    created_at TIMESTAMP       -- The timestamp of when the comment was created
);

-- Create a secondary index on recipe_id for efficient querying
CREATE INDEX IF NOT EXISTS comments_recipe_id_idx ON comments (recipe_id);

-- Insert existing users
INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'sindhusat', 'sindhu@sjsu.com', 'pass1', 'Sindhu Satish');

INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'alicia123', 'alicia@sjsu.com', 'pass1', 'Alicia Shi');

INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'ben456', 'benjamin@sjsu.com', 'pass1', 'Benjamin Le');

-- Insert additional users
INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('d4e5f6a7-b8c9-7d0e-1f2a-3b4c5d6e7f8a', 'chef_john', 'john@cooking.com', 'pass1', 'John Smith');

INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('e5f6a7b8-c9d0-8e1f-2a3b-4c5d6e7f8a9b', 'foodie_emma', 'emma@food.com', 'pass1', 'Emma Wilson');

INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('f6a7b8c9-d0e1-9f2a-3b4c-5d6e7f8a9b0c', 'cook_mike', 'mike@chef.com', 'pass1', 'Michael Brown');

INSERT INTO users (id, username, email, password, full_name) 
VALUES 
('a7b8c9d0-e1f2-0a3b-4c5d-6e7f8a9b0c1d', 'baker_sarah', 'sarah@baking.com', 'pass1', 'Sarah Davis');

INSERT INTO users (id, username, email, password, full_name) 
VALUES
('b8c9d0e1-f2a3-1b4c-5d6e-7f8a9b0c1d2e', 'chef_david', 'david@kitchen.com', 'pass1', 'David Miller');

-- Update recipe inserts to include user_id
INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('c9d0e1f2-a3b4-2c5d-6e7f-8a9b0c1d2e3f', 'Spaghetti Bolognese', 
    ['400g spaghetti', '500g ground beef', '2 cans (800g) tomato sauce', '1 onion, diced', '2 cloves garlic, minced', '2 tbsp olive oil', 'salt and pepper to taste'],
    ['Boil water in a large pot and cook spaghetti according to package instructions.',
     'Heat olive oil in a pan and sauté onions until translucent.',
     'Add minced garlic and cook for 1 minute.',
     'Add ground beef and cook until browned.',
     'Pour in tomato sauce and simmer for 20 minutes.',
     'Season with salt and pepper.',
     'Drain spaghetti and mix with the sauce.',
     'Serve hot with grated parmesan cheese.'], 125, '2024-01-15', 'static/images/spaghetti-bolognese.jpg', 'd4e5f6a7-b8c9-7d0e-1f2a-3b4c5d6e7f8a');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('d0e1f2a3-b4c5-3d6e-7f8a-9b0c1d2e3f4a', 'Pancakes', 
    ['200g all-purpose flour', '2 eggs', '300ml milk', '2 tbsp sugar', '1 tsp baking powder', '1/2 tsp salt', '2 tbsp butter, melted', 'maple syrup for serving'],
    ['In a large bowl, whisk together flour, sugar, baking powder, and salt.',
     'In another bowl, beat eggs and mix in milk and melted butter.',
     'Pour wet ingredients into dry ingredients and stir until just combined.',
     'Heat a lightly oiled griddle or frying pan over medium heat.',
     'Pour 1/4 cup of batter for each pancake.',
     'Cook until bubbles form and edges are dry, then flip and cook until browned.',
     'Serve hot with maple syrup.'], 212, '2024-02-20', 'static/images/pancake.png', 'e5f6a7b8-c9d0-8e1f-2a3b-4c5d6e7f8a9b');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'Chicken Curry', 
    ['500g chicken breast, cubed', '2 tbsp curry powder', '400ml coconut milk', '1 onion, chopped', '2 cloves garlic, minced', '1 tbsp ginger, grated', '2 tbsp vegetable oil', 'salt to taste'],
    ['Heat oil in a large pot over medium heat.',
     'Add onions and cook until soft.',
     'Add garlic and ginger, cook for 1 minute.',
     'Add chicken pieces and cook until lightly browned.',
     'Stir in curry powder and cook for 2 minutes.',
     'Pour in coconut milk and bring to a simmer.',
     'Cover and cook for 20-25 minutes until chicken is tender.',
     'Season with salt and serve with rice.'], 368, '2024-03-05', 'static/images/chicken-curry.jpg', 'f6a7b8c9-d0e1-9f2a-3b4c-5d6e7f8a9b0c');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('f2a3b4c5-d6e7-5f8a-9b0c-1d2e3f4a5b6c', 'Grilled Cheese Sandwich', 
    ['4 slices of bread', '100g cheddar cheese, sliced', '2 tbsp butter, softened', '1 tsp garlic powder (optional)'],
    ['Butter one side of each bread slice.',
     'Place cheese slices between two bread slices, buttered sides out.',
     'Heat a skillet over medium heat.',
     'Place sandwich in skillet and cook until golden brown, about 2-3 minutes.',
     'Flip and cook the other side until golden and cheese is melted.',
     'Cut in half and serve hot.'], 97, '2024-01-22', 'static/images/grilled-cheese.jpg', 'a7b8c9d0-e1f2-0a3b-4c5d-6e7f8a9b0c1d');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('a3b4c5d6-e7f8-6a9b-0c1d-2e3f4a5b6c7d', 'Caesar Salad', 
    ['1 head romaine lettuce, chopped', '100g croutons', '50g parmesan cheese, grated', '100ml caesar dressing', '2 tbsp lemon juice', '1 clove garlic, minced', 'salt and pepper to taste'],
    ['Wash and dry romaine lettuce thoroughly.',
     'Tear lettuce into bite-sized pieces and place in a large bowl.',
     'Add minced garlic and lemon juice to the bowl.',
     'Toss the lettuce with caesar dressing until evenly coated.',
     'Add croutons and grated parmesan cheese.',
     'Season with salt and pepper to taste.',
     'Serve immediately.'], 143, '2024-02-10', 'static/images/caesar-salad.jpg', 'b8c9d0e1-f2a3-1b4c-5d6e-7f8a9b0c1d2e');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('b4c5d6e7-f8a9-7b0c-1d2e-3f4a5b6c7d8e', 'Beef Tacos', 
    ['8 corn tortillas', '500g ground beef', '1 packet taco seasoning', '1 onion, diced', '2 tomatoes, diced', '100g lettuce, shredded', '100g cheddar cheese, grated', '2 tbsp vegetable oil', 'sour cream and salsa for serving'],
    ['Heat oil in a large skillet over medium heat.',
     'Add diced onions and cook until soft.',
     'Add ground beef and cook until browned, breaking it up with a spoon.',
     'Stir in taco seasoning and 1/2 cup water, simmer for 5 minutes.',
     'Warm tortillas according to package instructions.',
     'Fill each tortilla with beef mixture.',
     'Top with lettuce, tomatoes, cheese, sour cream, and salsa.',
     'Serve immediately.'], 259, '2024-03-15', 'static/images/beef-tacos.jpg', 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('c5d6e7f8-a9b0-8c1d-2e3f-4a5b6c7d8e9f', 'French Toast', 
    ['8 slices of bread', '4 eggs', '200ml milk', '1 tsp vanilla extract', '1 tsp ground cinnamon', '2 tbsp sugar', '2 tbsp butter', 'maple syrup for serving'],
    ['In a shallow bowl, whisk together eggs, milk, vanilla, cinnamon, and sugar.',
     'Heat a large skillet or griddle over medium heat and melt butter.',
     'Dip each bread slice into the egg mixture, coating both sides.',
     'Place bread on the hot skillet and cook until golden brown, about 2-3 minutes per side.',
     'Repeat with remaining bread slices.',
     'Serve hot with maple syrup and fresh fruit if desired.'], 185, '2024-02-28', 'static/images/french-toast.jpg', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('d6e7f8a9-b0c1-9d2e-3f4a-5b6c7d8e9f0a', 'Fried Rice', 
    ['300g cooked rice (preferably day-old)', '2 eggs', '100g mixed vegetables (carrots, peas, corn)', '2 cloves garlic, minced', '2 tbsp soy sauce', '1 tbsp sesame oil', '2 tbsp vegetable oil', '2 spring onions, chopped', 'salt and pepper to taste'],
    ['Heat vegetable oil in a large wok or skillet over high heat.',
     'Add minced garlic and cook for 30 seconds.',
     'Add mixed vegetables and stir-fry for 2-3 minutes.',
     'Push vegetables to one side and scramble eggs in the empty space.',
     'Add cooked rice and stir everything together.',
     'Pour in soy sauce and sesame oil, mix well.',
     'Cook for another 2-3 minutes, stirring constantly.',
     'Season with salt and pepper, garnish with spring onions.',
     'Serve hot.'], 472, '2024-03-01', 'static/images/fried-rice.jpg', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('e7f8a9b0-c1d2-0e3f-4a5b-6c7d8e9f0a1b', 'Tomato Soup', 
    ['1kg ripe tomatoes, chopped', '1 onion, diced', '2 cloves garlic, minced', '2 tbsp olive oil', '500ml vegetable stock', '100ml heavy cream', '1 tsp sugar', 'salt and pepper to taste', 'fresh basil for garnish'],
    ['Heat olive oil in a large pot over medium heat.',
     'Add onions and cook until soft.',
     'Add garlic and cook for 1 minute.',
     'Add chopped tomatoes and cook for 5 minutes.',
     'Pour in vegetable stock and bring to a boil.',
     'Reduce heat and simmer for 20 minutes.',
     'Use an immersion blender to puree the soup until smooth.',
     'Stir in heavy cream and sugar.',
     'Season with salt and pepper.',
     'Garnish with fresh basil and serve hot.'], 69, '2024-01-30', 'static/images/tomato-soup.jpg', 'd4e5f6a7-b8c9-7d0e-1f2a-3b4c5d6e7f8a');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('f8a9b0c1-d2e3-1f4a-5b6c-7d8e9f0a1b2c', 'Mac and Cheese', 
    ['300g elbow macaroni', '200g cheddar cheese, grated', '100g mozzarella cheese, grated', '50g parmesan cheese, grated', '500ml milk', '50g butter', '50g all-purpose flour', '1/2 tsp mustard powder', 'salt and pepper to taste', 'breadcrumbs for topping (optional)'],
    ['Preheat oven to 180°C (350°F).',
     'Cook macaroni according to package instructions, drain and set aside.',
     'In a saucepan, melt butter over medium heat.',
     'Add flour and whisk for 1 minute to make a roux.',
     'Gradually add milk while whisking constantly until smooth.',
     'Add mustard powder and cook until sauce thickens.',
     'Remove from heat and stir in cheeses until melted.',
     'Combine cheese sauce with cooked macaroni.',
     'Transfer to a baking dish and top with breadcrumbs if desired.',
     'Bake for 20-25 minutes until golden and bubbly.',
     'Let cool slightly before serving.'], 311, '2024-02-15', 'static/images/mac-and-cheese.png', 'e5f6a7b8-c9d0-8e1f-2a3b-4c5d6e7f8a9b');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('a9b0c1d2-e3f4-2a5b-6c7d-8e9f0a1b2c3d', 'Omelette', 
    ['3 eggs', '2 tbsp milk', '50g cheese, grated', '50g ham, diced', '1 tbsp butter', 'salt and pepper to taste', 'fresh herbs (optional)'],
    ['Beat eggs and milk together in a bowl, season with salt and pepper.',
     'Heat butter in a non-stick skillet over medium heat.',
     'Pour in egg mixture and let it set slightly.',
     'Add cheese and ham to one half of the omelette.',
     'When eggs are almost set, fold the omelette in half.',
     'Cook for another minute until cheese melts.',
     'Slide onto a plate and garnish with fresh herbs.',
     'Serve immediately.'], 248, '2024-03-10', 'static/images/omelette.png', 'f6a7b8c9-d0e1-9f2a-3b4c-5d6e7f8a9b0c');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('b0c1d2e3-f4a5-3b6c-7d8e-9f0a1b2c3d4e', 'BBQ Chicken Wings', 
    ['1kg chicken wings', '200ml BBQ sauce', '2 tbsp olive oil', '1 tsp garlic powder', '1 tsp onion powder', '1/2 tsp paprika', 'salt and pepper to taste'],
    ['Preheat oven to 200°C (400°F).',
     'Pat chicken wings dry with paper towels.',
     'In a bowl, mix olive oil, garlic powder, onion powder, paprika, salt, and pepper.',
     'Toss wings in the seasoning mixture until coated.',
     'Arrange wings on a baking sheet lined with parchment paper.',
     'Bake for 40-45 minutes, flipping halfway through.',
     'Remove from oven and toss wings in BBQ sauce.',
     'Return to oven for 5 minutes to set the sauce.',
     'Serve hot with extra BBQ sauce for dipping.'], 384, '2024-02-25', 'static/images/bbq-wings.jpg', 'a7b8c9d0-e1f2-0a3b-4c5d-6e7f8a9b0c1d');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'Veggie Stir-Fry', 
    ['200g broccoli florets', '2 carrots, sliced', '1 bell pepper, sliced', '100g snow peas', '2 cloves garlic, minced', '1 tbsp ginger, grated', '3 tbsp soy sauce', '1 tbsp sesame oil', '2 tbsp vegetable oil', '1 tsp cornstarch', '2 tbsp water'],
    ['Mix cornstarch with water to make a slurry, set aside.',
     'Heat vegetable oil in a wok or large skillet over high heat.',
     'Add garlic and ginger, cook for 30 seconds.',
     'Add vegetables and stir-fry for 3-4 minutes.',
     'Pour in soy sauce and sesame oil.',
     'Add cornstarch slurry and cook until sauce thickens.',
     'Serve hot over rice or noodles.'], 193, '2024-03-08', 'static/images/veggie-stirfry.jpg', 'b8c9d0e1-f2a3-1b4c-5d6e-7f8a9b0c1d2e');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('d2e3f4a5-b6c7-5d8e-9f0a-1b2c3d4e5f6a', 'Baked Salmon', 
    ['4 salmon fillets (about 150g each)', '2 tbsp olive oil', '1 lemon, sliced', '2 cloves garlic, minced', '1 tsp dried dill', 'salt and pepper to taste', 'fresh parsley for garnish'],
    ['Preheat oven to 200°C (400°F).',
     'Line a baking sheet with parchment paper.',
     'Place salmon fillets on the baking sheet.',
     'Drizzle with olive oil and season with garlic, dill, salt, and pepper.',
     'Top each fillet with lemon slices.',
     'Bake for 12-15 minutes until salmon flakes easily with a fork.',
     'Garnish with fresh parsley and serve hot.'], 423, '2024-02-18', 'static/images/baked-salmon.jpg', 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
VALUES ('e3f4a5b6-c7d8-6e9f-0a1b-2c3d4e5f6a7b', 'Chili', 
    ['500g ground beef', '1 onion, diced', '2 cloves garlic, minced', '2 cans (400g each) kidney beans', '2 cans (400g each) diced tomatoes', '2 tbsp chili powder', '1 tsp cumin', '1 tsp paprika', '2 tbsp vegetable oil', 'salt and pepper to taste', 'grated cheese and sour cream for serving'],
    ['Heat oil in a large pot over medium heat.',
     'Add onions and cook until soft.',
     'Add garlic and cook for 1 minute.',
     'Add ground beef and cook until browned.',
     'Stir in chili powder, cumin, and paprika.',
     'Add diced tomatoes and kidney beans with their liquid.',
     'Bring to a boil, then reduce heat and simmer for 30 minutes.',
     'Season with salt and pepper.',
     'Serve hot with grated cheese and sour cream.'], 337, '2024-03-12', 'static/images/chili.jpg', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e');

-- Sample comments for recipes
-- Spaghetti Bolognese comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('f4a5b6c7-d8e9-7f0a-1b2c-3d4e5f6a7b8c', 'c9d0e1f2-a3b4-2c5d-6e7f-8a9b0c1d2e3f', 'John Doe', 'This recipe was fantastic! My family loved it!', '2024-01-16');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('a5b6c7d8-e9f0-8a1b-2c3d-4e5f6a7b8c9d', 'c9d0e1f2-a3b4-2c5d-6e7f-8a9b0c1d2e3f', 'Jane Smith', 'A classic! I added a bit of chili flakes for extra kick.', '2024-01-16');

-- Pancakes comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('b6c7d8e9-f0a1-9b2c-3d4e-5f6a7b8c9d0e', 'd0e1f2a3-b4c5-3d6e-7f8a-9b0c1d2e3f4a', 'Emily Johnson', 'Delicious pancakes! Perfect for a weekend breakfast.', '2024-02-21');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('c7d8e9f0-a1b2-0c3d-4e5f-6a7b8c9d0e1f', 'd0e1f2a3-b4c5-3d6e-7f8a-9b0c1d2e3f4a', 'Michael Green', 'Fluffy and sweet! I used almond milk for a dairy-free option.', '2024-02-21');

-- Chicken Curry comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('d8e9f0a1-b2c3-1d4e-5f6a-7b8c9d0e1f2a', 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'Sarah Brown', 'This curry was amazing! The coconut milk made it so creamy!', '2024-03-06');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('e9f0a1b2-c3d4-2e5f-6a7b-8c9d0e1f2a3b', 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'David White', 'Very flavorful! I added some bell peppers and it was perfect!', '2024-03-06');

-- Grilled Cheese Sandwich comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('f0a1b2c3-d4e5-3f6a-7b8c-9d0e1f2a3b4c', 'f2a3b4c5-d6e7-5f8a-9b0c-1d2e3f4a5b6c', 'Laura Wilson', 'Simple but delicious! A great go-to for lunch.', '2024-01-23');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'f2a3b4c5-d6e7-5f8a-9b0c-1d2e3f4a5b6c', 'Jack Harris', 'I love grilled cheese! The garlic powder made it even better.', '2024-01-23');

-- Caesar Salad comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('b2c3d4e5-f6a7-5b8c-9d0e-1f2a3b4c5d6e', 'a3b4c5d6-e7f8-6a9b-0c1d-2e3f4a5b6c7d', 'Olivia Thompson', 'This salad was very fresh! I added grilled chicken for extra protein.', '2024-02-11');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('c3d4e5f6-a7b8-6c9d-0e1f-2a3b4c5d6e7f', 'a3b4c5d6-e7f8-6a9b-0c1d-2e3f4a5b6c7d', 'Ryan Clark', 'Great recipe, I used homemade dressing instead of store-bought.', '2024-02-11');

-- Beef Tacos comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('d4e5f6a7-b8c9-7d0e-1f2a-3b4c5d6e7f8a', 'b4c5d6e7-f8a9-7b0c-1d2e-3f4a5b6c7d8e', 'Ella Lewis', 'These tacos were fantastic! So quick and easy to make.', '2024-03-15');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('e5f6a7b8-c9d0-8e1f-2a3b-4c5d6e7f8a9b', 'b4c5d6e7-f8a9-7b0c-1d2e-3f4a5b6c7d8e', 'Benjamin Lee', 'Perfect for Taco Tuesday! I added some avocado for extra flavor.', '2024-03-15');

-- French Toast comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('f6a7b8c9-d0e1-9f2a-3b4c-5d6e7f8a9b0c', 'c5d6e7f8-a9b0-8c1d-2e3f-4a5b6c7d8e9f', 'Chris Harris', 'My kids love this for breakfast! It is sweet and filling.', '2024-02-28');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('a7b8c9d0-e1f2-0a3b-4c5d-6e7f8a9b0c1d', 'c5d6e7f8-a9b0-8c1d-2e3f-4a5b6c7d8e9f', 'Amanda King', 'Tastes just like the ones from my childhood. Will make again!', '2024-02-28');

-- Fried Rice comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('b8c9d0e1-f2a3-1b4c-5d6e-7f8a9b0c1d2e', 'd6e7f8a9-b0c1-9d2e-3f4a-5b6c7d8e9f0a', 'Jacob Scott', 'Quick and easy, and the sesame oil adds a great flavor.', '2024-03-01');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('c9d0e1f2-a3b4-2c5d-6e7f-8a9b0c1d2e3f', 'd6e7f8a9-b0c1-9d2e-3f4a-5b6c7d8e9f0a', 'Sophia Mitchell', 'Delicious! I used leftover rice, and it worked perfectly.', '2024-03-01');

-- Tomato Soup comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('d0e1f2a3-b4c5-3d6e-7f8a-9b0c1d2e3f4a', 'e7f8a9b0-c1d2-0e3f-4a5b-6c7d8e9f0a1b', 'William Young', 'This soup was so comforting! Perfect for a cold day.', '2024-01-30');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'e7f8a9b0-c1d2-0e3f-4a5b-6c7d8e9f0a1b', 'Grace Adams', 'The perfect tomato soup. I added basil, and it was amazing!', '2024-01-30');

-- Mac and Cheese comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('f2a3b4c5-d6e7-5f8a-9b0c-1d2e3f4a5b6c', 'f8a9b0c1-d2e3-1f4a-5b6c-7d8e9f0a1b2c', 'Mason Evans', 'This mac and cheese was cheesy and delicious! Will make again.', '2024-02-15');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('a3b4c5d6-e7f8-6a9b-0c1d-2e3f4a5b6c7d', 'f8a9b0c1-d2e3-1f4a-5b6c-7d8e9f0a1b2c', 'Harper Nelson', 'Loved it! I used a blend of different cheeses, and it was fantastic.', '2024-02-15');

-- Omelette comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('b4c5d6e7-f8a9-7b0c-1d2e-3f4a5b6c7d8e', 'a9b0c1d2-e3f4-2a5b-6c7d-8e9f0a1b2c3d', 'Liam Perez', 'I made this omelette for breakfast and it was perfect!', '2024-03-10');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('c5d6e7f8-a9b0-8c1d-2e3f-4a5b6c7d8e9f', 'a9b0c1d2-e3f4-2a5b-6c7d-8e9f0a1b2c3d', 'Charlotte Carter', 'Great omelette! I added some spinach for extra flavor.', '2024-03-10');

-- BBQ Chicken Wings comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('d6e7f8a9-b0c1-9d2e-3f4a-5b6c7d8e9f0a', 'b0c1d2e3-f4a5-3b6c-7d8e-9f0a1b2c3d4e', 'Daniel Reed', 'These wings were juicy and flavorful! Perfect for BBQ nights.', '2024-02-25');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('e7f8a9b0-c1d2-0e3f-4a5b-6c7d8e9f0a1b', 'b0c1d2e3-f4a5-3b6c-7d8e-9f0a1b2c3d4e', 'Ella Foster', 'So tasty! I used a little extra BBQ sauce for more flavor.', '2024-02-25');

-- Veggie Stir-Fry comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('f8a9b0c1-d2e3-1f4a-5b6c-7d8e9f0a1b2c', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'Aiden Morris', 'This stir-fry was full of flavor! Easy and healthy.', '2024-03-08');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('a9b0c1d2-e3f4-2a5b-6c7d-8e9f0a1b2c3d', 'c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'Scarlett Stewart', 'Great for meal prep! Loved the combination of vegetables.', '2024-03-08');

-- Baked Salmon comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('b0c1d2e3-f4a5-3b6c-7d8e-9f0a1b2c3d4e', 'd2e3f4a5-b6c7-5d8e-9f0a-1b2c3d4e5f6a', 'Zoe Ross', 'So delicious! The salmon was perfectly cooked, and the lemon was a great touch.', '2024-02-18');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'd2e3f4a5-b6c7-5d8e-9f0a-1b2c3d4e5f6a', 'Lucas Bell', 'This was an easy yet elegant dish. I loved the freshness of the salmon.', '2024-02-18');

-- Chili comments
INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('d2e3f4a5-b6c7-5d8e-9f0a-1b2c3d4e5f6a', 'e3f4a5b6-c7d8-6e9f-0a1b-2c3d4e5f6a7b', 'Ethan Turner', 'Delicious chili! The flavors were perfect for a cozy evening.', '2024-03-12');

INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
VALUES ('e3f4a5b6-c7d8-6e9f-0a1b-2c3d4e5f6a7b', 'e3f4a5b6-c7d8-6e9f-0a1b-2c3d4e5f6a7b', 'Mia Harris', 'Very hearty and flavorful! I added extra beans for more texture.', '2024-03-12');