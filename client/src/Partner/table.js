import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Segmented, Table, Input } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestAdminMonthJob,
  requestAdminCompanyDetails,
  requestAdminEditSize,
  requestGetCandidate,
  requestGetApplyJob,
  requestAdminEditDegree,
  requestAdminEditFunctional,
  requestAdminEditIndustry,
} from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Layout from "./Layout";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { Input } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "90vh", // Set maximum height to 90% of the viewport height
  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModal = ({
  id,
  open,
  handleClose,
  data,
  onChangeData,
  list,
  setData,
  user,
  onSubmit,
}) => {
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    // Check if all three input values are present
    const areAllInputsFilled =
      data.adv_payble_amt !== undefined &&
      data.paid_amount !== undefined &&
      data.balance !== undefined;

    // Update the state based on the condition
    setSubmitDisabled(!areAllInputsFilled);
  }, [data.adv_payble_amt, data.paid_amount, data.balance]);
  useEffect(() => {
    if (id) {
      const selectedItem = list.find((item) => item._id === id);
      setData(selectedItem || {});
    }
  }, [id, list]);

  const submitProductForm = () => {
    // Validate the form data if needed
    // Call the onSubmit function and pass the form data
    onSubmit(data);

    // Close the modal if needed
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onSubmit={submitProductForm}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Student Admission Details
        </Typography>
        <div>
          <label htmlFor="candidateName">Name:</label>
          <Input
            id="candidateName"
            name="candidateName"
            value={data.candidateName}
            placeholder={`Product Name`}
            // onChange={onChangeData}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <Input
            label="Quantity"
            id="category"
            name="category"
            value={data.category}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <Input
            label="Quantity"
            id="gender"
            name="gender"
            value={data.gender}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="course">Course:</label>
          <Input
            label="Quantity"
            id="course"
            name="course"
            value={data.course}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="branch">Branch:</label>
          <Input
            label="Quantity"
            id="branch"
            name="branch"
            value={data.branch}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <Input
            label="Quantity"
            id="mobile"
            name="mobile"
            value={data.mobile}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="parent_mobile">Parent Mobile:</label>
          <Input
            label="Quantity"
            id="parent_mobile"
            name="parent_mobile"
            value={data.parent_mobile}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="date_docSubmision">
            Date of Document Submission:
          </label>
          <Input
            label="Quantity"
            id="date_docSubmision"
            name="date_docSubmision"
            value={data.date_docSubmision}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="lastExam_passingYear">Last Exam Passing Year:</label>
          <Input
            label="Quantity"
            id="lastExam_passingYear"
            name="lastExam_passingYear"
            value={data.lastExam_passingYear}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="team">Team/Staff:</label>
          <Input
            label="Quantity"
            id="team"
            name="team"
            value={data.team}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <Input
            label="Quantity"
            id="source"
            name="source"
            value={data.source}
            placeholder={`Quantity`}
            // onChange={onChangeData}
          />
        </div>
        <br />
        {user.role === "editor" ? (
          <div>
            <Typography variant="h6" component="h2">
              Add Incentive
            </Typography>
            <div>
              <label htmlFor="source">Advance Payble Amount:</label>
              <Input
                label="Quantity"
                id="adv_payble_amt"
                name="adv_payble_amt"
                value={data.adv_payble_amt}
                placeholder="Enter Advance Payble Amountt"
                onChange={onChangeData}
              />
            </div>
            <div>
              <label htmlFor="source">Paid Amount:</label>
              <Input
                label="Quantity"
                id="paid_amount"
                name="paid_amount"
                value={data.paid_amount}
                placeholder="Enter Paid Amount"
                onChange={onChangeData}
              />
            </div>
            <div>
              <label htmlFor="source">Balance:</label>
              <Input
                label="Quantity"
                id="balance"
                name="balance"
                value={data.balance}
                placeholder="Enter Balance Amount"
                onChange={onChangeData}
              />
            </div>
            <br />
            <div>
              <Button
                variant="contained"
                onClick={submitProductForm}
                disabled={isSubmitDisabled}
              >
                Save Incentive
              </Button>
            </div>
          </div>
        ) : null}
      </Box>
    </Modal>
  );
};
const TableData = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [id, setId] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("true");
  const [open, setOpen] = React.useState(false);
  const [editorStatus, setEditorStatus] = useState(null);

  const newArray = list.filter((item) => item.status === "editor");

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setId(null);
    setOpen(false);
  };

  function onChangeData(e) {
    if (e.target.type === "radio") {
      setData((data) => ({
        ...data,
        [e.target.name]: parseInt(e.target.value),
      }));
    } else {
      setData((data) => ({
        ...data,
        [e.target.name]: e.target.value,
      }));
    }
  }

  const handleApproval = (AdmId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditDegree({
        id: AdmId,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleEditorApproval = (EditID) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditFunctional({
        id: EditID,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  const handleEditVerify = (verifyId) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to proceed with the approval?"
    );
    if (userConfirmed) {
      props.requestAdminEditIndustry({
        id: verifyId,
        token: user.token,
      });
    } else {
      console.log("User canceled the action.");
    }
  };

  useEffect(() => {
    let editDegreeData = props.data.editDegreeData;
    if (editDegreeData !== undefined) {
      if (editDegreeData?.data?.status == "success") {
        Swal.fire("Good job!", "Approved Successfully.", "success");
        props.data.editDegreeData = undefined;
      }
    }
  }, [props.data.editDegreeData]);

  const onSubmit = (values) => {
    // Handle form submission here
    let form = new FormData();
    form.append("adv_payble_amt", values.adv_payble_amt);
    form.append("paid_amount", values.paid_amount);
    form.append("balance", values.balance);
    // console.log("Form submitted with data:", formData);
    // You can dispatch an action or perform any other logic
    props.requestAdminEditSize({
      data: form,
      id: id,
    });
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  };

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        // setUser(loginData.data.data);
        // if (loginData.data.data.role === "editor") {
        //   props.requestGetApplyJob({
        //     id: loginData.data.data.id,
        //     role: loginData.data.data.role,
        //     token: loginData.data.data.token,
        //   });
        // }
        props.requestGetCandidate({
          id: loginData.data.data.id,
          role: loginData.data.data.role,
          token: loginData.data.data.token,
        });
      }
    }
  }, []);

  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (
          loginData?.data?.data.role === "admin" ||
          loginData.data.data.role === "editor"
        ) {
          setUser(loginData.data.data);
          props.requestAdminMonthJob({
            token: loginData.data.data.token,
          });
        }
      }
    }
  }, [
    props.data.loginData,
    props.data.editSizeData,
    props.data.editDegreeData,
    props.data.editIndustryData
  ]);

  useEffect(() => {
    let getCandidateData = props.candidate.getCandidateData;
    // console.log(getCandidateData);
    if (getCandidateData !== undefined) {
      if (getCandidateData?.data?.status === "success") {
        setList(getCandidateData.data.data.response);
      }
    }
  }, [props.candidate.getCandidateData, props.data.loginData]);

  //Admin api
  useEffect(() => {
    let monthWiseJobData = props.data.monthWiseJobData;
    if (monthWiseJobData !== undefined) {
      if (monthWiseJobData?.data?.status == "success") {
        setList(monthWiseJobData.data.data.response);
      }
    }
  }, [props.data.monthWiseJobData, props.data.loginData]);

  // //for editor all admission
  //   useEffect(() => {
  //     let getApplyJobData = props.candidate.getApplyJobData;
  //     // console.log(getCandidateData);
  //     if (getApplyJobData !== undefined) {
  //       if (getApplyJobData?.data?.status === "success") {
  //         setList(getApplyJobData.data.data.response);
  //       }
  //     }
  //   }, [props?.candidate?.getApplyJobData]);

  // console.log(list);
  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);
  // console.log(user);
  const columns = [
    { field: "id", headerName: "Sr.No.", width: 100 },
    { field: "candidateName", headerName: "Candidate Name", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    // { field: "documents", headerName: "Documets", flex: 1 },
    { field: "branch", headerName: "Branch", flex: 1 },
    {
      field: "documentView",
      headerName: "Document View",
      flex: 1,
      renderCell: (params) => (
        <Link
          to={`/doc/${params.row.document.branch}/${params.row.document.id}`}
          style={{ textDecoration: "none" }}
        >
          {/* You can use any icon component for document view */}
          <span role="img" aria-label="View Documents">
            📄 View
          </span>
        </Link>
      ),
    },
    {
      field: "more",
      headerName: "More Details",
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => handleOpen(params.row.document.id)}>
          More Info..
        </Button>
      ),
    },
    user.role === "editor" &&
      user.value === true && {
        field: "approval",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              color="primary" // or "success" depending on your theme
              disabled={true}
            >
              Approved
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleApproval(params.row.approval.id)}
            >
              Approve
            </Button>
          ),
      },
    user.role === "editor" &&
      user.value === false && {
        field: "approve",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              color="info" // or "success" depending on your theme
              disabled={true}
            >
              Waiting
            </Button>
          ) : params.row.approval.status === "admin" ? (
            <Button
              variant="contained"
              disabled={true}
              // onClick={() => handleApproval(params.row.approval.id)}
            >
              Approved
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleEditorApproval(params.row.approval.id)}
            >
              Approve
            </Button>
          ),
      },
    user.role === "admin" &&
      user.value === true && {
        field: "adminapproval",
        headerName: "Approval",
        flex: 1,
        renderCell: (params) =>
          params.row.approval.status === "false" ? (
            <Button
              variant="contained"
              color="info" // or "success" depending on your theme
              disabled={true}
            >
              Waiting
            </Button>
          ) : params.row.approval.status === "editor" ? (
            <Button
              variant="contained"
              disabled={true}
              // onClick={() => handleApproval(params.row.approval.id)}
            >
              Waiting
            </Button>
          ) : params.row.approval.status === "verify" ? (
            <Button
              variant="contained"
              disabled={true}
              // onClick={() => handleEditorApproval(params.row.adminapproval.id)}
            >
              Approved
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleEditVerify(params.row.adminapproval.id)}
            >
              Approve
            </Button>
          ),
      },
  ];

  const rows = list.map((item, index) => ({
    id: index + 1,
    candidateName: item.candidateName,
    source: item.source,
    branch: item.branch,
    document: {
      id: item._id, // Replace with the actual field in your response
      branch: item.branch, // Replace with the actual field in your response
    },
    more: {
      id: item._id,
    },
    approval: {
      id: item._id,
      status: item.status,
    },
    approve: {
      id: item._id,
      status: item.status,
    },
    adminapproval: {
      id: item._id,
      status: item.status,
    },
  }));

  return (
    <Layout>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      <DetailsModal
        id={id}
        open={open}
        handleClose={handleClose}
        data={data}
        onChangeData={onChangeData}
        list={list}
        setData={setData}
        user={user}
        onSubmit={onSubmit}
      />{" "}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    employee: state.employee,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      requestAdminMonthJob,
      requestGetCandidate,
      requestGetApplyJob,
      requestAdminCompanyDetails,
      requestAdminEditSize,
      requestAdminEditDegree,
      requestAdminEditFunctional,
      requestAdminEditIndustry,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
