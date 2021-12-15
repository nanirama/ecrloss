import React from 'react';
import Menu from './Menu';
import Question from './Question';
import styled from "styled-components";

const QuestionListTemplate = ({ data }) => {
  const { categories, questions, allQuestions } = data;
  return (
    <Container>
    <FaqBox>
      <MenuList>
      <Menu
        questions={allQuestions}
        categories={categories}
      
      />
</MenuList>
      <div>
        {questions.map((q) => (
          <Question data={q.data} />
        ))}
      </div>
    </FaqBox>
    </Container>
  );
};

export default QuestionListTemplate;

const Container = styled.div`
max-width:900px;margin: 0 auto;padding:0 15px;
`;
const FaqBox = styled.div`
display:flex;

@media (max-width:768px){
  flex-direction: column;
}
`;
const MenuList = styled.div`
min-width:350px;
@media (max-width:767px){
  min-width:100%;
}
`;

