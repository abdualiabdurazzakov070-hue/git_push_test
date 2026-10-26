import React from 'react';
import { SparklesIcon } from './Icons';

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">
        <SparklesIcon size={16} />
      </span>
      <span className="toast-text">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
