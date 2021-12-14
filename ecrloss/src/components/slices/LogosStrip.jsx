import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Img from 'gatsby-image';

const LogosStrip = ({ slice }) => {
  const { items } = slice;
  return (
    <section>
      <ul>
        {items.map((item) => {
          const { image } = item;
          return (
            <li key={shortid.generate()} style={{ maxWidth: 160, maxHeight: 60 }}>
              <Img fluid={image.localFile.childImageSharp.fluid} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

LogosStrip.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default LogosStrip;
