// General
import NotFound from "../../pages/error/NotFound";
import Dashboard from "../../pages/dashboard/Overview";

// Media
import Media from "../../pages/media/Media.jsx";

// Settings
import Api from "../../pages/settings/Api";
import Email from "../../pages/settings/Email";
import General from "../../pages/settings/General";
import CronJob from "../../pages/settings/CronJob";
import Permalink from "../../pages/settings/Permalink";
import Languages from "../../pages/settings/Languages";
import SocialLogin from "../../pages/settings/SocialLogin";

// Products
import Attribute from "../../pages/products/Attribute";
import AddProduct from "../../pages/products/AddProduct";
import EditProduct from "../../pages/products/EditProduct";
import ManageProduct from "../../pages/products/ManageProduct";

// Orders
import AddOrder from "../../pages/orders/AddOrder";
import ManageOrder from "../../pages/orders/ManageOrder";
import OrderDetail from "../../pages/orders/OrderDetail";

// brand
import AddBrand from "../../pages/brands/AddBrand";
import ManageBrand from "../../pages/brands/ManageBrand";
import EditBrand from "../../pages/brands/EditBrand";

// Customer
import AddCustomer from "../../pages/customers/AddCustomer";
import EditCustomer from "../../pages/customers/EditCustomer";
import ManageCustomer from "../../pages/customers/ManageCustomer";

// Users
import AddUser from "../../pages/users/AddUser";
import EditUser from "../../pages/users/EditUser";
import UserList from "../../pages/users/UserList";

// Venue
import AddVenue from "../../pages/venue/AddVenue";
import ManageVenue from "../../pages/venue/ManageVenue";

// Categories
import AddCategories from "../../pages/categories/AddCategories";
import EditCategories from "../../pages/categories/EditCategories";
import ManageCategories from "../../pages/categories/ManageCategories";

// Reviews
import ManageReviews from "../../pages/reviews/ManageReviews";
import ReviewsDetail from "../../pages/reviews/ReviewsDetail";

// Pages
import AddPage from "../../pages/pages/AddPage";
import EditPage from "../../pages/pages/EditPage";
import ManagePages from "../../pages/pages/ManagePages";

// Payment
import ManageTransactions from "../../pages/payment/ManageTransactions";
import PaymentMethod from "../../pages/payment/PaymentMethod";
import TransactionDetail from "../../pages/payment/TransactionDetail";

// Sorting and Comments

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  // Catalog
  {
    path: "/catalog/product/add",
    element: <AddProduct />,
  },
  {
    path: "/catalog/product/manage",
    element: <ManageProduct />,
  },
  {
    path: "/catalog/product/manage/:productId",
    element: <EditProduct />,
  },
  {
    path: "/catalog/product/attribute",
    element: <Attribute />,
  },
  // orders
  {
    path: "/orders/add",
    element: <AddOrder />,
  },
  {
    path: "/orders/manage",
    element: <ManageOrder />,
  },
  {
    path: "/orders/manage/:orderID",
    element: <OrderDetail />,
  },
  // Catalog Categories
  {
    path: "/catalog/categories/manage",
    element: <ManageCategories />,
  },
  {
    path: "/catalog/categories/:categoryid",
    element: <EditCategories />,
  },
  // customers
  {
    path: "/customers/add",
    element: <AddCustomer />,
  },
  {
    path: "/customers/manage",
    element: <ManageCustomer />,
  },
  {
    path: "/customers/manage/:customerId",
    element: <EditCustomer />,
  },
  // brand
  {
    path: "/brands/add",
    element: <AddBrand />,
  },
  {
    path: "/brands/manage",
    element: <ManageBrand />,
  },
  {
    path: "/brands/manage/:brandId",
    element: <EditBrand />,
  },
  // Users
  {
    path: "/users/list",
    element: <UserList />,
  },
  {
    path: "/users/add",
    element: <AddUser />,
  },
  {
    path: "/users/list/:userid",
    element: <EditUser />,
  },
  // Venue
  {
    path: "/venue/add",
    element: <AddVenue />,
  },
  {
    path: "/venue/manage",
    element: <ManageVenue />,
  },
  // Reviews
  {
    path: "/reviews",
    element: <ManageReviews />,
  },
  {
    path: "/reviews/:reviewid",
    element: <ReviewsDetail />,
  },
  // Pages
  {
    path: "/pages",
    element: <ManagePages />,
  },
  {
    path: "/pages/add",
    element: <AddPage />,
  },
  {
    path: "/pages/:pageId",
    element: <EditPage />,
  },
  // Payment
  {
    path: "/payment/transactions",
    element: <ManageTransactions />,
  },
  {
    path: "/payment/transactions/:transactionId",
    element: <TransactionDetail />,
  },
  {
    path: "/payment/payment-method",
    element: <PaymentMethod />,
  },
  // Media
  {
    path: "/media",
    element: <Media />,
  },
  // Settings
  {
    path: "/setting/general",
    element: <General />,
  },
  {
    path: "/setting/email",
    element: <Email />,
  },
  {
    path: "/setting/cronJob",
    element: <CronJob />,
  },
  {
    path: "/setting/permalink",
    element: <Permalink />,
  },
  {
    path: "/setting/languages",
    element: <Languages />,
  },
  {
    path: "/setting/social-login",
    element: <SocialLogin />,
  },
  {
    path: "/setting/api",
    element: <Api />,
  },
  // Not Found
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;