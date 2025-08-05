const COUNTERPARTIES = [
  { label: '100renamedhereagain (100@yopmail.com)', value: '100@yopmail.com' },
  { label: '100@yopmail.com', value: '100@yopmail.com_2' },
  { label: '108', value: '108' },
  { label: '11name', value: '11name' },
  { label: '1234 (Varun+2@spotdraft.com)', value: 'varun+2@spotdraft.com' },
];

const CONTRACT_TYPES = [
    { label: 'SaaS Order Form', value: 'so' },
    { label: 'NDA', value: 'nda' },
    { label: 'MSA', value: 'msa' },
];

export const CONTRACT_STATUS_META = {
  Draft: { color: '#8e5af7' },         // purple
  Redlining: { color: '#eb5757' },     // red
  Signing: { color: '#f2994a' },       // orange
  Executed: { color: '#219653' },      // green
  'On Hold': { color: '#828282' },     // gray
  Archived: { color: '#bdbdbd' },      // light gray
};

const descriptions ={
  COUNTERPARTIES: 'The counterparty associated with this contract.',
  CONTRACT_TYPES: 'The type of contract guides which other users can view or edit this contract.',
  ENTITY: "Your company's organization entity entering into an agreement with this counterparty.",
};


export{
    COUNTERPARTIES,
    CONTRACT_TYPES,
    descriptions
}