import os

# Open .env file
with open('.env', 'r') as f:
    # Read each line and set environment variables
    for line in f:
        key, value = line.strip().split('=')
        os.environ[key] = value


SECRET_KEY = os.environ['SECRET_KEY']
