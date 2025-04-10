
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Calculator, Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EmiCalculatorProps {
  className?: string;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ className }) => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateEmi = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterest = interestRate / 12 / 100;
    const termInMonths = loanTerm;

    // Calculate EMI using the formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    if (monthlyInterest === 0) {
      setEmi(loanAmount / termInMonths);
    } else {
      const emiValue =
        (loanAmount *
          monthlyInterest *
          Math.pow(1 + monthlyInterest, termInMonths)) /
        (Math.pow(1 + monthlyInterest, termInMonths) - 1);
      setEmi(emiValue);
    }
  };

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, loanTerm]);

  useEffect(() => {
    // Calculate total payment and total interest
    const totalPaymentValue = emi * loanTerm;
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalPaymentValue - loanAmount);
  }, [emi, loanTerm, loanAmount]);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/,/g, ""));
    if (!isNaN(value)) {
      setLoanAmount(value);
    } else {
      setLoanAmount(0);
    }
  };

  const handleLoanAmountSliderChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInterestRate(value);
    } else {
      setInterestRate(0);
    }
  };

  const handleInterestRateSliderChange = (value: number[]) => {
    setInterestRate(value[0]);
  };

  const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLoanTerm(value);
    } else {
      setLoanTerm(0);
    }
  };

  const handleLoanTermSliderChange = (value: number[]) => {
    setLoanTerm(value[0]);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = [
    { name: "Principal", value: loanAmount, color: "#9b87f5" },
    { name: "Interest", value: totalInterest, color: "#E5DEFF" },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-calculator-purple text-white rounded-t-lg">
          <CardTitle className="flex items-center text-2xl font-semibold">
            <Calculator className="mr-2" size={24} />
            Loan EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="loanAmount" className="text-sm font-medium flex items-center">
                    Loan Amount
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the total loan amount you wish to borrow</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <Input
                  id="loanAmount"
                  type="text"
                  value={loanAmount.toLocaleString()}
                  onChange={handleLoanAmountChange}
                  className="border-calculator-gray bg-white"
                />
                <Slider
                  defaultValue={[loanAmount]}
                  max={1000000}
                  step={10000}
                  value={[loanAmount]}
                  onValueChange={handleLoanAmountSliderChange}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹0</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="interestRate" className="text-sm font-medium flex items-center">
                    Interest Rate (% per year)
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Annual interest rate for your loan</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm font-semibold">{interestRate}%</span>
                </div>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="border-calculator-gray bg-white"
                />
                <Slider
                  defaultValue={[interestRate]}
                  max={30}
                  step={0.25}
                  value={[interestRate]}
                  onValueChange={handleInterestRateSliderChange}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="loanTerm" className="text-sm font-medium flex items-center">
                    Loan Term (months)
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duration of your loan in months</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </Label>
                  <span className="text-sm font-semibold">{loanTerm} months</span>
                </div>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={handleLoanTermChange}
                  className="border-calculator-gray bg-white"
                />
                <Slider
                  defaultValue={[loanTerm]}
                  max={360}
                  step={1}
                  value={[loanTerm]}
                  onValueChange={handleLoanTermSliderChange}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0</span>
                  <span>360 months (30 years)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {/* Results Section */}
              <div className="bg-calculator-gray rounded-lg p-6 mb-4 flex-grow">
                <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                
                <div className="mb-8">
                  <p className="text-sm text-slate-500 mb-1">Monthly Payment (EMI)</p>
                  <p className="text-3xl font-bold text-calculator-purple">
                    {formatCurrency(emi)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Principal Amount</span>
                    <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Total Interest</span>
                    <span className="text-sm font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm font-medium">Total Payment</span>
                    <span className="text-sm font-bold">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-lg p-4 border border-slate-200 flex-grow">
                <h3 className="text-sm font-medium mb-2 text-center">Payment Breakdown</h3>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => 
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), "Amount"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {chartData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmiCalculator;
