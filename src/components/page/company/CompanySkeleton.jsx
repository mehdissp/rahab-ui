// CompanySkeleton.js

import React from 'react';
import './CompanySkeleton.css';

const CompanySkeleton = ({ rows = 10 }) => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-header">
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
        <div className="skeleton-header-cell"></div>
      </div>
      <div className="skeleton-body">
        {[...Array(rows)].map((_, index) => (
          <div key={index} className="skeleton-row">
            <div className="skeleton-cell">
              <div className="skeleton-text skeleton-index"></div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-company">
                <div className="skeleton-icon"></div>
                <div className="skeleton-company-info">
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text skeleton-code"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-text skeleton-description"></div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-text skeleton-date"></div>
            </div>
            <div className="skeleton-cell">
              <div className="skeleton-actions">
                <div className="skeleton-action-btn"></div>
                <div className="skeleton-action-btn"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySkeleton;