import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { toast } from "react-toastify";
import { Fragment, useEffect, useState } from "react";
import styles from "./AddProd.module.css";
import Layout from "./Layout";
import { bindActionCreators } from "redux";
import {
  requestAddResume,
  requestApplyJob,
  requestAdminGetProfile,
  requestJobDetails,
} from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const UploadData = (props) => {
  // console.log(props);
  const LeadStatus = [
    "New",
    "Contacted",
    "Engaged",
    "KYC Completed",
    "accepted",
    "MorefollowUp",
    "NotAccepted",
  ];
  const Status = [
    "Free listing",
    "Paid listing",
    "Advertisement",
    "Social",
    "Digital",
    "Web development",
    "Other",
  ];
  const state = ["maharastra"];
  const city = ["wardha", "nagpur", "gondia", "amravti"];

  const category = [
    "SC",
    "OBC",
    "Open",
    "ST",
    "VJNT",
    "Muslim Minority",
    "SBC",
    "EWS",
  ];

  const subcategory = ["Supermarket", "Kirana Store", "Oil and Ghee", "Masale"];

  const gender = ["Male", "Female"];
  const course = ["B.Tech", "MBA", "MCA", "M.Tech", "Diploma"];
  const branch = [
    "MECHANICAL",
    "CIVIL",
    "ELECTRICAL",
    "ETC",
    "CSE",
    "AIDC",
    "CAD",
    "CAM",
    "CASE",
    "PEPS",
    "SS",
    "AIDC(PG)",
    "CSE(PG)",
  ];
  const team = ["Adm.Team", "Staff"];
  // const source = ["source1", "source2", "source3"];
  const entrance_exam = ["MCA", "MBA", "BE"];
  const capround = ["Round-I", "Round-II", "Round-III", "Institute Level"];
  const university = [
    "University of Mumbai",
    "Savitribai Phule Pune University",
    "Shivaji University",
    "Dr. Babasaheb Ambedkar Marathwada University",
    "Nagpur University (Rashtrasant Tukadoji Maharaj Nagpur University)",
    "SNDT Women's University",
    "Bharati Vidyapeeth",
    "Symbiosis International University",
    "Yashwantrao Chavan Maharashtra Open University",
    "Maharashtra University of Health Sciences",
    "Sant Gadge Baba Amravati University (SGBAU)",
  ];
  // const category = useSelector((state) => state.productCategories?.list);

  // const subCategory = useSelector((state) => state.productSubCategories?.list);

  // const brand = useSelector((state) => state.productBrands?.list);

  // const dispatch = useDispatch();
  //useEffect for loading category list from redux
  // useEffect(() => {
  // dispatch(loadAllProductCategory({ page: 1, limit: 100 }));
  // dispatch(loadAllProductSubCategory({ page: 1, limit: 100 }));
  // dispatch(loadAllProductBrand({ page: 1, limit: 100 }));
  // }, [dispatch]);
  // const CsvTemplateDownload = () => {

  const downloadTemplate = () => {
    const csvTemplate =
      "candidateName,Address,Mobile,Pincode,City,State,Category,Subcategory,LeadStatus,Status";
    const blob = new Blob([csvTemplate], { type: "text/csv" });
    saveAs(blob, "template.csv");
  };
  const { Title } = Typography; 
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [source, setSource] = useState([]);
  // const [document, setDocument] = useState([]);
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setCsvFile(file);
  // };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (csvFile) {
  //     const formData = new FormData();
  //     formData.append("csvFile", csvFile);
  //     try {
  //       props.requestAddResume({
  //         id: user.id,
  //         token: user.token,
  //         data: {
  //           formData,
  //         },
  //       });
  //       setLoader(true);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Error uploading CSV file. Please Check Format");
  //       setLoader(false);
  //     }
  //   } else {
  //     Swal.fire("Error!", "Please select a CSV file.", "error");
  //   }
  // };

  // const handleDocument = (e) => {
  //   setDocument([...document, e.target.files[0]]);
  // };
  // console.log(document);

  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

  // console.log(user);
  useEffect(() => {
    let loginData = props.data.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status == "success") {
        if (loginData?.data?.data.role === "admin") {
          setUser(loginData.data.data);
        }
      }
    }
  }, [props.data.loginData]);

  useEffect(() => {
    let candidateForJobData = props.employee.candidateForJobData;
    // console.log(candidateForJobData);
    if (candidateForJobData !== undefined) {
      if (candidateForJobData?.data?.status == "success") {
        // if (candidateForJobData?.data?.data.role === "admin") {
        setSource(candidateForJobData.data.data.response);
        // }
      }
    }
  }, [props.employee.candidateForJobData]);
  // useEffect(() => {
  //   let addresume = props.candidate.addResumeData;
  //   if (addresume !== undefined) {
  //     if (addresume?.data?.status == "success") {
  //       Swal.fire("Good job!", "CSV File Uploaded successfully.", "success");
  //       setLoader(false);
  //       document.getElementById("csvFileInput").value = "";
  //       props.candidate.addResumeData = undefined;
  //     } else {
  //       Swal.fire(
  //         "Error!",
  //         "There is some error in uploading CSV file.",
  //         "error"
  //       );
  //       setLoader(false);
  //       props.candidate.addResumeData = undefined;
  //       props.candidate.resumeData = undefined;
  //     }
  //   }
  // }, [props.candidate.addResumeData]);

  const handleUniversity = (value) => {
    setShowOtherInput(value === "Other");
  };

  const onFinish = async (values) => {
    try {
      let formData = new FormData();
      formData.append("candidateName", values.candidateName);
      formData.append("mobile", values.mobile);
      formData.append("parent_mobile", values.parent_mobile);
      formData.append("gender", values.gender);
      formData.append("course", values.course);
      formData.append("branch", values.branch);
      formData.append("date_docSubmision", values.date_docSubmision);
      formData.append("lastExam_passingYear", values.lastExam_passingYear);
      formData.append("team", values.team);
      formData.append("source", values.source);
      // formData.append("entrance_exam", values.entrance_exam);
      // formData.append("dtenumber", values.dtenumber);
      // formData.append("capround", values.capround);
      // formData.append("erpid", values.erpid);

      // if (showOtherInput) {
      //   formData.append("otherUniversity", values.otherUniversity);
      // } else {
      //   formData.append("university", values.university);
      // }
      // formData.append("admission_date", values.admission_date);
      // formData.append("tution_fees", values.tution_fees);
      // formData.append("deve_fees", values.deve_fees);
      // formData.append("total_fees", values.total_fees);
      // formData.append("govt_fees", values.govt_fees);
      // formData.append("discount", values.discount);
      // formData.append("student_fees", values.student_fees);
      // formData.append("paid_fees", values.paid_fees);
      // formData.append("balance_fees", values.balance_fees);
      // formData.append("doc_cap_lett", values.doc_cap_lett);
      formData.append("category", values.category);
      // formData.append("stu_rec_fees", values.stu_rec_fees);
      formData.append("p_id", user.id);

      props.requestApplyJob({
        token: user.token,
        data: {
          formData,
        },
      });
      setLoader(true);
    } catch (error) {
      console.log(error.message);
      toast.error("error at creating");
      setLoader(false);
    }
  };

  useEffect(() => {
    let applyJobData = props.candidate.applyJobData;
    // console.log(applyJobData);
    if (applyJobData !== undefined) {
      if (applyJobData?.data?.status == "success") {
        Swal.fire("Good job!", "Data Uploaded successfully.", "success");
        setLoader(false);
        form.resetFields();
        navigate(
          `/doc/${applyJobData.data.data.branch}/${applyJobData.data.data._id}`
        );

        props.candidate.applyJobData = undefined;
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        setLoader(false);
        props.candidate.applyJobData = undefined;
      }
    }
  }, [props.candidate.applyJobData]);

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Something went wrong !");
    console.log("Failed:", errorInfo);
  };

  const handelChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onClickLoading = () => {
    setLoader(true);
  };

  return (
    <Layout>
      <Fragment>
        {/* <Row className="mr-top" justify="space-between" gutter={[0, 30]}> */}
        {/* <Col
            xs={24}
            sm={24}
            md={24}
            lg={11}
            xl={11}
            // className="rounded column-design"
          > */}
        <Card bordered={false}>
          <Title level={4} className="m-2 text-center">
            Add Candidate Details
          </Title>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            labelWrap
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="candidateName"
              label="Candidate Name"
              rules={[
                {
                  required: true,
                  message: "Please input Candidate Name!",
                },
              ]}
            >
              <Input placeholder="Enter Candidate Name" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="category"
              label="Select Category"
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              <Select
                name="category"
                loading={!category}
                showSearch
                placeholder="Select category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {category &&
                  category.map((brandSingle) => (
                    <Select.Option key={brandSingle} value={brandSingle}>
                      {brandSingle}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="gender"
              label="Select Gender"
              rules={[
                {
                  required: true,
                  message: "Please select Gender!",
                },
              ]}
            >
              <Select
                name="gender"
                loading={!state}
                showSearch
                placeholder="Select gender"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {gender &&
                  gender.map((gender) => (
                    <Select.Option key={gender} value={gender}>
                      {gender}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="course"
              label="Select Course"
              rules={[
                {
                  required: true,
                  message: "Please select Course",
                },
              ]}
            >
              <Select
                name="course"
                loading={!state}
                showSearch
                placeholder="Select Course"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {course &&
                  course.map((course) => (
                    <Select.Option key={course} value={course}>
                      {course}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="branch"
              label="Select Branch"
              rules={[
                {
                  required: true,
                  message: "Please select Course",
                },
              ]}
            >
              <Select
                name="branch"
                loading={!state}
                showSearch
                placeholder="Select Branch"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {branch &&
                  branch.map((branch) => (
                    <Select.Option key={branch} value={branch}>
                      {branch}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Candidate Mobile Number"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please input Mobile Number!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Mobile Number" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Parent Mobile Number"
              name="parent_mobile"
              rules={[
                {
                  required: true,
                  message: "Please input Mobile Number!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Mobile Number" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="date_docSubmision"
              label="Date of Document Submission"
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Last Exam Passing Year"
              name="lastExam_passingYear"
              rules={[
                {
                  required: true,
                  message: "Please input Year!",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="team"
              label="Select Team/Staff"
              rules={[
                {
                  required: true,
                  message: "Please select Team/Staff!",
                },
              ]}
            >
              <Select
                name="Team/Staff"
                loading={!state}
                showSearch
                placeholder="Select Team/Staff"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {team &&
                  team.map((team) => (
                    <Select.Option key={team} value={team}>
                      {team}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="source"
              label="Select Source"
              rules={[
                {
                  required: true,
                  message: "Please select Source!",
                },
              ]}
            >
              <Select
                name="Source"
                loading={!state}
                showSearch
                placeholder="Select Source"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {source &&
                  source.map((source) => (
                    <Select.Option key={source.name} value={source.name}>
                      {source.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            {/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="entrance_exam"
              label="Select Entrance Exam"
              rules={[
                {
                  required: true,
                  message: "Please select entrance exam!",
                },
              ]}
            >
              <Select
                name="Entrance Exam"
                loading={!state}
                showSearch
                placeholder="Select Entrance Exam"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {entrance_exam &&
                  entrance_exam.map((entrance_exam) => (
                    <Select.Option key={entrance_exam} value={entrance_exam}>
                      {entrance_exam}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="dtenumber"
              label="DTE Application Number"
              rules={[
                {
                  required: true,
                  message: "Please input number!",
                },
              ]}
            >
              <Input placeholder="Enter Candidate DTE Application Number" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="capround"
              label="Select CAP Round"
              rules={[
                {
                  required: true,
                  message: "Please select cap round!",
                },
              ]}
            >
              <Select
                name="capround"
                loading={!state}
                showSearch
                placeholder="Select CAP Round"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {capround &&
                  capround.map((capround) => (
                    <Select.Option key={capround} value={capround}>
                      {capround}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="erpid"
              label="ERP ID"
              rules={[
                {
                  required: true,
                  message: "Please input erp id!",
                },
              ]}
            >
              <Input placeholder="Enter Candidate ERP ID" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="university"
              label="Select Home University"
              rules={[
                {
                  required: true,
                  message: "Please select university!",
                },
              ]}
            >
              <Select
                name="university"
                loading={!city}
                showSearch
                placeholder="Selct University"
                optionFilterProp="children"
                onChange={handleUniversity}
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {university &&
                  university.map((university) => (
                    <Select.Option key={university} value={university}>
                      {university}
                    </Select.Option>
                  ))}
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            {showOtherInput && (
              <Form.Item
                style={{ marginBottom: "15px" }}
                name="otherUniversity"
                label="Enter University"
                rules={[
                  {
                    required: true,
                    message: "Please input university!",
                  },
                ]}
              >
                <Input placeholder="Enter Candidate University" />
              </Form.Item>
            )}
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="admission_date"
              label="Date of Admission"
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Tution Fees"
              name="tution_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Tution Fees!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Tution Fees" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Development Fees"
              name="deve_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Development Fees!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Parent Development Fees"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Total Fees"
              name="total_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Total Fees!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Total Fees" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Receivable from Govt"
              name="govt_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Receivable from Govt!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Parent Receivable from Govt"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Receivable from Student"
              name="stu_rec_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Receivable from Student!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Parent Receivable from Student"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input Discount!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Discount" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Student Payble Fees"
              name="student_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Student Payble Fees!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter Parent Student Payble Fees"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Paid Fees"
              name="paid_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Paid Fees!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Paid Fees" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              label="Balance Fees"
              name="balance_fees"
              rules={[
                {
                  required: true,
                  message: "Please input Balance Fees!",
                },
              ]}
            >
              <Input type="number" placeholder="Enter Parent Balance Fees" />
            </Form.Item> */}
            {/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="doc_cap_lett"
              label="Document CAP Letter"
              rules={[
                {
                  required: true,
                  message: "Please input Document CAP Letter!",
                },
              ]}
            >
              <Input placeholder="Enter Document CAP Letter" />
            </Form.Item> */}
            {/* <Form.Item
              style={{ marginBottom: "15px" }}
              name="adhar"
              label="Adhar Card"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="photo"
              label="Photo"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="sign"
              label="Signature"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="tc" label="TC">
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="10th"
              label="10th marksheet"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="12th"
              label="12th marksheet"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="caste"
              label="Caste Certificate"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="non"
              label="Non-Creamy Layer"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="domicile"
              label="Domicile"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="csv" label="CSV">
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="cet"
              label="CET Score"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="other_doc"
              label="Other"
            >
              <Input type="file" onChange={handleDocument} />
            </Form.Item> */}

            {/* 
           

            <Form.Item
              style={{ marginBottom: "15px" }}
              name="subcategory"
              label="Select Subcategory "
              rules={[
                {
                  required: true,
                  message: "Please select sub-category!",
                },
              ]}
            >
              <Select
                name="subcategory"
                loading={!subcategory}
                showSearch
                placeholder="Select Subcategory"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {subcategory &&
                  subcategory.map((subcat) => (
                    <Select.Option key={subcat} value={subcat}>
                      {subcat}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "15px" }}
              name="leadStatus"
              label="Select Lead Status "
              rules={[
                {
                  required: true,
                  message: "Please select Lead Status!",
                },
              ]}
            >
              <Select
                name="leadStatus"
                loading={!LeadStatus}
                showSearch
                placeholder="Select Lead Status"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {LeadStatus &&
                  LeadStatus.map((unit) => (
                    <Select.Option key={unit} value={unit}>
                      {unit}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="status"
              label="Status "
              rules={[
                {
                  required: true,
                  message: "Please select Status!",
                },
              ]}
            >
              <Select
                name="status"
                loading={!Status}
                showSearch
                placeholder="Select Status"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.includes(input)
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {Status &&
                  Status.map((unit) => (
                    <Select.Option key={unit} value={unit}>
                      {unit}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item> */}

            <Form.Item
              style={{ marginBottom: "15px" }}
              className={styles.addProductBtnContainer}
            >
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loader}
                onClick={onClickLoading}
                style={{ backgroundColor: "#2c3e50" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        {/* </Col> */}
        {/* <Col xs={24} sm={24} md={24} lg={11} xl={11} className=" rounded">
            <Card className={`${styles.importCsvCard} column-design`}>
              <Title level={4} className="m-2 text-center">
                Import From CSV
              </Title>
              <div className="text-center mt-2 ">
                <form className="form-group ">
                  <input
                    className="form-control"
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleFileChange}
                  />
                  <br />
                  <h6>
                    <a
                      href="#"
                      className="ant-btn ant-btn-primary ant-btn-round mt-2"
                      onClick={downloadTemplate}
                    >
                      Download
                    </a>
                    &nbsp; the excel template here that needs to be uploaded .
                  </h6>

                  <Button
                    className="mt-2"
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={loader}
                    onClick={handleUpload}
                    style={{ backgroundColor: "#2c3e50" }}
                  >
                    Import From CSV
                  </Button>
                </form>
              </div>{" "}
            </Card>
          </Col> */}
        {/* </Row> */}
      </Fragment>
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
      requestAddResume,
      requestApplyJob,
      requestAdminGetProfile,
      requestJobDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UploadData);
