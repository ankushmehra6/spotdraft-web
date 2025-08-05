import { useState } from "react";
import ContractStatusTreeSelect from "../../../../components/treeselect";
import { CONTRACT_STATUSES } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { updateContractStatusAsync } from "../../../../redux/slice/dashboard/slice";

const ContractHeader = () => {
  const { contract, counterpartiesMap: cpMap } = useSelector(
    (state) => state.dashboard
  );
  console.log("contract", contract);
  const dispatch = useDispatch();
  const [value, setValue] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const treeData = Object.entries(CONTRACT_STATUSES).map(
    ([statusKey, statusLabel]) => ({
      title: statusLabel,
      value: statusLabel,
      key: statusKey,
      children: contract?.counterparty_name?.map((cp) => ({
        title: `${statusLabel}_${cpMap[cp]?.name}`,
        value: `${statusLabel}_${cp}`,
        key: `${statusKey}_${cp}`,
      })),
    })
  );

  const handleStatusUpdate = async () => {
    if (!value) return;

    const [status, counterparty_id] = value.split("_");
    setLoading(true);
    const data = {
      contractId: contract._id,
      status,
    };
    if (counterparty_id) data.cp_id = counterparty_id;
    try {
      await dispatch(
        updateContractStatusAsync({
          data,
        })
      );
      alert("Status updated successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contractHeader">
      <div className="contractTitle">{contract?.title}</div>
      <div className="counterparty">
        Counterparty:{" "}
        {contract?.counterparty_name
          ?.map((cp) => cpMap[cp]?.name ?? "N/A")
          .join(", ") || "—"}
      </div>
      <ContractStatusTreeSelect
        value={value}
        onChange={setValue}
        treeData={treeData}
      />
      <button
        className="btn-primary"
        onClick={handleStatusUpdate}
        disabled={!value || loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Updating..." : "Update Status"}
      </button>
    </div>
  );
};

export default ContractHeader;
