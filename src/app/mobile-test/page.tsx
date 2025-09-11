'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MobileTestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigationItems = [
    { href: '/', label: 'Home', description: 'Gallery homepage' },
    { href: '/portfolio', label: 'Portfolio', description: 'Browse artworks' },
    { href: '/shop', label: 'Shop', description: 'Purchase art' },
    { href: '/about', label: 'About', description: 'Artist information' },
    { href: '/contact', label: 'Contact', description: 'Get in touch' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Mobile Navigation Test</h1>
      
      {/* Test Button */}
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      <p className="mb-4">Menu is: {isOpen ? 'OPEN' : 'CLOSED'}</p>

      {/* Simple Mobile Menu */}
      {isOpen && (
        <div
          className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-[9999]"
          style={{
            backgroundColor: '#ffffff',
            borderLeft: '3px solid #ff0000',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: '#000000' }}>
                TEST MENU
              </h2>
              <button
                onClick={toggleMenu}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div style={{ backgroundColor: '#ffff00', padding: '8px', color: '#000000' }}>
                DEBUG: {navigationItems.length} navigation items
              </div>
              
              {navigationItems.map((item, index) => (
                <div
                  key={item.href}
                  style={{
                    backgroundColor: '#f0f0f0',
                    border: '2px solid #000000',
                    padding: '16px',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ color: '#000000', fontSize: '18px', fontWeight: 'bold' }}>
                    TEST: {item.label} (Item {index + 1})
                  </h3>
                  <p style={{ color: '#666666', fontSize: '14px' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998]"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default MobileTestPage;
