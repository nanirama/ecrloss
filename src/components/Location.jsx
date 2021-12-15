import React from 'react';
import styled from "styled-components";

const formatAddress = (country, city, address, postCode) => {
  return (
    <>
      <Text as="p" variant="location.normal">
        {address},
      </Text>
      <Text as="p" variant="location.normal">
        {`${postCode} ${city}`},
      </Text>
      <Text as="p" variant="location.normal">
        {country}
      </Text>
    </>
  );
};
const Text = styled.label`

`;
const Location = ({ data, selected, onClick }) => {
  const { name, country, city, address, post_code: postCode, email } = data;
  return (
    <li
      sx={{
        bg: selected ? 'bg.grey' : 'transparent',
        mb: 3,
        p: 3,
        '&:last-of-type': { mb: 0 },
        border: (theme) => `2px solid ${theme.colors.bg.grey}`,
      }}
      onClick={onClick}
    >
      <Text as="p" variant="location.highlight">
        {name}
      </Text>
      {formatAddress(country, city, address, postCode)}
      <Text as="p" variant="location.highlight">
        {email}
      </Text>
    </li>
  );
};

export default Location;
