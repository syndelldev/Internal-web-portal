/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    layout: "",
  },
  {
    path: "/user_Details",
    name: "User Detail",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    layout: "",
  },
  {
    path: "/projects",
    name: "Projects",
    rtlName: "ملف تعريفي للمستخدم",
    icon: LibraryBooks,
    // icon: "/Project.png",
    layout: "",
  },
  {
    path: "/tasks",
    name: "Tasks",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "content_paste",
    layout: "",
  },
  {
    path: "/user_Rights",
    name: "User Rights",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    layout: "",
  },
];

export default dashboardRoutes;
