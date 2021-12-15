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


const WebinarSpecialItem = ({ title, actionLabel, actionURL }) => {
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
          flexDirection: 'column',
          p: 4,
          bg: 'accent',
          height: '100%',
          minHeight: 350,
        }}
      >
        <Text
          as="h2"
          color="white"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            fontSize: 5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>
        <Button
          variant="primary"
          as={Link}
          to={actionURL}
          sx={{ bg: 'white', color: 'accent', '&:hover': { color: 'white'} }}
        >
          {actionLabel}
        </Button>
      </Flex>
    </Box>
  );
};

WebinarSpecialItem.propTypes = {
  title: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  actionURL: PropTypes.string.isRequired,
};

export default WebinarSpecialItem;
