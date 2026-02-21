import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div
    style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F3E8FF, #E9D5FF)",
    }}
    >
      <Outlet />
    </div>
  );
}

export default PublicLayout;