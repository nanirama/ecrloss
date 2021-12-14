import React from 'react';
import { Link } from 'gatsby';
import styled from "styled-components";

const printCategory = (cat, questions) => {
  const questionsInCat = questions.filter(
    (q) => q.data.category.document.data.name === cat.document.data.name
  );
  return (
    <ul>
      {questionsInCat.map((q) => (
        <li>
          <Link
            to={`/faq/${q.data.category.uid}/${q.uid}`}
            activeStyle={{ color: 'red' }}
          >
            {q.data.question.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Menu = ({ questions, categories, ...props }) => {
  return (
    <FaqMenu>
      <Heading>
        FAQs
      </Heading>
    <ul {...props} >
      {categories.map((cat) => (
        <li>
          <Link to={`/faq/${cat.uid}`}>{cat.document.data.name}</Link>
          {printCategory(cat, questions)}
        </li>
      ))}
    </ul>
  </FaqMenu>
  );
};

export default Menu;

const Heading = styled.div`
margin-bottom: 32px;
font-size: 24px;
font-weight: bold;
color:#4E50F7;
`;
const FaqMenu = styled.div`
ul{margin-right:30px; padding:0;
  @media (max-width:767px){
    margin-right:0px;
  }

}

li{ list-style:none;}
ul li a{color:#4E50F7; font-size:16px; font-weight:700;margin-bottom: 16px;display:flex;}
ul li ul li a{color:#7A6B6B; font-size:14px; font-weight:700;line-height:20px; display:flex;
&[aria-current] {
  color: #4E50F7 !important;
}
}
`;

