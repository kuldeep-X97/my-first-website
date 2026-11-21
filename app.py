"""
Kuldeep · @xypherOG — Portfolio
Flask server that serves the static portfolio (index.html + styles.css + script.js).

Run locally:
    pip install -r requirements.txt
    python app.py            # http://127.0.0.1:5000

Production:
    gunicorn app:app --bind 0.0.0.0:$PORT
"""

import os
from flask import Flask, send_from_directory, abort

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=None)

# Only these files may be served from the project root.
ALLOWED = {"styles.css", "script.js", "favicon.ico", "robots.txt", "sitemap.xml"}


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def assets(filename):
    if filename not in ALLOWED:
        abort(404)
    return send_from_directory(BASE_DIR, filename)


@app.after_request
def add_headers(resp):
    # Long cache for assets, no cache for the HTML shell.
    if resp.mimetype in ("text/css", "application/javascript"):
        resp.headers["Cache-Control"] = "public, max-age=86400"
    elif resp.mimetype == "text/html":
        resp.headers["Cache-Control"] = "no-cache"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
