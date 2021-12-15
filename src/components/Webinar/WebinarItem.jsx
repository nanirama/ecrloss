import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import moment from 'moment';

import { truncateString, lightOrDark } from '../../utils';

import styled from "styled-components";


const WebinarItem = ({ webinar, basePath }) => {
  const {
    uid,
    data: {
      title,
      date,
      custom_date: customDate,
      description,
      category,
      presenter,
      featured_image: image,
      register_label: registerLabel,
      register_url: registerURL,
    },
  } = webinar;
  let webinarURL = `${basePath}/${uid}`;
  const {
    data: { name: categoryName, color: categoryColor },
  } = category.document;
  const {
    data: { name: presenterName },
  } = presenter.document;
  
  return (
    <BoxItem>
      <Box>
        <LinkItem>
        <Link to={webinarURL}>
          {/* <Img fluid={image.localFile.childImageSharp.fluid} /> */}
          <CatTitle
            as="div"
            variant="webinarItem.category"
            style={{ backgroundColor: category.document.data.color, color: '#FFF' }}
            // sx={{
            //   backgroundColor: categoryColor,
            //   color: lightOrDark(categoryColor) === 'light' ? '#000' : '#FFF',
            // }}
          >
           {categoryName}
          </CatTitle>

          <Date>
          {(date || customDate) && (
            <div>
              {customDate
                ? customDate
                : moment.utc(date).format('D MMM YYYY HH:mm')}
            </div>
          )}
          </Date>
          <Text as="h2" variant="webinarItem.title">
            {truncateString(title.text, 50)}
          </Text>
          <Desc>
            {truncateString(description, 150)}
          </Desc>
          <Gap/>
          <Presenter>
            Presenter:
            <span className="presenter">{presenterName}</span>
          </Presenter>
        </Link>
        </LinkItem>
      </Box>
    </BoxItem>
  );
};

WebinarItem.propTypes = {
  webinar: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default WebinarItem;

const BoxItem = styled.div`
 width:33.3333%;
 padding:16px;box-sizing:border-box;
 @media (max-width:768px){
  width:50%;
 }
 @media (max-width:767px){
  width:100%;
 }
 `;
 const Box = styled.div`
 background-color:#fff;height: 100%;
 padding: 32px;box-sizing:border-box;
 text-align: center;
 min-height: 420px;
 opacity: 1;
//  box-shadow: rgba(0, 0, 0, 0.17) 0px 10px 10px -5px;
 `;

 const LinkItem = styled.div`
height:100%;
a{display: flex;
flex-direction: column;
-moz-box-align: center;
align-items: center;
height: 100%;}
`;
const CatTitle = styled.div`
font-weight: bold;
 margin:0 0 16px;
 font-size: 14px;
 text-transform: uppercase;
 padding:4px 16px;
`;
const Date = styled.div`
color:#4E50F7;
margin-bottom: 16px;
font-size: 14px;
font-weight: 400;
`;
const Text = styled.h2`
color:#7C7A7A;
font-size: 24px;margin:0;
font-weight:400;
line-height:29px;
`;
const Desc = styled.div`
color:#000;
font-size:14px;
font-weight:400;
line-height:29px;
margin: 64px 0px 25px;
line-height: 18px;
`;
const Presenter = styled.div`
color:#000;
font-size:14px;
 font-weight:700; 
span
{
  color:#4E50F7;
   margin-left:4px;
  }
`;
const Gap = styled.div`
flex: 1 1 0%;
`;

