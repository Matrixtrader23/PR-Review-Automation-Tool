# PR Review Automation Tool

## Overview

This project is an automated GitHub Pull Request (PR) review system built as part of a **DevOps Internship Assessment**.

The tool automatically reviews GitHub Pull Requests, applies **branch-based contextual rules**, generates **structured feedback**, and routes the review to an **instructor for approval or rejection** via a web dashboard.

The system demonstrates real-world DevOps concepts such as webhook-driven automation, rule-based validation, human-in-the-loop approvals, containerization, and service-to-service communication.

---

## High-Level Architecture

```
GitHub Pull Request
        |
        |  (Webhook Event)
        v
+----------------------+
|  Backend (Express)   |
|----------------------|
| - Webhook Handler    |
| - PR Review Engine   |
| - Branch Rules       |
| - Approval API       |
+----------------------+
        |
        | REST API
        v
+----------------------+
| Frontend (React)     |
|----------------------|
| Instructor Dashboard |
| Approve / Reject UI  |
+----------------------+
```

---

## Workflow

1. A Pull Request is opened or updated on GitHub
2. GitHub sends a webhook event to the backend
3. Backend validates the webhook signature
4. PR details and changed files are fetched using the GitHub API
5. Branch-based rules are applied automatically
6. A structured review is generated with violations and a score
7. Review status is set to **PENDING_INSTRUCTOR_APPROVAL**
8. Instructor views the review in the dashboard
9. Instructor approves or rejects the review

---

## Branch-Based Review Rules

Different expectations are applied depending on the branch name:

### Feature Branches (`feature/*`)

* No `console.log` statements
* Maximum 300 lines changed

### Bugfix Branches (`bugfix/*`)

* Tests must be updated
* No breaking changes

### Main / Release Branches (`main`, `release/*`)

* Strict linting
* Tests required
* No TODO comments

---

## Instructor Approval Dashboard

The frontend provides an instructor-facing dashboard that:

* Lists all PR reviews
* Displays branch, score, applied rules, and violations
* Shows review status (Pending / Approved / Rejected)
* Allows instructor to approve or reject reviews

This simulates a real-world approval gate in CI/CD pipelines.

---

## Tech Stack

### Backend

* Node.js
* Express.js
* GitHub REST API
* Webhooks (HMAC verification)

### Frontend

* React (Vite)
* Fetch API
* Simple dashboard UI

### DevOps

* Docker
* Docker Compose
* Environment variables

---

## Environment Variables

### Backend

```
PORT=5000
GITHUB_TOKEN=your_github_token
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

### Frontend

```
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Project

### Using Docker

```bash
docker-compose up --build
```

Frontend: [http://localhost:5173](http://localhost:5173)
Backend: [http://localhost:5000](http://localhost:5000)

---

### Local Development

Backend:

```bash
cd pr-review-backend
npm install
npm run dev
```

Frontend:

```bash
cd pr-review-frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| POST   | /api/webhook/github      | GitHub webhook handler |
| GET    | /api/reviews             | List all reviews       |
| POST   | /api/reviews/:id/approve | Approve review         |
| POST   | /api/reviews/:id/reject  | Reject review          |

---

## Assessment Notes

* Focus is on architecture, automation, and workflow clarity
* UI is intentionally simple
* Review logic is rule-based and extensible
* Designed to resemble real DevOps review systems

---

## Author

**Suhail**
DevOps Internship Candidate
