from flask import Flask, request, jsonify
from flask_cors import CORS
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from datetime import datetime

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
            
        return jsonify(row._asdict()), 200
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

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0') 