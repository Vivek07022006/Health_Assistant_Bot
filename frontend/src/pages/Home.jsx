import React from "react";

function Home() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        background: "linear-gradient(135deg, #a8dadc, #f1faee)",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "32px", color: "#1d3557", marginBottom: "16px" }}>
        🏥 Welcome to HealthCareBot
      </h1>
      <p style={{ fontSize: "18px", color: "#457b9d", marginBottom: "30px" }}>
        Your AI-powered assistant for <b>wellness</b>, <b>fitness</b>,
        <b>mental health</b>, and <b>healthy living</b>.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#1d3557" }}>💪 Fitness Tips</h3>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Get daily exercise recommendations and personalized workout routines
            to keep your body active and healthy.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#1d3557" }}>🥗 Nutrition Advice</h3>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Learn about balanced diets, food suggestions, and meal plans tailored
            to your lifestyle.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#1d3557" }}>🧘 Mental Wellness</h3>
          <p style={{ fontSize: "14px", color: "#333" }}>
            Access mindfulness techniques, stress management tips, and positive
            affirmations for a calmer mind.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
