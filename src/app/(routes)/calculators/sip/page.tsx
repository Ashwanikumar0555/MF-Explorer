"use client";
import { useState } from "react";
import { TrendingUp, Wallet, Target, Calculator } from "lucide-react";

const CalculatorForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const handleSubmit = () => {
    onCalculate(amount, years, rate);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Investment (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Investment Period (Years)
        </label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Return Rate (%)
        </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
      >
        Calculate
      </button>
    </div>
  );
};

const SIPGrowthChart = ({ data }) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(d => d.total));
  
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-700 mb-4">Growth Over Time</h4>
      <div className="flex items-end justify-between h-48 gap-1">
        {data.map((item, index) => {
          const height = (item.total / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gradient-to-t from-purple-600 to-blue-400 rounded-t-lg transition-all hover:opacity-80" 
                   style={{ height: `${height}%` }}
                   title={`Year ${item.year}: ₹${item.total.toLocaleString('en-IN')}`}
              />
              {index % Math.ceil(data.length / 5) === 0 && (
                <span className="text-xs text-gray-500 mt-2">Y{item.year}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const calculateSIP = (monthlyAmount, years, annualRate) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  let invested = 0;
  let total = 0;
  const graphData = [];
  
  for (let month = 1; month <= months; month++) {
    invested += monthlyAmount;
    total = total * (1 + monthlyRate) + monthlyAmount;
    
    if (month % 12 === 0) {
      graphData.push({
        year: month / 12,
        invested: Math.round(invested),
        total: Math.round(total)
      });
    }
  }
  
  const returns = Math.round(total - invested);
  
  return {
    invested: Math.round(invested),
    returns,
    total: Math.round(total),
    graphData
  };
};

export default function SIPCalculatorPage() {
  const [result, setResult] = useState(null);

  const handleCalculate = (amount, years, rate) => {
    const calculation = calculateSIP(amount, years, rate);
    setResult(calculation);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SIP Calculator
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Plan your wealth journey with systematic investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Calculator Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Investment Details
            </h3>
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            {result ? (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Investment Summary
                </h3>
                
                {/* Stats Grid */}
                <div className="space-y-4">
                  {/* Monthly Investment */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Monthly Investment</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {formatCurrency(result.invested / (result.graphData.length * 12))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Invested */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Invested</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {formatCurrency(result.invested)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Returns */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Returns</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(result.returns)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Value - Highlighted */}
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <p className="text-white text-sm mb-1 opacity-90">Total Wealth Value</p>
                      <p className="text-4xl font-bold text-white">
                        {formatCurrency(result.total)}
                      </p>
                      <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                        <p className="text-white text-sm opacity-90">
                          Wealth Growth: {Math.round((result.returns / result.invested) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <SIPGrowthChart data={result.graphData} />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Start Planning Your Future
                </h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  Enter your investment details to see how your wealth can grow over time
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Pro Tip:</strong> Consistent monthly investments with long-term commitment can help you build substantial wealth through the power of compounding.
          </p>
        </div>
      </div>
    </div>
  );
}