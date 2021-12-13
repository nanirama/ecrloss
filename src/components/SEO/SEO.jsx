import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import Facebook from './Facebook';

const SEO = ({ title, description, image, pathname }) => {
  const data = useStaticQuery(query);
  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    siteUrl,
    siteLanguage,
    ogLanguage,
    defaultImage,
    // themeColor,
    // backgroundColor,
    facebook
  } = data.site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || `${siteUrl}${defaultImage}`,
    url: `${siteUrl}${pathname || ''}`
  };

  return (
    <>
      <Helmet title={seo.title} titleTemplate={titleTemplate}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
      </Helmet>
      <Facebook
        desc={seo.description}
        image={seo.image}
        title={seo.title}
        type="website"
        url={seo.url}
        locale={ogLanguage}
        name={facebook}
      />
    </>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        siteLanguage
        ogLanguage
        defaultImage
        themeColor
        backgroundColor
        facebook
      }
    }
  }
`;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null
};
