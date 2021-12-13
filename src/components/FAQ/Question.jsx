import React from 'react';
import styled from "styled-components";

const Question = ({ data }) => {
  const { question, answer } = data;
  return (

    <FaqText>
      
      <div dangerouslySetInnerHTML={{ __html: question.html }} />
      <div dangerouslySetInnerHTML={{ __html: answer.html }} />
    </FaqText>
   
  );
};

export default Question;




const FaqText = styled.div`
padding:0 15px;
h1{ color:#4E50F7; margin-bottom: 16px; font-size: 24px;line-height: 29px;}
p{line-height: 1.8; margin-bottom: 32px;font-weight:400;color:#3C3C3B;}
`;

