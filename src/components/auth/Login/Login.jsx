// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { authService } from '../../../services/auth';
// import Captcha from '../Captcha/Captcha';
// import './Login.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom'; // اضافه کردن useNavigate

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//     captcha: ''
//   });
//   const [captchaData, setCaptchaData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//     const navigate = useNavigate(); // استفاده از useNavigate
//   useEffect(() => {
//     loadCaptcha();
//   }, []);

//   const loadCaptcha = async () => {
//     try {
//       const data = await authService.getCaptcha();
//       setCaptchaData(data);
//     } catch (error) {
//               toast.success(error, {
//             position: "top-left",
//             autoClose: 5000,
//           });
//       console.error('Failed to load captcha:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // تأیید کپچا
//       await authService.verifyCaptcha({
//         captchaId: captchaData.captchaId,
//         userInput: credentials.captcha
//       });

//       // لاگین
//       const result = await login(credentials);
//       if (!result.success) {


//                 loadCaptcha();
//                        toast.error(result.error, {
//             position: "top-left",
//             autoClose: 5000,
//           });
// //        setError(result.error);

//       }
//                navigate('/dashboard');
//     } catch (error) {
//                     toast.error('کپچا یا اطلاعات ورود نامعتبر است', {
//             position: "top-left",
//             autoClose: 5000,
//           });
//       //setError('کپچا یا اطلاعات ورود نامعتبر است');
//       loadCaptcha();
//     } finally {
//       setLoading(false);
//       setCredentials(prev => ({ ...prev, captcha: '' }));
//     }
//   };

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="login-container">
//                          <ToastContainer
//             position="top-left"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={true}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />
//       <div className="login-background">
//         <div className="floating-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//         </div>
//       </div>
      
//       <div className="login-card slide-in-right">
//         <div className="login-header">
//           <h1 className="login-title">خوش آمدید</h1>
//           <p className="login-subtitle">لطفا وارد حساب کاربری خود شوید</p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="username">نام کاربری</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={credentials.username}
//               onChange={handleChange}
//               className="form-input"
//               placeholder="نام کاربری خود را وارد کنید"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">رمز عبور</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               className="form-input"
//               placeholder="رمز عبور خود را وارد کنید"
//               required
//             />
//           </div>

//           {captchaData && (
//             <Captcha 
//               captchaData={captchaData}
//               value={credentials.captcha}
//               onChange={handleChange}
//               onRefresh={loadCaptcha}
//             />
//           )}

//           {error && (
//             <div className="error-message shake">
//               <span className="error-icon">⚠️</span>
//               {error}
//             </div>
//           )}

//           <button 
//             type="submit" 
//             disabled={loading}
//             className={`login-button btn btn-primary ${loading ? 'loading' : ''}`}
//           >
//             {loading ? (
//               <>
//                 <div className="button-spinner"></div>
//                 در حال ورود...
//               </>
//             ) : (
//               'ورود به سیستم'
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>سیستم مدیریت یکپارچه</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/auth';
import Captcha from '../Captcha/Captcha';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    captcha: ''
  });
  const [captchaData, setCaptchaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    try {
      const data = await authService.getCaptcha();
      setCaptchaData(data);
    } catch (error) {
      toast.error('خطا در دریافت کپچا', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Failed to load captcha:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.verifyCaptcha({
        captchaId: captchaData.captchaId,
        userInput: credentials.captcha
      });

      const result = await login(credentials);
      if (!result.success) {
        loadCaptcha();
        toast.error(result.error, {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.success('ورود با موفقیت انجام شد!', {
          position: "top-right",
          autoClose: 2000,
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('کپچا یا اطلاعات ورود نامعتبر است', {
        position: "top-right",
        autoClose: 4000,
      });
      loadCaptcha();
    } finally {
      setLoading(false);
      setCredentials(prev => ({ ...prev, captcha: '' }));
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-new-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* بخش سمت راست - فرم لاگین */}
      <div className="login-new-right">
        <div className="login-new-card">
          <div className="login-new-header">
            <div className="login-new-logo">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="login-new-title">به پنل مدیریت خوش آمدید</h1>
            <p className="login-new-subtitle">برای ادامه لطفاً اطلاعات حساب خود را وارد کنید</p>
          </div>

          <form onSubmit={handleSubmit} className="login-new-form">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="login-new-input"
                placeholder="نام کاربری"
                required
              />
            </div>
            
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M6 21H18C19.1 21 20 20.1 20 19V11C20 9.9 19.1 9 18 9H6C4.9 9 4 9.9 4 11V19C4 20.1 4.9 21 6 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 9V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="login-new-input"
                placeholder="رمز عبور"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L22 22M6.7 7.7C4.5 9.3 2.8 11.3 2 12C2 12 5 19 12 19C13.9 19 15.5 18.5 16.9 17.7M9.9 9.9C9.4 10.5 9 11.2 9 12C9 13.7 10.3 15 12 15C12.8 15 13.5 14.6 14.1 14.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M17.8 6.2C19.7 7.5 21.2 9.6 22 12C22 12 20.5 16.5 16.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>

            {captchaData && (
              <div className="captcha-wrapper">
                <Captcha 
                  captchaData={captchaData}
                  value={credentials.captcha}
                  onChange={handleChange}
                  onRefresh={loadCaptcha}
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`login-new-button ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  در حال بررسی...
                </>
              ) : (
                'ورود به پنل مدیریت'
              )}
            </button>

            <div className="login-new-footer">
              <a href="#" className="forgot-link">رمز عبور خود را فراموش کرده‌اید؟</a>
              <div className="version-text">نسخه ۲.۰</div>
            </div>
          </form>
        </div>
      </div>

      {/* بخش سمت چپ - تصویر و متن تبلیغاتی */}
      <div className="login-new-left">
        <div className="hero-content">
          <div className="hero-badge">سیستم مدیریت یکپارچه</div>
          <h2 className="hero-title">مدیریت هوشمند<br /></h2>
          <p className="hero-description">
            با پنل مدیریت پیشرفته ما، تمام امور خود را در یک داشبورد حرفه‌ای مدیریت کنید.
            آمار لحظه‌ای، گزارش‌های دقیق و ابزارهای قدرتمند در اختیار شماست.
          </p>
          <div className="hero-features">
       
          </div>
        </div>
        <div className="hero-image">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="80" width="300" height="180" rx="20" fill="url(#grad1)" opacity="0.9"/>
            <rect x="80" y="110" width="100" height="30" rx="8" fill="white" opacity="0.3"/>
            <rect x="80" y="155" width="160" height="20" rx="6" fill="white" opacity="0.2"/>
            <rect x="80" y="185" width="130" height="20" rx="6" fill="white" opacity="0.2"/>
            <circle cx="330" cy="150" r="30" fill="white" opacity="0.15"/>
            <circle cx="60" cy="240" r="20" fill="white" opacity="0.1"/>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea"/>
                <stop offset="100%" stopColor="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Login;