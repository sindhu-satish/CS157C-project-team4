from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from datetime import datetime
import uuid
import bcrypt
from werkzeug.utils import secure_filename
import base64

# Get the absolute path to the static directory in the root folder
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'static'))
images_dir = os.path.join(static_dir, 'images')
print(f"Static directory path: {static_dir}")  # Debug print

# Create images directory if it doesn't exist
os.makedirs(images_dir, exist_ok=True)

# Default image path (relative to static directory)
DEFAULT_IMAGE = 'images/default-recipe.jpg'

app = Flask(__name__, static_folder=static_dir)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000", "http://127.0.0.1:5000"]}})

auth_provider = PlainTextAuthProvider(username='cassandra', password='cassandra')
cluster = Cluster(['localhost'], auth_provider=auth_provider)
session = cluster.connect('cs157')

def serialize_recipe(row):
    """Convert a Cassandra row to a dictionary"""
    # Get user's name from users table
    user_name = "Anonymous"
    if row.user_id:
        user_query = "SELECT full_name FROM users WHERE id = %s"
        user_row = session.execute(user_query, [row.user_id]).one()
        if user_row:
            user_name = user_row.full_name

    recipe = {
        'id': str(row.id),  # Convert UUID to string
        'title': row.title,
        'ingredients': row.ingredients,
        'instructions': row.instructions,
        'likes': row.likes,
        'date': str(row.date) if row.date else None,
        'image_path': row.image_path,
        'user_id': row.user_id,
        'poster_name': user_name
    }
    print("Serialized recipe:", recipe)
    print("Instructions type:", type(recipe['instructions']))
    return recipe

def serialize_comment(row):
    """Convert a Cassandra comment row to a dictionary"""
    return {
        'id': str(row.id),  # UUID needs to be converted to string
        'recipe_id': row.recipe_id,
        'user_name': row.user_name,
        'comment': row.comment,
        'created_at': str(row.created_at) if row.created_at else None
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
        data = request.get_json()
        print("Received recipe data:", data)  # Debug print
        
        # Generate a new UUID for the recipe and convert it to string
        recipe_id = str(uuid.uuid4())
        
        # Get current date
        current_date = datetime.now().strftime('%Y-%m-%d')
        
        # Prepare the query parameters
        params = [
            recipe_id,  # Use the string UUID
            data['title'],
            data['ingredients'],
            data['instructions'],
            0,  # likes start at 0
            current_date,
            data.get('image_path', ''),  # Optional image path
            data.get('user_id', '')  # Add user_id to the parameters
        ]
        
        print("Executing query with params:", params)  # Debug print
        
        # Insert the new recipe
        session.execute("""
            INSERT INTO recipes (id, title, ingredients, instructions, likes, date, image_path, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, params)
        
        return jsonify({"message": "Recipe created successfully", "id": recipe_id}), 201
        
    except Exception as e:
        print("Error creating recipe:", str(e))  # Debug print
        return jsonify({"error": str(e)}), 500

@app.route('/recipes/<recipe_id>', methods=['GET'])
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

@app.route('/recipes/<recipe_id>', methods=['PUT'])
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

@app.route('/recipes/<recipe_id>', methods=['DELETE'])
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
        print(f"Delete error: {str(e)}")  # Debug print
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
        comment_id = str(uuid.uuid4())
        
        # Insert the new comment into the comments table
        query = """
        INSERT INTO comments (id, recipe_id, user_name, comment, created_at)
        VALUES (%s, %s, %s, %s, %s)
        """
        params = [
            comment_id,
            data['recipe_id'],  # Use the string ID directly
            data['user_name'],
            data['comment'],
            datetime.now()
        ]
        
        session.execute(query, params)
        return jsonify({"message": "Comment created successfully", "id": comment_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/comments/<recipe_id>', methods=['GET'])
def get_comments_for_recipe(recipe_id):
    """Fetch all comments for a specific recipe"""
    try:
        # Try with the index first
        query = "SELECT * FROM comments WHERE recipe_id = %s"
        try:
            rows = session.execute(query, [recipe_id])
            comments = [serialize_comment(row) for row in rows]
            return jsonify(comments), 200
        except Exception as e:
            # If the index query fails, try with ALLOW FILTERING
            query = "SELECT * FROM comments WHERE recipe_id = %s ALLOW FILTERING"
            rows = session.execute(query, [recipe_id])
            comments = [serialize_comment(row) for row in rows]
            return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/comments/<comment_id>', methods=['PUT'])
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

@app.route('/comments/<comment_id>', methods=['DELETE'])
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
        user_id = str(uuid.uuid4())  # Convert UUID to string immediately
        query = """
        INSERT INTO users (id, username, email, password, full_name)
        VALUES (%s, %s, %s, %s, %s)
        """
        session.execute(query, [user_id, username, email, password, full_name])
        
        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "username": username,
                "email": email,
                "full_name": full_name
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upload-image', methods=['POST'])
def upload_image():
    """Handle image uploads"""
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        if file:
            # Generate a unique filename
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"
            file_path = os.path.join(images_dir, unique_filename)
            
            # Save the file
            file.save(file_path)
            
            # Return the relative path that will be stored in the database
            relative_path = f"static/images/{unique_filename}"
            return jsonify({"image_path": relative_path}), 200
            
    except Exception as e:
        print(f"Error uploading image: {e}")  # Debug print
        return jsonify({"error": str(e)}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files from the static directory"""
    print(f"Serving static file: {filename} from {static_dir}")  # Debug print
    try:
        return send_from_directory(static_dir, filename)
    except Exception as e:
        print(f"Error serving static file: {e}")  # Debug print
        return jsonify({"error": str(e)}), 404

@app.route('/recipes/search', methods=['GET'])
def search_recipes():
    """Search recipes by title or ingredients"""
    try:
        query = request.args.get('q', '').strip()
        if not query:
            return jsonify([]), 200

        # Get all recipes and filter them
        search_query = "SELECT * FROM recipes ALLOW FILTERING"
        rows = session.execute(search_query)
        
        # Filter recipes that match the search term
        matching_recipes = []
        for row in rows:
            # Check title
            if query.lower() in row.title.lower():
                matching_recipes.append(serialize_recipe(row))
                continue
                
            # Check ingredients
            if any(query.lower() in ingredient.lower() for ingredient in row.ingredients):
                matching_recipes.append(serialize_recipe(row))
        
        return jsonify(matching_recipes), 200
    except Exception as e:
        print(f"Search error: {str(e)}")  # Debug print
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0') 