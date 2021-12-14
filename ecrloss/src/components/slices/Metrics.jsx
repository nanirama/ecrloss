import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const Metrics = ({ slice }) => {
  const { heading } = slice.primary;
  const { items } = slice;
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: heading.html }} />
      <ul>
        {items.map((item) => {
          const { metric, value } = item;
          return (
            <li key={shortid.generate()}>
              {value && <p>{value}</p>}
              {metric && <p>{metric}</p>}
            </li>
          );
        })}
      </ul>
      <hr />
    </section>
  );
};

Metrics.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default Metrics;
