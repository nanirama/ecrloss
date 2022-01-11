import React from 'react';
import PropTypes from 'prop-types';
import ResearchItem from './ResearchItem';
import Dropdown from '../Blog/Dropdown'


import styled from "styled-components";

const ResearchIndex = ({ data, basePath, categories, path }) => {
  if (!data) return null;
  return (
    <Box as="section">
      <Container>
        <Dropdown items={categories} path={path} />
      </Container>
      <Container>
        <Heading>
          Research papers
        </Heading>
        <Paragraph>
          Our research papers offer actionable advice for reducing retail loss
          online and in-store, avoiding skrinkage, and improving your profits.
          Learn how to collect the right date to understand shrinkage and
          maximize revenue.
        </Paragraph>
      </Container>
<EcrContent>
      <Container>
        <Flex>
          {data.map((research) => (
            <ResearchItem
              key={research.id}
              research={research}
              basePath={basePath}
            />
          ))}
        </Flex>
      </Container>
      </EcrContent>
    </Box>
  );
};

ResearchIndex.propTypes = {
  data: PropTypes.array.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default ResearchIndex;

const Box = styled.div`
background-color:#f7f7f7;
padding:32px 0;
`;

const Container = styled.div`
width: 100%;
max-width: 1230px;
margin:0 auto;
padding:0 15px;
box-sizing: border-box;
`;
const Heading = styled.h1`
text-align:center;
text-transform:uppercase;
margin-bottom:8px;
line-height:1.3;
`;
const Paragraph = styled.p`
line-height:22px;
max-width:820px;
margin:0 auto 30px auto;
color:#7C7A7A;
text-align:center;
`;
const EcrContent = styled.div`
margin: 64px auto 0px;
@media (max-width: 767px) {
  margin: 30px auto 0px;
}
`;
const Flex = styled.div`
display:flex;
flex-wrap:wrap;
justify-content: center;
margin: -15px;
`;
