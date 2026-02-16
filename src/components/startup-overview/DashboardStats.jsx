import React, { useState, useEffect } from 'react';
import './DashboardStats.css';

export default function DashboardStats() {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (activeCard !== null) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeCard]);

  const stats = [
    {
      title: 'Total Startups',
      value: '87',
      isPositive: true,
      iconBg: '#10b981',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 21.9999V3.99994C6 3.46951 6.21071 2.9608 6.58579 2.58573C6.96086 2.21065 7.46957 1.99994 8 1.99994H16C16.5304 1.99994 17.0391 2.21065 17.4142 2.58573C17.7893 2.9608 18 3.46951 18 3.99994V21.9999H6Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.00002 12H4.00002C3.46958 12 2.96087 12.2107 2.5858 12.5858C2.21073 12.9609 2.00002 13.4696 2.00002 14V20C2.00002 20.5304 2.21073 21.0391 2.5858 21.4142C2.96087 21.7893 3.46958 22 4.00002 22H6.00002" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99998 6H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99998 10.0001H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99998 14.0001H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99998 18H14" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      )
    },
    {
      title: 'Active Investors',
      value: '1,258',
      isPositive: true,
      iconBg: '#3b82f6',
      icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7.15994C17.94 7.14994 17.87 7.14994 17.81 7.15994C16.43 7.10994 15.33 5.97994 15.33 4.57994C15.33 3.14994 16.48 1.99994 17.91 1.99994C19.34 1.99994 20.49 3.15994 20.49 4.57994C20.48 5.97994 19.38 7.10994 18 7.15994Z" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.97 14.44C18.34 14.67 19.85 14.43 20.91 13.72C22.32 12.78 22.32 11.24 20.91 10.3C19.84 9.58998 18.31 9.34997 16.94 9.58997" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.96994 7.15994C6.02994 7.14994 6.09994 7.14994 6.15994 7.15994C7.53994 7.10994 8.63994 5.97994 8.63994 4.57994C8.63994 3.14994 7.48994 1.99994 6.05994 1.99994C4.62994 1.99994 3.47994 3.15994 3.47994 4.57994C3.48994 5.97994 4.58994 7.10994 5.96994 7.15994Z" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.99996 14.44C5.62996 14.67 4.11996 14.43 3.05996 13.72C1.64996 12.78 1.64996 11.24 3.05996 10.3C4.12996 9.58998 5.65996 9.34997 7.02996 9.58997" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.47003 11.91 9.47003C13.34 9.47003 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="white" stroke-width="1.15603" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      )
    },
    {
      title: 'Tokenized Startups',
      value: '34',
      isPositive: true,
      iconBg: '#f97316',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.9999C11.3137 13.9999 14 11.3136 14 7.99994C14 4.68623 11.3137 1.99994 8 1.99994C4.68629 1.99994 2 4.68623 2 7.99994C2 11.3136 4.68629 13.9999 8 13.9999Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.09 10.37C19.0353 10.7224 19.8765 11.3075 20.5357 12.0712C21.195 12.8349 21.651 13.7524 21.8617 14.7391C22.0724 15.7257 22.0309 16.7495 21.741 17.7158C21.4512 18.6822 20.9223 19.5598 20.2034 20.2676C19.4845 20.9754 18.5987 21.4905 17.6279 21.7652C16.6572 22.04 15.6329 22.0655 14.6496 21.8395C13.6664 21.6134 12.7561 21.1431 12.0028 20.472C11.2495 19.8009 10.6776 18.9507 10.34 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 6H8V10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.71 13.8801L17.41 14.5901L14.59 17.4101" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      )
    },
    {
      title: 'Zakat Pending',
      value: '$42.5k',
      isPositive: false,
      iconBg: '#a855f7',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.10602L11.492 3.65802C11.6304 3.78521 11.8115 3.8558 11.9995 3.8558C12.1875 3.8558 12.3686 3.78521 12.507 3.65802L12 3.10602ZM10.592 8.19602C9.902 7.69302 9.165 7.08102 8.609 6.43602C8.035 5.77102 7.75 5.18202 7.75 4.71502H6.25C6.25 5.73202 6.828 6.66902 7.473 7.41602C8.136 8.18402 8.974 8.87302 9.708 9.40802L10.592 8.19602ZM7.75 4.71502C7.75 3.65602 8.27 3.05202 8.896 2.84202C9.548 2.62202 10.52 2.76402 11.492 3.65802L12.507 2.55402C11.23 1.38002 9.704 0.988018 8.418 1.42002C7.105 1.86202 6.25 3.09602 6.25 4.71502H7.75ZM14.292 9.40802C15.026 8.87402 15.864 8.18402 16.527 7.41602C17.172 6.66902 17.75 5.73202 17.75 4.71502H16.25C16.25 5.18202 15.966 5.77102 15.391 6.43602C14.835 7.08102 14.099 7.69302 13.409 8.19602L14.292 9.40802ZM17.75 4.71502C17.75 3.09602 16.895 1.86202 15.583 1.42002C14.297 0.988018 12.77 1.38002 11.493 2.55402L12.508 3.65802C13.48 2.76402 14.453 2.62202 15.105 2.84202C15.73 3.05202 16.25 3.65602 16.25 4.71502H17.75ZM9.708 9.40802C10.463 9.95802 11.062 10.426 12 10.426V8.92602C11.635 8.92602 11.435 8.81102 10.592 8.19602L9.708 9.40802ZM13.408 8.19602C12.565 8.81102 12.365 8.92602 12 8.92602V10.426C12.938 10.426 13.537 9.95902 14.292 9.40802L13.408 8.19602Z" fill="white"/>
<path d="M5 20.388H7.26C8.27 20.388 9.293 20.494 10.276 20.696C12.0311 21.0555 13.8367 21.0954 15.606 20.814C16.474 20.674 17.326 20.459 18.098 20.087C18.794 19.75 19.647 19.277 20.22 18.746C20.792 18.216 21.388 17.349 21.81 16.671C22.174 16.089 21.998 15.376 21.424 14.943C21.1013 14.7088 20.7127 14.5827 20.314 14.5827C19.9153 14.5827 19.5267 14.7088 19.204 14.943L17.397 16.308C16.697 16.838 15.932 17.325 15.021 17.47C14.911 17.4874 14.796 17.503 14.676 17.517M14.676 17.517L14.566 17.529M14.676 17.517C14.836 17.4737 14.9828 17.3912 15.103 17.277C15.2539 17.1468 15.3772 16.9877 15.4655 16.809C15.5538 16.6302 15.6054 16.4356 15.6171 16.2367C15.6289 16.0377 15.6006 15.8384 15.5339 15.6505C15.4672 15.4627 15.3636 15.2901 15.229 15.143C15.0987 14.9984 14.9469 14.8746 14.779 14.776C11.982 13.107 7.629 14.378 5 16.243M14.676 17.517C14.6399 17.5251 14.603 17.5291 14.566 17.529M14.566 17.529C13.9629 17.5895 13.3554 17.5908 12.752 17.533" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 15.5C5 14.6716 4.32843 14 3.5 14C2.67157 14 2 14.6716 2 15.5V20.5C2 21.3284 2.67157 22 3.5 22C4.32843 22 5 21.3284 5 20.5V15.5Z" stroke="white" stroke-width="1.5"/>
</svg>

      )
    }
  ];

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <div className="dashboard-stats">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`stat-card ${activeCard === index ? 'stat-card--active' : ''}`}
          onClick={() => handleCardClick(index)}
          onMouseEnter={() => setActiveCard(index)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <div className="stat-card-header">
            <span className="stat-title">{stat.title}</span>
            <div className="stat-icon" style={{ backgroundColor: stat.iconBg }}>
              {stat.icon}
            </div>
          </div>
          
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}