import React from 'react';
import styled from "styled-components";

export const SelectField = ({ field, form: { errors, touched }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      <Select>
      <select
        {...field}
        {...props}
      />
      {errorMessage && <Text variant="error">{errorMessage}</Text>}
      </Select>
    </div>
  );
};

const Select = styled.p`
select{
  width: 100%;
  border: none;
  background-color:transparent;
  font-size: 14px;
  color: #888;
  padding-bottom:8px;
  border-bottom:1px solid #d1d1d1;
}
margin:0;
`;
const Text = styled.p`

`;