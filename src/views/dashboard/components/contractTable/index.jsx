// components/ContractsTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import "./style.scss";


const ContractsTable = () => {

  const navigate = useNavigate();

  const handleClick = async (id) => {
    // Optional: optimistic navigation
    navigate(`/contracts/${id}`);
  };

  const { contracts = [], counterpartiesMap = {} } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="contracts-table">
      {contracts.map((c) => (
        <div key={c._id} className="contract-row" onClick={() => handleClick(c._id)}>
          <div className="icon">
            {c.url.endsWith(".pdf") ? (
              <FaFilePdf color="#eb5757" />
            ) : (
              <FaFileWord color="#2e54ff" />
            )}
          </div>
          <div className="details">
            <div className="title">{c.title}</div>
            <div className="counterparty">
              {c.counterparty_name
                ?.map(
                  (id) =>
                    counterpartiesMap?.[id]?.email ?? counterpartiesMap?.[id]?.name
                )
                .join(", ") || "—"}
            </div>
          </div>
          <div className="status">
            {/* You can customize status text/icons */}
            {c.extractionId?.extractedData ? (
              <span>Extracted</span>
            ) : (
              <span>Pending</span>
            )}
          </div>
          <div className="updated">
            Last Updated: {new Date(c.updatedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContractsTable;
