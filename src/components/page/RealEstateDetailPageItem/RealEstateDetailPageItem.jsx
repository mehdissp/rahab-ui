// RealEstateDetailPageItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaWhatsapp, 
  FaShare, 
  FaArrowRight, 
  FaCopy, 
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaParking,
  FaWarehouse,
  FaSwimmingPool,
  FaFire,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaLayerGroup,
  FaArrowUp // بجای FaElevator
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RealEstateDetailPageItem.css';

const RealEstateDetailPageItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [isFavorite, setIsFavorite] = useState(false);

  // شبیه‌سازی دریافت داده از API
  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        // شبیه‌سازی تاخیر شبکه
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setProperty({
          id: id || 12345,
          title: "آپارتمان لوکس کلید نخورده جردن",
          price: "۹,۰۰۰,۰۰۰,۰۰۰",
          rent: "۳۰,۰۰۰,۰۰۰",
          type: "فروش",
          area: 190,
          rooms: 3,
          floor: 6,
          totalFloors: 8,
          year: 1403,
          address: "تهران، امانیه، خیابان جردن، کوچه روشن",
          location: {
            lat: 35.7704892,
            lng: 51.3017382
          },
          description: `واحد بسیار لوکس و کلید نخورده در بهترین نقطه جردن
با بهترین مصالح و طراحی مدرن
مناسب برای خانواده‌های محترم
دسترسی عالی به مراکز خرید و خدمات شهری

ویژگی‌های خاص:
• نمای تمام شیشه
• نورگیری عالی
• سقف بلند
• کفپوش چوبی`,
          features: [
            "پارکینگ",
            "انباری",
            "آسانسور",
            "کابینت‌های مدرن",
            "شیشه‌های دوجداره",
            "نورگیر",
            "سرویس فرنگی",
            "بالکن",
            "شوفاژ",
            "کولر مرکزی",
            "جکوزی",
            "سونا"
          ],
          warnings: [
            "استعلام خلافی",
            "بررسی سند مالکیت",
            "استعلام پایان کار",
            "بررسی مفاصا حساب",
            "استعلام از شهرداری",
            "بررسی مدارک شناسایی"
          ],
          images: [
            "https://localhost:7178/uploads/images/noHome.png",
            "https://localhost:7178/uploads/images/noHome.png",
            "https://localhost:7178/uploads/images/noHome.png",
            "https://localhost:7178/uploads/images/noHome.png",
            "https://localhost:7178/uploads/images/noHome.png"
          ],
          agent: {
            name: "مشاور املاک رویال",
            phone: "۰۲۱۲۲۳۳۴۴۵۵",
            whatsapp: "۰۹۱۲۳۴۵۶۷۸۹",
            address: "تهران، جردن، نبش کوچه روشن",
            rating: 4.8,
            deals: 342,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          views: 1234,
          saved: 89,
          createdAt: "۲ روز پیش",
          certificate: "دارای سند رسمی",
          mortgage: "قابل وام",
          nearby: [
            { name: "مترو", distance: "۵۰۰ متر" },
            { name: "مرکز خرید", distance: "۳۰۰ متر" },
            { name: "پارک", distance: "۲۰۰ متر" },
            { name: "مدرسه", distance: "۴۰۰ متر" }
          ]
        });
      } catch (error) {
        console.error('خطا در دریافت اطلاعات:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleShare = async () => {
    if (!property) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (!property?.agent?.phone) return;
    
    navigator.clipboard.writeText(property.agent.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Skeleton Component
  const DetailSkeleton = () => (
    <div className="detail-skeleton">
      {/* Header Skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-circle"></div>
        <div className="skeleton-title"></div>
        <div className="skeleton-circle"></div>
      </div>

      {/* Gallery Skeleton */}
      <div className="skeleton-gallery">
        <div className="skeleton-image"></div>
      </div>

      {/* Content Skeleton */}
      <div className="skeleton-content">
        <div className="skeleton-price"></div>
        
        <div className="skeleton-info">
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
          <div className="skeleton-chip"></div>
        </div>

        <div className="skeleton-tabs">
          <div className="skeleton-tab"></div>
          <div className="skeleton-tab"></div>
          <div className="skeleton-tab"></div>
        </div>

        <div className="skeleton-text">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line-short"></div>
        </div>

        <div className="skeleton-features">
          <div className="skeleton-feature"></div>
          <div className="skeleton-feature"></div>
          <div className="skeleton-feature"></div>
          <div className="skeleton-feature"></div>
        </div>
      </div>

      {/* Agent Skeleton */}
      <div className="skeleton-agent">
        <div className="skeleton-agent-info">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-agent-details">
            <div className="skeleton-agent-name"></div>
            <div className="skeleton-agent-address"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="skeleton-actions">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  if (loading) {
    return <DetailSkeleton />;
  }

  if (!property) {
    return (
      <div className="detail-container">
        <div className="detail-header">
          <button className="header-btn" onClick={() => navigate(-1)}>
            <FaArrowRight />
          </button>
          <h1 className="header-title">خطا</h1>
          <div className="header-btn"></div>
        </div>
        <div className="error-message">
          <p>متاسفانه ملک مورد نظر یافت نشد</p>
          <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      {/* Header */}
      <div className="detail-header">
        <button className="header-btn" onClick={() => navigate(-1)}>
          <FaArrowRight />
        </button>
        <h1 className="header-title">جزئیات ملک</h1>
        <button className="header-btn" onClick={handleShare}>
          <FaShare />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="detail-gallery">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
          className="gallery-swiper"
        >
          {property.images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="gallery-slide">
                <img 
                  src={img} 
                  alt={`${property.title} - تصویر ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        
        <div className="image-counter">
          {selectedImage + 1} / {property.images.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-main">
        {/* Title & Price */}
        <div className="detail-title-section">
          <div className="title-row">
            <h1 className="detail-title">{property.title}</h1>
            <div className="property-stats">
              <span className="stat-badge">
                <FaFire className="stat-icon" />
                {property.views} بازدید
              </span>
              <span className="stat-badge">
                <FaStar className="stat-icon" />
                {property.saved} ذخیره
              </span>
            </div>
          </div>
          
          <div className="detail-price-box">
            <div className="price-row main-price">
              <span className="price-label">قیمت فروش:</span>
              <span className="price-value">{formatPrice(property.price)}</span>
              <span className="price-currency">تومان</span>
            </div>
            {property.rent && (
              <div className="price-row rent-price">
                <span className="price-label">رهن و اجاره:</span>
                <span className="price-value">{formatPrice(property.rent)}</span>
                <span className="price-currency">تومان</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Specs */}
        <div className="quick-specs">
          <div className="spec-item">
            <FaRulerCombined className="spec-icon" />
            <span className="spec-label">متراژ</span>
            <span className="spec-value">{property.area} متر²</span>
          </div>
          <div className="spec-item">
            <FaBath className="spec-icon" />
            <span className="spec-label">اتاق</span>
            <span className="spec-value">{property.rooms} خواب</span>
          </div>
          <div className="spec-item">
            <FaLayerGroup className="spec-icon" />
            <span className="spec-label">طبقه</span>
            <span className="spec-value">{property.floor} از {property.totalFloors}</span>
          </div>
          <div className="spec-item">
            <FaCalendarAlt className="spec-icon" />
            <span className="spec-label">ساخت</span>
            <span className="spec-value">{property.year}</span>
          </div>
        </div>

        {/* Info Chips */}
        <div className="info-chips">
          <span className="info-chip">کد ملک: {property.id}</span>
          <span className="info-chip">{property.certificate}</span>
          <span className="info-chip">{property.mortgage}</span>
        </div>

        {/* Tabs */}
        <div className="detail-tabs">
          <button 
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            جزئیات
          </button>
          <button 
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            امکانات
          </button>
          <button 
            className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('warnings')}
          >
            هشدارها
          </button>
          <button 
            className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
            onClick={() => setActiveTab('nearby')}
          >
            امکانات اطراف
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="address-card">
                <FaMapMarkerAlt className="address-icon" />
                <div className="address-info">
                  <h3>آدرس ملک</h3>
                  <p>{property.address}</p>
                  <span className="post-date">درج: {property.createdAt}</span>
                </div>
              </div>
              
              <div className="description-card">
                <h3>توضیحات کامل</h3>
                <p className="description-text">{property.description}</p>
              </div>

              <div className="map-card">
                <h3>موقعیت مکانی</h3>
                <div className="map-container">
                  <iframe
                    title="موقعیت ملک"
                    width="100%"
                    height="200"
                    frameBorder="10"
                    style={{ border: 10, borderRadius: '12px' }}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng - 0.01},${property.location.lat - 0.01},${property.location.lng + 0.01},${property.location.lat + 0.01}&layer=mapnik&marker=${property.location.lat},${property.location.lng}`}
                    allowFullScreen
                  ></iframe>
                  <a 
                    href={`https://www.openstreetmap.org/?mlat=${property.location.lat}&mlon=${property.location.lng}#map=16/${property.location.lat}/${property.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    مشاهده در نقشه بزرگتر
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-tab">
              <h3>امکانات و ویژگی‌ها</h3>
              <div className="features-grid">
                {property.features.map((feature, index) => {
                  // انتخاب آیکون مناسب
                  let IconComponent = FaCheckCircle;
                  if (feature === 'پارکینگ') IconComponent = FaParking;
                  else if (feature === 'انباری') IconComponent = FaWarehouse;
                  else if (feature === 'آسانسور') IconComponent = FaArrowUp;
                  else if (feature === 'استخر') IconComponent = FaSwimmingPool;
                  
                  return (
                    <div key={index} className="feature-card">
                      <IconComponent className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="warnings-tab">
              <h3>⚠️ هشدارهای مهم قبل از معامله</h3>
              <ul className="warnings-list">
                {property.warnings.map((warning, index) => (
                  <li key={index} className="warning-item">
                    <span className="warning-bullet"></span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
              <div className="warning-footer">
                <p>توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید</p>
              </div>
            </div>
          )}

          {activeTab === 'nearby' && (
            <div className="nearby-tab">
              <h3>امکانات اطراف ملک</h3>
              <div className="nearby-list">
                {property.nearby.map((item, index) => (
                  <div key={index} className="nearby-item">
                    <span className="nearby-name">{item.name}</span>
                    <span className="nearby-distance">{item.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Agent Info */}
        <div className="agent-card">
          <div className="agent-header">
            <img src={property.agent.image} alt={property.agent.name} className="agent-avatar" />
            <div className="agent-info">
              <h3 className="agent-name">{property.agent.name}</h3>
              <p className="agent-address">{property.agent.address}</p>
              <div className="agent-rating">
                <FaStar className="rating-star" />
                <span>{property.agent.rating}</span>
                <span className="rating-count">({property.agent.deals} معامله)</span>
              </div>
            </div>
          </div>
          
          <div className="agent-actions">
            <button className="agent-action-btn phone" onClick={handleCopyPhone}>
              <FaPhone />
              {copied ? 'کپی شد!' : 'کپی شماره'}
            </button>
            <a 
              href={`https://wa.me/${property.agent.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="agent-action-btn whatsapp"
            >
              <FaWhatsapp />
              واتساپ
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="bottom-actions">
        <button className="action-btn primary" onClick={handleCopyPhone}>
          <FaPhone />
          تماس با مشاور
        </button>
        <a 
          href={`https://wa.me/${property.agent.whatsapp}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="action-btn secondary"
        >
          <FaWhatsapp />
          پیام در واتساپ
        </a>
      </div>

      {/* Copy Toast */}
      {copied && (
        <div className="toast-notification">
          شماره تلفن کپی شد
        </div>
      )}
    </div>
  );
};

export default RealEstateDetailPageItem;

// RealEstateDetailPageItem.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { 
//   FaMapMarkerAlt, 
//   FaPhone, 
//   FaWhatsapp, 
//   FaShare, 
//   FaArrowRight, 
//   FaCopy, 
//   FaCheckCircle,
//   FaHeart,
//   FaRegHeart,
//   FaStar,
//   FaParking,
//   FaWarehouse,
//   FaSwimmingPool,
//   FaFire,
//   FaBath,
//   FaRulerCombined,
//   FaCalendarAlt,
//   FaLayerGroup,
//   FaArrowUp
// } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import NeshanMap from "@neshan-maps-platform/react-openlayers";
// import "@neshan-maps-platform/react-openlayers/dist/style.css";

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './RealEstateDetailPageItem.css';

// Fix for Leaflet marker icons in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// const RealEstateDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState('details');
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [mapReady, setMapReady] = useState(false);

//   شبیه‌سازی دریافت داده از API
//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       setLoading(true);
//       try {
//         شبیه‌سازی تاخیر شبکه
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         setProperty({
//           id: id || 12345,
//           title: "آپارتمان لوکس کلید نخورده جردن",
//           price: "۹,۰۰۰,۰۰۰,۰۰۰",
//           rent: "۳۰,۰۰۰,۰۰۰",
//           type: "فروش",
//           area: 190,
//           rooms: 3,
//           floor: 6,
//           totalFloors: 8,
//           year: 1403,
//           address: "تهران، امانیه، خیابان جردن، کوچه روشن",
//           location: {
//             lat: 35.7199363,
//             lng: 51.4334842
//           },
//           description: `واحد بسیار لوکس و کلید نخورده در بهترین نقطه جردن
// با بهترین مصالح و طراحی مدرن
// مناسب برای خانواده‌های محترم
// دسترسی عالی به مراکز خرید و خدمات شهری

// ویژگی‌های خاص:
// • نمای تمام شیشه
// • نورگیری عالی
// • سقف بلند
// • کفپوش چوبی`,
//           features: [
//             "پارکینگ",
//             "انباری",
//             "آسانسور",
//             "کابینت‌های مدرن",
//             "شیشه‌های دوجداره",
//             "نورگیر",
//             "سرویس فرنگی",
//             "بالکن",
//             "شوفاژ",
//             "کولر مرکزی",
//             "جکوزی",
//             "سونا"
//           ],
//           warnings: [
//             "استعلام خلافی",
//             "بررسی سند مالکیت",
//             "استعلام پایان کار",
//             "بررسی مفاصا حساب",
//             "استعلام از شهرداری",
//             "بررسی مدارک شناسایی"
//           ],
//           images: [
//             "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
//             "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800",
//             "https://images.unsplash.com/photo-1560448204-31e104c7cf0d?w=800",
//             "https://images.unsplash.com/photo-1560448204-3e5a2b93fc6b?w=800",
//             "https://images.unsplash.com/photo-1560448204-1c4d36b9a0b0?w=800"
//           ],
//           agent: {
//             name: "مشاور املاک رویال",
//             phone: "۰۲۱۲۲۳۳۴۴۵۵",
//             whatsapp: "۰۹۱۲۳۴۵۶۷۸۹",
//             address: "تهران، جردن، نبش کوچه روشن",
//             rating: 4.8,
//             deals: 342,
//             image: "https://randomuser.me/api/portraits/men/32.jpg"
//           },
//           views: 1234,
//           saved: 89,
//           createdAt: "۲ روز پیش",
//           certificate: "دارای سند رسمی",
//           mortgage: "قابل وام",
//           nearby: [
//             { name: "مترو", distance: "۵۰۰ متر" },
//             { name: "مرکز خرید", distance: "۳۰۰ متر" },
//             { name: "پارک", distance: "۲۰۰ متر" },
//             { name: "مدرسه", distance: "۴۰۰ متر" }
//           ]
//         });
//         setMapReady(true);
//       } catch (error) {
//         console.error('خطا در دریافت اطلاعات:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyData();
//   }, [id]);

//   const formatPrice = (price) => {
//     if (!price) return '';
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const handleShare = async () => {
//     if (!property) return;
    
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: property.title,
//           text: property.description,
//           url: window.location.href
//         });
//       } catch (error) {
//         console.log('Error sharing:', error);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const handleCopyPhone = () => {
//     if (!property?.agent?.phone) return;
    
//     navigator.clipboard.writeText(property.agent.phone);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   Skeleton Component
//   const DetailSkeleton = () => (
//     <div className="detail-skeleton">
//       <div className="skeleton-header">
//         <div className="skeleton-circle"></div>
//         <div className="skeleton-title"></div>
//         <div className="skeleton-circle"></div>
//       </div>
//       <div className="skeleton-gallery">
//         <div className="skeleton-image"></div>
//       </div>
//       <div className="skeleton-content">
//         <div className="skeleton-price"></div>
//         <div className="skeleton-info">
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//           <div className="skeleton-chip"></div>
//         </div>
//         <div className="skeleton-tabs">
//           <div className="skeleton-tab"></div>
//           <div className="skeleton-tab"></div>
//           <div className="skeleton-tab"></div>
//         </div>
//         <div className="skeleton-text">
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line"></div>
//           <div className="skeleton-line-short"></div>
//         </div>
//         <div className="skeleton-features">
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//           <div className="skeleton-feature"></div>
//         </div>
//       </div>
//       <div className="skeleton-agent">
//         <div className="skeleton-agent-info">
//           <div className="skeleton-avatar"></div>
//           <div className="skeleton-agent-details">
//             <div className="skeleton-agent-name"></div>
//             <div className="skeleton-agent-address"></div>
//           </div>
//         </div>
//       </div>
//       <div className="skeleton-actions">
//         <div className="skeleton-button"></div>
//         <div className="skeleton-button"></div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return <DetailSkeleton />;
//   }

//   if (!property) {
//     return (
//       <div className="detail-container">
//         <div className="detail-header">
//           <button className="header-btn" onClick={() => navigate(-1)}>
//             <FaArrowRight />
//           </button>
//           <h1 className="header-title">خطا</h1>
//           <div className="header-btn"></div>
//         </div>
//         <div className="error-message">
//           <p>متاسفانه ملک مورد نظر یافت نشد</p>
//           <button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="detail-container">
//       {/* Header */}
//       <div className="detail-header">
//         <button className="header-btn" onClick={() => navigate(-1)}>
//           <FaArrowRight />
//         </button>
//         <h1 className="header-title">جزئیات ملک</h1>
//         <button className="header-btn" onClick={handleShare}>
//           <FaShare />
//         </button>
//       </div>

//       {/* Image Gallery */}
//       <div className="detail-gallery">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           spaceBetween={0}
//           slidesPerView={1}
//           onSlideChange={(swiper) => setSelectedImage(swiper.activeIndex)}
//           className="gallery-swiper"
//         >
//           {property.images.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="gallery-slide">
//                 <img 
//                   src={img} 
//                   alt={`${property.title} - تصویر ${index + 1}`}
//                   loading={index === 0 ? 'eager' : 'lazy'}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
        
//         <button 
//           className={`favorite-btn ${isFavorite ? 'active' : ''}`}
//           onClick={() => setIsFavorite(!isFavorite)}
//           aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>
        
//         <div className="image-counter">
//           {selectedImage + 1} / {property.images.length}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="detail-main">
//         {/* Title & Price */}
//         <div className="detail-title-section">
//           <div className="title-row">
//             <h1 className="detail-title">{property.title}</h1>
//             <div className="property-stats">
//               <span className="stat-badge">
//                 <FaFire className="stat-icon" />
//                 {property.views} بازدید
//               </span>
//               <span className="stat-badge">
//                 <FaStar className="stat-icon" />
//                 {property.saved} ذخیره
//               </span>
//             </div>
//           </div>
          
//           <div className="detail-price-box">
//             <div className="price-row main-price">
//               <span className="price-label">قیمت فروش:</span>
//               <span className="price-value">{formatPrice(property.price)}</span>
//               <span className="price-currency">تومان</span>
//             </div>
//             {property.rent && (
//               <div className="price-row rent-price">
//                 <span className="price-label">رهن و اجاره:</span>
//                 <span className="price-value">{formatPrice(property.rent)}</span>
//                 <span className="price-currency">تومان</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Quick Specs */}
//         <div className="quick-specs">
//           <div className="spec-item">
//             <FaRulerCombined className="spec-icon" />
//             <span className="spec-label">متراژ</span>
//             <span className="spec-value">{property.area} متر²</span>
//           </div>
//           <div className="spec-item">
//             <FaBath className="spec-icon" />
//             <span className="spec-label">اتاق</span>
//             <span className="spec-value">{property.rooms} خواب</span>
//           </div>
//           <div className="spec-item">
//             <FaLayerGroup className="spec-icon" />
//             <span className="spec-label">طبقه</span>
//             <span className="spec-value">{property.floor} از {property.totalFloors}</span>
//           </div>
//           <div className="spec-item">
//             <FaCalendarAlt className="spec-icon" />
//             <span className="spec-label">ساخت</span>
//             <span className="spec-value">{property.year}</span>
//           </div>
//         </div>

//         {/* Info Chips */}
//         <div className="info-chips">
//           <span className="info-chip">کد ملک: {property.id}</span>
//           <span className="info-chip">{property.certificate}</span>
//           <span className="info-chip">{property.mortgage}</span>
//         </div>

//         {/* Tabs */}
//         <div className="detail-tabs">
//           <button 
//             className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
//             onClick={() => setActiveTab('details')}
//           >
//             جزئیات
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
//             onClick={() => setActiveTab('features')}
//           >
//             امکانات
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'warnings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('warnings')}
//           >
//             هشدارها
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'nearby' ? 'active' : ''}`}
//             onClick={() => setActiveTab('nearby')}
//           >
//             امکانات اطراف
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'details' && (
//             <div className="details-tab">
//               <div className="address-card">
//                 <FaMapMarkerAlt className="address-icon" />
//                 <div className="address-info">
//                   <h3>آدرس ملک</h3>
//                   <p>{property.address}</p>
//                   <span className="post-date">درج: {property.createdAt}</span>
//                 </div>
//               </div>
              
//               <div className="description-card">
//                 <h3>توضیحات کامل</h3>
//                 <p className="description-text">{property.description}</p>
//               </div>

           

// <div className="map-card">
//   <h3>موقعیت مکانی</h3>
//   <div 
//     className="map-container" 
//     style={{ 
//       height: '300px', 
//       width: '100%', 
//       position: 'relative',
//       overflow: 'hidden'  // مهم
//     }}
//   >
//     {/* نقشه نشان - این حرکت می‌کنه */}
//     <NeshanMap
//       mapKey="web.31c5ea6c425e40cc9b30620a84a8be90"
//       center={{ 
//         latitude: property.location.lat, 
//         longitude: property.location.lng 
//       }}
//       zoom={15}
//       defaultType="dreamy"
//       poi={true}
//       traffic={false}
//       style={{ 
//         height: '100%', 
//         width: '100%',
//         position: 'relative',
//         zIndex: 1
//       }}
//     />
    
//     {/* این دیو رو روی کل نقشه می‌ذاریم تا هیچ حرکتی نکنه */}
//     <div style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       zIndex: 2,
//       pointerEvents: 'none',  // این خیلی مهمه - باعث میشه موس به نقشه برسه
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       {/* آیکون ثابت - این هرگز تکون نمی‌خوره */}
//       <div style={{
//         width: '50px',
//         height: '50px',
//         marginTop: '-25px',  // تنظیم برای اینکه نوک پین دقیق روی نقطه باشه
//         transform: 'translateY(-25%)', // تنظیم بیشتر برای دقت
//       }}>
//         {/* آیکون لوکیشن آبی */}
//         <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
//           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3498db" stroke="white" strokeWidth="2"/>
//           <circle cx="12" cy="9" r="3" fill="white"/>
//         </svg>
//       </div>
//     </div>
//   </div>
  
//   {/* لینک گوگل مپ */}
//   <a 
//     href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '8px',
//       marginTop: '12px',
//       padding: '10px 20px',
//       backgroundColor: '#3498db',
//       color: 'white',
//       textDecoration: 'none',
//       borderRadius: '8px',
//       fontSize: '14px',
//       border: 'none',
//       cursor: 'pointer',
//     }}
//   >
//     <FaMapMarkerAlt />
//     مشاهده در Google Maps
//   </a>
// </div>
//             </div>
//           )}

//           {activeTab === 'features' && (
//             <div className="features-tab">
//               <h3>امکانات و ویژگی‌ها</h3>
//               <div className="features-grid">
//                 {property.features.map((feature, index) => {
//                   let IconComponent = FaCheckCircle;
//                   if (feature === 'پارکینگ') IconComponent = FaParking;
//                   else if (feature === 'انباری') IconComponent = FaWarehouse;
//                   else if (feature === 'آسانسور') IconComponent = FaArrowUp;
//                   else if (feature === 'استخر') IconComponent = FaSwimmingPool;
                  
//                   return (
//                     <div key={index} className="feature-card">
//                       <IconComponent className="feature-icon" />
//                       <span>{feature}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {activeTab === 'warnings' && (
//             <div className="warnings-tab">
//               <h3>⚠️ هشدارهای مهم قبل از معامله</h3>
//               <ul className="warnings-list">
//                 {property.warnings.map((warning, index) => (
//                   <li key={index} className="warning-item">
//                     <span className="warning-bullet"></span>
//                     <span>{warning}</span>
//                   </li>
//                 ))}
//               </ul>
//               <div className="warning-footer">
//                 <p>توجه: لطفاً قبل از هرگونه معامله، مدارک ملک را به دقت بررسی کنید</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'nearby' && (
//             <div className="nearby-tab">
//               <h3>امکانات اطراف ملک</h3>
//               <div className="nearby-list">
//                 {property.nearby.map((item, index) => (
//                   <div key={index} className="nearby-item">
//                     <span className="nearby-name">{item.name}</span>
//                     <span className="nearby-distance">{item.distance}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Agent Info */}
//         <div className="agent-card">
//           <div className="agent-header">
//             <img src={property.agent.image} alt={property.agent.name} className="agent-avatar" />
//             <div className="agent-info">
//               <h3 className="agent-name">{property.agent.name}</h3>
//               <p className="agent-address">{property.agent.address}</p>
//               <div className="agent-rating">
//                 <FaStar className="rating-star" />
//                 <span>{property.agent.rating}</span>
//                 <span className="rating-count">({property.agent.deals} معامله)</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="agent-actions">
//             <button className="agent-action-btn phone" onClick={handleCopyPhone}>
//               <FaPhone />
//               {copied ? 'کپی شد!' : 'کپی شماره'}
//             </button>
//             <a 
//               href={`https://wa.me/${property.agent.whatsapp}`} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="agent-action-btn whatsapp"
//             >
//               <FaWhatsapp />
//               واتساپ
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Action Buttons */}
//       <div className="bottom-actions">
//         <button className="action-btn primary" onClick={handleCopyPhone}>
//           <FaPhone />
//           تماس با مشاور
//         </button>
//         <a 
//           href={`https://wa.me/${property.agent.whatsapp}`} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="action-btn secondary"
//         >
//           <FaWhatsapp />
//           پیام در واتساپ
//         </a>
//       </div>

//       {/* Copy Toast */}
//       {copied && (
//         <div className="toast-notification">
//           شماره تلفن کپی شد
//         </div>
//       )}
//     </div>
//   );
// };

// export default RealEstateDetailPage;