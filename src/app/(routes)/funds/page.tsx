// "use client";
// import { useState } from "react";
// import useFetch from "../../../hooks/useFetch";
// import FundCard from "../../../components/molecules/FundCard";
// import Loader from "../../../components/atoms/Loader";

// export default function FundsPage() {
//   const [query, setQuery] = useState("");
//   const { data, loading } = useFetch("https://api.mfapi.in/mf");

//   const filteredFunds = data?.filter((fund: any) =>
//     fund.schemeName.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">All Mutual Funds</h2>
//       <input
//         type="text"
//         placeholder="Search by fund name..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="border p-2 w-full mb-6"
//       />
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredFunds?.slice(0, 50).map((fund: any) => (
//             <FundCard key={fund.schemeCode} fund={fund} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, TrendingUp, Search, Filter, X, Heart, BarChart3, ChevronLeft, ChevronRight, Calendar, ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function FundsDashboard() {
  const [currentPage, setCurrentPage] = useState("list");
  const [selectedFundCode, setSelectedFundCode] = useState(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentPage === "list" ? (
        <FundsListPage onSelectFund={(code) => {
          setSelectedFundCode(code);
          setCurrentPage("details");
        }} />
      ) : (
        <FundDetailsPage 
          schemeCode={selectedFundCode} 
          onBack={() => setCurrentPage("list")} 
        />
      )}
    </div>
  );
}

function FundsListPage({ onSelectFund }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedFunds, setDisplayedFunds] = useState([]);
  const observerTarget = useRef(null);
  
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await fetch("https://api.mfapi.in/mf");
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching funds:", error);
      setLoading(false);
    }
  };

  const toggleWatchlist = (fund) => {
    setWatchlist(prev => {
      const exists = prev.find(f => f.schemeCode === fund.schemeCode);
      if (exists) {
        return prev.filter(f => f.schemeCode !== fund.schemeCode);
      }
      return [...prev, fund];
    });
  };

  const isInWatchlist = (schemeCode) => {
    return watchlist.some(f => f.schemeCode === schemeCode);
  };

  const getCategories = () => {
    const categories = new Set();
    data.forEach(fund => {
      const match = fund.schemeName.match(/\b(Equity|Debt|Hybrid|Liquid|ELSS|Index|Balanced)\b/i);
      if (match) categories.add(match[0]);
    });
    return Array.from(categories);
  };

  const filteredFunds = data?.filter((fund) => {
    const matchesQuery = fund.schemeName.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "all" || 
      fund.schemeName.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesTab = activeTab === "all" || 
      (activeTab === "watchlist" && isInWatchlist(fund.schemeCode));
    return matchesQuery && matchesCategory && matchesTab;
  });

  const totalPages = Math.ceil(filteredFunds.length / ITEMS_PER_PAGE);
  const paginatedFunds = filteredFunds.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Lazy loading for displayed funds
  useEffect(() => {
    setDisplayedFunds(paginatedFunds.slice(0, 6));
  }, [currentPage, filteredFunds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedFunds.length < paginatedFunds.length) {
          setDisplayedFunds(prev => [
            ...prev,
            ...paginatedFunds.slice(prev.length, prev.length + 6)
          ]);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [displayedFunds, paginatedFunds]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Mutual Funds Dashboard
        </h1>
        <p className="text-gray-600">Explore and track mutual funds in real-time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Funds</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Watchlist</p>
              <p className="text-3xl font-bold text-gray-900">{watchlist.length}</p>
            </div>
            <Heart className="w-12 h-12 text-purple-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{getCategories().length}</p>
            </div>
            <Filter className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 px-4 font-medium transition-all ${
            activeTab === "all"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All Funds
        </button>
        <button
          onClick={() => setActiveTab("watchlist")}
          className={`pb-3 px-4 font-medium transition-all flex items-center gap-2 ${
            activeTab === "watchlist"
              ? "border-b-2 border-purple-500 text-purple-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Heart className="w-4 h-4" />
          My Watchlist
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by fund name..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Categories</option>
            {getCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Funds Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedFunds.map((fund) => (
              <FundCard
                key={fund.schemeCode}
                fund={fund}
                isInWatchlist={isInWatchlist(fund.schemeCode)}
                onToggleWatchlist={() => toggleWatchlist(fund)}
                onViewDetails={() => onSelectFund(fund.schemeCode)}
              />
            ))}
          </div>
          
          {displayedFunds.length < paginatedFunds.length && (
            <div ref={observerTarget} className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {filteredFunds?.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No funds found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

function FundCard({ fund, isInWatchlist, onToggleWatchlist, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {fund.schemeName}
            </h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Code: {fund.schemeCode}
            </span>
          </div>
          <button onClick={onToggleWatchlist} className="ml-2">
            <Heart
              className={`w-6 h-6 transition-all ${
                isInWatchlist
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>
        </div>
        
        <button
          onClick={onViewDetails}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
}

function FundDetailsPage({ schemeCode, onBack }) {
  const [fundDetails, setFundDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");

  useEffect(() => {
    fetchFundDetails();
  }, [schemeCode]);

  const fetchFundDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      const result = await response.json();
      setFundDetails(result);
    } catch (error) {
      console.error("Error fetching fund details:", error);
    }
    setLoading(false);
  };

  const calculateReturns = (data, days) => {
    if (!data || data.length < days) return null;
    const latest = parseFloat(data[0].nav);
    const previous = parseFloat(data[Math.min(days, data.length - 1)].nav);
    const returns = ((latest - previous) / previous) * 100;
    return returns.toFixed(2);
  };

  const getChartData = (period) => {
    if (!fundDetails?.data) return [];
    
    let days;
    switch(period) {
      case "1M": days = 30; break;
      case "3M": days = 90; break;
      case "6M": days = 180; break;
      case "1Y": days = 365; break;
      case "3Y": days = 1095; break;
      case "5Y": days = 1825; break;
      default: days = 365;
    }
    
    const dataSlice = fundDetails.data.slice(0, Math.min(days, fundDetails.data.length));
    return dataSlice.reverse().map(item => ({
      date: item.date,
      nav: parseFloat(item.nav),
      shortDate: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  };

  const calculateRollingReturns = (period) => {
    if (!fundDetails?.data) return [];
    
    let windowDays;
    switch(period) {
      case "1M": windowDays = 30; break;
      case "1Y": windowDays = 365; break;
      case "3Y": windowDays = 1095; break;
      case "5Y": windowDays = 1825; break;
      default: windowDays = 365;
    }
    
    const returns = [];
    const data = fundDetails.data;
    
    for (let i = 0; i < data.length - windowDays; i += 30) {
      const currentNav = parseFloat(data[i].nav);
      const pastNav = parseFloat(data[i + windowDays].nav);
      const returnPct = ((currentNav - pastNav) / pastNav) * 100;
      
      returns.push({
        date: data[i].date,
        return: parseFloat(returnPct.toFixed(2)),
        shortDate: new Date(data[i].date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      });
    }
    
    return returns.reverse();
  };

  const periods = [
    { label: "1 Month", value: "1M" },
    { label: "3 Months", value: "3M" },
    { label: "6 Months", value: "6M" },
    { label: "1 Year", value: "1Y" },
    { label: "3 Years", value: "3Y" },
    { label: "5 Years", value: "5Y" }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!fundDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Unable to load fund details</p>
      </div>
    );
  }

  const chartData = getChartData(selectedPeriod);
  const rollingReturns = calculateRollingReturns(selectedPeriod);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Funds List
      </button>

      {/* Fund Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{fundDetails.meta?.scheme_name}</h1>
        <p className="text-blue-100 mb-4">Scheme Code: {fundDetails.meta?.scheme_code}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Fund House</p>
            <p className="text-lg font-semibold">{fundDetails.meta?.fund_house}</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Scheme Type</p>
            <p className="text-lg font-semibold">{fundDetails.meta?.scheme_type}</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-blue-100 mb-1">Scheme Category</p>
            <p className="text-lg font-semibold">{fundDetails.meta?.scheme_category}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-1">Current NAV</p>
          <p className="text-3xl font-bold text-gray-900">₹{fundDetails.data[0]?.nav}</p>
          <p className="text-xs text-gray-500 mt-1">{fundDetails.data[0]?.date}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-1">1 Month</p>
          <p className={`text-2xl font-bold ${
            calculateReturns(fundDetails.data, 30) >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {calculateReturns(fundDetails.data, 30)}%
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600 mb-1">1 Year</p>
          <p className={`text-2xl font-bold ${
            calculateReturns(fundDetails.data, 365) >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {calculateReturns(fundDetails.data, 365)}%
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600 mb-1">3 Years</p>
          <p className={`text-2xl font-bold ${
            calculateReturns(fundDetails.data, 1095) >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {calculateReturns(fundDetails.data, 1095)}%
          </p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          {periods.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period.value
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* NAV Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">NAV Trend - {selectedPeriod}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="shortDate" 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value) => [`₹${value}`, 'NAV']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="nav" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              name="NAV"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rolling Returns Chart */}
      {rollingReturns.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Rolling Returns - {selectedPeriod}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={rollingReturns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="shortDate" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                label={{ value: 'Returns (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => [`${value}%`, 'Return']}
              />
              <Legend />
              <Bar 
                dataKey="return" 
                fill="#8b5cf6"
                name="Rolling Return %"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent NAV History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent NAV History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">NAV</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Change</th>
              </tr>
            </thead>
            <tbody>
              {fundDetails.data.slice(0, 30).map((item, index) => {
                const prevNav = index < fundDetails.data.length - 1 ? parseFloat(fundDetails.data[index + 1].nav) : null;
                const currentNav = parseFloat(item.nav);
                const change = prevNav ? ((currentNav - prevNav) / prevNav * 100).toFixed(2) : null;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">{item.date}</td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">₹{item.nav}</td>
                    <td className={`py-3 px-4 text-right font-semibold ${
                      change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
                    }`}>
                      {change ? `${change > 0 ? '+' : ''}${change}%` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}