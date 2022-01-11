import React from 'react';
import PropTypes from 'prop-types';

import styled from "styled-components";

const Video = ({ slice }) => {
  const {
    video_url: videoURL,
    heading,
    action_label: actionLabel,
  } = slice.primary;
  return (
    <section>
      <Container>
     { heading.html && <div dangerouslySetInnerHTML={{ __html: heading.html }} /> }
     {videoURL.html &&  <div dangerouslySetInnerHTML={{ __html: videoURL.html }} /> }
      {/* { actionLabel && <button type="button">{actionLabel}</button> }  */}
      </Container>
    </section>
  );
};

Video.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default Video;

const Container = styled.div`
width: 100%;
max-width: 930px;
margin: 64px auto;
padding:0 15px;
box-sizing: border-box;
iframe{
  width:100%;
  height:530px;
  @media (max-width: 900px) {
    height:400px;
  }
  @media (max-width: 700px) {
    height:330px;
  }
  @media (max-width:479px) {
    height:250px;
  }
}
@media (max-width: 767px) {
  margin: 40px auto;
}
`;
