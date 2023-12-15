// import React, { useEffect } from "react";
// import frontpage from "./image/frontpage.jpg";
// import "./Homepage.css";
// import ganeshji1 from "./image/ganeshji1.jpg";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { userLogout } from "./Redux/actions";

// function App(props) {
//   useEffect(() => {
//     props.userLogout();
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <nav
//           style={{
//             position: "absolute",
//             top: 0,
//             right: "20px",
//             padding: "10px",
//             zIndex: 1,
//           }}
//         >
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/adminlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Association/Mandal
//               </a>
//             </li>
//             <li style={{ display: "flex", alignItems: "center" }}>
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/userlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Member
//               </a>
//             </li>
//           </ul>
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/cricket"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Cricket
//               </a>
//             </li>
//           </ul>
//           <ul
//             style={{
//               listStyleType: "none",
//               paddingInlineStart: "0",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <li
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginRight: "10px",
//               }}
//             >
//               <span
//                 style={{
//                   width: "10px",
//                   height: "10px",
//                   borderRadius: "50%",
//                   backgroundColor: "white",
//                   marginRight: "4px",
//                 }}
//               ></span>
//               <a
//                 href="/partnerlogin"
//                 style={{
//                   color: "white",
//                   fontSize: "20px",
//                   textDecoration: "underline",
//                   padding: "5px",
//                 }}
//               >
//                 Partner
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// }

// const mapStateToProps = (state) => {
//   return { candidate: state.candidate };
// };

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ userLogout }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogout } from "./Redux/actions";
// import * as React from 'react';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    const selectedRoute = event.target.value;
    setSelectedOption(selectedRoute);

    if (selectedRoute) {
      navigate(selectedRoute); // Navigate to the selected route
    }
  };

  useEffect(() => {
    props.userLogout();
  }, []);

  return (
    <>
      <div className="container">
        <nav
          style={{
            position: "absolute",
            top: 0,
            right: "20px",
            padding: "10px",
            zIndex: 1,
          }}
        >
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Age</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selectedOption}
              label="Age"
              onChange={handleOptionChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="/adminlogin">Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ backgroundColor: "white", borderRadius:"10px" }}
          >
            <option value="" disabled>
              Social
            </option>
            <optgroup label="E-receipt ">
            <option value="/adminlogin">Association</option>
            <option value="/userlogin">Member</option>
            </optgroup>
            <option value="/cricket">Sport</option>
            <option value="/weather">Weather</option>          
          </select>
          &nbsp; &nbsp;
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ backgroundColor: "white", borderRadius:"10px" }}
          >
            <option value="" disabled>
              Sales Portal
            </option>
            {/* <optgroup label="Activities"> */}
            <option value="/partnerlogin">Partner</option>
            <option value="/partner/admin">Admin</option>

            {/* </optgroup> */}
          </select>
        </nav>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { candidate: state.candidate };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
