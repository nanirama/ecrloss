import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import linkResolver from '../../utils/linkResolver';

const renderPerson = (doc) => {
  if (!doc) return null;
  const { name, photo } = doc.data;
  return (
    <>
      <p>Talk to {name} about this service</p>
      <Img fixed={photo.localFile.childImageSharp.fixed} />
    </>
  );
};

const ActionBar = ({ slice }) => {
  const {
    label,
    action_label: actionLabel,
    action_url: actionURL,
    person: { document },
  } = slice.primary;
  return (
    <section>
      <p>{label}</p>
      {actionURL.type &&
        (actionURL.type ? (
          <a href={linkResolver(actionURL)}>{actionLabel || 'link'}</a>
        ) : (
          <a href={actionURL.url} target={actionURL.target}>
            {actionLabel || 'link'}
          </a>
        ))}
      {renderPerson(document)}
      <p>{actionLabel}</p>
    </section>
  );
};

ActionBar.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default ActionBar;
