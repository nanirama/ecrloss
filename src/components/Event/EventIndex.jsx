import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import EventItem from './EventItem';
import Dropdown from '../Blog/Dropdown';

const EventIndex = ({ events, basePath, categories, path }) => {
  
  // const categoriesList = [
  //   { name: 'Everything', path: basePath },
  //   { name: 'Past Events', path: basePath+'/past/' },
  //   { name: 'Future Events', path: basePath+'/future/' },
  // ];
  return (
    <Box>
      <Container>
        <Dropdown items={categories} path={path} />
      </Container>
      <Container>
        <Heading>
          Our Meetings
        </Heading>
        <Text>
          The Group’s regular meetings provide an opportunity to network with
          industry peers, hear updates on the latest research and sector
          initiatives, and development new skills and insights.
        </Text>
      <Section>
        <Flex>
          {events.map((event) => (
            <EventItem key={event.id} event={event} basePath={basePath} />
          ))}
        </Flex>
      </Section>
      </Container>
    </Box>
  );
};

EventIndex.propTypes = {
  events: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default EventIndex;

const Box = styled.div`
 background-color:#F7F7F7
 ;padding: 32px 16px;
`;
const Container = styled.div`
 max-width:900px;
 margin: 0 auto;
 
`;
const Heading = styled.h1`
font-size: 48px;
font-weight: bold;
line-height: 1.3;
text-transform: uppercase;
text-align: center;
@media (max-width:767px){
  font-size: 40px;
 }
 @media (max-width:479px){
  font-size: 32px;
  line-height:40px;
 }
`;
const Text = styled.p`
font-size: 18px;
line-height:22px;
margin: 8px auto 0px;
color:#7C7A7A;
max-width: 800px;
font-weight: 400;
text-align: center;
@media (max-width:599px){
  font-size: 15px;
}
`;
const Section = styled.div`
margin-top:60px;
`;
const Flex = styled.div`
flex-wrap: wrap;
margin: -16px;
display: flex;
`;
