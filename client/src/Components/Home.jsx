import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <header className="hero-section">
          <h1 className="hero-title">Welcome to Your Ultimate To-Do App!</h1>
          <p className="hero-subtitle">
            Simplify your life, stay organized, and achieve your goals. All in
            one app.
          </p>
          <Link to="/login">
            <button className="hero-button">Get Started</button>
          </Link>
        </header>

        <section className="features-section">
          <h2 className="section-title">Why Choose Our App?</h2>
          <div className="features-container">
            <div className="feature">
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Intuitive design that makes organizing your tasks a breeze.
              </p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Customizable</h3>
              <p className="feature-description">
                Switch between light and dark themes to suit your style.
              </p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Secure</h3>
              <p className="feature-description">
                Your data is protected with end-to-end encryption.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Ready to Take Control of Your Day?</h2>
          <p className="cta-text">
            Join thousands of users who trust us with their productivity.
          </p>
          <Link to="/Create-To-do">
            <button className="cta-button">Create Your First To-Do</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
