import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ title, description, image, pathname }) => {
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
    <Helmet title={seo.title} titleTemplate={titleTemplate} defer={false}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />

        {facebook && <meta property="og:site_name" content={facebook} />}
        <meta property="og:locale" content={ogLanguage} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:image:alt" content={seo.description} />
    </Helmet> 
    </>
  );
};

export default Seo;

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

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string
};

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null
};
