import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const ImageCTA = ({ slice }) => {
  const { image, description } = slice.primary;
  return (
    <section>
      <Img fluid={image.localFile.childImageSharp.fluid} />
      <p>{description}</p>
    </section>
  );
};

ImageCTA.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default ImageCTA;
