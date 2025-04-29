USE cs157;

DROP TABLE IF EXISTS recipes;

CREATE TABLE IF NOT EXISTS recipes (
    id INT PRIMARY KEY,
    title TEXT,
    ingredients LIST<TEXT>,
    instructions LIST<TEXT>,
    likes INT,
    date DATE
);

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (1, 'Spaghetti Bolognese', 
    ['400g spaghetti', '500g ground beef', '2 cans (800g) tomato sauce', '1 onion, diced', '2 cloves garlic, minced', '2 tbsp olive oil', 'salt and pepper to taste'],
    ['Boil water in a large pot and cook spaghetti according to package instructions.',
     'Heat olive oil in a pan and sauté onions until translucent.',
     'Add minced garlic and cook for 1 minute.',
     'Add ground beef and cook until browned.',
     'Pour in tomato sauce and simmer for 20 minutes.',
     'Season with salt and pepper.',
     'Drain spaghetti and mix with the sauce.',
     'Serve hot with grated parmesan cheese.'], 125, '2024-01-15');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (2, 'Pancakes', 
    ['200g all-purpose flour', '2 eggs', '300ml milk', '2 tbsp sugar', '1 tsp baking powder', '1/2 tsp salt', '2 tbsp butter, melted', 'maple syrup for serving'],
    ['In a large bowl, whisk together flour, sugar, baking powder, and salt.',
     'In another bowl, beat eggs and mix in milk and melted butter.',
     'Pour wet ingredients into dry ingredients and stir until just combined.',
     'Heat a lightly oiled griddle or frying pan over medium heat.',
     'Pour 1/4 cup of batter for each pancake.',
     'Cook until bubbles form and edges are dry, then flip and cook until browned.',
     'Serve hot with maple syrup.'], 212, '2024-02-20');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (3, 'Chicken Curry', 
    ['500g chicken breast, cubed', '2 tbsp curry powder', '400ml coconut milk', '1 onion, chopped', '2 cloves garlic, minced', '1 tbsp ginger, grated', '2 tbsp vegetable oil', 'salt to taste'],
    ['Heat oil in a large pot over medium heat.',
     'Add onions and cook until soft.',
     'Add garlic and ginger, cook for 1 minute.',
     'Add chicken pieces and cook until lightly browned.',
     'Stir in curry powder and cook for 2 minutes.',
     'Pour in coconut milk and bring to a simmer.',
     'Cover and cook for 20-25 minutes until chicken is tender.',
     'Season with salt and serve with rice.'], 368, '2024-03-05');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (4, 'Grilled Cheese Sandwich', 
    ['4 slices of bread', '100g cheddar cheese, sliced', '2 tbsp butter, softened', '1 tsp garlic powder (optional)'],
    ['Butter one side of each bread slice.',
     'Place cheese slices between two bread slices, buttered sides out.',
     'Heat a skillet over medium heat.',
     'Place sandwich in skillet and cook until golden brown, about 2-3 minutes.',
     'Flip and cook the other side until golden and cheese is melted.',
     'Cut in half and serve hot.'], 97, '2024-01-22');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (5, 'Caesar Salad', 
    ['1 head romaine lettuce, chopped', '100g croutons', '50g parmesan cheese, grated', '100ml caesar dressing', '2 tbsp lemon juice', '1 clove garlic, minced', 'salt and pepper to taste'],
    ['Wash and dry romaine lettuce thoroughly.',
     'Tear lettuce into bite-sized pieces and place in a large bowl.',
     'Add minced garlic and lemon juice to the bowl.',
     'Toss the lettuce with caesar dressing until evenly coated.',
     'Add croutons and grated parmesan cheese.',
     'Season with salt and pepper to taste.',
     'Serve immediately.'], 143, '2024-02-10');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (6, 'Beef Tacos', 
    ['8 corn tortillas', '500g ground beef', '1 packet taco seasoning', '1 onion, diced', '2 tomatoes, diced', '100g lettuce, shredded', '100g cheddar cheese, grated', '2 tbsp vegetable oil', 'sour cream and salsa for serving'],
    ['Heat oil in a large skillet over medium heat.',
     'Add diced onions and cook until soft.',
     'Add ground beef and cook until browned, breaking it up with a spoon.',
     'Stir in taco seasoning and 1/2 cup water, simmer for 5 minutes.',
     'Warm tortillas according to package instructions.',
     'Fill each tortilla with beef mixture.',
     'Top with lettuce, tomatoes, cheese, sour cream, and salsa.',
     'Serve immediately.'], 259, '2024-03-15');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (7, 'French Toast', 
    ['8 slices of bread', '4 eggs', '200ml milk', '1 tsp vanilla extract', '1 tsp ground cinnamon', '2 tbsp sugar', '2 tbsp butter', 'maple syrup for serving'],
    ['In a shallow bowl, whisk together eggs, milk, vanilla, cinnamon, and sugar.',
     'Heat a large skillet or griddle over medium heat and melt butter.',
     'Dip each bread slice into the egg mixture, coating both sides.',
     'Place bread on the hot skillet and cook until golden brown, about 2-3 minutes per side.',
     'Repeat with remaining bread slices.',
     'Serve hot with maple syrup and fresh fruit if desired.'], 185, '2024-02-28');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (8, 'Fried Rice', 
    ['300g cooked rice (preferably day-old)', '2 eggs', '100g mixed vegetables (carrots, peas, corn)', '2 cloves garlic, minced', '2 tbsp soy sauce', '1 tbsp sesame oil', '2 tbsp vegetable oil', '2 spring onions, chopped', 'salt and pepper to taste'],
    ['Heat vegetable oil in a large wok or skillet over high heat.',
     'Add minced garlic and cook for 30 seconds.',
     'Add mixed vegetables and stir-fry for 2-3 minutes.',
     'Push vegetables to one side and scramble eggs in the empty space.',
     'Add cooked rice and stir everything together.',
     'Pour in soy sauce and sesame oil, mix well.',
     'Cook for another 2-3 minutes, stirring constantly.',
     'Season with salt and pepper, garnish with spring onions.',
     'Serve hot.'], 472, '2024-03-01');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (9, 'Tomato Soup', 
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
     'Garnish with fresh basil and serve hot.'], 69, '2024-01-30');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (10, 'Mac and Cheese', 
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
     'Let cool slightly before serving.'], 311, '2024-02-15');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (11, 'Omelette', 
    ['3 eggs', '2 tbsp milk', '50g cheese, grated', '50g ham, diced', '1 tbsp butter', 'salt and pepper to taste', 'fresh herbs (optional)'],
    ['Beat eggs and milk together in a bowl, season with salt and pepper.',
     'Heat butter in a non-stick skillet over medium heat.',
     'Pour in egg mixture and let it set slightly.',
     'Add cheese and ham to one half of the omelette.',
     'When eggs are almost set, fold the omelette in half.',
     'Cook for another minute until cheese melts.',
     'Slide onto a plate and garnish with fresh herbs.',
     'Serve immediately.'], 248, '2024-03-10');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (12, 'BBQ Chicken Wings', 
    ['1kg chicken wings', '200ml BBQ sauce', '2 tbsp olive oil', '1 tsp garlic powder', '1 tsp onion powder', '1/2 tsp paprika', 'salt and pepper to taste'],
    ['Preheat oven to 200°C (400°F).',
     'Pat chicken wings dry with paper towels.',
     'In a bowl, mix olive oil, garlic powder, onion powder, paprika, salt, and pepper.',
     'Toss wings in the seasoning mixture until coated.',
     'Arrange wings on a baking sheet lined with parchment paper.',
     'Bake for 40-45 minutes, flipping halfway through.',
     'Remove from oven and toss wings in BBQ sauce.',
     'Return to oven for 5 minutes to set the sauce.',
     'Serve hot with extra BBQ sauce for dipping.'], 384, '2024-02-25');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (13, 'Veggie Stir-Fry', 
    ['200g broccoli florets', '2 carrots, sliced', '1 bell pepper, sliced', '100g snow peas', '2 cloves garlic, minced', '1 tbsp ginger, grated', '3 tbsp soy sauce', '1 tbsp sesame oil', '2 tbsp vegetable oil', '1 tsp cornstarch', '2 tbsp water'],
    ['Mix cornstarch with water to make a slurry, set aside.',
     'Heat vegetable oil in a wok or large skillet over high heat.',
     'Add garlic and ginger, cook for 30 seconds.',
     'Add vegetables and stir-fry for 3-4 minutes.',
     'Pour in soy sauce and sesame oil.',
     'Add cornstarch slurry and cook until sauce thickens.',
     'Serve hot over rice or noodles.'], 193, '2024-03-08');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (14, 'Baked Salmon', 
    ['4 salmon fillets (about 150g each)', '2 tbsp olive oil', '1 lemon, sliced', '2 cloves garlic, minced', '1 tsp dried dill', 'salt and pepper to taste', 'fresh parsley for garnish'],
    ['Preheat oven to 200°C (400°F).',
     'Line a baking sheet with parchment paper.',
     'Place salmon fillets on the baking sheet.',
     'Drizzle with olive oil and season with garlic, dill, salt, and pepper.',
     'Top each fillet with lemon slices.',
     'Bake for 12-15 minutes until salmon flakes easily with a fork.',
     'Garnish with fresh parsley and serve hot.'], 423, '2024-02-18');

INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
VALUES (15, 'Chili', 
    ['500g ground beef', '1 onion, diced', '2 cloves garlic, minced', '2 cans (400g each) kidney beans', '2 cans (400g each) diced tomatoes', '2 tbsp chili powder', '1 tsp cumin', '1 tsp paprika', '2 tbsp vegetable oil', 'salt and pepper to taste', 'grated cheese and sour cream for serving'],
    ['Heat oil in a large pot over medium heat.',
     'Add onions and cook until soft.',
     'Add garlic and cook for 1 minute.',
     'Add ground beef and cook until browned.',
     'Stir in chili powder, cumin, and paprika.',
     'Add diced tomatoes and kidney beans with their liquid.',
     'Bring to a boil, then reduce heat and simmer for 30 minutes.',
     'Season with salt and pepper.',
     'Serve hot with grated cheese and sour cream.'], 337, '2024-03-12');
