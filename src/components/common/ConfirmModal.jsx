// src/components/common/ConfirmModal.jsx
import React from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; border-radius: 12px; padding: 2rem;
          width: 90%; max-width: 450px; text-align: center;
        }
        .modal-title { margin: 0 0 1rem 0; font-size: 1.5rem; }
        .modal-body { color: #6c757d; margin-bottom: 2rem; }
        .modal-actions { display: flex; gap: 1rem; justify-content: center; }
        .modal-btn {
          border: none; border-radius: 8px; padding: 0.7rem 1.5rem;
          font-weight: 600; cursor: pointer; transition: all 0.2s;
        }
        .confirm-btn { background: #E53935; color: #fff; }
        .confirm-btn:hover { background: #c62828; }
        .cancel-btn { background: #f0f0f0; color: #333; }
        .cancel-btn:hover { background: #e0e0e0; }
      `}</style>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">{title}</h2>
          <div className="modal-body">{children}</div>
          <div className="modal-actions">
            <button onClick={onClose} className="modal-btn cancel-btn">Отмена</button>
            <button onClick={onConfirm} className="modal-btn confirm-btn">Да, удалить</button>
          </div>
        </div>
      </div>
    </>
  );
}