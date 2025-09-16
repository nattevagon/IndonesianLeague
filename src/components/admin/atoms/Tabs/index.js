import { createContext, useContext, useState } from "react";

// Context fot tab
const TabsContext = createContext();

export function Tabs({ children, defaultActive = null }) {
  const [activeTab, setActiveTab] = useState(defaultActive);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabControl({ children }) {
  return <div className="flex items-center gap-4">{children}</div>;
}

export function TabButton({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <div
      className={`relative cursor-pointer group ${isActive ? "text-primary-black dark:text-primary-white" : "text-third-black dark:text-third-white"
        }`}
      onClick={() => setActiveTab(id)}
    >
      {children}
      <span
        className={`absolute left-0 bottom-0 h-0.5 bg-third-black dark:bg-third-white transition-all duration-300 ${isActive ? "w-full" : "w-0"
          } group-hover:w-full`}
      />
    </div>
  );
}

export function TabBody({ children }) {
  return <div className="mt-4">{children}</div>;
}

export function TabContent({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div>{children}</div>;
}