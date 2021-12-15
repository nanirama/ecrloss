import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';
import { linksResolver } from '../../utils/linksResolver';
import moment from 'moment';

import styled from "styled-components";

const Header = ({
  title,
  description,
  category,
  presenter,
  image,
  date,
  customDate,
  registerLabel,
  registerURL,
}) => {
  let {
    document: {
      uid: categoryUid,
      data: { color, name: categoryName },
    },
  } = category;
  let {
    document: {
      uid: presenterUid,
      data: { name: presenterName },
    },
  } = presenter;
  const wimage = getImage(image)
  return (
    <BoxBg>
          <Box as="section">
      <Container variant="content">
        <Link
          to="/webinar"
         
        >
          <Return>&lt; Return to all webinars</Return>
        </Link>
        <BoxMid>
         
        <div
            dangerouslySetInnerHTML={{ __html: title.html }}
            
          />
          {/* <div sx={{ textAlign: 'center', mb: 4 }}>
            <Button variant="category" as="div" sx={{ backgroundColor: color }}>
              {categoryName}
            </Button>
          </div> */}
          <Flex>
         <MainImg>
          <GatsbyImage image={wimage} alt={title.text} />
          </MainImg>
            <BoxRight
             
            >
              {(date || customDate) && <h6 variant="webinar.label">Date and Time</h6>}
              {(date || customDate) && <p variant="webinar.text">
                {customDate ? customDate : moment.utc(date).format('D MMM YYYY HH:mm')}
              </p>}

              <h6 variant="webinar.label">Description</h6>
              <p variant="webinar.text">{description}</p>

              <h6 variant="webinar.label">Presenter</h6>
              <p variant="webinar.text">
                <Link
                  to={linksResolver(presenter.document)}
                 
                >
                  {presenterName}
                </Link>
              </p>

              <Button
                variant="primary"
                as="a"
                href={registerURL.url}
                target="_blank"
              >
                {registerLabel}
              </Button>
            </BoxRight>
          </Flex>
        </BoxMid>
      </Container>
    </Box>
    </BoxBg>
  );
};

Header.propTypes = {
  title: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  presenter: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default Header;

const BoxBg = styled.div`
background-color:#f7f7f7;
padding:35px 0 16px 0;
p{
  margin: 0px 0px 16px;
  font-size: 14px;
  line-height:16px;
}
h6 {
  font-weight:700;
  font-size: 14px;
}
`;
const Box = styled.div`
h1 {
  color: grey;
  font-size: 32px;
}
`;
const Return = styled.div`
font-weight:700;
color:#4E50F7;
font-size:14px;
`;
const Container = styled.div`
max-width:1200px;
margin: 0 auto;
`;
const BoxMid = styled.div`
max-width:1000px;
margin: 46px auto 32px auto;
`;
const Flex = styled.div`
display:flex;
flex-direction:row;
margin-top:60px;
  @media (max-width:767px){
    flex-direction:column;
    margin-top:16px;
  }
`;
const Button = styled.div`
padding: 8px 32px;float:left;
background-color:#4E50F7;
color:#fff;
text-transform: uppercase;
border-radius: 0px;
font-weight:400;
font-size: 16px;
  a{
    color:#fff !important;
  }
`;
const BoxRight = styled.div`
width: 400px;
margin:0 0px 0 32px;
  @media (max-width:767px){
    width: 100%;
    margin:0px; 
    padding:15px 15px 0 15px;
  }
  p{ line-height:18px;}
`;
const MainImg = styled.div`
flex: 1 1 0%;

`;
