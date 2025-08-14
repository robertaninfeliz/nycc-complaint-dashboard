import { useState } from "react";
import axios from "axios";
import "./ComplaintTable.css";

function ComplaintTable({ complaints: initialComplaints }) {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [isLoading, setIsLoading] = useState(false);
  const [isConstituentView, setIsConstituentView] = useState(false);

  const fetchConstituentComplaints = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_ROUTE}constituentComplaints/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setComplaints(response.data);
      setIsConstituentView(true);
    } catch (error) {
      console.error("Error fetching constituent complaints:", error);
      // TODO: add visual user feedback here (e.g., toast notification)
    } finally {
      setIsLoading(false);
    }
  };

  const resetToAllComplaints = () => {
    setComplaints(initialComplaints);
    setIsConstituentView(false);
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  const tableHeaders = [
    { id: 1, label: "Unique Key", abbr: null },
    { id: 2, label: "Account", abbr: null },
    { id: 3, label: "Open Date", abbr: null },
    { id: 4, label: "Complaint Type", abbr: "Type" },
    { id: 5, label: "Descriptor", abbr: null },
    { id: 6, label: "ZIP Code", abbr: "ZIP" },
    { id: 7, label: "City", abbr: null },
    { id: 8, label: "Status", abbr: null },
    { id: 9, label: "Close Date", abbr: null },
  ];

  return (
    <>
      <div className="complaint-header">
        <h2 className="complaint-title">Complaints</h2>
        <div className="complaint-buttons">
          {isConstituentView ? (
            <button className="complaint-btn" onClick={resetToAllComplaints}>
              Show All Complaints
            </button>
          ) : (
            <button
              className="complaint-btn constituent-btn"
              onClick={fetchConstituentComplaints}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "See My Constituents' Complaints"}
            </button>
          )}
        </div>
      </div>

      <div
        className="table-container"
        role="region"
        aria-labelledby="complaints-table-heading"
        tabIndex="0"
      >
        <table
          className="complaint-table"
          aria-describedby="complaints-table-heading"
        >
          <thead>
            <tr className="table-header-row">
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className="table-header-cell"
                  scope="col"
                  abbr={header.abbr || undefined}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints?.map((complaint) => (
              <tr key={complaint.unique_key} className="table-data-row">
                <td className="table-data-cell" data-label="Unique Key">
                  {complaint.unique_key}
                </td>
                <td className="table-data-cell" data-label="Account">
                  {complaint.account}
                </td>
                <td className="table-data-cell" data-label="Open Date">
                  {formatDate(complaint.opendate)}
                </td>
                <td className="table-data-cell" data-label="Complaint Type">
                  {complaint.complaint_type}
                </td>
                <td className="table-data-cell" data-label="Descriptor">
                  {complaint.descriptor}
                </td>
                <td className="table-data-cell" data-label="ZIP Code">
                  {complaint.zip}
                </td>
                <td className="table-data-cell" data-label="City">
                  {complaint.city}
                </td>
                <td
                  className={`table-data-cell status-cell ${
                    complaint.closedate ? "closed" : "open"
                  }`}
                  data-label="Status"
                >
                  {complaint.closedate ? "Closed" : "Open"}
                </td>
                <td className="table-data-cell" data-label="Close Date">
                  {formatDate(complaint.closedate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ComplaintTable;
