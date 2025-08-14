# NYC Council Members Complaint Dashboard

**Author:** Roberta Nin Feliz  
**Contact:** roberta.nin98@gmail.com  
**Submission Date:** August 14 2025

## Overview

A responsive government dashboard that empowers NYC Council Members to track and analyze constituent complaints within their districts, featuring robust accessibility and dual viewing modes.

## Key Features

### 🎯 Core Functionality

- **District-Focused Data**: Filters complaints by council district (account field)
- **Dual Complaint Views**: Toggle between all district complaints and constituent-originated cases
- **Case Status Analytics**: Real-time counts of open/closed cases
- **Top Complaints**: Identifies most frequent complaint types per district

### ✨ User Experience

- **Responsive Design**: Fully functional across all screen sizes
- **Accessibility First**:
  - Screen reader support with ARIA attributes
  - Keyboard navigable interface
  - WCAG-compliant color contrast
- **Interactive Elements**:
  - Hover effects for better usability
  - Semantic HTML with proper abbreviations
  - Focus states for keyboard navigation
- **Error Handling & Recovery**:
  - Clear error messaging for failed login attempts
  - Automatic focus management for quick password re-entry
  - Secure password field clearing after failed attempts
  - Contextual error display without page navigation

### Backend Solutions

1. Handles inconsistent district numbering (zero-padding)
2. Manages NULL/empty string values in complaint data
3. Optimized for both district and constituent views

### API Endpoints

| Endpoint                                 | Method | Description                          |
| ---------------------------------------- | ------ | ------------------------------------ |
| `/login/`                                | POST   | User authentication                  |
| `/api/complaints/allComplaints`          | GET    | All complaints in user's district    |
| `/api/complaints/openCases/`             | GET    | Open cases in district               |
| `/api/complaints/closedCases/`           | GET    | Closed cases in district             |
| `/api/complaints/topComplaints/`         | GET    | Top 3 complaint types                |
| `/api/complaints/dashboard/`             | GET    | Consolidated dashboard data (Bonus)  |
| `/api/complaints/constituentComplaints/` | GET    | Complaints from constituents (Bonus) |

## Bonus Features Implementation

- Created optimized `/complaints/dashboard` endpoint reducing API calls
- Developed constituent-focused view via `/complaints/constituentComplaints`
- Implemented frontend toggle between complaint views
- Implemented sign out functionality
