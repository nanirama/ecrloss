import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import styled from "styled-components";
import linkResolver from '../../utils/linkResolver';

const slugify = require('../../utils/slugify');





const CTA = ({ slice }) => {
  const {
    heading,
    subheading,
    action_label: actionLabel,
    action_url: actionURL,
  } = slice.primary;
  return (
    <section>
      <Container>
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <p>{subheading}</p>
      <Button type="button"
      as="a"
      href={actionURL.url}
      target={actionURL.target}
      > {actionLabel || 'link'}</Button>
      {/* {actionURL.type ? linkResolver(actionURL) : actionURL.url} */}
      </Container>
    </section>
  );
};

CTA.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default CTA;

const Container = styled.div`
width: 100%;
max-width: 550px;
margin: 128px auto;
padding:0 15px;
text-align:center;
box-sizing: border-box;
@media (max-width: 1024px) {
  margin: 70px auto;
}
@media (max-width: 767px) {
  margin: 40px auto;
}
`;
const Button = styled.a`
background-color: #4E50F7;
text-transform: uppercase;
font-size: 16px;
padding: 8px 32px;
color:#fff;
text-align:center;
display:inline-block;
@media (max-width: 479px) {
  font-size: 14px;
  padding: 8px 20px;
}
`;

