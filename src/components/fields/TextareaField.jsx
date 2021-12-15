import React from 'react';
import { getIn } from 'formik';
import styled from "styled-components";
export const TextareaField = ({
  field,
  form: { errors, touched },
  ...props
}) => {
  const errorMessage = getIn(touched, field.name) && getIn(errors, field.name);
  return (
    <div>
      <Textarea {...field} {...props} />
      {errorMessage && <Text variant="error">{errorMessage}</Text>}
    </div>
  );
};

const Textarea = styled.textarea`

`;
const Text = styled.label`

`;


