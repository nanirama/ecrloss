import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from "styled-components";

const Box = styled.div`

`;
const Flex = styled.div`

`;
const Box = styled.div`

`;
const Text = styled.label`

`;

const WebinarSubscribeItem = ({ title, actionLabel }) => {
  return (
    <Box
      sx={{
        width: [`100%`, `50%`, `${(1 / 3) * 100}%`],
        p: 3,
        flex: [`0 0 100%`, `0 0 50%`, `0 0 ${(1 / 3) * 100}%`],
      }}
    >
      <Flex
        sx={{
          bg: 'white',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 4,
          border: (theme) => `1px solid ${theme.colors.accent}`,
          height: '100%',
          minHeight: 350,
        }}
      >
        <Text
          as="h2"
          color="accent"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>
        <Button variant="primary">{actionLabel}</Button>
      </Flex>
    </Box>
  );
};

WebinarSubscribeItem.propTypes = {
  title: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
};

export default WebinarSubscribeItem;
