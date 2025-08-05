import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import UploadContract from "./components/upload";
import { getContractsAsync, getCpAsync, setUploadOpen } from "../../redux/slice/dashboard/slice";
import ContractsTable from "./components/contractTable";

const Dashboard = () => {

  const dispatch = useDispatch();

  const { name, isUploadOpen } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getCpAsync());
    dispatch(getContractsAsync());
  }, [dispatch]);

  return (
    <div className="dashboardContainer">
      <div className="dashboardContentWrapper">
        <h1>Good afternoon, {name} 🌤️</h1>

        <div className="grid">
          <div className="card">
            <div className="title">Sign</div>
            <div className="value">0</div>
          </div>
          <div className="card">
            <div className="title">Approve</div>
            <div className="value">11</div>
          </div>
          <div className="card">
            <div className="title">Review</div>
            <div className="value">0</div>
          </div>
        </div>

        <div className="contracts">
          <h2>Ongoing Contracts</h2>
          <div className="contractsTable">
            {/* Assuming you have a ContractsTable component to display contracts */}
            <ContractsTable />
            </div>
        </div>
      </div>
      {isUploadOpen && (
        <UploadContract onClose={() => dispatch(setUploadOpen(false))} />
      )}
    </div>
  );
};

export default Dashboard;
