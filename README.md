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
```bash
POST /auth/signup - Register a new user
POST /auth/login - Login user
```

### Recipes
```bash
GET /recipes - Get all recipes
GET /recipes/sorted - Get recipes sorted by likes
GET /recipes/search?q=query - Search recipes by title or ingredients
GET /recipes/filter?ingredients=ingredient1&ingredients=ingredient2 - Filter recipes by ingredients
GET /recipes/{recipe_id} - Get a specific recipe
POST /recipes - Create a new recipe
PUT /recipes/{recipe_id} - Update a recipe
DELETE /recipes/{recipe_id} - Delete a recipe
```

### Comments
```bash
POST /comments - Create a new comment
GET /comments/{recipe_id} - Get comments for a recipe
PUT /comments/{comment_id} - Update a comment
DELETE /comments/{comment_id} - Delete a comment
```

### Images
```bash
POST /upload-image - Upload a recipe image
GET /static/images/{filename} - Access uploaded images
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
