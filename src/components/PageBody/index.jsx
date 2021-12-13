import React from 'react';
import PropTypes from 'prop-types';

import SlicesRenderer from '../SlicesRenderer';

const PageBody = ({ document }) => (
  <>
    <SlicesRenderer slices={document.body} />
  </>
);

PageBody.propTypes = {
  document: PropTypes.object.isRequired,
};

export default PageBody;