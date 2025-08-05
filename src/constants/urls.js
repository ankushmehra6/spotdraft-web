const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000/';
const urls = {
    upload: `${baseUrl}contracts/upload`,
    getCounterparties: `${baseUrl}counterparties`,
    getContracts: `${baseUrl}contracts`,
    updateContractStatus: `${baseUrl}logs/update`,
};

export default urls;
