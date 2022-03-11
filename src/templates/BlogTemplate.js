import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import PageBody from '../components/PageBody';
import { Header } from '../components/Blog';
import styled from "styled-components";

const BlogTemplate = ({ data, pageContext, location }) => {
  const {
    prismicBlog: { data: page },
  } = data;

  if (!page) return null;

  const {
    title,
    excerpt,
    author,
    category,
    featured_image: image,
    meta_title: metaTitle,
    meta_description: metaDescription,
    social_card: socialCard,
  } = page;
  return (
    <Layout location={location}>
      <Seo
        pathname={location.pathname}
        title={metaTitle || title.text}
        description={metaDescription || excerpt}
        image={
          socialCard.localFile
            ? socialCard.localFile.url
            : image
            ? image.url
            : undefined
        }
      />
      <Wrapper>
      <Container>
      
      <Header
      title={title}
      author={author}
      category={category}
    
        image={image}
        basePath={pageContext.basePath}
      />
     
     </Container>
     </Wrapper>
     <PageContainer>
      <PageBody document={page} />
      </PageContainer>
    </Layout>
  );
};

BlogTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogTemplate;

export const query = graphql`
  query BlogBySlug($uid: String!) {
    prismicBlog(uid: { eq: $uid }) {
      data {
        title {
          html
          text
        }
        excerpt
        featured_image {
          url
          gatsbyImageData(layout: FULL_WIDTH, width: 1200)
        }
        author {
          document {
            ... on PrismicPerson {
              uid
              type
              data {
                name
              }
            }
          }
        }
        category {
          document {
            ... on PrismicCategory {
              id
              uid
              data {
                name
                color
              }
            }
          }
        }
        meta_title
        meta_description
        social_card {
          alt
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        body {
          ... on PrismicBlogDataBodyCta {
            id
            slice_type
            primary {
              action_label
              heading {
                html
              }
              subheading
              action_url {
                target
                url
                type
                uid
              }
            }
          }
          ... on PrismicBlogDataBodyTextBlock {
            id
            slice_type
            primary {
              heading {
                html
              }
              content {
                html
              }
            }
          }
          ... on PrismicBlogDataBodyImage {
            id
            slice_type
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              description
            }
          }
          ... on PrismicBlogDataBodyPositiveNegative {
            id
            slice_type
            primary {
              heading {
                html
              }
            }
            items {
              positive_title
              positive_content
              negative_title
              negative_content
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
text-align:center;
h1{
  color: grey;
  font-size: 32px; 
  line-height:40px;max-width:900px; margin:16px auto;
  @media (max-width: 992px) {
    max-width:100%;
  }
  @media (max-width: 599px) {
    font-size: 25px;
    line-height:28px;
  }
}
p{
  font-size: 14px;
  line-height:15px;
  a{
    font-weight: bold;
    color: grey;
    &:hover{
      color:#4E50F7;
    }
   
}


}
`;
const Container = styled.div`
width: 100%;
max-width:1200px;
margin:0 auto;
box-sizing: border-box;

`;
const PageContainer = styled.div`

h1{
  font-size:18px;
  color:#3C3C3B;
}

`;
