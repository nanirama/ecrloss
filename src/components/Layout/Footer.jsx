import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { linksResolver } from '../../utils/linksResolver';

import styled from "styled-components";
import Arrow from '../../assets/icons/Arrow'

const Footer = ({ data }) => {
  const { footerBody } = data;

  const result = useStaticQuery(query);
  const blogs = result.allPrismicBlog.edges.map(({ node }) => node);
  return (
    <Wrapper>
    <Container>
    <hr />
       <Grid>
          <Item>
             {footerBody.map((group) => {
            const { items } = group;
            const { label } = group.primary;
            return (
              <FooterLinks>
                <h4>{label}</h4>
                <ul>
                  {items.map((item) => {
                    const { label, link_url: linkURL } = item;
                    return (
                      <li>
                        {linkURL.type ? (
                          <Link
                            to={
                              linkURL.document && linkURL.document.uid
                                ? linksResolver(linkURL.document)
                                : linksResolver(linkURL)
                            }
                          >
                            {label}
                          </Link>
                        ) : (
                          <a href={linkURL.url} target={linkURL.target}>
                            {label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
             </FooterLinks>
            );
          })}
          </Item>
          <Item>
          <Heading>Our Latest news</Heading>
          <Links as="ul">
            {blogs.map((blog) => (
              <li>
                <Flex
                  as={Link}
                  to={linksResolver(blog)}
                >
                  <p>
                    {blog.data.title.text}
                  </p>
                  <Arrow />
                </Flex>
              </li>
            ))}
          </Links>
          <h4>Join Our Mailing List</h4>
            <Button
              as="a"
              variant="primary"
              href="https://ecr-shrink-group.us17.list-manage.com/subscribe?u=6023bad92de17c3cdf8bb689d&id=fe6105ee15"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </Button>
          </Item>
       </Grid>
       <CopyRight>
       <Link to="/privacy">Privacy</Link>
       </CopyRight>
    </Container>
 </Wrapper>
 );
 };
 Footer.propTypes = {
  data: PropTypes.object.isRequired,
};

const query = graphql`
  query {
    allPrismicBlog(
      sort: { fields: last_publication_date, order: DESC }
      limit: 2
    ) {
      edges {
        node {
          uid
          type
          data {
            title {
              text
            }
            category {
              uid
            }
          }
        }
      }
    }
  }
`;

 export default Footer;  
  
const Wrapper = styled.div`
`;
const Container = styled.div`
max-width: 1200px;
margin:0 auto;
padding:0px;
box-sizing: border-box;
`;
const Grid = styled.div`
display: grid;
grid-template-columns:1fr;
grid-gap: 10px 20px;
margin:40px 0 0px 0;
 @media (min-width: 992px) {
   grid-template-columns: 6fr 6fr;
   margin:64px 0 30px 0;
 }
 @media (max-width: 991px) {
   flex-direction: column-reverse;
   display: flex;
   padding:16px 16px 32px;
 }
`;
const Item = styled.div`
`;
const Heading = styled.h4`
color:#4E50F7;
`;
const FooterLinks = styled.div`
width:44.5%;
float:left;
padding:0 16px;
margin-bottom:30px;
@media only screen and (min-width:992px) and (max-width:1200px){
  width:43%;
}
@media (max-width: 991px) {
  padding:0 8px;
}
 @media (max-width: 599px) {
   width:100%;
   margin-bottom:15px;
 }
 ul{
  list-style: none;
  padding: 0;
  margin: 0;
 }
 li {
  margin-bottom:16px;
  line-height:18px;
   &:hover a {
   color:#4E50F7;
   }
  }
  a {
  font-size: 12px;
  line-height:20px;
  color:#D1D1D1;
  font-weight:bold;
  text-decoration:none;
  }
`;
const Links = styled.ul`
list-style: none;
padding: 0;
margin: 0 0 64px 0;
@media only screen and (min-width:992px) and (max-width:1200px){
padding:0 15px 0 0;
}

 @media (max-width: 991px) {
   margin: 0 0 30px 0;
 }
li {
margin-bottom:10px;
border-top:1px solid #D1D1D1;
padding-top:10px;
position:relative;
 &:last-child{
 border-bottom:1px solid #D1D1D1;
 padding-bottom:16px;
 }
 &:hover a{
 color:#4E50F7;
 }
}
p {
font-size: 12px;
line-height:20px;
color:#D1D1D1;
font-weight:300;
margin:0;
padding-right:40px;
}
svg{
  position:absolute;
  right:0;
  top:18px;
}
`;

const Button = styled.a`
padding:8px 32px;
color:#fff;
background-color: #4E50F7;
font-size: 16px;
line-height:20px;
font-weight:400;
border:none;
text-transform:uppercase;
display: inline-block;
a{
  color:#fff; 
}
 @media (max-width: 991px) {
   margin: 0 0 20px 0;
 }
 &:hover{
   background-color: #4849C8;
 }
`;
const CopyRight = styled.div`
text-align:right;
margin-bottom:35px;
  a{
     font-size: 12px;
     line-height:20px;
     color:#D1D1D1;
     font-weight:bold;
     &:hover {
        color:#4E50F7;
        }
  }
@media (max-width: 991px) {
  text-align:center;
}
`;
const items = styled.div`
`;
const Flex = styled.div`
`;
