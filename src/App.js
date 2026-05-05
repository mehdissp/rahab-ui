
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout/Layout';
import Login from './components/auth/Login/Login';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import Project from './components/page/project/Project';
import TodoBoard from './components/page/todo/TodoBoard';
import UserManagement from './components/page/user/UserManagement';
import Profile from './components/page/profile/Profile';
import MenuAccess from './components/page/menuAccess/MenuAccess';
import Role from './components/page/role/Role';
import Tag from './components/page/tag/Tag';
import HomePage from './components/page/homePage/HomePage';
import Company from './components/page/company/Company';
import FinancialTreeList from './components/page/financial/FinancialTreeList';

import Archive from './components/page/archive/Archive';
import HotelPage from './components/page/hotel/HotelPage';
import RealEstatePage from './components/page/realestate/RealEstatePage';
import RealEstatePageDetail from './components/page/realEstateDetails/RealEstatePageDetail'
import RealEstateDetailPageItem from './components/page/RealEstateDetailPageItem/RealEstateDetailPageItem'
import MainLayout from './components/layout/MainLayout';  // <==== ایمپورت MainLayout
import './styles/globals.css';
import './styles/animations.css';
import Bank from './components/page/bank/Bank';

// Layout wrapper با Outlet
const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// کامپوننت اصلی اپلیکیشن
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔐 Auth Status:', { isAuthenticated, isLoading });

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} text="در حال بارگذاری..." />;
  }

  return (
    <Routes>
      {/* صفحه اصلی - هتل (برای همه قابل دسترس) */}
      <Route path="/" element={<Login />}>
        <Route index element={<Login />} />

      </Route>
      
      {/* روت‌های عمومی */}
      <Route index path="/login" element={<Login />} />
      
      {/* روت‌های محافظت شده */}
      <Route path="/*" element={
        isAuthenticated ? <AuthenticatedApp /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
};

// اپلیکیشن برای کاربران authenticated
const AuthenticatedApp = () => {
  const { menus } = useAuth();
  
  console.log('🏠 AuthenticatedApp - menus:', menus);

  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="project" element={<Project />} />
        <Route path="TodoBoard" element={<TodoBoard />} />
        <Route path="Archive" element={<Archive />} />
        <Route path="UserManagement" element={<UserManagement />} />
        <Route path="MenuAccess" element={<MenuAccess />} />
        <Route path="Role" element={<Role />} />
        <Route path="Tag" element={<Tag />} />
        <Route path="profile" element={<Profile />} />
        <Route path="Company" element={<Company />} />
        <Route path="Bank" element={<Bank />} />
        <Route path="FinancialTreeList" element={<FinancialTreeList />} />
        
        
        {/* روت‌های داینامیک */}
        {renderMenuRoutes(menus)}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

// تابع برای رندر روت‌های منو
const renderMenuRoutes = (menus) => {
  if (!menus || !Array.isArray(menus)) return null;

  const renderRecursive = (menuItems) => {
    return menuItems.flatMap((menu) => {
      const routes = [];

      if (menu.path && menu.path !== '#' && menu.path !== '/dashboard' && menu.path !== '/project') {
        const cleanPath = menu.path.replace(/^\//, '');
        console.log('🛣️ Adding route:', cleanPath);
        
        routes.push(
          <Route
            key={menu.id}
            path={cleanPath}
            element={<DynamicPage title={menu.title} />}
          />
        );
      }

      if (menu.children && menu.children.length > 0) {
        routes.push(...renderRecursive(menu.children));
      }

      return routes;
    });
  };

  return renderRecursive(menus);
};

// کامپوننت برای صفحات داینامیک
const DynamicPage = ({ title }) => {
  return (
    <div className="dynamic-page">
      <div className="page-header">
        <h1>{title}</h1>
        <p>صفحه {title}</p>
      </div>
      <div className="page-content">
        <div className="card">
          <h2>محتوای صفحه</h2>
          <p>این صفحه به صورت داینامیک بر اساس منوها ایجاد شده است.</p>
          <p>عنوان صفحه: <strong>{title}</strong></p>
        </div>
      </div>
    </div>
  );
};

// کامپوننت برای صفحه 404
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="card">
        <h1>۴۰۴ - صفحه پیدا نشد</h1>
        <p>صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;