"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  PieChart, 
  DollarSign,
  Target,
  Calendar,
  Edit2,
  X
} from "lucide-react";

interface Investment {
  id: string;
  scheme: string;
  category: string;
  amount: number;
  units: number;
  currentNav: number;
  purchaseDate: string;
}

const categories = [
  "Equity - Large Cap",
  "Equity - Mid Cap",
  "Equity - Small Cap",
  "Debt",
  "Hybrid",
  "Index Fund",
  "Other"
];

export default function PortfolioPage() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form states
  const [scheme, setScheme] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");
  const [currentNav, setCurrentNav] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);

  const addInvestment = () => {
    if (!scheme || !amount || !units || !currentNav) return;
    
    const newInvestment: Investment = {
      id: Date.now().toString(),
      scheme,
      category,
      amount: parseFloat(amount),
      units: parseFloat(units),
      currentNav: parseFloat(currentNav),
      purchaseDate
    };

    if (editingId) {
      setInvestments(investments.map(inv => 
        inv.id === editingId ? { ...newInvestment, id: editingId } : inv
      ));
      setEditingId(null);
    } else {
      setInvestments([...investments, newInvestment]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setScheme("");
    setCategory(categories[0]);
    setAmount("");
    setUnits("");
    setCurrentNav("");
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    setShowAddForm(false);
    setEditingId(null);
  };

  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const editInvestment = (inv: Investment) => {
    setScheme(inv.scheme);
    setCategory(inv.category);
    setAmount(inv.amount.toString());
    setUnits(inv.units.toString());
    setCurrentNav(inv.currentNav.toString());
    setPurchaseDate(inv.purchaseDate);
    setEditingId(inv.id);
    setShowAddForm(true);
  };

  // Calculations
  const totalInvested = investments.reduce((acc, inv) => acc + inv.amount, 0);
  const currentValue = investments.reduce((acc, inv) => acc + (inv.units * inv.currentNav), 0);
  const totalGainLoss = currentValue - totalInvested;
  const totalGainLossPercent = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  // Category-wise breakdown
  const categoryBreakdown = investments.reduce((acc, inv) => {
    const value = inv.units * inv.currentNav;
    acc[inv.category] = (acc[inv.category] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            My Portfolio
          </h1>
          <p className="text-gray-600">Track and manage your mutual fund investments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Invested</span>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              ₹{totalInvested.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Current Value</span>
              <Target className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">
              ₹{currentValue.toLocaleString('en-IN')}
            </p>
          </div>

          <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
            totalGainLoss >= 0 ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Gain/Loss</span>
              {totalGainLoss >= 0 ? 
                <TrendingUp className="w-5 h-5 text-green-600" /> : 
                <TrendingDown className="w-5 h-5 text-red-600" />
              }
            </div>
            <p className={`text-3xl font-bold ${
              totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString('en-IN')}
            </p>
            <p className={`text-sm mt-1 ${
              totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100 text-sm font-medium">Total Holdings</span>
              <PieChart className="w-5 h-5 text-purple-100" />
            </div>
            <p className="text-3xl font-bold">{investments.length}</p>
            <p className="text-sm text-purple-100 mt-1">Active investments</p>
          </div>
        </div>

        {/* Category Breakdown */}
        {investments.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Category-wise Allocation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryBreakdown).map(([cat, value]) => {
                const percentage = (value / currentValue) * 100;
                return (
                  <div key={cat} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{cat}</span>
                      <span className="text-sm font-bold text-purple-600">{percentage.toFixed(1)}%</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">₹{value.toLocaleString('en-IN')}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Investment Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{showAddForm ? 'Cancel' : 'Add Investment'}</span>
          </button>
        </div>

        {/* Add/Edit Investment Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-purple-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingId ? 'Edit Investment' : 'Add New Investment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheme Name</label>
                <input
                  type="text"
                  placeholder="e.g., HDFC Top 100 Fund"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Invested</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Units Bought</label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="150.500"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current NAV</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="75.50"
                  value={currentNav}
                  onChange={(e) => setCurrentNav(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-purple-600 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={addInvestment}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                {editingId ? 'Update Investment' : 'Add Investment'}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Portfolio List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Investment Holdings
            </h2>
          </div>
          
          {investments.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <PieChart className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No investments yet</p>
              <p className="text-gray-400">Start building your portfolio by adding your first investment</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Scheme</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Invested</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Units</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Current NAV</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Current Value</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Gain/Loss</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {investments.map((inv) => {
                    const currentVal = inv.units * inv.currentNav;
                    const gain = currentVal - inv.amount;
                    const gainPercent = (gain / inv.amount) * 100;
                    
                    return (
                      <tr key={inv.id} className="hover:bg-purple-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{inv.scheme}</div>
                          <div className="text-sm text-gray-500">{inv.purchaseDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                            {inv.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          ₹{inv.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          {inv.units.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹{inv.currentNav.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          ₹{currentVal.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className={`font-bold ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gain >= 0 ? '+' : ''}₹{gain.toLocaleString('en-IN')}
                          </div>
                          <div className={`text-xs ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gain >= 0 ? '+' : ''}{gainPercent.toFixed(2)}%
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => editInvestment(inv)}
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInvestment(inv.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}