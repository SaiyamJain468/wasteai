import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Menu, X } from 'lucide-react';

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  colors: any;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, children, colors }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        fontSize: '15px',
        fontWeight: 500,
        color: isHovered ? colors.textPrimary : (isActive ? colors.primary : colors.textSecondary),
        textDecoration: 'none',
        borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'color 200ms, border-color 200ms',
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </NavLink>
  );
};

export default function Navbar() {
  const { colors, mode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Impact', path: '/impact' },
    { name: 'Education', path: '/education' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 32px', // Desktop padding
          transition: 'background-color 200ms, border-color 200ms',
        }}
        className="navbar-padding" // Helper class for media query padding if needed
      >
        <Link
          to="/"
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: colors.primary,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ♻ WasteAI
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLinkItem key={link.name} to={link.path} colors={colors}>
              {link.name}
            </NavLinkItem>
          ))}
        </div>

        <div className="flex items-center">
          <button
            className="md:hidden flex items-center justify-center"
            onClick={toggleMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textPrimary,
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1001,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          backgroundColor: colors.surface,
          borderRight: `1px solid ${colors.border}`,
          zIndex: 1002,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 200ms ease-in-out',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <span
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: colors.primary,
            }}
          >
            ♻ WasteAI
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: colors.textPrimary,
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={({ isActive }) => ({
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '24px',
                fontSize: '16px',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? '#FFFFFF' : colors.textPrimary,
                backgroundColor: isActive ? colors.primary : 'transparent',
                borderBottom: `1px solid ${colors.border}`,
                width: '100%',
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div
          style={{
            padding: '24px',
            borderTop: `1px solid ${colors.border}`,
            color: colors.textSecondary,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {mode === 'dark' ? '🌙 Dark Mode' : '☀ Light Mode'}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .navbar-padding {
            padding: 0 16px !important;
          }
        }
      `}</style>
    </>
  );
}

