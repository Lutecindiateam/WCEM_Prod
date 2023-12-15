import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import { useParams } from 'react-router-dom';

 //for developement
const BASEURL = "http://localhost:5000/api"

//for production

// const BASEURL = "/api"


const Sheet = () => {
  const params = useParams()
  const [users, setUsers] = useState([])
// console.log(params);
  useEffect(() => {
    fetch(`${BASEURL}/getallusers/${params.id}`)
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        
        let data = json.data.map((item) => ({
          address: item.address,
          amount: item.amount,
          date: item.date,
          name: item.name,
          receiver: item.receiver
        }));
        
        // console.log("data",data);
        
        setUsers(data);
      });
   
  }, []);

  const headers = [
    { label: "Address", key: "address" },
    { label: "Amount", key: "amount" },
    { label: "Date", key: "date" },
    { label: "Name", key: "name" },
    {label: "Received By" , key:"receiver"}
  ];

  return (
    <div className="wrapper">
      {users.length > 0 && (
        <>
        
          <h3>List of Contributors</h3>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Received By</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.address}</td>
                  <td>{user.amount}</td>
                  <td>{user.date}</td>
                  <td>{user.name}</td>
                  <td>{user.receiver}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          <div>
            <CSVLink data={users} headers={headers} style={{fontSize:"30px"}}>Download File</CSVLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Sheet;

