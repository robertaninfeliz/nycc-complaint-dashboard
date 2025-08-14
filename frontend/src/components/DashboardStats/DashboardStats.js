import "./DashboardStats.css";

function DashboardStats({ open, closed, topComplaints }) {
  return (
    <>
      <div className="dashboard__open-case stat-box">
        <h4 className="dashboard__stat">Open Cases</h4>
        <h3>{open || 0}</h3>
      </div>
      <div className="dashboard__closed-case stat-box">
        <h4 className="dashboard__stat">Closed Cases</h4>
        <h3>{closed || 0}</h3>
      </div>
      <div className="dashboard__top-complaint stat-box">
        <h4 className="dashboard__stat">Top Complaints</h4>
        {topComplaints?.map((complaint) => (
          <span key={complaint.complaint_type} className="top_complaint">
            {complaint.complaint_type}
          </span>
        ))}
      </div>
    </>
  );
}

export default DashboardStats;
