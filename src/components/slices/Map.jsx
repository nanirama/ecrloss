import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import styled from "styled-components";

const Map = ({ slice }) => {
  return (
    <section>
        <Container>
      {slice.items.map((item) => {
        const {
          name,
          country,
          city,
          address,
          post_code: postCode,
          email,
          location: { latitude, longitude },
        } = item;

        return (
        
          <div key={shortid.generate()}>
            <Address>
            <p><span>{name}</span></p>
            <p>{address}</p>
            <p>{postCode}&nbsp;{city},</p>
            <p>{country}</p>
            <p><span>{email}</span></p>
            {/* <p>{latitude}</p>
            <p>{longitude}</p> */}
            </Address>
          </div>
          
        );
      })}
       </Container>
    </section>
  );
};

Map.propTypes = {
  slice: PropTypes.object.isRequired,
};

export default Map;

const Container = styled.div`
width: 100%;
max-width: 930px;
margin: 0px auto;
padding:0 15px;
p{
  font-size: 14px;
  margin:0;
  line-height:18px;
  span{
    color:#4E50F7;
    font-weight:bold;
  }
}
`;
const Address = styled.div`
border:2px solid #F7F7F7;
padding:16px;
margin-bottom:20px;
width:325px;
background-color:#F7F7F7;
  @media (max-width: 479px) {
    width:100%;
  }
`;
