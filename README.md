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

## Running the API

1. Start the Flask application:
```bash
python app.py
```

The API will be available at `http://localhost:5001`

## Features

### User Management
- User registration with username, email, password, and full name
- User login with username and password

### Recipe Management
- Create new recipes with title, ingredients, instructions, and optional image
- View all recipes
- View recipes sorted by likes
- Search recipes by title or ingredients
- Filter recipes by specific ingredients
- View individual recipe details
- Update existing recipes
- Delete recipes
- Upload recipe images

### Comments
- Add comments to recipes
- View comments for a specific recipe
- Update comments
- Delete comments

## API Endpoints

### Authentication

#### Register a new user
```bash
# Request
curl -X POST http://localhost:5001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "full_name": "John Doe"
  }'

# Response
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-string",
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

#### Login user
```bash
# Request
curl -X POST http://localhost:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'

# Response
{
  "message": "Login successful",
  "user": {
    "id": "uuid-string",
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe"
  }
}
```

### Recipes

#### Get all recipes
```bash
# Request
curl http://localhost:5001/recipes

# Response
[
  {
    "id": "uuid-string",
    "title": "Recipe Title",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["step1", "step2"],
    "likes": 0,
    "date": "2024-03-21",
    "image_path": "static/images/recipe.jpg",
    "user_id": "user-uuid",
    "poster_name": "John Doe"
  }
]
```

#### Get recipes sorted by likes
```bash
# Request
curl http://localhost:5001/recipes/sorted

# Response
[
  {
    "id": "uuid-string",
    "title": "Recipe Title",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["step1", "step2"],
    "likes": 10,
    "date": "2024-03-21",
    "image_path": "static/images/recipe.jpg",
    "user_id": "user-uuid",
    "poster_name": "John Doe"
  }
]
```

#### Search recipes
```bash
# Request
curl "http://localhost:5001/recipes/search?q=chicken"

# Response
[
  {
    "id": "uuid-string",
    "title": "Chicken Recipe",
    "ingredients": ["chicken", "spices"],
    "instructions": ["step1", "step2"],
    "likes": 5,
    "date": "2024-03-21",
    "image_path": "static/images/recipe.jpg",
    "user_id": "user-uuid",
    "poster_name": "John Doe"
  }
]
```

#### Filter recipes by ingredients
```bash
# Request
curl "http://localhost:5001/recipes/filter?ingredients=chicken&ingredients=rice"

# Response
[
  {
    "id": "uuid-string",
    "title": "Chicken Rice",
    "ingredients": ["chicken", "rice", "spices"],
    "instructions": ["step1", "step2"],
    "likes": 3,
    "date": "2024-03-21",
    "image_path": "static/images/recipe.jpg",
    "user_id": "user-uuid",
    "poster_name": "John Doe"
  }
]
```

#### Get specific recipe
```bash
# Request
curl http://localhost:5001/recipes/{recipe_id}

# Response
{
  "id": "uuid-string",
  "title": "Recipe Title",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"],
  "likes": 0,
  "date": "2024-03-21",
  "image_path": "static/images/recipe.jpg",
  "user_id": "user-uuid",
  "poster_name": "John Doe"
}
```

#### Create new recipe
```bash
# Request
curl -X POST http://localhost:5001/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Recipe",
    "ingredients": ["ingredient1", "ingredient2"],
    "instructions": ["step1", "step2"],
    "image_path": "static/images/recipe.jpg",
    "user_id": "user-uuid"
  }'

# Response
{
  "message": "Recipe created successfully",
  "id": "uuid-string"
}
```

#### Update recipe
```bash
# Request
curl -X PUT http://localhost:5001/recipes/{recipe_id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Recipe",
    "ingredients": ["new ingredient1", "new ingredient2"],
    "instructions": ["new step1", "new step2"],
    "likes": 5
  }'

# Response
{
  "message": "Recipe updated successfully"
}
```

#### Delete recipe
```bash
# Request
curl -X DELETE http://localhost:5001/recipes/{recipe_id}

# Response
{
  "message": "Recipe deleted successfully"
}
```

### Comments

#### Create comment
```bash
# Request
curl -X POST http://localhost:5001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "recipe_id": "recipe-uuid",
    "user_name": "John Doe",
    "comment": "Great recipe!"
  }'

# Response
{
  "message": "Comment created successfully",
  "id": "comment-uuid"
}
```

#### Get comments for recipe
```bash
# Request
curl http://localhost:5001/comments/{recipe_id}

# Response
[
  {
    "id": "comment-uuid",
    "recipe_id": "recipe-uuid",
    "user_name": "John Doe",
    "comment": "Great recipe!",
    "created_at": "2024-03-21T12:00:00"
  }
]
```

#### Delete comment
```bash
# Request
curl -X DELETE http://localhost:5001/comments/{comment_id}

# Response
{
  "message": "Comment deleted successfully"
}
```

### Images

#### Upload image
```bash
# Request
curl -X POST http://localhost:5001/upload-image \
  -F "image=@/path/to/local/image.jpg"

# Response
{
  "image_path": "static/images/uploaded-image.jpg"
}
```

#### Access image
```bash
# Request
curl http://localhost:5001/static/images/{filename}

# Response
[Binary image data]
```

## Project Structure

```
.
├── README.md
├── requirements.txt
├── src/
│   ├── database.cql
│   ├── backend/
│   │   ├── app.py
│   │   └── download_images.py
│   └── static/
│       └── images/
```

## Troubleshooting

1. If Cassandra is not starting:
   - Check if Cassandra is running: `brew services list` (macOS) or `sudo service cassandra status` (Ubuntu)
   - Check Cassandra logs for errors
   - Make sure port 9042 is available

2. If the API is not connecting to Cassandra:
   - Verify Cassandra is running and accessible
   - Check if the keyspace 'cs157' exists
   - Verify the tables exist in the keyspace

3. If you get CORS errors:
   - Make sure you're accessing the API from an allowed origin
   - Check if the Flask-CORS package is properly installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
