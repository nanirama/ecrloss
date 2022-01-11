import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const TextBlock = ({ slice }) => {
  const { heading, content } = slice.primary;
  return (
    <section>
  <Container>
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
      </Container>
    </section>
  );
};

TextBlock.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default TextBlock;

const Container = styled.div`
width: 100%;
max-width: 730px;
margin: 64px auto;
padding:0 15px;
box-sizing: border-box;
@media (max-width: 767px) {
  margin: 40px auto;
  padding:0 15px;
}
h1{
  font-size:18px;
  margin-bottom: 34px;
  line-height: 1.3;
  color:#3C3C3B;
  @media (max-width: 599px) {
    margin-bottom: 20px;
  }
}
p{
  font-weight:400 !important;line-height:1.8;
}
`;
