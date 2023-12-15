import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
 
 //for developement
const BASEURL = "http://localhost:5000/api"

//for production

// const BASEURL = "/api"

function AssoProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    const savedInfo = localStorage.getItem('info');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      profile_management(parsedInfo);
    } else {
      navigate("/");
    }
  };

  const profile_management = async (props) => {
    try {
      const response = await axios.post(`${BASEURL}/getprofile`, props);
      const data = response.data.data; // Assuming the API response is an object
console.log(response.data.data);
      // Update userData with the API data
      setUserData([
        { label: 'Mandal Name', value: data.mandalname},
        { label: 'Mandal Code', value: data.code },
        { label: 'Registration No', value: data.registration },
        { label: 'Admin Full Name', value: data.name },
        { label: 'Address', value: data.address },
        { label: 'Email', value: data.email },
        {label: 'Phone', value: data.phone}
      ]);
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error fetching user profile data:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="User Profile Table">
        <TableBody>
          {userData.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {item.label}
              </TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AssoProfile;
