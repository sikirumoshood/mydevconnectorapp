import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-center">
      <div className="container">
        <span className="text-muted">
          Copyright &copy;{new Date().getFullYear()} {"  "}Dev Connector
        </span>
      </div>
    </footer>
  );
}
