import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
  background:#FAFAFE;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;;
}

.button {
  background:${({ theme }) => theme.colors.secondary};
  color:#FFFFFF;
  font-size:14px;
  font-weight:600;
  padding: 10px 15px;
  text-decoration:none;
  border-radius:4px;
  display:inline-block;
}

header {
  padding: 6px 2%;
  background: #FFF;
}
.logo-outer, .logo-outer, .header-inner, .notification__profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  margin-right: 24px;
}

.company {
  padding: 8px 0px 8px 24px;
  border-left: 1px solid #DADADA;
}
.notification .dot {
  position: absolute;
  width: 7px;
  height: 7px;
  background: ${({ theme }) => theme.colors.pink};
  border-radius: 50%;
  right: -1px;
  border: 2px solid #fff;
}
.notification {
  position: relative;
}
.profile {
  font-size: 16px;
  font-weight: 700;
  color: #FFF;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  height:38px;
  width:38px;
  margin-left:28px;
}
.company a {
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textDark};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
}
.company a img {
  margin: 0 5px;
}
.main-content {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 61px);
}
.sidebar {
  background: ${({ theme }) => theme.colors.primary};
  max-width:180px;
  width:25%;
  padding: 20px 0;
  box-sizing:border-box;
}

.sidebar ul li a {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 20px;
  border-left:2px solid transparent;
  transition: all .3s ease-in-out;
}
.sidebar ul li a img {
  margin-right:15px;
}
.sidebar ul li a.active {
  background:#242345;
  border-left:2px solid #FF75B7;
}
.page-content {
  width: 100%;
  border-top: 1px solid #DADADA;
  padding: 20px;
  box-sizing: border-box;
}


.stopwatch-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
}

.circle-wrapper {
  position: relative;
  width: 122px;
  height: 122px;
}



circle {
  fill: none;
  stroke-width: 11px;
  stroke: #CCF0E1;
}

.time-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}
span.time-format-name {
  font-size: 11px;
  color: #9D9D9D;
  font-weight: 400;
  display: block;
  text-align: center;
  word-spacing: 5px;
}
.red{
  stroke:#36B37E;
  stroke-linecap:round;
  transform: rotate(90deg);
  transform-origin: center;
}
.box-grid {
  background: #FFFFFF;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 6px;
  overflow:auto;
}
.row {
  display: flex;
  justify-content: space-between;
}
.w-40 {
  width: 35%;
}
.w-20 {
  width: 17%;
}
h3{
  font-size:16px;
  font-weight:500;
  color: ${({ theme }) => theme.colors.textDark};
}
.button-group {
  width: 100%;
}
.timing-hours h5 {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
}
.timing-hours ul li {
  font-size: 14px;
  font-weight: 500;
  width: 50%;
  color: ${({ theme }) => theme.colors.textDark};
  padding: 7px 15px;
}
.timing-hours ul {
  display: flex;
  border-radius:4px;
  border:1px solid rgba(0,0,0,.1);
  margin-bottom: 10px;
}
.timing-hours ul li:nth-of-type(2n) {
  border-left: 1px solid rgba(0, 0, 0, .1);
}
.timing-hours h5 {
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  margin: 27px 0 7px;
}
.timing-hours ul li span{
  display:block;
  font-size: 13px;
  font-weight: 400;
  color:#9D9D9D;
}
.btn {
  border: none;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 15px;
  border-radius: 4px;
  font-family:Roboto;
  cursor:pointer;
  transition: all .3s ease-in-out;
}
.dark{
  background:${({ theme }) => theme.colors.primary};
  color:#fff;
}
.button-group button.btn {
  width: 100%;
  margin: 2px 0;
}
.dark:hover{
  background:${({ theme }) => theme.colors.secondary};
  color:#fff;
}
.danger{
  background:${({ theme }) => theme.colors.red};
  color:#fff;
}
.danger:hover{
  background:#C01308;
  color:#fff;
}
.heading__btn {
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
}
.attendance_list li {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}
.attendance_list li p {
  font-size:14px;
  font-weight:500;
}
.attendance_list li:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, .6);
}
.overlay.highlight{
  display: flex; 
}
.popup-alert {
  max-width: 480px;
  background: #FFF;
  padding: 40px 20px;
  width: 94%;
  border-radius: 6px;
  box-sizing: border-box;
}
.popup-alert h3 {
  font-size: 27px;
  font-weight: 500;
}
.popup-alert p {
  font-size: 16px;
  line-height: 24px;
  max-width: 328px;
  margin: 20px auto;
}
.popup-alert button {
  padding: 11px 30px;
  margin: 0 10px;
}
.table_style{
  width:100%;
  text-align:left;
}
.table_outer {
  background: #FFF;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 6px;
  padding: 10px;
}
table.table_style tr th, table.table_style tr td {
  padding: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
}
table.table_style tr th {
  font-size:16px;
  font-weight:700;
}
table.table_style tr td {
  font-size:15px;
  font-weight:400;
  border-width:1px;
}
.page_heading{
  font-size:24px;
  font-weight:400;
}
table.table_style tr:last-child td {
  border:none;
}
.popup-overlay {
  background: rgba(0, 0, 0, .6);
}
.btn.primary{
  background:${({ theme }) => theme.colors.secondary};
  color:#FFFFFF;
}

.header_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
  padding-bottom:5px;
  margin-bottom:20px;
}
.circle-wrapper svg {
  width: 100%;
  height: 100%;
}
.modal {
  background: #FFFFFF;
  padding: 30px;
  border-radius: 6px;
  position: relative;
}
.modal .header {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, .1);
  padding-bottom: 10px;
}
.content label {
  font-size: 14px;
  font-family: 'Roboto';
  margin-right:15px;
}
.content label input {
  font-size: 14px;
  font-family: 'Roboto';
  border:1px solid rgba(0, 0, 0, .1);
  border-radius:4px;
  padding:6px 14px;
  margin-left:10px;
}
.content button{
  margin-top:20px;
}

button.close {
  border: none;
  background: none;
  font-size: 30px;
  font-weight: 300;
  font-family: 'Roboto';
  position: absolute;
  top: 0px;
  right: 10px;
  padding: 0;
  margin: 0;
  cursor:pointer;
}
.form_login input {
  width: 100%;
  display: block;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  border: 1px solid rgba(0, 0, 0, .2);
  font-size: 14px;
  font-weight: 500;
  color: #000;
  box-sizing: border-box;
}
.form_login {
  max-width: 470px;
  margin: auto;
  background: #fff;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.05);
}
.form_login h2{
  font-size:20px;
  font-weight:600;
  color: ${({ theme }) => theme.colors.textDark};
}
.form_login button.btn.primary {
  width: 100%;
  margin-top: 10px;
}
.logo_full {
  padding: 20px 3%;
  text-align: center;
}
.form_login p {
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
.form_login p a{
  color: ${({ theme }) => theme.colors.primary};
}
.light {
  background: rgba(255, 255, 255, .1);
  color: rgba(255, 255, 255, .8);
}
.sidebar button.btn.light {
  width: calc(100% - 40px);
  margin: 55px auto 0;
  display: block;
}
  .attendance-list {
    margin-top: 10px;
}
    .attendance-list li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}.attendance-list li:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}
    .task-list table{
    margin-top:20px;
    width: 100%;
    background:#FFF;
    border-radius:12px;
    box-shadow: -1px 0 0 0 #CCC, 1px 0 0 0 #CCC, 0 0 2px 0 #CCC;
}
       .task-list table td, .task-list table th{
       padding:10px 20px;
    border-bottom: 1px solid #ccc;
    border-collapse: collapse;
    text-align:left;
} 
   .task-list table th{
border-width:2px;
font-weight:500;
color:#000;
font-size:16px;
}
   .task-list table td{
font-weight:400;
color:#000;
font-size:15px;
}
      .task-list.small table td, .task-list.small table th{
       padding:10px 5px;
    border-bottom: 1px solid #ccc;
    border-collapse: collapse;
    text-align:left;
} 

.task-list table tr:last-child td {
border:none;
}
.task-list.small table th {
    border-width: 2px;
    font-weight: 500;
    color: #000;
    font-size: 13px;
}
        .task-list.small table{
    margin-top:0;
    width: 100%;
    background:#FFF;
    border-radius:0;
    box-shadow: none;
}
  .task-list.small table td, .task-list.small button.link-btn{
  font-size:13px;
}.task-list.small h3{
  padding-bottom: 12px;
    border-bottom: 2px solid rgba(0, 0, 0, .1);}

  .task-list.small table tr th:last-child,  .task-list.small table tr td:last-child, 
  .task-list.small table tr td:nth-last-child(2)
  ,.task-list.small table tr th:nth-last-child(2),.task-list.small table tr td:nth-last-child(3)
  ,.task-list.small table tr th:nth-last-child(3){
  display:none;
}
button.link-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition:all .3s ease-in-out;
    font-family:Roboto;
}
    button.link-btn {
    font-size:16px;}

    button.link-btn:hover {
    color:#0052CC;
    text-decoration:underline;
    
}
.modal {
    padding: 30px;
    position: fixed;
    background: rgba(0, 00, 0, .8);
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    display: flex
;
    justify-content: center;
    align-items: center;
}
    .modal-content {
    max-width: 600px;
    background: #FFF;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 12px;
}.modal-content h3 {
    font-size: 24px;
    padding-bottom: 10px;
    border-bottom: 2px solid #CCC;
    margin-bottom: 10px;
}
    .modal-content input {
    width: 100%;
    margin-top:4px;
}
.modal-content label:nth-of-type(2n) {
    margin-left: 15px;
}

.modal-content label {
    width: calc(50% - 8px);
    display: inline-block;
    margin: 13px 0 0;
}
     input {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .1);
    font-family: Roboto;
    font-size: 16px;
    color: #000;
    padding: 10px;
    border-radius: 4px;
    box-sizing:border-box;
    font-weight:400;
}
  .modal-content  input[type="text"][readonly] {
    background: #F7F7F7;
    border: 1px solid rgba(0, 0, 0, .1);
    font-family: Roboto;
    font-size: 16px;
    color: #7F7C7C;
    padding: 10px;
    border-radius: 4px;
    box-sizing:border-box;
    font-weight:400;
}
      .modal-content  select {
    background: #FFF;
    border: 1px solid rgba(0, 0, 0, .1);
    font-family: Roboto;
    font-size: 16px;
    color: #000;
    padding: 10px;
    border-radius: 4px;
    box-sizing:border-box;
    font-weight:400;
    width:100%;
}
    .modal-content label:last-of-type {
  width: 100%;
}
  .modal-content label:last-of-type textarea {
    width: 100%;
    margin: 4px 0 20px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    min-height: 100px;
    font-size: 16px;
    color: #000;
    padding: 10px;
    box-sizing:border-box;
    font-weight:400;
}
    button.cancel {
    background: #FFFFFF;
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    padding: 10px 32px;
    cursor: pointer;
    border-radius: 4px;
    border:1px solid #9D9D9D;
}
       button.submit {
    background: #0052CC;
    color: #FFF;
    font-family: Roboto;
    font-size: 14px;
    padding: 10px 32px;
    cursor: pointer;
    border-radius: 4px;
    border:none;
    margin-left:10px;
}
    .modal-actions {
    text-align: right;
}
    .status {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
}

.status-open {
  background-color: #fff3cd;
  color: #856404;
}

.status-due {
  background-color: #f8d7da;
  color: #721c24;
}

.status-done {
  background-color: #d4edda;
  color: #155724;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 500px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.form-row label {
  font-weight: 500;
  margin-bottom: 0.5rem;
}



.date-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.cancel {
  background: #f1f1f1;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}

.apply {
  background: #0050db;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}
  .summary .card p {
    font-size: 15px;
    margin: 4px 0;
    font-weight:400;
}
.summary .card .heading-small {
    font-size: 18px;
    margin: 15px 0;
    font-weight:500;
    font-family:Roboto;
}
    *{font-family:Roboto;}
    .header {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
    padding-bottom: 10px;
}
.leave-tracker label {
    width: 100%;
    font-size: 16px;
    display: block;
}

.leave-tracker input {
    width: 100%;
    margin-top:4px;
}
  .modal-content.leave-tracker label:nth-of-type(2n)
 {
    margin-left: 0;
} 
    .from {
    width: 48%;
}
    .time__date
 {
    display: flex
;
    justify-content: space-between;
} 
    .from {
    width: 48%;
    font-size: 13px;
    font-weight: 400;
}
    label.time_outer p
 {
    margin: 0 0 10px;
}
    .modal-content.leave-tracker input, .modal-content.leave-tracker select
 {
    margin-top: 5px;
}
    label.note {
    margin-left: 0 !important;
}

.profile-wrapper {
  display: flex;
  gap: 40px;
}

.profile-left, .profile-right {
  width: 50%;
}

.profile-photo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-upload-input {
  display: block;
}

.upload-btn,
.save-btn,
.update-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #0050db;
  color: white;
  border: none;
  cursor: pointer;
}

.upload-btn:hover,
.save-btn:hover,
.update-btn:hover {
  background-color: #0050db;
}

.profile-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.profile-left, .profile-right {
    background: #FFF;
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 12px;
    padding: 30px;
} 
    .profile-wrapper {
    margin-top: 20px;
}
.heading{font-size: 24px;}

.form-group.group-address2,  .form-group.group-district, , .form-group.group-name, .form-group.group-phone, .form-group.group-gender{
    width: 48%;
    display: inline-block;
    margin-right: 4%;
}
    .form-group.group-address1,  .form-group.group-pincode,   .form-group.group-email, .form-group.group-joiningDate, .form-group.group-dob {
    width: 48%;
    display: inline-block;
}
    h3.small-head {
    padding-bottom: 15px;
    border-bottom: 2px solid rgba(0, 0, 0, .1);
    margin-bottom: 20px;
}

`;

export default GlobalStyle;
