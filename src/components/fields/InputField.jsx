import React from 'react';
import { Input, Text } from 'theme-ui';

export const InputField = ({ field, form: { errors, touched }, ...props }) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      <Input {...field} {...props} />
      {errorMessage && <Text variant="error">{errorMessage}</Text>}
    </div>
  );
};
