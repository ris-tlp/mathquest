import React, { useState } from 'react';

// Tabs component: Manages the state of active tab and renders tabs and content
const Tabs = ({ children }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  // Click handler for tab buttons
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-8/12 sm:w-[100%] m-10 px-4">
      <div className="flex border-b border-gray-300">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'border-b-2 border-blue-500' : ''
            } flex-1 text-white text-lg font-medium py-2`}
            onClick={e => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="pt-2 py-20 relative">
        {children.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

// Tab component: Represents an individual tab with its content
const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};

// Export Tabs and Tab components for external use
export { Tabs, Tab };