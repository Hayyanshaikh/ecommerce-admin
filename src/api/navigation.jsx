import React from "react";
import * as Icons from "react-icons/tb";

// Navigation Items
const navigation = [
  // Dashboard
  {
    name: "Dashboard",
    url: "/",
    icon: <Icons.TbLayout className="menu_icon" />,
  },
  // Catalog
  {
    name: "Catalog",
    icon: <Icons.TbBuildingWarehouse className="menu_icon" />,
    url: "/catalog",
    subMenu: [
      // Products
      {
        name: "Products",
        url: "/product/manage",
        icon: <Icons.TbGardenCart className="menu_icon" />,
      },
      {
        name: "add Product",
        url: "/product/add",
        icon: <Icons.TbCirclePlus className="menu_icon" />,
      },
      // Categories
      {
        name: "Categories",
        url: "/categories/manage",  
        icon: <Icons.TbCategory className="menu_icon" />,
      },
      // Attributes
      {
        name: "Attributes",
        url: "/product/attribute",
        icon: <Icons.TbCalendar className="menu_icon" />,
      },
    ],
  },
  // Orders
  {
    name: "Orders",
    url: "/orders",
    icon: <Icons.TbChecklist className="menu_icon" />,
    subMenu:[
      {
        name: "Manage Order",
        url: "/manage",
        icon: <Icons.TbList className="menu_icon" />,
      },
      {
        name: "add Order",
        url: "/add",
        icon: <Icons.TbCirclePlus className="menu_icon" />,
      },
    ]
  },
  // Customers
  {
    name: "Customers",
    url: "/customers",
    icon: <Icons.TbUsers className="menu_icon" />,
    subMenu:[
      {
        name: "Manage Customers",
        url: "/manage",
        icon: <Icons.TbList className="menu_icon" />,
      },
      {
        name: "add Customers",
        url: "/add",
        icon: <Icons.TbCirclePlus className="menu_icon" />,
      },
    ]
  },
  // Reviews
  {
    name: "Reviews",
    url: "/reviews",
    icon: <Icons.TbStar className="menu_icon" />,
  },
  // Brand
  {
    name: "Brands",
    url: "/brands",
    icon: <Icons.TbTags className="menu_icon" />,
    subMenu:[
      {
        name: "Manage Brands",
        url: "/manage",
        icon: <Icons.TbList className="menu_icon" />,
      },
      {
        name: "add Brand",
        url: "/add",
        icon: <Icons.TbCirclePlus className="menu_icon" />,
      },
    ]
  },
  // Sales
  {
    name: "Sales",
    url: "/venue",
    icon: <Icons.TbCurrencyDollar className="menu_icon" />,
  },
  // Pages
  {
    name: "Pages",
    url: "/pages",
    icon: <Icons.TbPlug className="menu_icon" />,
  },
  // Media
  {
    name: "Media",
    url: "/media",
    icon: <Icons.TbPhoto className="menu_icon" />,
  },
  // Payment
  {
    name: "Payment",
    url: "/payment",
    icon: <Icons.TbCreditCard className="menu_icon" />,
    subMenu: [
      // Transactions
      {
        name: "Transactions",
        url: "/transactions",
        icon: <Icons.TbCurrencyDollar className="menu_icon" />,
      },
      // Payment Methods
      {
        name: "Payment Methods",
        url: "/payment-method",
        icon: <Icons.TbDeviceMobileDollar className="menu_icon" />,
      },
    ],
  },
  // Settings
  {
    name: "Settings",
    url: "/setting",
    icon: <Icons.TbSettings className="menu_icon" />,
    subMenu: [
      // General
      {
        name: "General",
        url: "/general",
        icon: <Icons.TbSettings className="menu_icon" />,
      },
      // Email
      {
        name: "Email",
        url: "/email",
        icon: <Icons.TbMail className="menu_icon" />,
      },
      // Languages
      {
        name: "Languages",
        url: "/languages",
        icon: <Icons.TbLanguage className="menu_icon" />,
      },
      // Permalink
      {
        name: "Permalink",
        url: "/permalink",
        icon: <Icons.TbLink className="menu_icon" />,
      },
      // Social Login
      {
        name: "Social Login",
        url: "/social-login",
        icon: <Icons.TbLogin className="menu_icon" />,
      },
      // Cronjob
      {
        name: "Cronjob",
        url: "/cronjob",
        icon: <Icons.TbClock className="menu_icon" />,
      },
      // API Settings
      {
        name: "API Settings",
        url: "/api",
        icon: <Icons.TbSettings className="menu_icon" />,
      },
    ],
  },
  // Platform Administration
  {
    name: "Administration",
    url: "/admin",
    icon: <Icons.TbShieldLock className="menu_icon" />,
    subMenu: [
      // Roles and Permissions
      {
        name: "Roles and Permissions",
        url: "/admin/roles",
        icon: <Icons.TbUserShield className="menu_icon" />,
      },
      // Users
      {
        name: "Users",
        url: "/admin/users",
        icon: <Icons.TbUsers className="menu_icon" />,
      },
    ],
  },
];

export default navigation;