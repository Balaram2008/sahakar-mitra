import os
import sys

# Ensure the project root directory is on the Python module search path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

# Import the core Flask application instance
from server import app

# Vercel Serverless Function entry point
# Vercel's Python runtime exposes WSGI application 'app'
