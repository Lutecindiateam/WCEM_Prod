import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLogin from "./Admin/signin";
import AdminSignUp from "./Admin/signup";
import HomePage from "./Homepage";
import UserLogin from "./User/signin";
import UserSignUp from "./User/signup";
import UserList from "./Admin/alluser";
import FormExample from "./common/user";
import Poster from "./common/poster";
import App from "./Homepage";
import FormExampleAdmin from "./common/admin";
import Drawer from "./common/drawer";
import Sheet from "./common/excel";
import Forget from "./Admin/forget";
import UserForget from "./User/forget";
import AssoProfile from "./Admin/profile";
import Information from "./Trains/homepage";
import Weather from "./Weather/page";
import Cricket from "./Cricket/Cricket";
import UploadData from "./Partner/UploadData";
import Sidebar from "./Partner/Sidebar";
// import Home, { AllData } from "./Partner/AllData";
import PartnerLogin from "./Partner/signin";
// import Main from "./Partner/Main"

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
import Report from "./Partner/report";
import Setting from "./Partner/setting";
import Header from "./Partner/Header";
import Logout from "./Partner/Logout";
import Pie from "./Partner/pie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/userlogin",
    element: <UserLogin />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/adminsignup",
    element: <AdminSignUp />,
  },
  {
    path: "/form/:id",
    element: <FormExample />,
  },
  {
    path: "/userlist",
    element: <UserList />,
  },
  {
    path: "/usersignup",
    element: <UserSignUp />,
  },

  {
    path: "/poster/:id",
    element: <Poster />,
  },
  {
    path: "/form/admin/:id",
    element: <FormExampleAdmin />,
  },
  {
    path: "/csv/:id",
    element: <Sheet />,
  },
  {
    path: "/Admin/forget",
    element: <Forget />,
  },
  {
    path: "/User/forget",
    element: <UserForget />,
  },
  {
    path: "/profile",
    element: <AssoProfile />,
  },
  {
    path: "/train",
    element: <Information />,
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/cricket",
    element: <Cricket />,
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
    path: "/report",
    element: <Report />,
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
  // {
  //   path:"/pie",
  //   element:<Pie />
  // },
]);

export default router;
