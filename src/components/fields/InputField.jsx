import React from 'react';
import styled from "styled-components";

export const InputField = ({ field, form: { errors, touched }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      <Input {...field} {...props} />
      {errorMessage && <Text variant="error">{errorMessage}</Text>}
    </div>
  );
};

const Input = styled.input`

`;
const Text = styled.label`

`;


