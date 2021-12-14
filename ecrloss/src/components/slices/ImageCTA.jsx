import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import linkResolver from '../../utils/linkResolver';

const ImageCTA = ({ slice }) => {
  const {
    image,
    heading,
    align,
    action_label: actionLabel,
    action_url: actionURL,
  } = slice.primary;
  return (
    <section>
      <p>{align}</p>
      <Img fluid={image.localFile.childImageSharp.fluid} />
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <button type="button">{actionLabel}</button>
      {actionURL.type ? linkResolver(actionURL) : actionURL.url}
    </section>
  );
};

ImageCTA.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default ImageCTA;
