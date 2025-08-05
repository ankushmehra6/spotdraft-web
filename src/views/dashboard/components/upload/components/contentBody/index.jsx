import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadContractAsync } from "../../../../../../redux/slice/dashboard/slice";
import { getCpAsync } from "../../../../../../redux/slice/dashboard/slice";
import { uploadSteps } from "../../../../../../constants/enums";
import CustomMultiSelect from "../../../../../../components/multiselect";
import {
  CONTRACT_TYPES,
  descriptions,
} from "../../../../../../constants";
import CustomSingleSelect from "../../../../../../components/select";
import "./style.scss";

const UploadContractBody = ({ step, setStep }) => {
  const dispatch = useDispatch();
  const { uploadStatus, counterparties } = useSelector((state) => state.dashboard);

  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    contractType: null,
    counterparty: [],
    entity: null,
  });

  useEffect(() => {
    // Fetch counterparties when component mounts
    dispatch(getCpAsync())
  },[dispatch])

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    const uploaded = Array.from(e.target.files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    setFiles(uploaded);

    if (uploaded.length > 0) {
      setStep(uploadSteps.ADDITIONAL_DATA);
    }
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpload = async () => {
  const formData = new FormData();
  formData.append('contract_type', form.contractType);
  formData.append('counterparty_name', JSON.stringify(form.counterparty));
  formData.append('organization_entity', form.entity);

  // Append each file
  files.forEach((file) => {
    formData.append('file', file); // backend should accept array of files named "files"
    formData.append('title', file.name);
  });

  try {
    const resultAction = await dispatch(uploadContractAsync({ formData }));

    if (uploadContractAsync.fulfilled.match(resultAction)) {
      console.log('✅ Upload succeeded:', resultAction.payload);
      // Close drawer / reset form / show toast
    } else {
      console.error('❌ Upload failed:', resultAction.payload);
    }
  } catch (err) {
    console.error('🔥 Unexpected error:', err);
  }
};


  return (
    <div className="upload-container">
      {step === uploadSteps.CHOOSE_FILES && (
        <div className="choose-files">
          <div className="drop-area">
            <p>Drag and Drop files</p>
            <p>or</p>
            <label className="btn-select">
              + Select Files
              <input
                type="file"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileChange}
                hidden
              />
            </label>
            <p className="note">Supported File Formats: docx, pdf</p>
          </div>
        </div>
      )}

      {step === uploadSteps.ADDITIONAL_DATA && (
        <div className="form-section">
          <div className="uploaded-list">
            {files.map((f, idx) => (
              <div key={idx} className="file-item">
                {f.name}
              </div>
            ))}
          </div>

          <div className="form-fields">
            <CustomSingleSelect
              label="Contract Type"
              placeholder="Select Contract Type"
              name="contractType"
              value={form.contractType}
              onChange={onFormChange}
              options={CONTRACT_TYPES}
              isRequired={true}
              description={descriptions.CONTRACT_TYPES}
            />
            <CustomMultiSelect
              label="Counterparty Name(s)"
              placeholder="Start typing to add New Counterparty"
              options={counterparties}
              value={form.counterparty}
              isRequired={true}
              onChange={(value) => setForm({ ...form, counterparty: value })}
              description={descriptions.COUNTERPARTIES}
            />
            <CustomSingleSelect
              label="Organization Entity"
              placeholder="Select Entity"
              name="entity"
              value={form.entity}
              onChange={onFormChange}
              options={CONTRACT_TYPES}
              isRequired={true}
              description={descriptions.ENTITY}
            />
          </div>

          <div className="actions">
            <button
              className="btn-secondary"
              onClick={() => setStep(uploadSteps.CHOOSE_FILES)}
            >
              Back
            </button>
            <button
              className="btn-primary"
              onClick={handleUpload}
              disabled={uploadStatus === "loading"}
            >
              {uploadStatus === "loading" ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadContractBody;
