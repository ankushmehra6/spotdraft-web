import React,{useState} from "react";
import UploadContractBody from "./components/contentBody"; 
import UploadContractHeader from "./components/contentHeader";
import { uploadSteps } from "../../../../constants/enums";
import "./style.scss";

const UploadContract = ({ onClose }) => {
    const [step, setStep] = useState(uploadSteps.CHOOSE_FILES);
    return (
    <div className="drawer">
      <div className="drawer-inner">
        <button className="close-btn" onClick={onClose}>✕</button>
        <UploadContractHeader step={step} setStep={setStep} />
        <UploadContractBody step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default UploadContract;
