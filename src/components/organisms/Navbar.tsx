// "use client"; // Required for hooks

// import Link from "next/link";
// import { useState } from "react";
// import { Menu } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link href="/">
//               <span className="text-2xl font-bold text-purple-600 cursor-pointer">
//                 Mutual Fund Explorer
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
//               Home
//             </Link>
//             <Link href="/funds" className="text-gray-700 hover:text-purple-600 font-medium">
//               Mutual Funds
//             </Link>
//             <Link
//               href="/calculators/sip"
//               className="text-gray-700 hover:text-purple-600 font-medium"
//             >
//               SIP / Lumpsum / SWP
//             </Link>
//             <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 font-medium">
//               Portfolio
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-purple-600 focus:outline-none"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <Link
//             href="/"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-3 text-gray-700 hover:bg-purple-50"
//           >
//             Home
//           </Link>
//           <Link
//             href="/funds"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-3 text-gray-700 hover:bg-purple-50"
//           >
//             Mutual Funds
//           </Link>
//           <Link
//             href="/calculators/sip"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-3 text-gray-700 hover:bg-purple-50"
//           >
//             SIP / Lumpsum / SWP
//           </Link>
//           <Link
//             href="/portfolio"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-3 text-gray-700 hover:bg-purple-50"
//           >
//             Portfolio
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, TrendingUp, Calculator, Briefcase, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/funds", label: "Mutual Funds", icon: TrendingUp },
    { href: "/calculators", label: "Calculators", icon: Calculator },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  MF Explorer
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      active
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <Link
                href="/portfolio"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-72 bg-white z-40 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/portfolio"
              className="block w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  );
}