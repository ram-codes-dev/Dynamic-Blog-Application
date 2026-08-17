import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Blogio</h1>

        <section className="about-section">
          <p>
            <strong>Welcome to Blogio</strong> — your space to explore thoughts, trends, and ideas across the digital world. We bring creators and readers together in one simple, stylish platform.
          </p>
        </section>

        <section className="about-section">
          <h2>🌟 Our Mission</h2>
          <p>
            We aim to empower individuals to share their stories, knowledge, and insights freely. Whether you're a travel enthusiast, tech geek, fitness lover, or just someone with a voice — Blogio is your canvas.
          </p>
        </section>

        <section className="about-section">
          <h2>📚 What We Cover</h2>
          <ul className="about-list">
            <li>✈️ Travel stories & experiences</li>
            <li>💻 Tech tips & innovations</li>
            <li>🎽 Fitness guides & routines</li>
            <li>🎨 Fashion inspiration</li>
            <li>🍔 Food & lifestyle</li>
            <li>🎤 Personal growth & more...</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>👥 Our Team</h2>
          <p>
            A group of passionate writers, developers, and creators working together to build a platform that’s modern, simple, and meaningful.
          </p>
        </section>

        <section className="about-section">
          <h2>💌 Want to Reach Us?</h2>
          <p>
            Have a suggestion or want to collaborate? <strong>We’d love to hear from you!</strong> Head to our contact page or email us directly at <a href="mailto:hello@blogio.com">hello@blogio.com</a>.
          </p>
        </section>

        <p className="about-footer">Thanks for visiting Blogio. Stay inspired ✨</p>
      </div>
    </div>
  );
};

export default About;
