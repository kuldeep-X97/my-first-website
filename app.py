from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return """
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Animation World</title>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #070711;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
    overflow-x: hidden;
}

/* Navigation */
nav {
    padding: 22px;
    border-bottom: 1px solid #25253a;
    color: #c4b5fd;
    font-size: 23px;
    font-weight: bold;
}

/* Entrance animation */
.hero {
    padding: 90px 20px 60px;
    animation: fadeUp 1.2s ease both;
}

h1 {
    font-size: clamp(38px, 9vw, 65px);
    margin-bottom: 20px;
}

h1 span {
    color: #a78bfa;
    text-shadow: 0 0 25px #8b5cf6;
}

p {
    color: #b8b8cc;
    line-height: 1.7;
    margin-bottom: 30px;
}

/* Neon button */
.btn {
    display: inline-block;
    padding: 15px 30px;
    border: 2px solid #a78bfa;
    border-radius: 12px;
    color: white;
    text-decoration: none;
    background: #7c3aed;
    box-shadow: 0 0 10px #8b5cf6;
    animation: glow 2s infinite alternate;
    transition: transform 0.3s;
}

.btn:hover {
    transform: scale(1.08);
}

/* Floating orb */
.orb {
    width: 100px;
    height: 100px;
    margin: 45px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%,
        #ffffff, #a78bfa 25%, #6d28d9 65%, #1e1b4b);
    box-shadow: 0 0 35px #8b5cf6;
    animation: float 3s ease-in-out infinite;
}

/* Animated cards */
.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 18px;
    padding: 20px;
}

.card {
    width: 270px;
    padding: 28px;
    background: #121220;
    border: 1px solid #343451;
    border-radius: 18px;
    transition: transform 0.4s, box-shadow 0.4s,
                border-color 0.4s;
    animation: fadeUp 1s ease both;
}

.card:nth-child(2) {
    animation-delay: 0.2s;
}

.card:nth-child(3) {
    animation-delay: 0.4s;
}

.card:hover {
    transform: translateY(-10px) scale(1.03);
    border-color: #a78bfa;
    box-shadow: 0 10px 35px #7c3aed33;
}

.card h2 {
    color: #c4b5fd;
    margin-bottom: 12px;
}

.card p {
    margin-bottom: 0;
}

/* Keyframes */
@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(35px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes glow {
    from {
        box-shadow: 0 0 8px #8b5cf6;
    }
    to {
        box-shadow: 0 0 28px #a78bfa;
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-22px);
    }
}

footer {
    padding: 40px 15px;
    color: #77778c;
}
</style>
</head>

<body>

<nav>✦ ANIMATION WORLD</nav>

<section class="hero">
    <h1>Bring Your Ideas<br>
    <span>To Life.</span></h1>

    <p>Discover the magic of modern web animations.</p>

    <a href="#features" class="btn">Explore Effects ✨</a>

    <div class="orb"></div>
</section>

<section class="cards" id="features">

    <div class="card">
        <h2>✨ Fade In</h2>
        <p>Elements smoothly appear on the screen.</p>
    </div>

    <div class="card">
        <h2>💜 Neon Glow</h2>
        <p>A glowing button that pulses continuously.</p>
    </div>

    <div class="card">
        <h2>🌊 Floating</h2>
        <p>A glowing orb that gently moves up and down.</p>
    </div>

</section>

<footer>Made with ❤️ using Python, HTML & CSS</footer>

</body>
</html>
"""

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )