import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/index.jsx";
import SideBar from "./views/dashboard/components/sidebar/index.jsx";
import ContractDetails from "./views/contract/index.jsx";
import ChatPage from "./views/chatbot/ChatComponent.jsx";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contracts/:contractId" element={<ContractDetails />} />
            <Route path="/chat" element={<ChatPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
