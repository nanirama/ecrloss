import React from 'react';
import Menu from './Menu';
import Question from './Question';
import styled from "styled-components";

const QuestionTemplate = ({ data }) => {
  const { page, categories, questions } = data;
  return (
    <Container>
    <Flex>
      <FaqContent>
      <Menu
        questions={questions}
        categories={categories}
       
      />
      </FaqContent>
      <Question data={page} />
    </Flex>
    </Container>
  );
};

export default QuestionTemplate;

const Container = styled.div`
max-width:930px;margin: 0 auto;padding:0 15px;
`;

const FaqContent = styled.div`
min-width:400px;
@media (max-width:767px){
  min-width:100%; padding:0 15px;
}
`;

const Flex = styled.div`
display:flex;
@media (max-width:768px){
  flex-direction: column;
}

`;

