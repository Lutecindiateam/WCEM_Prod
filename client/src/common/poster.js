import React, { useRef, useEffect, useState } from 'react';
import ganeshji1 from '../image/ganeshji1.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Grid, Paper, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import footer4 from '../image/footer4.jpg'
import { useNavigate } from "react-router-dom";
import './poster.css'

 //for developement
const BASEURL = "http://localhost:5000/api"

//for production

// const BASEURL = "/api"


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  content: {
    padding: theme.spacing(4),
  },
  image: {
    maxWidth: '400px',
    maxHeight: '400px',

  },
}));

const Poster = (props) => {       
  const param = useParams()
  // console.log(param);
  
  const classes = useStyles();
  const componentsPDF = useRef();
  const [data, setData] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
const [value, setValue] = useState({});
const navigate = useNavigate();
// console.log(user);
  const handlePrint = () => {
    setIsButtonDisabled(true);

    window.print();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000);
  
    // Clear the timer if the component unmounts before the 2-second delay
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const getsingleusers = async () => {
      const get = axios.get(`${BASEURL}/getsingleusers/${param.id}`)
        .then((res) => {
           
// console.log(res);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    getsingleusers();
  }, [])
  useEffect(() => {
    const savedUser = localStorage.getItem("link");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setValue(parsedUser);
      // Update info state with parsedInfo
      // ...
    }
    const savedInfo = localStorage.getItem("info");
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setValue(parsedInfo);
    }
  }, []);

  return (
    <>
     <div className='wrapper' style={{ display: "flex" }}>
        <div>
          <img src={ganeshji1} alt="ganeshji1" style={{ height: "100%", width: "150px" }} />
        </div>
        <Paper className={classes.content}  >
          <Typography variant="h6" align="center">
            <b style={{ color: "green" }}>||श्री गणेशाय नमः||</b>
          </Typography>
          
          <br />
          <Typography  variant="h3" align="center"  style={{fontSize: "h6"}}>
            <b style={{ color: "#FA7D09" }}>{value.id}</b>
          </Typography>
          <Typography variant="h6" align="center">
            <b style={{ color: "#862B0D" }}>{value.address}</b>
          </Typography>

          
           <hr />
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              label="पावती क्र:"
              variant="standard"
              size="small"
              fullWidth
            />
          </Grid> 
          <Grid item xs={12}>
              <TextField
                label="दिनांक:"
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.name) }}
                value={data.date}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                label="श्री. / श्रीमती"
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.name) }}

                value={data.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="यांच्‍याकडून"
                variant="standard"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: Boolean(data.amount) }}
                value={data.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>रक्कम प्राप्त झाली.</Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.inputGroup}>
                <div className={classes.inputGroupPrepend}>
                  <span className={classes.inputGroupText}>₹ </span>
                </div>
                <TextField
                  type="text"
                  className={classes.formControl}
                  aria-label="Amount (to the nearest dollar)"
                  value={data.amount}
                />

              </div>
            </Grid>
            <Grid item xs={12}>

              <TextField 
                label="प्राप्तकर्ता"
                variant="standard"
                size="small"
                fullWidth
                value= {data.receiver}
                InputLabelProps={{ shrink: Boolean(data.amount) }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <b style={{ fontStyle: "italic", fontSize: "30px", color: "red" }}>धन्यवाद!</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
 </div>
<div style={{display: "flex ",justifyContent: "center", minWidth:"100%"}}>
  <img src={footer4} alt="footer4" style={{width:"100%" ,alignItems:"center"}} />
</div>
 <div>
        <button onClick={handlePrint} disabled={isButtonDisabled}>Print Page</button>

      </div>
    </>
  );
};

export default Poster;