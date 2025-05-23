import React from 'react';

interface PlaceholderArtProps {
  type: 'background' | 'shop' | 'artifacts' | 'lore' | 'frame' | 'button' | 'stats' | 'event' | 'quest' | 'secret' | 'combo' | 'achievement';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const PlaceholderArt: React.FC<PlaceholderArtProps> = ({ type, width = '100%', height = '100%', className = '' }) => {
  const getPlaceholderContent = () => {
    switch (type) {
      case 'background':
        return (
          <svg width={width} height={height} className={`absolute inset-0 ${className}`}>
            <defs>
              <pattern id="bg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.3"/>
              </pattern>
              <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.05"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#bg-grid)"/>
            <rect width="100%" height="100%" fill="url(#bg-glow)"/>
            <circle cx="20%" cy="30%" r="100" fill="#3b82f6" opacity="0.05"/>
            <circle cx="80%" cy="70%" r="150" fill="#8b5cf6" opacity="0.03"/>
            <text x="50%" y="50%" textAnchor="middle" fill="#475569" fontSize="24" fontFamily="monospace" opacity="0.3">
              BACKGROUND PLACEHOLDER
            </text>
          </svg>
        );
      
      case 'shop':
        return (
          <div className={`absolute inset-0 ${className} pointer-events-none`}>
            <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#1e293b" opacity="0.1"/>
              <rect x="5%" y="10%" width="90%" height="20%" fill="#3b82f6" opacity="0.1" rx="4"/>
              <rect x="5%" y="35%" width="90%" height="20%" fill="#10b981" opacity="0.1" rx="4"/>
              <rect x="5%" y="60%" width="90%" height="20%" fill="#f59e0b" opacity="0.1" rx="4"/>
              <text x="50%" y="90%" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="monospace">
                SHOP PLACEHOLDER
              </text>
            </svg>
          </div>
        );
      
      case 'artifacts':
        return (
          <div className={`absolute inset-0 ${className} pointer-events-none`}>
            <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#1e293b" opacity="0.1"/>
              <polygon points="50,20 60,40 80,40 66,52 72,72 50,60 28,72 34,52 20,40 40,40" fill="#fbbf24" opacity="0.1"/>
              <circle cx="30%" cy="70%" r="20" fill="#8b5cf6" opacity="0.1"/>
              <circle cx="70%" cy="70%" r="20" fill="#ef4444" opacity="0.1"/>
              <text x="50%" y="90%" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="monospace">
                ARTIFACTS PLACEHOLDER
              </text>
            </svg>
          </div>
        );
      
      case 'lore':
        return (
          <div className={`absolute inset-0 ${className} pointer-events-none`}>
            <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#1e293b" opacity="0.1"/>
              <rect x="20%" y="25%" width="60%" height="3%" fill="#64748b" opacity="0.2" rx="2"/>
              <rect x="20%" y="35%" width="50%" height="3%" fill="#64748b" opacity="0.2" rx="2"/>
              <rect x="20%" y="45%" width="55%" height="3%" fill="#64748b" opacity="0.2" rx="2"/>
              <rect x="20%" y="55%" width="45%" height="3%" fill="#64748b" opacity="0.2" rx="2"/>
              <text x="50%" y="75%" textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="monospace">
                LORE PLACEHOLDER
              </text>
            </svg>
          </div>
        );
      
      case 'event':
        return (
          <div className={`absolute inset-0 ${className} pointer-events-none`}>
            <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#7c3aed" opacity="0.1" rx="8"/>
              <circle cx="50%" cy="40%" r="15%" fill="#a855f7" opacity="0.2"/>
              <rect x="20%" y="65%" width="60%" height="8%" fill="#8b5cf6" opacity="0.1" rx="4"/>
              <text x="50%" y="85%" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontFamily="monospace">
                EVENT PLACEHOLDER
              </text>
            </svg>
          </div>
        );
      
      default:
        return (
          <div className={`absolute inset-0 ${className} pointer-events-none`}>
            <svg width="100%" height="100%" className="absolute inset-0" preserveAspectRatio="none">
              <rect width="100%" height="100%" fill="#1e293b" opacity="0.1"/>
              <text x="50%" y="50%" textAnchor="middle" fill="#64748b" fontSize="14" fontFamily="monospace">
                {type.toUpperCase()} PLACEHOLDER
              </text>
            </svg>
          </div>
        );
    }
  };

  return getPlaceholderContent();
};

export { PlaceholderArt };
export default PlaceholderArt;