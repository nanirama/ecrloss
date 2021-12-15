import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import moment from 'moment';
import { truncateString, lightOrDark } from '../../utils';
import styled from "styled-components";

const EventItem = ({ event, basePath }) => {
  const {
    uid,
    data: {
      title,
      description,
      city,
      organiser,
      category,
      start_date: startDate,
      end_date: endDate,
      custom_date: customDate,
      register_label: registerLabel,
      register_url: registerURL,
    },
  } = event;
  let eventURL = `${basePath}/${uid}`;

  const isPast = moment() > moment(startDate);


  return (
    <BoxItem>
      <Box isPast={isPast}>
         <LinkItem>
        <Link
          to={eventURL}         
        >
          {category.document && (
            <CatTitle
              as="div"
              variant="webinarItem.category"
              style={{ backgroundColor: category.document.data.color, color: '#FFF' }}
              // sx={{
              //   backgroundColor: category.document.data.color,
              //   color:
              //     lightOrDark(category.document.data.color) === 'light'
              //       ? '#000'
              //       : '#FFF',
              // }}
            >
              {category.document.data.name}
            </CatTitle>
          )}
          <Date>
            {customDate ? (
              customDate
            ) : (
              <>
                {moment.utc(startDate).format('D MMM YYYY')}
                {endDate && ` - ${moment.utc(endDate).format('D MMM YYYY')}`}
              </>
            )}
          </Date>
          {isPast ? (
            <Past>
              Past
            </Past>
          ) : (
            <UpComing>
              Upcoming
            </UpComing>
          )}

          <Text as="h2" variant="webinarItem.title">
            {truncateString(title.text, 50)}
          </Text>
          <div sx={{ flex: 1 }} />
          <Desc as="p" variant="webinarItem.description">
            {truncateString(description, 175)}
          </Desc>
          <Author>
            {organiser}
          </Author>
        </Link>
</LinkItem>

      </Box>
    </BoxItem>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default EventItem;

const BoxItem = styled.div`
width: 33.3333%;box-sizing: border-box;
 padding:16px;
 @media (max-width:850px){
  width:50%;
 }
 @media (max-width:767px){
  width:100%;
  text-align: center;
 }
 `;
const Box = styled.div`
 background-color:#fff;
 height: 100%;
 padding: 32px;
 text-align: center;
 min-height: 420px;box-sizing: border-box;
 opacity: ${props => props.isPast ? '0.6' : '1.0' };
//  box-shadow: rgba(0, 0, 0, 0.17) 0px 10px 10px -5px;
 @media (max-width:767px){
  width:300px;
  display:inline-block;
 }
 @media (max-width:479px){
  width:100%;
 }
`;
const Date = styled.div`
color:#4E50F7;
margin-bottom: 16px;
font-size: 14px;
font-weight: 400;
`;
const Past = styled.div`
color:#4E50F7;
margin-bottom: 16px;
font-size: 12px;
font-weight: 700;
text-transform: uppercase;
`;
const UpComing = styled.div`
color:#4E50F7;
margin-bottom: 16px;
font-size: 12px;
font-weight: 700;
text-transform: uppercase;
`;
const Text = styled.h2`
color:#7C7A7A;
font-size: 24px; 
font-weight:400;
 line-height:29px;
`;
const Desc = styled.p`
color:#000;
font-size:14px;
font-weight:400;
margin: 64px 0px 0px;
line-height: 18px;
`;
const Author = styled.p`
font-weight: bold;
margin-top: 16px;
color:#4E50F7;
line-height: 22px;
margin-bottom:0;
`;
const CatTitle = styled.div`
font-weight: bold;
margin:0 0 16px;
font-size: 14px;
text-transform: uppercase;
padding: 4px 16px;
`;
const LinkItem = styled.div`
height:100%;
a{
  display: flex;
  flex-direction: column;
  -moz-box-align: center;
  align-items: center;
  height: 100%;
}
`;
