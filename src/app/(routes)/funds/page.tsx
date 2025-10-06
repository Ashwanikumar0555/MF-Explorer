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
import { useState, useEffect } from "react";
import { Star, TrendingUp, Search, Filter, X, Heart, BarChart3 } from "lucide-react";

export default function FundsDashboard() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundDetails, setFundDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  const fetchFundDetails = async (schemeCode) => {
    setLoadingDetails(true);
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
      const result = await response.json();
      setFundDetails(result);
    } catch (error) {
      console.error("Error fetching fund details:", error);
    }
    setLoadingDetails(false);
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

  const openFundDetails = (fund) => {
    setSelectedFund(fund);
    fetchFundDetails(fund.schemeCode);
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

  const calculateReturns = (data) => {
    if (!data || data.length < 2) return null;
    const latest = parseFloat(data[0].nav);
    const previous = parseFloat(data[Math.min(30, data.length - 1)].nav);
    const returns = ((latest - previous) / previous) * 100;
    return returns.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFunds?.slice(0, 50).map((fund) => (
              <div
                key={fund.schemeCode}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300"
              >
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
                    <button
                      onClick={() => toggleWatchlist(fund)}
                      className="ml-2"
                    >
                      <Heart
                        className={`w-6 h-6 transition-all ${
                          isInWatchlist(fund.schemeCode)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => openFundDetails(fund)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFunds?.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No funds found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modal for Fund Details */}
      {selectedFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedFund.schemeName}</h2>
                <p className="text-blue-100">Scheme Code: {selectedFund.schemeCode}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedFund(null);
                  setFundDetails(null);
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {loadingDetails ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : fundDetails ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                      <p className="text-sm text-green-700 mb-1">Latest NAV</p>
                      <p className="text-3xl font-bold text-green-900">
                        ₹{fundDetails.data[0]?.nav}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {fundDetails.data[0]?.date}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <p className="text-sm text-blue-700 mb-1">Fund House</p>
                      <p className="text-lg font-semibold text-blue-900 line-clamp-2">
                        {fundDetails.meta?.fund_house || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <p className="text-sm text-purple-700 mb-1">30-Day Return</p>
                      <p className={`text-3xl font-bold ${
                        calculateReturns(fundDetails.data) >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {calculateReturns(fundDetails.data)}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent NAV History</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {fundDetails.data.slice(0, 10).map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white p-3 rounded-lg"
                        >
                          <span className="text-gray-600">{item.date}</span>
                          <span className="font-semibold text-gray-900">₹{item.nav}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500">Unable to load fund details</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}