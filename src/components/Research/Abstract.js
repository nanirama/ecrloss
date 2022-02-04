import React, { useState,useEffect } from 'react';
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Abstract = ({abstract}) => {
    const { EnglishFlag, FrenchFlag, SpanishFlag, GermanFlag, DutchFlag } = useStaticQuery(
        graphql`
          query {
            EnglishFlag: file(relativePath: {eq: "flags/english.png"}) {
                childImageSharp {
                  gatsbyImageData(width: 40, quality: 100)
                }
            }
            FrenchFlag: file(relativePath: {eq: "flags/french.png"}) {
                childImageSharp {
                  gatsbyImageData(width: 40, quality: 100)
                }
            }
            SpanishFlag: file(relativePath: {eq: "flags/spanish.png"}) {
                childImageSharp {
                  gatsbyImageData(width: 40, quality: 100)
                }
            }
            GermanFlag: file(relativePath: {eq: "flags/german.png"}) {
                childImageSharp {
                  gatsbyImageData(width: 40, quality: 100)
                }
            }
            DutchFlag: file(relativePath: {eq: "flags/dutch.png"}) {
                childImageSharp {
                  gatsbyImageData(width: 40, quality: 100)
                }
            }
          }
        `
      )

    const abstractContent = abstract[0] && abstract[0].primary;
    const [abstractLangContent, setAbstractLangContent] = useState(abstractContent.englsih.html);   
    const [selectedLang, setSelectedLang] = useState('english');   
    useEffect(
        () => {
            if(selectedLang === 'english'){
                setAbstractLangContent(abstractContent.englsih.html)   
            } else if(selectedLang === 'french'){
                setAbstractLangContent(abstractContent.french.html)   
            } else if(selectedLang === 'spanish'){
                setAbstractLangContent(abstractContent.spanish.html)   
            } else if(selectedLang === 'german'){
                setAbstractLangContent(abstractContent.german.html)   
            } else if(selectedLang === 'dutch'){
                setAbstractLangContent(abstractContent.dutch.html)   
            }
        },
        [abstractLangContent, selectedLang],
    )
               
        const handleSelectChange = (e)=> {    
            setSelectedLang(e.currentTarget.value)
        }
        
        return(
            <>
            <TitleDrop>
            <h2 id="abstract">Abstract</h2>
            <select onChange={handleSelectChange} value={selectedLang}>
            {/* <option value={abstractContent.englsih.html}>English</option>
            <option value={abstractContent.french.html}>French</option>
            <option value={abstractContent.spanish.html}>Spanish</option>
            <option value={abstractContent.german.html}>German</option>
            <option value={abstractContent.dutch.html}>Dutch</option> */}
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="german">German</option>
            <option value="dutch">Dutch</option>
            
            </select>
            <div className="flags-container">
                <GatsbyImage image={getImage(EnglishFlag)} alt="English Flag" onClick={e=>setSelectedLang("english")} />
                <GatsbyImage image={getImage(FrenchFlag)} alt="French Flag" onClick={e=>setSelectedLang("french")} />
                <GatsbyImage image={getImage(SpanishFlag)} alt="Spanish Flag" onClick={e=>setSelectedLang("spanish")} />
                <GatsbyImage image={getImage(GermanFlag)} alt="German Flag" onClick={e=>setSelectedLang("german")} />
                <GatsbyImage image={getImage(DutchFlag)} alt="Dutch Flag" onClick={e=>setSelectedLang("dutch")} />
            </div>
            </TitleDrop>
            <div dangerouslySetInnerHTML={{ __html: abstractLangContent }} />
            </>
        )


}
const TitleDrop = styled.div`
width: 100%;
max-width: 1230px;
display:flex;
height:40px;
margin-bottom:10px;
justify-content: flex-start;
align-items: center;
select{
  padding:0px 7px;
  margin-left:15px;
  height:36px;
  width:100px;
}
h2{
    padding:0px;
    margin:0px;
}
.flags-container{
    margin-left:20px;
}
.gatsby-image-wrapper{
    margin:0px 3px;
}
`
export default Abstract;