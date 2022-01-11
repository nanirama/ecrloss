import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';
import moment from 'moment';
import styled from "styled-components";

const Event = ({ data }) => {
  const {
    title,
    start_date: startDate,
    end_date: endDate,
    custom_date: customDate,
    description,
    description_richtext: { html: htmlDescription },
    featured_image: image,
    register_label: registerLabel,
    register_url: registerURL,
    city,
    organiser,
    address,
    price,
  } = data;
  const eventimage = getImage(image)
  return (
    <Box as="section">
      <Container variant="content">
      <Return>
        <Link to="/event">
          &lt; Return to all events
        </Link>
        </Return>

        <Flex>
          <BoxLeft>
            <div dangerouslySetInnerHTML={{ __html: title.html }} />
            <Paragraph>
              by <span>{organiser}</span>
            </Paragraph>

            {image && (
              <GatsbyImage image={eventimage} alt={title.text} />
            )}

            <SubTitle><div variant="webinar.label"><b>Description</b></div></SubTitle>
            {htmlDescription.length > 0 ? (
              <div
                variant="webinar.text"
                dangerouslySetInnerHTML={{ __html: htmlDescription }}
              />
            ) : (
              <div variant="webinar.text">{description}</div>
            )}
          </BoxLeft>
          <BoxRight>
            <Register>
              <p><span>
                {moment.utc(startDate).format('DD')}</span>
              </p>
              <p
                
              >
                {moment.utc(startDate).format('MMM')}
              </p>
              <p>
                {moment.utc(startDate).format('HH:mm')}
              </p>
              <Button
                variant="primary"
                as="a"
                href={registerURL.url}
                target="_blank"
                
              >
                {registerLabel}
              </Button>
            </Register>

            <BoxBotom>
              <h6 variant="webinar.label">Date and Time</h6>
              <p variant="webinar.text">
                {customDate ? (
                  customDate
                ) : (
                  <>
                    {moment.utc(startDate).format('D MMM YYYY, HH:mm')}
                    {endDate &&
                      ` - ${moment.utc(endDate).format('D MMM YYYY, HH:mm')}`}
                  </>
                )}
              </p>
              <h6 variant="webinar.label">Location</h6>
              <p variant="webinar.text">{address}</p>
            </BoxBotom>
          </BoxRight>
        </Flex>
      </Container>
    </Box>
  );
};

Event.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Event;

const Box = styled.div`
 background-color:#F7F7F7;
 padding:16px 0;
 `;
 const Container = styled.div`
 max-width:1200px;
 margin: 0 auto;
`;
const Return = styled.div`
font-size: 14px;
font-weight: 700;
line-height: 4;
color:#3c3c3b;
a{
  color:#4E50F7;
}
`;
const Flex = styled.div`
margin: 64px 0px 0px;
flex-direction: row;
min-width: 0px;
display: flex;
@media (max-width:900px){
  flex-direction: column;
}
`;
const BoxLeft = styled.div`
background-color: white;
padding:32px;
flex: 1 1 0%;
display: flex;
flex-direction: column;
h1{
  color: grey;
  line-height:30px;
  margin:0;
  font-size: 24px;
  margin-bottom: 4px;
}
p{
  font-size:14px; 
  color:#3C3C3B; 
  line-height:18px;
  margin:0;
}
span{
  color:#4E50F7;
}
@media (max-width:767px){
 padding:15px
}
`;
const SubTitle = styled.div`
margin-top:16px
`;
const Paragraph = styled.p`
margin-bottom: 16px !important;
`;
const BoxRight = styled.div`
width:400px;
margin-left: 32px;
@media (max-width:768px){
  margin-left:0px;
  width:100%;
}
`;
const Register = styled.div`
background-color:#fff;
padding:32px;
p{
  font-size: 24px;
   text-transform: uppercase; 
   color: grey;
    margin:0;
    font-weight: 400;
  }
  span{
    font-size:48px;
    line-height:58px;
  }
  @media (max-width:767px){
    padding:15px
   }
`;
const Button = styled.a`
margin: 32px 0px 0px;
display: inline-block;
text-align: center;
padding: 8px 32px;
color:#fff;
background-color:#4E50F7;
text-transform: uppercase;
border-radius: 0px;
font-size: 16px;
font-weight: 400;
`;
const BoxBotom = styled.div`
padding:32px;
  h6{
    color:#3c3c3b;
    font-size: 14px;
     font-weight: bold;
    }
  p{
    margin: 0px 0px 10px;
    font-size: 14px;
  }
  @media (max-width:767px){
    padding:15px
   }
`;
