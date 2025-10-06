import React from "react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  return (
    <aside
      className={`w-64 h-screen bg-gray-100 p-4 border-r ${className}`}
    >
      <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="hover:text-blue-600">
          Overview
        </Link>
        <Link href="/dashboard/reports" className="hover:text-blue-600">
          Reports
        </Link>
        <Link href="/funds" className="hover:text-blue-600">
          Funds
        </Link>
        <Link href="/calculators/sip" className="hover:text-blue-600">
          SIP Calculator
        </Link>
        <Link href="/calculators/swp" className="hover:text-blue-600">
          SWP Calculator
        </Link>
        <Link href="/calculators/lumpsum" className="hover:text-blue-600">
          Lumpsum Calculator
        </Link>
        <Link href="/calculators/compare" className="hover:text-blue-600">
          Compare
        </Link>
      </nav>
    </aside>
  );
}
