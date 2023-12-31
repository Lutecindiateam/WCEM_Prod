import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./Homepage";
import UploadData from "./Partner/UploadData";
import Sidebar from "./Partner/Sidebar";
import PartnerLogin from "./Partner/signin";
import PartnerSignUp from "./Partner/signup";
import PartnerForget from "./Partner/forget";
import ColumnSelectorGrid from "./Partner/Admin/adminaction";
import TableData from "./Partner/table";
import Adminaction from "./Partner/Admin/adminaction";
import PartnerAdminLogin from "./Partner/Admin/Login";
import DemoBar from "./Partner/calender";
import Dashboard from "./Partner/dashboard";
import QuickLinks from "./Partner/quick";
import Page404 from "./Partner/404/404Page";
import Account from "./Partner/account";
import Setting from "./Partner/setting";
import Header from "./Partner/Header";
import Logout from "./Partner/Logout";
import Pie from "./Partner/pie";
import { DocumentUploader } from "./Partner/documentUpload";
import CreateRole from "./Partner/Admin/CreateRole";
import  DocView  from "./Partner/documentView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PartnerLogin />,
  },
  {
    path: "/main",
    element: <Sidebar />,
  },
  {
    path: "/upload",
    element: <UploadData />,
  },
  {
    path: "/partnerlogin",
    element: <PartnerLogin />,
  },
  {
    path: "/partnersignup",
    element: <PartnerSignUp />,
  },
  {
    path: "/partnerforget",
    element: <PartnerForget />,
  },
  {
    path: "/adminaction",
    element: <ColumnSelectorGrid />,
  },
  {
    path: "/all-data",
    element: <TableData />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/partner/admin",
    element: <PartnerAdminLogin />,
  },
  {
    path: "/adminaction",
    element: <Adminaction />,
  },
  {
    path: "/demobar",
    element: <DemoBar />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/quick",
    element: <QuickLinks />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/header",
    element: <Header />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/document",
    element: <DocumentUploader />,
  },
  {
    path: "/doc/:branch/:id",
    element: <DocView />,
  },
  // {
  //   path:"/edit",
  //   element: <
  // },
  // {
  //   path:"/pie",
  //   element:<Pie />
  // },

  //Admin

  {
    path: "/create",
    element: <CreateRole />,
  },
]);

export default router;
