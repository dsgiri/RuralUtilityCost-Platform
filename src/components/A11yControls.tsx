import React, { useState, useRef, useEffect } from 'react';
import { Settings2, Sun, Moon, Eye, Monitor, X } from 'lucide-react';
import { useA11y } from './A11yProvider';

export function A11yControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, fontSize, contrast, motion, setTheme, setFontSize, setContrast, setMotion } = useA11y();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative print:hidden" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5f3f] dark:focus-visible:ring-[#6ee7b7]"
        aria-label="Accessibility Settings"
        aria-expanded={isOpen}
      >
        <Settings2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#1a5f3f] dark:text-[#6ee7b7]" /> Accessibility
            </h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close settings" className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider" id="theme-group-label">Theme</span>
            <div className="flex bg-gray-50 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700" role="group" aria-labelledby="theme-group-label">
              <button 
                onClick={() => setTheme('light')} 
                className={`flex-1 flex justify-center items-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-[#1a5f3f]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              ><Sun className="w-3.5 h-3.5"/> Light</button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`flex-1 flex justify-center items-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-[#6ee7b7]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              ><Moon className="w-3.5 h-3.5"/> Dark</button>
              <button 
                onClick={() => setTheme('system')} 
                className={`flex-1 flex justify-center items-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${theme === 'system' ? 'bg-white dark:bg-gray-800 shadow-sm text-[#1a5f3f] dark:text-[#6ee7b7]' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              ><Monitor className="w-3.5 h-3.5"/> Auto</button>
            </div>
          </div>

          {/* Text Size */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider" id="text-size-label">Text Size</span>
            <div className="flex space-x-2" role="group" aria-labelledby="text-size-label">
              <button onClick={() => setFontSize('small')} className={`flex-1 py-1.5 rounded border text-xs font-medium ${fontSize === 'small' ? 'bg-[#1a5f3f] text-white border-[#1a5f3f]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>A-</button>
              <button onClick={() => setFontSize('normal')} className={`flex-1 py-1.5 rounded border text-xs font-medium ${fontSize === 'normal' ? 'bg-[#1a5f3f] text-white border-[#1a5f3f]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>A</button>
              <button onClick={() => setFontSize('large')} className={`flex-1 py-1.5 rounded border text-md font-medium ${fontSize === 'large' ? 'bg-[#1a5f3f] text-white border-[#1a5f3f]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>A+</button>
              <button onClick={() => setFontSize('xlarge')} className={`flex-1 py-1.5 rounded border text-lg font-medium ${fontSize === 'xlarge' ? 'bg-[#1a5f3f] text-white border-[#1a5f3f]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>A++</button>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">High Contrast</span>
              <input 
                type="checkbox" 
                aria-label="Toggle High Contrast"
                className="sr-only peer" 
                checked={contrast === 'high'}
                onChange={(e) => setContrast(e.target.checked ? 'high' : 'normal')}
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1a5f3f] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1a5f3f] relative"></div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Reduced Motion</span>
              <input 
                type="checkbox" 
                aria-label="Toggle Reduced Motion"
                className="sr-only peer"
                checked={motion === 'reduced'}
                onChange={(e) => setMotion(e.target.checked ? 'reduced' : 'normal')} 
              />
              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#1a5f3f] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1a5f3f] relative"></div>
            </label>
          </div>

        </div>
      )}
    </div>
  );
}
