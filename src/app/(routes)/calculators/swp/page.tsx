import { useState, useEffect } from "react";
import { TrendingDown, Calendar, Percent, DollarSign, PiggyBank, AlertCircle, Wallet, TrendingUp, Target, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(20);
  const [withdrawalFrequency, setWithdrawalFrequency] = useState("monthly");
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateSWP();
  }, [initialInvestment, monthlyWithdrawal, annualReturn, timePeriod, withdrawalFrequency, inflationAdjusted, inflationRate]);

  const calculateSWP = () => {
    const periodsPerYear = withdrawalFrequency === "monthly" ? 12 : withdrawalFrequency === "quarterly" ? 4 : 1;
    const totalPeriods = timePeriod * periodsPerYear;
    const ratePerPeriod = annualReturn / 100 / periodsPerYear;
    const inflationPerPeriod = inflationAdjusted ? inflationRate / 100 / periodsPerYear : 0;
    
    let balance = initialInvestment;
    let totalWithdrawn = 0;
    let withdrawal = monthlyWithdrawal;
    const graphData = [];
    let monthCounter = 0;

    for (let i = 0; i <= totalPeriods; i++) {
      if (i > 0) {
        balance = balance * (1 + ratePerPeriod) - withdrawal;
        totalWithdrawn += withdrawal;
        
        if (inflationAdjusted && i % periodsPerYear === 0) {
          withdrawal *= (1 + inflationRate / 100);
        }
        
        if (balance < 0) {
          balance = 0;
          break;
        }
      }
      
      if (withdrawalFrequency === "monthly" || i % (12 / periodsPerYear) === 0) {
        graphData.push({
          period: withdrawalFrequency === "monthly" ? i : Math.floor(i / (periodsPerYear / 12)),
          balance: Math.round(balance),
          withdrawn: Math.round(totalWithdrawn),
          withdrawal: Math.round(withdrawal)
        });
      }
      
      monthCounter++;
    }

    const totalReturns = balance + totalWithdrawn - initialInvestment;
    const sustainabilityYears = balance > 0 ? timePeriod : (graphData.length - 1) / periodsPerYear;

    setResult({
      endingBalance: Math.round(balance),
      totalWithdrawn: Math.round(totalWithdrawn),
      totalReturns: Math.round(totalReturns),
      sustainabilityYears: sustainabilityYears.toFixed(1),
      graphData,
      depleted: balance <= 0
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800 mb-2">
            Period {payload[0].payload.period}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-600">
              <span style={{ color: entry.color }}>{entry.name}:</span>{' '}
              {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SWP Calculator
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Plan your systematic withdrawals with real-time projections
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Investment Details</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <PiggyBank className="w-4 h-4 mr-2 text-purple-600" />
                    Initial Investment (₹)
                  </label>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full mt-2 accent-purple-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">{formatCurrency(initialInvestment)}</div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Wallet className="w-4 h-4 mr-2 text-blue-600" />
                    Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyWithdrawal}
                    onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={monthlyWithdrawal}
                    onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">{formatCurrency(monthlyWithdrawal)}</div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Percent className="w-4 h-4 mr-2 text-green-600" />
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full mt-2 accent-green-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">{annualReturn}% per annum</div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full mt-2 accent-orange-600"
                  />
                  <div className="text-xs text-gray-500 mt-1">{timePeriod} years</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Withdrawal Frequency
                  </label>
                  <select
                    value={withdrawalFrequency}
                    onChange={(e) => setWithdrawalFrequency(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    <input
                      type="checkbox"
                      checked={inflationAdjusted}
                      onChange={(e) => setInflationAdjusted(e.target.checked)}
                      className="mr-2 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    Adjust for Inflation
                  </label>
                  
                  {inflationAdjusted && (
                    <div className="ml-6 space-y-2">
                      <label className="text-sm text-gray-600 block">
                        Inflation Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {result ? (
              <div className="space-y-6">
                {result.depleted && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-1">Corpus Depleted!</h3>
                      <p className="text-sm text-red-700">
                        Your investment will be exhausted in {result.sustainabilityYears} years. 
                        Consider reducing withdrawal amount or increasing returns.
                      </p>
                    </div>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Your Withdrawal Summary
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Withdrawal Per Period */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {withdrawalFrequency === 'monthly' ? 'Monthly' : withdrawalFrequency === 'quarterly' ? 'Quarterly' : 'Yearly'} Withdrawal
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            {formatCurrency(monthlyWithdrawal)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total Withdrawn */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600 rounded-lg">
                          <TrendingDown className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Withdrawn</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {formatCurrency(result.totalWithdrawn)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ending Balance */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <PiggyBank className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ending Balance</p>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(result.endingBalance)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total Returns - Highlighted */}
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 shadow-lg">
                      <div className="text-center">
                        <p className="text-white text-sm mb-1 opacity-90">Total Returns</p>
                        <p className="text-4xl font-bold text-white">
                          {formatCurrency(result.totalReturns)}
                        </p>
                        <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                          <div className="flex items-center justify-center gap-6 text-white text-sm opacity-90">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>Lasts {result.sustainabilityYears} years</span>
                            </div>
                            {!result.depleted && (
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                <span>Sustainable</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Projection</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={result.graphData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorWithdrawn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="period" 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '14px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#7c3aed" 
                        fillOpacity={1} 
                        fill="url(#colorBalance)" 
                        name="Remaining Balance"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="withdrawn" 
                        stroke="#2563eb" 
                        fillOpacity={1} 
                        fill="url(#colorWithdrawn)" 
                        name="Total Withdrawn"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Key Insights */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h3>
                  <div className="space-y-3">
                    <div className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Withdrawal Rate:</span> You're withdrawing {((monthlyWithdrawal * 12 / initialInvestment) * 100).toFixed(2)}% annually from your initial corpus.
                      </p>
                    </div>
                    <div className="flex items-start bg-purple-50 p-3 rounded-lg border border-purple-100">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Regular Income:</span> You'll receive {formatCurrency(monthlyWithdrawal)} every {withdrawalFrequency === 'monthly' ? 'month' : withdrawalFrequency === 'quarterly' ? 'quarter' : 'year'}.
                      </p>
                    </div>
                    {inflationAdjusted && (
                      <div className="flex items-start bg-orange-50 p-3 rounded-lg border border-orange-100">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Inflation Protected:</span> Your withdrawals will increase annually by {inflationRate}% to maintain purchasing power.
                        </p>
                      </div>
                    )}
                    <div className="flex items-start bg-green-50 p-3 rounded-lg border border-green-100">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Recommendation:</span> {
                          result.depleted 
                            ? "Consider reducing your withdrawal amount or aiming for higher returns to make your corpus last longer."
                            : result.endingBalance > initialInvestment * 0.5
                            ? "Excellent! Your corpus remains healthy throughout the period with sustainable withdrawals."
                            : "Your corpus is sustainable but monitor your withdrawal strategy for optimal results."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingDown className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Plan Your Withdrawals
                </h3>
                <p className="text-gray-600 text-sm max-w-sm">
                  Enter your investment details to see how your corpus will sustain regular withdrawals over time
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center">
            💡 <strong>Pro Tip:</strong> A sustainable withdrawal rate is typically 4-6% of your initial investment annually. Adjust your withdrawals to ensure your corpus lasts throughout your retirement.
          </p>
        </div>
      </div>
    </div>
  );
}