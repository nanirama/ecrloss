import React from 'react'
import styled from "styled-components";
import { Link } from "gatsby"

const Paginate = props => {
const currentPage  = props.currentPage
const numPages  = props.numPages
const path = props.path

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  const prevPage =
    currentPage - 1 === 1 ? `${path}` : `${path}${currentPage - 1}`
  const nextPage = `${path}${currentPage + 1}`
  const firstPage = `${path}/`
  const lastPage = `${path}${numPages}`

    return (
      <div>
      <PagiNation>
          {!isFirst && (
            <Link to={prevPage} className="nextprevbtn">
              Prev
            </Link>
          )}

          {Array.from({ length: numPages }, (_, i) => {
            return (
              <Link
                key={i}
                fade
                to={`${path}${i === 0 ? "" : i + 1}`}
                activeClassName="active"
                // className={
                //   i + 1 === currentPage
                //     ? `${styles.link} ${styles.active}`
                //     : `${styles.link}`
                // }
              >
                {i + 1}
              </Link>
            )
          })}
          {!isLast && (
            <Link to={nextPage} className="nextprevbtn">
              Next
            </Link>
          )}
         </PagiNation>
      </div>
    )
}

const PagiNation = styled.div`
margin:64px 0;
text-align:center;
@media (max-width: 767px) {
   margin:40px 0 20px 0;
}
a{
   color:#808080;
   padding: 5px 16px;
   font-weight: bold;
   display:inline-block;
   font-size:18px;
   @media (max-width: 800px) {
    margin-bottom:20px;
}
   &:hover{
      color:#4E50F7;  
   }
}
a.active{
  color:#4E50F7;
}
.nextprevbtn{
  background-color:#4E50F7 !important;
  color:#ffffff !important;margin-left: 16px;padding: 8px 16px;font-size: 14px;
}
`;


export default Paginate