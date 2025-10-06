// "use client";

// import Link from "next/link";
// import Button from "../components/atoms/Button";
// import { Card, CardContent } from "../components/atoms/Card";
// import { BarChart3, Calculator } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6">
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center max-w-2xl"
//       >
//         <div className="flex justify-center mb-4">
//           <BarChart3 className="w-12 h-12 text-blue-600" />
//         </div>

//         <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Mutual Fund Explorer
//         </h1>

//         <p className="mt-4 text-gray-600 text-lg leading-relaxed">
//           Search and explore Indian Mutual Funds, track NAV history, and calculate
//           your SIP returns with beautiful interactive charts.
//         </p>

//         {/* Action Buttons */}
//         <div className="flex gap-4 justify-center mt-8">
//           <Link href="/funds">
//             <Button size="lg" variant="primary">
//               <BarChart3 className="w-5 h-5" /> Explore Funds
//             </Button>
//           </Link>
//           <Link href="/calculators/sip">
//             <Button size="lg" variant="outline">
//               <Calculator className="w-5 h-5" /> Try SIP Calculator
//             </Button>
//           </Link>
//         </div>
//       </motion.div>

//       {/* Features Section */}
//       <section className="grid md:grid-cols-2 gap-6 mt-16 max-w-4xl w-full">
//         <Card>
//           <CardContent>
//             <BarChart3 className="mx-auto h-10 w-10 text-purple-500 mb-3" />
//             <h3 className="font-semibold text-xl mb-2">Track Funds Easily</h3>
//             <p className="text-gray-500 text-sm">
//               Get detailed insights into Indian mutual funds with real-time NAV
//               history and comparisons.
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent>
//             <Calculator className="mx-auto h-10 w-10 text-blue-500 mb-3" />
//             <h3 className="font-semibold text-xl mb-2">Smart SIP Calculator</h3>
//             <p className="text-gray-500 text-sm">
//               Plan your investments with accurate SIP calculations and visualize
//               returns through charts.
//             </p>
//           </CardContent>
//         </Card>
//       </section>

//       {/* Footer */}
//       <footer className="mt-20 text-sm text-gray-500">
//         © {new Date().getFullYear()} Mutual Fund Explorer. All rights reserved.
//       </footer>
//     </main>
//   );
// }
"use client";

import Link from "next/link";
import Button from "../components/atoms/Button";
import { Card, CardContent } from "../components/atoms/Card";
import { BarChart3, Calculator, TrendingUp, Shield, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-6 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50"></div>
            <div className="relative bg-white rounded-2xl p-4 shadow-lg">
              <BarChart3 className="w-14 h-14 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>Your Smart Investment Companion</span>
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Mutual Fund
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Explorer
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-xl leading-relaxed max-w-2xl mx-auto">
          Discover, analyze, and invest in Indian Mutual Funds with confidence. 
          Track NAV history, calculate SIP returns, and make informed decisions 
          with beautiful interactive insights.
        </p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link href="/funds">
            <Button size="lg" variant="primary" className="group shadow-lg hover:shadow-xl transition-all">
              <BarChart3 className="w-5 h-5" /> 
              Explore Funds
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/calculators/sip">
            <Button size="lg" variant="outline" className="shadow-md hover:shadow-lg transition-all">
              <Calculator className="w-5 h-5" /> 
              Try SIP Calculator
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure & Reliable</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Free Forever</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6 mt-24 max-w-5xl w-full relative z-10"
      >
        <motion.div variants={itemVariants}>
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
            <CardContent className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="inline-flex p-3 bg-purple-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Track Funds Easily</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get detailed insights into Indian mutual funds with real-time NAV
                  history, performance metrics, and comprehensive comparisons to make 
                  smarter investment choices.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
            <CardContent className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Smart SIP Calculator</h3>
                <p className="text-gray-600 leading-relaxed">
                  Plan your investments with precision using our advanced SIP calculator.
                  Visualize potential returns, compare scenarios, and chart your path to 
                  financial goals.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-24 text-sm text-gray-500 relative z-10"
      >
        © {new Date().getFullYear()} Mutual Fund Explorer. All rights reserved.
      </motion.footer>
    </main>
  );
}