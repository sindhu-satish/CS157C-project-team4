from flask import Flask, request, jsonify
from flask_cors import CORS
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from datetime import datetime
import uuid
import bcrypt

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:5000", "http://127.0.0.1:5000"])


auth_provider = PlainTextAuthProvider(username='cassandra', password='cassandra')
cluster = Cluster(['localhost'], auth_provider=auth_provider)
session = cluster.connect('cs157')

def serialize_recipe(row):
    """Convert a Cassandra row to a dictionary"""
    return {
        'id': row.id,
        'title': row.title,
        'ingredients': row.ingredients,
        'instructions': row.instructions,
        'likes': row.likes,
        'date': str(row.date) if row.date else None
    }

@app.route('/recipes', methods=['GET'])
def get_all_recipes():
    """Fetch all recipes"""
    try:
        query = "SELECT * FROM recipes"
        rows = session.execute(query)
        recipes = [serialize_recipe(row) for row in rows]
        return jsonify(recipes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/sorted', methods=['GET'])
def get_sorted_recipes():
    """Get recipes sorted by likes in descending order"""
    try:
        query = "SELECT * FROM recipes ORDER BY likes DESC"
        rows = session.execute(query)
        recipes = [row._asdict() for row in rows]
        return jsonify(recipes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/filter', methods=['GET'])
def filter_recipes():
    """Filter recipes by ingredients"""
    try:
        ingredients = request.args.getlist('ingredients')
        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400
        
        # Create a query that checks if any of the provided ingredients are in the ingredients list
        query = "SELECT * FROM recipes WHERE ingredients CONTAINS %s"
        params = [ingredients[0]]
        
        rows = session.execute(query, params)
        recipes = [row._asdict() for row in rows]
        
        # Filter recipes that contain all specified ingredients
        filtered_recipes = []
        for recipe in recipes:
            if all(ingredient.lower() in [i.lower() for i in recipe['ingredients']] for ingredient in ingredients):
                filtered_recipes.append(recipe)
        
        return jsonify(filtered_recipes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes', methods=['POST'])
def create_recipe():
    """Create a new recipe"""
    try:
        data = request.json
        required_fields = ['title', 'ingredients', 'instructions']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Get the next available ID
        query = "SELECT MAX(id) FROM recipes"
        result = session.execute(query)
        next_id = (result[0].system_max_id or 0) + 1
        
        # Insert the new recipe
        query = """
        INSERT INTO recipes (id, title, ingredients, instructions, likes, date)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        params = [
            next_id,
            data['title'],
            data['ingredients'],
            data['instructions'],
            data.get('likes', 0),
            datetime.now().strftime('%Y-%m-%d')
        ]
        
        session.execute(query, params)
        return jsonify({"message": "Recipe created successfully", "id": next_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Get a specific recipe by ID"""
    try:
        query = "SELECT * FROM recipes WHERE id = %s"
        row = session.execute(query, [recipe_id]).one()
        
        if not row:
            return jsonify({"error": "Recipe not found"}), 404
            
        return jsonify(serialize_recipe(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    """Update a recipe"""
    try:
        data = request.json
        query = "SELECT * FROM recipes WHERE id = %s"
        existing_recipe = session.execute(query, [recipe_id]).one()
        
        if not existing_recipe:
            return jsonify({"error": "Recipe not found"}), 404
        
        # Update only the provided fields
        title = data.get('title', existing_recipe.title)
        ingredients = data.get('ingredients', existing_recipe.ingredients)
        instructions = data.get('instructions', existing_recipe.instructions)
        likes = data.get('likes', existing_recipe.likes)
        
        query = """
        UPDATE recipes 
        SET title = %s, ingredients = %s, instructions = %s, likes = %s
        WHERE id = %s
        """
        session.execute(query, [title, ingredients, instructions, likes, recipe_id])
        
        return jsonify({"message": "Recipe updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    """Delete a recipe"""
    try:
        query = "SELECT * FROM recipes WHERE id = %s"
        existing_recipe = session.execute(query, [recipe_id]).one()
        
        if not existing_recipe:
            return jsonify({"error": "Recipe not found"}), 404
        
        query = "DELETE FROM recipes WHERE id = %s"
        session.execute(query, [recipe_id])
        
        return jsonify({"message": "Recipe deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/comments', methods=['POST'])
def create_comment():
    """Create a new comment for a recipe"""
    try:
        data = request.json
        required_fields = ['recipe_id', 'user_name', 'comment']
        
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Generate a unique ID for the comment
        comment_id = uuid.uuid4()
        
        # Insert the new comment into the comments table
        query = """
        INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
        VALUES (%s, %s, %s, %s, %s)
        """
        params = [
            comment_id,
            data['recipe_id'],
            data['user_name'],
            data['comment'],
            datetime.now()
        ]
        
        session.execute(query, params)
        return jsonify({"message": "Comment created successfully", "id": comment_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/comments/<int:recipe_id>', methods=['GET'])
def get_comments_for_recipe(recipe_id):
    """Fetch all comments for a specific recipe"""
    try:
        query = "SELECT * FROM comments WHERE recipe_id = %s"
        rows = session.execute(query, [recipe_id])
        comments = [dict(row) for row in rows]
        
        return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/comments/<uuid:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    """Update a specific comment"""
    try:
        data = request.json
        query = "SELECT * FROM comments WHERE id = %s"
        existing_comment = session.execute(query, [comment_id]).one()
        
        if not existing_comment:
            return jsonify({"error": "Comment not found"}), 404
        
        # Update the comment text
        comment = data.get('comment', existing_comment.comment)
        
        query = """
        UPDATE comments 
        SET comment = %s 
        WHERE id = %s
        """
        session.execute(query, [comment, comment_id])
        
        return jsonify({"message": "Comment updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/comments/<uuid:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """Delete a specific comment"""
    try:
        query = "SELECT * FROM comments WHERE id = %s"
        existing_comment = session.execute(query, [comment_id]).one()
        
        if not existing_comment:
            return jsonify({"error": "Comment not found"}), 404
        
        query = "DELETE FROM comments WHERE id = %s"
        session.execute(query, [comment_id])
        
        return jsonify({"message": "Comment deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/auth/login', methods=['POST'])
def login():
    """Handle user login"""
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
        
        # Query the user from the database
        query = "SELECT * FROM users WHERE username = %s ALLOW FILTERING"
        user = session.execute(query, [username]).one()
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Verify password
        if user.password != password:  # In production, use proper password hashing
            return jsonify({"error": "Invalid password"}), 401
        
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user.id),
                "username": user.username,
                "email": user.email,
                "full_name": user.full_name
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/auth/signup', methods=['POST'])
def signup():
    """Handle user registration"""
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        full_name = data.get('full_name')
        
        if not all([username, email, password, full_name]):
            return jsonify({"error": "All fields are required"}), 400
        
        # Check if username already exists
        query = "SELECT * FROM users WHERE username = %s ALLOW FILTERING"
        existing_user = session.execute(query, [username]).one()
        
        if existing_user:
            return jsonify({"error": "Username already exists"}), 409
        
        # Create new user
        user_id = uuid.uuid4()
        query = """
        INSERT INTO users (id, username, email, password, full_name)
        VALUES (%s, %s, %s, %s, %s)
        """
        session.execute(query, [user_id, username, email, password, full_name])
        
        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": str(user_id),
                "username": username,
                "email": email,
                "full_name": full_name
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0') 