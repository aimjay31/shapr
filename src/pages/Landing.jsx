function Landing() {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6A0DAD, #4B0082)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "#e7c6ff", fontSize: "48px" }}>
        Welcome to ShapR
      </h1>

      <p style={{ color: "#d69dff", marginBottom: "30px" }}>
        Shape the way you learn.
      </p>

      <div>
        <a href="/login">
          <button
            style={{
              padding: "10px 20px",
              marginRight: "15px",
              backgroundColor: "#6A0DAD",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </a>

        <a href="/signup">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#4B0082",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </a>
      </div>
    </div>
  );
}

export default Landing;