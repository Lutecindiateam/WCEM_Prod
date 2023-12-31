import React from "react";
import Layout from "./Layout";
import { PlusOutlined } from "@ant-design/icons";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
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
import { bindActionCreators } from "redux";
import {
  requestAddResume,
  requestEmpProfile,
  requestAdminGetProfile,
  requestJobDetails,
  requestGetEmp,
} from "../Redux/actions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { ImageViewModal } from "./ViewDocModal";
import { generatePublicUrl } from "./urlConfig";

/**
 * @author
 * @function DocView
 **/

const DocView = (props) => {
  const params = useParams();
  // console.log(params);
  const { Title } = Typography;
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [csvFile, setCsvFile] = useState(null);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showOtherInput, setShowOtherInput] = useState(false);

  const [adharFile, setAdharFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [signFile, setSignFile] = useState(null);
  const [tcFile, setTcFile] = useState(null);
  const [tenthFile, setTenthFile] = useState(null);
  const [twelfthFile, setTwelfthFile] = useState(null);
  const [casteFile, setCasteFile] = useState(null);
  const [nclFile, setNclFile] = useState(null);
  const [domicileFile, setDomicileFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [cetFile, setCetFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);

  const [document, setDocument] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branch, setBranch] = useState();
  // const handleSubmit = () => {};
  console.log(document);
  useEffect(() => {
    let loginData = props.candidate.loginData;
    if (loginData !== undefined) {
      if (loginData?.data?.status === "success") {
        setUser(loginData.data.data);
      }
    }
  }, [props.candidate.loginData]);

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      // setLoader(true);
      let formData = new FormData();
      formData.append("id", params.id);
      formData.append("branch", params.branch);
      if (adharFile) {
        formData.append("file", adharFile.file);
        formData.append("name", adharFile.name);
      }
      if (photoFile) {
        formData.append("file", photoFile.file);
        formData.append("name", photoFile.name);
      }
      if (signFile) {
        formData.append("file", signFile.file);
        formData.append("name", signFile.name);
      }
      if (tcFile) {
        formData.append("file", tcFile.file);
        formData.append("name", tcFile.name);
      }
      if (tenthFile) {
        formData.append("file", tenthFile.file);
        formData.append("name", tenthFile.name);
      }
      if (twelfthFile) {
        formData.append("file", twelfthFile.file);
        formData.append("name", twelfthFile.name);
      }
      if (casteFile) {
        formData.append("file", casteFile.file);
        formData.append("name", casteFile.name);
      }
      if (nclFile) {
        formData.append("file", nclFile.file);
        formData.append("name", nclFile.name);
      }
      if (domicileFile) {
        formData.append("file", domicileFile.file);
        formData.append("name", domicileFile.name);
      }
      if (csvFile) {
        formData.append("file", csvFile.file);
        formData.append("name", csvFile.name);
      }
      if (cetFile) {
        formData.append("file", cetFile.file);
        formData.append("name", cetFile.name);
      }
      if (otherFile) {
        formData.append("file", otherFile.file);
        formData.append("name", otherFile.name);
      }

      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      props.requestEmpProfile({
        token: user.token,
        data: {
          formData,
          // : formData,
          // id:params.id,
          // branch: params.branch
        },
      });
      setAdharFile(null);
      setPhotoFile(null);
      setSignFile(null);
      setTcFile(null);
      setTenthFile(null);
      setTwelfthFile(null);
      setCasteFile(null);
      setNclFile(null);
      setDomicileFile(null);
      setCsvFile(null);
      setCetFile(null);
      setOtherFile(null);
      // setLoader(true);
    } catch (error) {
      console.log(error.message);
      toast.error("error at creating");
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("Something went wrong !");
    console.log("Failed:", errorInfo);
  };

  const handleDocument = (e, setFile) => {
    const placeholder = e.target.getAttribute("placeholder"); // Get the placeholder value
    setFile({
      file: e.target.files[0],
      name: placeholder,
    });
  };

  const onClickLoading = () => {
    setLoader(true);
  };

  useEffect(() => {
    let empProfileData = props.employee.empProfileData;
    // console.log(empProfileData);
    if (empProfileData !== undefined) {
      if (empProfileData?.data?.status == "success") {
        Swal.fire("Good job!", "Document Uploaded successfully.", "success");
        setLoader(false);
        form.resetFields();
        // navigate(`/doc/${applyJobData.data.data.branch}/${applyJobData.data.data._id}`);

        props.employee.empProfileData = undefined;
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        setLoader(false);
        props.employee.empProfileData = undefined;
      }
    }
  }, [props.employee.empProfileData]);

  useEffect(() => {
    props.requestGetEmp({
      token: user.token,
      id: params.id,
    });
  }, [props.employee.empProfileData]);

  useEffect(() => {
    let empData = props.employee.empData;
    if (empData !== undefined) {
      if (empData?.data?.status == "success") {
        setDocument(empData.data.data.documents);
        setBranch(empData.data.data.branch);
      } else {
        Swal.fire("Alert!", "Something Went Wrong.", "error");
        setLoader(false);
        // props.employee.empData = undefined;
      }
    }
  }, [props.employee.empData]);

  let uploadedCount = 0;

  for (let key in document) {
    if (document[key] !== null) {
      uploadedCount++;
    }
  }
  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };
  return (
    <Layout>
      <Fragment>
        <Card bordered={false}>
          <Title level={4} className="m-2 text-center">
            Upload Candidate Documents
          </Title>
          <Typography
            style={{ fontSize: "18px", color: "green", marginLeft: "17%" }}
          >
            * {uploadedCount}/12 Uploaded
          </Typography>
          <br />
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            labelWrap
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="adhar"
              label="Adhar Card"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="adhar"
                  onChange={(e) => handleDocument(e, setAdharFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!adharFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.adhar !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.adhar}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.adhar}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="photo"
              label="Photo"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="photo"
                  onChange={(e) => handleDocument(e, setPhotoFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!photoFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.photo !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.photo}`)
                        )
                      }
                    />
                    {/* `${process.env.REACT_APP_API_HOST}/public/${branch}/${document.adhar}` */}
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.photo}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="sign"
              label="Signature"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="sign"
                  onChange={(e) => handleDocument(e, setSignFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!signFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.sign !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.sign}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(`${branch}/${document.sign}`)}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="tc" label="TC">
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="tc"
                  onChange={(e) => handleDocument(e, setTcFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!tcFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.tc !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.tc}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(`${branch}/${document.tc}`)}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="10th"
              label="10th marksheet"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="tenth"
                  onChange={(e) => handleDocument(e, setTenthFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!tenthFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.tenth !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.tenth}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.tenth}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="12th"
              label="12th marksheet"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="twelfth"
                  onChange={(e) => handleDocument(e, setTwelfthFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!twelfthFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.twelfth !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.twelfth}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.twelfth}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="caste"
              label="Caste Certificate"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="caste"
                  onChange={(e) => handleDocument(e, setCasteFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!casteFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.caste !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.caste}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.caste}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="non"
              label="Non-Creamy Layer"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="ncl"
                  onChange={(e) => handleDocument(e, setNclFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!nclFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.ncl !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.ncl}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(`${branch}/${document.ncl}`)}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="domicile"
              label="Domicile"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="domicile"
                  onChange={(e) => handleDocument(e, setDomicileFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!domicileFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.domicile !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.domicile}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.domicile}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item style={{ marginBottom: "15px" }} name="csv" label="CSV">
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="csv"
                  onChange={(e) => handleDocument(e, setCsvFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!csvFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.csv !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.csv}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(`${branch}/${document.csv}`)}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="cet"
              label="CET Score"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="cet"
                  onChange={(e) => handleDocument(e, setCetFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!cetFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.cet !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.cet}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(`${branch}/${document.cet}`)}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "15px" }}
              name="other_doc"
              label="Other"
            >
              <div style={{ display: "flex" }}>
                <Input
                  type="file"
                  placeholder="other"
                  onChange={(e) => handleDocument(e, setOtherFile)}
                />
                <Button
                  type="primary"
                  shape="round"
                  loading={loader}
                  onClick={handleSubmit}
                  disabled={!otherFile}
                  style={{
                    // backgroundColor: "#2c3e50",
                    marginLeft: "20px",
                  }}
                >
                  Upload
                </Button>
                {document.other !== null ? (
                  <div style={{ display: "flex" }}>
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                    />
                    <EyeOutlined
                      style={{ fontSize: "30px", marginLeft: "40px" }}
                      onClick={() =>
                        handleViewImage(
                          generatePublicUrl(`${branch}/${document.other}`)
                        )
                      }
                    />
                    {/* <ImageViewModal
                      visible={isModalVisible}
                      imageSrc={generatePublicUrl(
                        `${branch}/${document.other}`
                      )}
                      onCancel={handleToggleModal}
                    /> */}
                  </div>
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#eb2f96"
                    style={{ fontSize: "30px", marginLeft: "40px" }}
                  />
                )}
              </div>
            </Form.Item>
          </Form>
        </Card>
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
      requestEmpProfile,
      requestAdminGetProfile,
      requestJobDetails,
      requestGetEmp,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DocView);
