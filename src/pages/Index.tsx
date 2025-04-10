
import EmiCalculator from "@/components/EmiCalculator";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 dark:bg-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-end mb-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Loan EMI Calculator
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Calculate your Equated Monthly Installment (EMI) based on your loan amount, interest rate, and loan term. Plan your finances with precision!
        </p>
      </div>
      
      <EmiCalculator className="mb-8" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          How is EMI calculated?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          EMI or Equated Monthly Installment is calculated using this formula:
        </p>
        <div className="bg-calculator-lightpurple dark:bg-calculator-darkpurple/30 p-4 rounded-md text-center mb-4">
          <p className="font-medium dark:text-white">EMI = [P × R × (1+R)^N]/[(1+R)^N-1]</p>
        </div>
        <div className="space-y-2 text-slate-600 dark:text-slate-400">
          <p><strong>Where:</strong></p>
          <p>• P = Principal loan amount (in ₹)</p>
          <p>• R = Monthly interest rate (annual rate ÷ 12 ÷ 100)</p>
          <p>• N = Loan term in months</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
