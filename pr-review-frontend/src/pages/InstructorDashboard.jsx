import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function InstructorDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject review
  const updateStatus = async (id, action) => {
    try {
      await fetch(`${API_URL}/reviews/${id}/${action}`, {
        method: "POST",
      });
      fetchReviews(); // refresh list
    } catch (err) {
      console.error("Failed to update review", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <p className="p-4">Loading reviews...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Instructor Review Dashboard
      </h1>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews available</p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">
                  {review.repository} — PR #{review.pullRequest}
                </h2>
                <p className="text-sm text-gray-600">
                  Branch: {review.branch}
                </p>
                <p className="text-sm mt-1">
                  Score: <strong>{review.score}/10</strong>
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  review.approved === true
                    ? "bg-green-100 text-green-700"
                    : review.approved === false
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {review.approved === true
                  ? "Approved"
                  : review.approved === false
                  ? "Rejected"
                  : "Pending"}
              </span>
            </div>

            {/* Rules */}
            <div className="mt-3">
              <h3 className="font-medium">Rules Applied</h3>
              <ul className="list-disc ml-5 text-sm">
                {review.rulesApplied?.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>

            {/* Violations */}
            {review.violations?.length > 0 && (
              <div className="mt-3">
                <h3 className="font-medium text-red-600">
                  Violations
                </h3>
                <ul className="list-disc ml-5 text-sm text-red-600">
                  {review.violations.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action buttons */}
            {review.approved === null && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => updateStatus(review.id, "approve")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(review.id, "reject")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
