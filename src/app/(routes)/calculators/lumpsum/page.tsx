import { useState } from "react";
import { TrendingUp, DollarSign, PiggyBank, Calendar, Download, Share2 } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function LumpsumCalculatorPage() {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [result, setResult] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateLumpsum = (principal: number, time: number, interestRate: number) => {
    const totalValue = principal * Math.pow(1 + interestRate / 100, time);
    const returns = totalValue - principal;
    
    // Generate year-by-year data for chart
    const yearlyData = [];
    for (let i = 0; i <= time; i++) {
      const value = principal * Math.pow(1 + interestRate / 100, i);
      yearlyData.push({
        year: i,
        value: Math.round(value),
        invested: principal,
        returns: Math.round(value - principal)
      });
    }
    
    return {
      invested: Math.round(principal),
      returns: Math.round(returns),
      total: Math.round(totalValue),
      yearlyData
    };
  };

  const handleCalculate = () => {
    const calculation = calculateLumpsum(amount, years, rate);
    setResult(calculation);
    setChartData(calculation.yearlyData);
  };

  const pieData = result ? [
    { name: "Invested Amount", value: result.invested, color: "#3b82f6" },
    { name: "Estimated Returns", value: result.returns, color: "#10b981" }
  ] : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const downloadResults = () => {
    if (!result) return;
    const data = `Lumpsum Investment Calculator Results
    
Investment Amount: ${formatCurrency(result.invested)}
Investment Period: ${years} years
Expected Rate of Return: ${rate}% p.a.
Estimated Returns: ${formatCurrency(result.returns)}
Total Value: ${formatCurrency(result.total)}

Year-wise Breakdown:
${chartData.map(d => `Year ${d.year}: ${formatCurrency(d.value)}`).join('\n')}`;
    
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lumpsum-calculation.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Lumpsum Calculator
            </h1>
          </div>
          <p className="text-gray-600">Calculate returns on your one-time investment</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Investment Details
            </h2>

            {/* Investment Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Investment Amount</label>
                <span className="text-lg font-bold text-blue-600">{formatCurrency(amount)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹10K</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Time Period */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Time Period
                </label>
                <span className="text-lg font-bold text-green-600">{years} years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1Y</span>
                <span>30Y</span>
              </div>
            </div>

            {/* Expected Return Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Expected Return Rate (p.a.)</label>
                <span className="text-lg font-bold text-purple-600">{rate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Calculate Returns
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <PiggyBank className="w-5 h-5" />
                    <p className="text-blue-100 text-sm font-medium">Invested Amount</p>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(result.invested)}</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <p className="text-green-100 text-sm font-medium">Estimated Returns</p>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(result.returns)}</p>
                  <p className="text-sm text-green-100 mt-1">
                    {((result.returns / result.invested) * 100).toFixed(1)}% gain
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <p className="text-purple-100 text-sm font-medium">Total Value</p>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(result.total)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={downloadResults}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(`Investment: ${formatCurrency(result.invested)}, Returns: ${formatCurrency(result.returns)}, Total: ${formatCurrency(result.total)}`)}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-green-500 hover:text-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        {result && (
          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            {/* Growth Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} name="Total Value" dot={{ fill: '#3b82f6', r: 4 }} />
                  <Line type="monotone" dataKey="invested" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" name="Invested" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}