import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
p{font-family: 'Montserrat', sans-serif !important;}
body{margin:auto; float:none; font-family: 'Montserrat', sans-serif !important;font-weight: 400; color:#3C3C3B;}
a{font-family: 'Montserrat',sans-serif; text-decoration:none;}
img{ width:100%;height:auto;}
h1,h2,h3,h4,h5,h6{font-family: 'Montserrat', sans-serif;margin:0;}
h1{ font-size:48px;line-height:48px; font-weight:700; margin-bottom:10px;color:#7C7A7A;}
h2{ font-size:32px;line-height:40px; font-weight:700; margin-bottom:32px;}
h3{ font-size:24px;line-height:28px; margin-bottom:16px;}
h4{ font-size:18px;line-height:26px; margin-bottom:16px;}

p{font-family: 'Montserrat', sans-serif; font-size:18px;line-height:30px;font-weight: 400;margin:0;margin-bottom:32px;}

hr{ border:1px solid #4E50F7; width:100%;margin:64px 0;box-sizing: border-box;}

.svg-icon{ width:38px;height:25px;color:#4E50F7;float:right;}
.svg-icon path{fill:#4E50F7;}

#download{margin-top:64px;}
#download input{border:none;border-bottom:1px solid #D1D1D1;border-radius:0;font-size: 12px;padding: 8px 0px;margin: 16px 0px 0px;}
#download select{margin-top:16px;height: 30px;color: #888;}
#download span{font-size: 12px;}
#download button{text-transform:capitalize;background-color: transparent;margin: 32px 0px 0px;color:#4E50F7;border: 2px solid #4E50F7;}
#download button:hover{background-color:#4E50F7;color:#fff;}
#download p{ font-size:14px;}
.inputwrap{
	box-sizing: border-box;
	margin: 16px 0px 0px;
	min-width: 0px;
	display: block;
	width: 100%;
	padding: 8px 0px;
	appearance: none;
	line-height: inherit;
	color: inherit;
	background-color: transparent;
	font-size: 12px;
	border-top: medium none;
	border-right: medium none;
	border-left: medium none;
	border-image: none 100% / 1 / 0 stretch;
	outline: currentcolor none medium;
	border-radius: 0px;
	border-bottom: 1px solid #D1D1D1;
}
.inputwrapselect{
	width: 100%;
	border-top: medium none;
	border-right: medium none;
	border-left: medium none;
	border-image: none 100% / 1 / 0 stretch;
	background-color: transparent;
	font-size: 12px;
	color: var(--theme-ui-colors-text,#3C3C3B);
	padding-bottom: 8px;
	margin: 16px 0px 0px;
	outline: currentcolor none 0px;
	border-bottom: 1px solid #D1D1D1;
}
.weFKk{
	box-sizing: border-box;
	margin: 0px;
	min-width: 0px;
	font-size: 12px;
	color: var(--theme-ui-colors-accent,#4E50F7);
}

@media (max-width: 767px) {
  h1{font-size:40px;line-height:45px;}
}

@media (max-width: 599px) {
  h1{font-size:30px;line-height:35px;}
  h2{font-size:27px;line-height:34px;margin-bottom:20px;}
  h3{ font-size:20px;}
  p{font-size:15px;line-height:25px;margin-bottom:15px;}
}

`;
export default GlobalStyle;