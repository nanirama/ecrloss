import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from "gatsby"

import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';

export { Header, Footer };

const LayoutData = ({ ...props }) => {
  const { prismicLayout } = useStaticQuery(
    graphql`
      query {
          prismicLayout {
            data {
              logo {
                gatsbyImageData(layout: CONSTRAINED, width: 55)
                url
              }
              header_navigation {
                label
                link_url
                meganav {
                  document {
                    ... on PrismicMeganav {
                      id
                      data {
                        mega_nav_items {
                          mega_nav_item {
                            uid
                          }
                        }
                      }
                    }
                  }
                }
              }
              header_body {
                ... on PrismicLayoutDataHeaderBodyButton {
                  id
                  primary {
                    action_label
                    action_url {
                      url
                      uid
                      target
                      type
                    }
                  }
                }
              }
              footer_body {
                ... on PrismicLayoutDataFooterBodyNavItem {
                  id
                  primary {
                    label
                  }
                  items {
                    label
                    link_url {
                      type
                      target
                      uid
                      url
                      document {
                        ... on PrismicBlog {
                          id
                          type
                          uid
                          data {
                            category {
                              uid
                            }
                          }
                        }
                      }
                    }
                  }
                  slice_type
                }
              }
            }
          }
        }  
    `
  )
 
  const {
    logo,
    header_navigation: headerNavigation,
    header_body: headerBody,
    footer_body: footerBody,
  } = prismicLayout.data;

  const headerData = { logo, headerNavigation, headerBody };
  const footerData = { footerBody };

  return <Layout headerData={headerData} footerData={footerData} {...props} />;
};

LayoutData.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.object.isRequired,
};

export default LayoutData;

export const query = graphql`
  fragment LayoutFragment on Query {
    prismicLayout {
      data {
        logo {
          localFile {
            childImageSharp {
              fixed(height: 60) {
                ...GatsbyImageSharpFixed
              }
            }
            url: publicURL
          }
        }
        header_navigation {
          label
          link_url
          meganav {
            document {
              ... on PrismicMeganav {
                id
                data {
                  mega_nav_items {
                    mega_nav_item {
                      uid
                    }
                  }
                }
              }
            }
          }
        }
        header_body {
          ... on PrismicLayoutDataHeaderBodyButton {
            id
            primary {
              action_label
              action_url {
                url
                uid
                target
                type
              }
            }
          }
        }
        footer_body {
          ... on PrismicLayoutDataFooterBodyNavItem {
            id
            primary {
              label
            }
            items {
              label
              link_url {
                type
                target
                uid
                document {
                  ... on PrismicBlog {
                    id
                    type
                    uid
                    data {
                      category {
                        uid
                      }
                    }
                  }
                }
              }
            }
            slice_type
          }
        }
      }
    }
  }  
`;
