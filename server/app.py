from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# JWT Secret
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET", "supersecret")
jwt = JWTManager(app)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password=" ",
    database="vibetune"
)
cursor = db.cursor(dictionary=True)

# Register Route
@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username, email, password = data["username"], data["email"], data["password"]
    
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    if cursor.fetchone():
        return jsonify({"message": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", 
                   (username, email, hashed_password))
    db.commit()

    return jsonify({"message": "User registered successfully"}), 201

# Login Route
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email, password = data["email"], data["password"]

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 400

    token = create_access_token(identity=user["id"])
    return jsonify({"token": token, "user": {"id": user["id"], "username": user["username"], "email": user["email"]}})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
