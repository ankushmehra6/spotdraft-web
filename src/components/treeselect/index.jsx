import React from "react";
import { TreeSelect, Typography } from "antd";

const { Text } = Typography;

const ContractStatusTreeSelect = ({ value, treeData, onChange }) => {
  return (
    <div className="treeSelectContainer">
      <Text strong>Status-wise Counterparty Selection</Text>
      <TreeSelect
        value={value}
        onChange={onChange}
        treeData={treeData}
        style={{ width: "100%" }}
        placeholder="Select status or counterparty"
        allowClear
        treeDefaultExpandAll
        treeCheckable={false}
      />
    </div>
  );
};

export default ContractStatusTreeSelect;
