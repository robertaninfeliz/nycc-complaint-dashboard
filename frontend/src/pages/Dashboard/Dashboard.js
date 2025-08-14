import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import ComplaintTable from "../../components/ComplaintTable/ComplaintTable";
import { CircularProgress, Alert, Box, Typography } from "@mui/material";
import DashboardStats from "../../components/DashboardStats/DashboardStats";

function Dashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_ROUTE}dashboard/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setComplaints(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          setError(
            err.response?.data?.message || "Failed to load dashboard data"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1">
          Please try refreshing the page or contact support.
        </Typography>
      </Box>
    );
  }

  return (
    <main className="dashboard">
      <Header handleSignOut={handleSignOut} />
      <section className="dashboard__stats">
        <DashboardStats
          open={complaints.open}
          closed={complaints.closed}
          topComplaints={complaints.top_complaints}
        />
      </section>
      <section className="dashboard__complaints-table">
        <ComplaintTable complaints={complaints.all || []} />
      </section>
    </main>
  );
}

export default Dashboard;
