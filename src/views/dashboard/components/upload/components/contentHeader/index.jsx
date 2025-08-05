import { uploadSteps } from "../../../../../../constants/enums";
import "./style.scss";

const UploadContractHeader = ({step,setSteps}) => {
  return (
    <div className="uploadHeader">
      <h2>Upload Third Party Contract</h2>
      <div className="steps">
        <button className={step === uploadSteps.CHOOSE_FILES ? "active" : ""}>Choose Files</button>
        <button className={step === uploadSteps.ADDITIONAL_DATA ? "active" : ""}>Additional Data</button>
      </div>
    </div>
  );
};

export default UploadContractHeader;