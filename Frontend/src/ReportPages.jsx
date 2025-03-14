import React, { useEffect, useState } from "react";
import "./ReportsPage.css";
import Navbar from "./navbar";
import Footer from "./Footer";

function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6969/reports")
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  return (
    <>
    <div><Navbar/></div>
    <br/><br/>
    <div className="reports-page">
      <h2>📝 Field Reports</h2>
      {reports.map((report, i) => (
        <div className="report-card" key={i}>
          <h3>{report.disease}</h3>
          <p><strong>Name:</strong> {report.name}</p>
          <p><strong>Location:</strong> {report.location}</p>
          {report.notes && <p><strong>Notes:</strong> {report.notes}</p>}
          <p style={{ fontSize: "12px", color: "gray" }}>
          </p>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
}

export default ReportsPage;
