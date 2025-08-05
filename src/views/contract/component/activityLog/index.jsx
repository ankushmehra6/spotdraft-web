import { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { updateContractStatusAsync } from "../../../../redux/slice/dashboard/slice";

const ActivityLog = ({ contract }) => {
  const logs = [...(contract?.logs || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
  if (!comment?.trim()) return;

  const data = {
    contractId: contract._id,
    cp_id: contract.counterparty_name?.[0], // assuming first counterparty for simplicity
    message: comment.trim(), // include comment
  };
  try {
    await dispatch(updateContractStatusAsync({ data }));
    alert("Status updated successfully!");
    setComment(""); // clear input on success
  } catch (err) {
    console.error("Failed to update status:", err);
  }
  };

  return (
    <div className="activity-log-wrapper">
      <div className="activity-log-header">
        <span className="activity-log-title">Activity Log</span>
        <div className="activity-log-filters">
          <button className="filter-button active">All</button>
          <button className="filter-button">Comments</button>
          <button className="filter-button">Emails</button>
          <button className="filter-button">Approvals</button>
          <button className="filter-button">Versions</button>
          <button className="filter-button">Reviews</button>
        </div>
      </div>

      <div className="activity-comment-box">
        <textarea
          className="comment-textarea"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="send-button" onClick={handleSubmit}>
          ➤
        </button>
      </div>

      <div className="activity-log-list">
        {logs.map((log, idx) => (
          <div className="activity-log-item" key={idx}>
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p className="activity-message">
                {log?.message}
              </p>
              <span className="activity-time">
                {new Date(log.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  timeZoneName: "short",
                })}
              </span>
            </div>
          </div>
        ))}
        <div className="log-footer">{logs.length} Logs</div>
      </div>
    </div>
  );
};

export default ActivityLog;
