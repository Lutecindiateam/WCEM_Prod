import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Segmented, Table } from "antd";
import { useEffect } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { requestAdminMonthJob, requestGetCandidate,requestGetApplyJob } from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Layout from "./Layout";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TableData = (props) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("true");

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

  // useEffect(() => {
  //   let loginData = props.data.loginData;
  //   if (loginData !== undefined) {
  //     if (loginData?.data?.status == "success") {
  //       if (loginData?.data?.data.role === "admin") {
  //         props.requestAdminMonthJob({
  //           token: loginData.data.data.token
  //         });
  //       }
  //     }
  //   }
  // }, [props.data.loginData]);


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
    // { field: "city", headerName: "City", flex: 1 },
    // { field: "state", headerName: "State", flex: 1 },
    // { field: "category", headerName: "Category", flex: 1 },
    // { field: "subcategory", headerName: "Subcategory", flex: 1 },
    // { field: "leadStatus", headerName: "Lead Status", flex: 1 },
    // { field: "status", headerName: "Status", flex: 1 },
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
    // address: item.address,
    // city: item.city,
    // state: item.state,
    // category: item.category,
    // subcategory: item.subcategory,
    // leadStatus: item.leadStatus,
    // status: item.status,
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
  bindActionCreators({ requestAdminMonthJob, requestGetCandidate,requestGetApplyJob }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TableData);
