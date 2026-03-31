import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * REUSABLE MODAL COMPONENT
 * Provides a clean, focused, and glassmorphic modal window for admin forms and confirmations.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fade-in">
      {/* Backdrop with frosted glass effect */}
      <div 
        className="absolute inset-0 bg-hero-dark/60 backdrop-blur-sm cursor-pointer transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full ${sizes[size]} bg-[#1A1842] border border-white/10 rounded-[2rem] shadow-2xl shadow-primary/20 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up`}>
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Modal Footer (Optional) */}
        {footer && (
          <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
