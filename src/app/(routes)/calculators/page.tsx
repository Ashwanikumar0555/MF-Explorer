"use client";

import { useState } from "react";
import SipCalculator from "./sip/page";
import SWPCalculatorPage from "./swp/page";
import LumpSumCalculatorPage from "./lumpsum/page";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Card } from "../../../components/ui/card";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState("sip");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Investment Calculators</h1>

      <Card>
        <Tabs defaultValue="sip" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-6 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="sip">SIP</TabsTrigger>
            <TabsTrigger value="swp">SWP</TabsTrigger>
            <TabsTrigger value="lumpsum">Lump Sum</TabsTrigger>
          </TabsList>

          <TabsContent value="sip">
            <SipCalculator />
          </TabsContent>

          <TabsContent value="swp">
            <SWPCalculatorPage />
          </TabsContent>

          <TabsContent value="lumpsum">
            <LumpSumCalculatorPage />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
