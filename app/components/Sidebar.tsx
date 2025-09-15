"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Patients", href: "/patients" },
  { label: "Appointments", href: "/appointments" },
  { label: "Clinical", href: "/clinical" },
  { label: "Billing", href: "/billing" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`bg-gray-800 text-white h-screen p-4 fixed transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h1 className="text-2xl font-bold">EHR Dashboard</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded hover:bg-gray-700 transition-colors ${
              pathname === item.href ? "bg-gray-700" : ""
            } ${isCollapsed ? "flex justify-center" : ""}`}
            title={isCollapsed ? item.label : ""}
          >
            {isCollapsed ? item.label.charAt(0) : item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
