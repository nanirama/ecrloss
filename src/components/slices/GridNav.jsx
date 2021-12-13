import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import linkResolver from '../../utils/linkResolver';

const GridNav = ({ slice }) => {
  const { items } = slice;
  return (
    <section>
      <ul>
        {items.map((item) => {
          const {
            heading,
            subheading,
            action_label: actionLabel,
            action_url: actionURL,
          } = item;
          return (
            <li key={shortid.generate()}>
              <div dangerouslySetInnerHTML={{ __html: heading.html }} />
              {subheading && <p>{subheading}</p>}
              {actionURL.type ? (
                <a href={linkResolver(actionURL)}>{actionLabel || 'link'}</a>
              ) : (
                <a href={actionURL.url} target={actionURL.target}>
                  {actionLabel || 'link'}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

GridNav.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default GridNav;
