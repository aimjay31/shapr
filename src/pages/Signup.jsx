function Signup() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#F3E8FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#4B0082", textAlign: "center" }}>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "#4B0082",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Signup;