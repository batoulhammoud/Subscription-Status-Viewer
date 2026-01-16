import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Welcome to your Dashboard! </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        <Link
          to="/subscription"
          style={{
            display: "block",
            padding: 20,
            background: "#635bff",
            color: "#fff",
            textAlign: "center",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.transform = "translateY(-2px)";
            target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.transform = "translateY(0)";
            target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
          }}
        >
          View Subscription
        </Link>

        {/* You can add more dashboard cards here */}
      </div>
    </div>
  );
}
