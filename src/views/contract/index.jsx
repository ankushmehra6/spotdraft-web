import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContractById, getCpAsync } from "../../redux/slice/dashboard/slice";
import ActivityLog from "./component/activityLog";
import ContractHeader from "./component/header";

const ContractDetails = () => {
  const { contractId } = useParams();
  const dispatch = useDispatch();
  
  const { contract, getContractStatus, getContractError } = useSelector(
    (state) => state.dashboard
  );
  
  useEffect(() => {
    dispatch(getCpAsync());
    dispatch(getContractById(contractId));
  }, [contractId, dispatch]);

  if (getContractStatus === "loading") return <p>Loading...</p>;
  if (getContractError) return <p>Error: {getContractError}</p>;

  return (
    <div className="contract-container">
      <ContractHeader />
      <ActivityLog contract={contract} />
    </div>
  );
};

export default ContractDetails;
