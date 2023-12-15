import React from "react";
import { Dropdown, Menu, Table } from "antd";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Drawer from "./drawer";
import { RWebShare } from "react-web-share";
// import { ExportToExcel } from "../Admin/csv";

 //for developement
const BASEURL = "http://localhost:5000/api"

//for production

// const BASEURL = "/api"


function CustomTable({ data }) {
  const [columnItems, setColumnItems] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);


  const columns = [
    {

      title: "Receipt No.",

      dataIndex: "receiptNumber",

      key: "receiptNumber"

    },

    {

      title: "Name",

      dataIndex: "name",

      key: "name",

    },

    {

      title: "Address",

      dataIndex: "address",

      key: "address",

      responsive: ["md"]

    },
    {

      title: "Phone Number",

      dataIndex: "phone",

      key: "phone",

      responsive: ["md"]

    },

    {

      title: "Amount",

      dataIndex: "amount",

      key: "amount"

    },
    {

      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
      render: (text, record) => (
        <Link to={`/poster/${record._id}`}>
          <Button variant="contained">View Receipt</Button>
        </Link>
      ),
    },
    {
      title: "Share",
      dataIndex: "share",
      key: "share",
      render: (text, record) => (
        <RWebShare
          data={{
            text: "BHARAT ONLINE",
            url: `${window.location.protocol}//${window.location.host}/poster/${record._id}`,
            title: "BHARAT ONLINE",
          }}
        >
          <Button variant="contained">Share </Button>
        </RWebShare>
      )
    },
  ];

  useEffect(() => {
    setColumnItems(menuItems);
    setColumnsToShow(columns);
  }, []);

  const colVisibilityClickHandler = (col) => {

    const ifColFound = columnsToShow.find((item) => item.key === col.key);

    if (ifColFound) {

      const filteredColumnsToShow = columnsToShow.filter(

        (item) => item.key !== col.key

      );

      setColumnsToShow(filteredColumnsToShow);

    } else {

      const foundIndex = columns.findIndex((item) => item.key === col.key);

      const foundCol = columns.find((item) => item.key === col.key);

      let updatedColumnsToShow = [...columnsToShow];

      updatedColumnsToShow.splice(foundIndex, 0, foundCol);

      setColumnsToShow(updatedColumnsToShow);

    }

  };

  const menuItems = columns.map((item) => {
    return {
      key: item.key,
      label: <span>{item.title}</span>
    };
  });

  const addKeys = (arr) => {
    return arr.map((item, index) => {
      return {
        ...item,
        receiptNumber: index + 1
      }
    });
  }

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Dropdown
          overlay={
            <Menu onClick={colVisibilityClickHandler} items={columnItems} />
          }
          placement="bottomLeft"
        >
          <Button>Column Visibility</Button>
        </Dropdown>
      </div>
      <div>
        <div>
          <Table
            scroll={{ x: true }}
            columns={columnsToShow}
            dataSource={data ? addKeys(data) : []}
          />
        </div>
      </div>
    </div>
  );
}
const FormExample = () => {
  // const [isOpen, setIsOpen] = React.useState(false)

  const params = useParams()
  const [data, setData] = useState([])
  const [users, setUsers] = useState({})
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    amount: "",
    phone: ""
  })

  const handleonchange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
 
  const getallusers = async () => {
    const get = axios.get(`${BASEURL}/getallusers/${params.id}`)
      .then((res) => {
        setData(res.data.data);
        localStorage.setItem("count", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {

    getallusers();

  }, []);



  useEffect(() => {

    const savedUser = localStorage.getItem("link");

    if (savedUser) {

      const parsedUser = JSON.parse(savedUser);

      setUsers(parsedUser);

    }
    else {
      navigate("/");
    }

  }, []);
  // console.log(data);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = {
      name: formData.name,
      address: formData.address,
      amount: formData.amount,
      phone: formData.phone,
      group_id: params.id,
      receiver: users.name

    };


    setFormData({
      name: "",
      address: "",
      amount: "",
      phone: "",
      group_id: ""

    })

    try {
      const response = await axios.post(`${BASEURL}/submit`, form);
      getallusers();
      alert(response.data.message)
      return response;
    } catch (err) {
      alert(err.response.data.message)
      console.log(err);
    }
  }

  return (

    <>
      <div className="card column-design" >
        <div className="card-body">
          <div className="front" style={{ backgroundColor: '#FA7D09' }}>
            <Link to="/">
              <Button variant="contained">Log Out</Button>
            </Link>
            <Typography variant="h6" align="center">

              <b>|| श्री गणेशाय नमः ||</b>

            </Typography>

            <br />

            <Typography variant="h2" align="center">

              <b>{users.id}</b>

            </Typography>

            <Typography variant="h5" align="center">

              {users.address}

            </Typography>

            <hr />

          </div>


          <div>

          </div>

          <br /><br />

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

            <form onSubmit={handleSubmit} style={{ border: '2px solid black', padding: '40px', borderColor: "Green" }}>
<div style={{textAlign: "center"}}>
<h4>Make Receipt</h4>
</div>
<br/>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <label htmlFor="नाव"><b>नाव:</b></label> &nbsp;&nbsp;

                <TextField

                  label="name"

                  name="name"

                  value={formData.name}

                  onChange={handleonchange}

                  required

                />

              </div>



              <br /><br />

              <div style={{ display: 'flex', alignItems: 'center' }}>

                <label htmlFor="पत्ता"><b>पत्ता:</b></label> &nbsp;&nbsp;

                <TextField

                  type="text"

                  label="address"

                  name='address'

                  value={formData.address}

                  onChange={handleonchange}

                  required

                  multiline

                />

              </div>

              <br /><br />
              <div style={{ display: 'flex', alignItems: 'center' }}>

                <label htmlFor="नंबर"><b>नंबर:</b></label> &nbsp;&nbsp;

                <TextField

                  type="text"

                  label="phone"

                  name='phone'

                  value={formData.phone}

                  onChange={handleonchange}

                  required

                  multiline

                />

              </div>

              <br /><br />

              <div style={{ display: 'flex', alignItems: 'center' }}>

                <label htmlFor="रक्कम"><b>रक्कम:</b></label> &nbsp;&nbsp;

                <TextField

                  label="amount"

                  name='amount'

                  value={formData.amount}

                  onChange={handleonchange}

                  required

                  type="text"

                />

              </div>

              <br /><br />

              {/* <Button variant="contained" type="submit">Save</Button> */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="contained" type="submit" style={{ width: '100%' }}>
                  Save
                </Button>
                {/* Add other buttons here if needed */}
              </div>

            </form>

          </div>

          <br></br>

          <div>

            <h2><u>Contributors</u></h2>

            <CustomTable data={data} />




            <br></br>

          </div>
        </div>
        {/* <div>
          <ExportToExcel userDetail={userData}/>
        </div> */}

      </div>
    </>

  );



}

export default FormExample;




