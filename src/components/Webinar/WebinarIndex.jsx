import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import WebinarItem from './WebinarItem';
import styled from "styled-components";

const WebinarIndex = ({
  webinars,
  basePath,
  isFirstPage,
  categories,
  path,
}) => {
  return (
    <Box>
      <Container variant="content">
        <Heading>
          Retail loss webinars
        </Heading>
        <Text as="p">
          As part of the Group’s commitment to disseminating the results of
          their research as widely as possible, it regularly delivers webinars,
          which can be accessed in real time or viewed at a later date.
        </Text>
      </Container>
<ContentMid>
      <Container>
        <Flex>
          {webinars.map((webinar, index) => {
            return isFirstPage && index === 1 ? (
              <Fragment key={webinar.id}>
                <WebinarItem webinar={webinar} basePath={basePath} />
                {/* <WebinarSubscribeItem
                  title="Subscribe to our blog updates"
                  actionLabel="Sign up"
                />
                <WebinarSpecialItem
                  title="Join Our LinkedIn Mastermind Group"
                  actionLabel="Join now"
                  actionURL="/"
                /> */}
              </Fragment>
            ) : (
              <WebinarItem
                key={webinar.id}
                webinar={webinar}
                basePath={basePath}
              />
            );
          })}
        </Flex>
      </Container>
      </ContentMid>
    </Box>
  );
};

WebinarIndex.propTypes = {
  webinars: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
  isFirstPage: PropTypes.bool.isRequired,
};

export default WebinarIndex;
const Box = styled.div`
background-color:#f7f7f7;
padding:32px 16px;
`;
const Container = styled.div`
 max-width:900px;
 margin: 0 auto;
`;
const Heading = styled.h1`
font-size: 48px;
font-weight: bold;
line-height: 1.3;margin-bottom: 8px;
text-transform: uppercase;
text-align: center;
  @media (max-width:800px){
    font-size: 40px;
  }
  @media (max-width:479px){
    font-size: 32px;
  }
`;
const Text = styled.p`
line-height:22px;
margin: 0px auto 0px;
color:#7C7A7A;
max-width: 800px;
font-weight: 400;
text-align: center;
`;
const ContentMid = styled.div`
margin-top:64px;
`;
const Flex = styled.div`
flex-wrap: wrap;
margin: -16px;
display: flex;
`;