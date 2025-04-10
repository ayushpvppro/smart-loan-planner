
import EmiCalculator from "@/components/EmiCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          Loan EMI Calculator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Calculate your Equated Monthly Installment (EMI) based on your loan amount, interest rate, and loan term. Plan your finances with precision!
        </p>
      </div>
      
      <EmiCalculator className="mb-8" />
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          How is EMI calculated?
        </h2>
        <p className="text-slate-600 mb-4">
          EMI or Equated Monthly Installment is calculated using this formula:
        </p>
        <div className="bg-calculator-lightpurple p-4 rounded-md text-center mb-4">
          <p className="font-medium">EMI = [P × R × (1+R)^N]/[(1+R)^N-1]</p>
        </div>
        <div className="space-y-2 text-slate-600">
          <p><strong>Where:</strong></p>
          <p>• P = Principal loan amount</p>
          <p>• R = Monthly interest rate (annual rate ÷ 12 ÷ 100)</p>
          <p>• N = Loan term in months</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
