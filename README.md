# Recipe Management System

This project provides a recipe management system with a Cassandra database backend and a Flask REST API.

## Prerequisites

- Python 3.8 or higher
- Apache Cassandra
- pip (Python package manager)

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install and start Apache Cassandra:
   - For macOS (using Homebrew):
   ```bash
   brew install cassandra
   brew services start cassandra
   ```
   - For Ubuntu/Debian:
   ```bash
   sudo apt-get install cassandra
   sudo service cassandra start
   ```

## Database Setup

1. Start the Cassandra CQL shell:
```bash
cqlsh
```

2. Create the keyspace and load the data:
```bash
# In the cqlsh prompt
source 'src/database.cql';
```

This will:
- Create the 'cs157' keyspace
- Create the 'recipes' table
- Insert the sample recipe data

## Running the API

1. Start the Flask application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Get All Recipes
```bash
GET http://localhost:5000/recipes
```

### Get Recipes Sorted by Likes
```bash
GET http://localhost:5000/recipes/sorted
```

### Filter Recipes by Ingredients
```bash
GET http://localhost:5000/recipes/filter?ingredients=chicken&ingredients=rice
```

### Create a New Recipe
```bash
POST http://localhost:5000/recipes
Content-Type: application/json

{
  "title": "New Recipe",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"],
  "likes": 0
}
```

### Get a Specific Recipe
```bash
GET http://localhost:5000/recipes/{recipe_id}
```

### Update a Recipe
```bash
PUT http://localhost:5000/recipes/{recipe_id}
Content-Type: application/json

{
  "title": "Updated Title",
  "ingredients": ["new ingredient1", "new ingredient2"],
  "instructions": ["new step1", "new step2"],
  "likes": 100
}
```

### Delete a Recipe
```bash
DELETE http://localhost:5000/recipes/{recipe_id}
```

## Example Usage

1. Get all recipes:
```bash
curl http://localhost:5000/recipes
```

2. Get recipes sorted by likes:
```bash
curl http://localhost:5000/recipes/sorted
```

3. Filter recipes by ingredients:
```bash
curl "http://localhost:5000/recipes/filter?ingredients=chicken&ingredients=rice"
```

4. Create a new recipe:
```bash
curl -X POST http://localhost:5000/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Chicken Pasta",
    "ingredients": ["chicken", "pasta", "tomato sauce"],
    "instructions": ["Cook pasta", "Cook chicken", "Mix together"],
    "likes": 0
  }'
```

## Troubleshooting

1. If Cassandra is not starting:
   - Check if Cassandra is running: `brew services list` (macOS) or `sudo service cassandra status` (Ubuntu)
   - Check Cassandra logs for errors
   - Make sure port 9042 is available

2. If the API is not connecting to Cassandra:
   - Verify Cassandra is running and accessible
   - Check if the keyspace 'cs157' exists
   - Verify the table 'recipes' exists in the keyspace

3. If you get CORS errors:
   - Make sure you're accessing the API from an allowed origin
   - Check if the Flask-CORS package is properly installed

## Project Structure

```
.
├── README.md
├── requirements.txt
├── src/
│   ├── database.cql
│   ├──backend
│      └── app.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
