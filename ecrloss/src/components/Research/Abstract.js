import React, { useState,useEffect } from 'react';
import styled from "styled-components";

const Abstract = ({abstract}) => {
    const abstractContent = abstract[0] && abstract[0].primary;
    const [abstractLangContent, setAbstractLangContent] = useState(abstractContent.englsih.html);   
    useEffect(
        () => {
        
        },
        [abstractLangContent],
    )
               
        const handleSelectChange = (e)=> {    
            setAbstractLangContent(e.currentTarget.value)
        }
        
        return(
            <>
            <TitleDrop>
            <h2>Abstract</h2>
            <select onChange={handleSelectChange}>
            <option value={abstractContent.englsih.html}>English</option>
            <option value={abstractContent.french.html}>French</option>
            <option value={abstractContent.spanish.html}>Spanish</option>
            <option value={abstractContent.german.html}>German</option>
            <option value={abstractContent.dutch.html}>Dutch</option>
            </select>
            </TitleDrop>
            <div dangerouslySetInnerHTML={{ __html: abstractLangContent }} />
            </>
        )


}
const TitleDrop = styled.div`
width: 100%;
max-width: 1230px;
display:flex;
justify-content: flex-start;
select{
  padding:0px 7px;
  margin-left:15px;
  height:36px;
  width:100px;
}
`
export default Abstract;