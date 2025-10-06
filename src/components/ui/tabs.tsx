"use client";

import * as React from "react";
import clsx from "clsx";

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
}) {
  const [current, setCurrent] = React.useState(defaultValue ?? "");

  const activeValue = value ?? current;

  const changeTab = (val: string) => {
    setCurrent(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, changeTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

const TabsContext = React.createContext<{
  value: string;
  changeTab: (val: string) => void;
}>({
  value: "",
  changeTab: () => {},
});

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex gap-2", className)}>{children}</div>;
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { value: activeValue, changeTab } = React.useContext(TabsContext);

  const isActive = activeValue === value;

  return (
    <button
      onClick={() => changeTab(value)}
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition",
        isActive
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const { value: activeValue } = React.useContext(TabsContext);

  if (activeValue !== value) return null;

  return <div className="mt-4">{children}</div>;
}

