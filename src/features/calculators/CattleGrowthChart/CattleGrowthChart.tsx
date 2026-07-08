import React, { useState, useMemo } from 'react';
import { Calculator, LineChart as ChartIcon, Info } from 'lucide-react';
import { SEO } from '../../../components/SEO';
import { ExportActions } from '../../../components/ExportActions';
import { GrowthInputs } from './GrowthInputs';
import { GrowthResults } from './GrowthResults';
import { ChartView } from './chart-view';
import { calculateGrowth } from './calculator';
import { generateChartData } from './chart-data';

export default function CattleGrowthChart() {
  const [currentWeight, setCurrentWeight] = useState<number | ''>('');
  const [previousWeight, setPreviousWeight] = useState<number | ''>('');
  const [daysBetween, setDaysBetween] = useState<number | ''>(30);
  const [targetWeight, setTargetWeight] = useState<number | ''>('');
  const [futureDays, setFutureDays] = useState<number | ''>('');

  const isValid = 
    currentWeight !== '' && currentWeight >= 0 &&
    previousWeight !== '' && previousWeight >= 0 &&
    daysBetween !== '' && daysBetween > 0 &&
    targetWeight !== '' && targetWeight >= 0;

  const results = useMemo(() => {
    if (!isValid) return null;
    try {
      return calculateGrowth({
        currentWeight: Number(currentWeight),
        previousWeight: Number(previousWeight),
        daysBetween: Number(daysBetween),
        targetWeight: Number(targetWeight),
        futureDays: futureDays === '' ? undefined : Number(futureDays)
      });
    } catch (e) {
      return null;
    }
  }, [isValid, currentWeight, previousWeight, daysBetween, targetWeight, futureDays]);

  const chartData = useMemo(() => {
    if (!isValid || !results) return [];
    return generateChartData({
        currentWeight: Number(currentWeight),
        previousWeight: Number(previousWeight),
        daysBetween: Number(daysBetween),
        targetWeight: Number(targetWeight),
        futureDays: futureDays === '' ? undefined : Number(futureDays)
    }, results);
  }, [isValid, results, currentWeight, previousWeight, daysBetween, targetWeight, futureDays]);

  const handleReset = () => {
    setCurrentWeight('');
    setPreviousWeight('');
    setDaysBetween(30);
    setTargetWeight('');
    setFutureDays('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO 
        title="Cattle Growth Chart & ADG Tracker" 
        description="Track cattle weight gain, calculate Average Daily Gain (ADG), and project target weights and feed days."
        path="/cattle-growth-chart"
      />

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ChartIcon className="w-8 h-8 text-blue-600" />
            Cattle Growth Chart
          </h1>
          <p className="text-gray-600 mt-2">
            Track cattle weight gain over time, calculate average daily gain (ADG), and project when they will reach target weight.
          </p>
        </div>
        <ExportActions elementId="growth-calculator-content" filename="cattle-growth-chart" />
      </div>

      <div id="growth-calculator-content" className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800">Weigh-In Data</h2>
          </div>
          
          <div className="p-6">
            <GrowthInputs 
              currentWeight={currentWeight} setCurrentWeight={setCurrentWeight}
              previousWeight={previousWeight} setPreviousWeight={setPreviousWeight}
              daysBetween={daysBetween} setDaysBetween={setDaysBetween}
              targetWeight={targetWeight} setTargetWeight={setTargetWeight}
              futureDays={futureDays} setFutureDays={setFutureDays}
            />

            <div className="mt-8">
              {!isValid ? (
                <div className="bg-gray-50 p-6 text-center rounded-lg border border-dashed border-gray-300 text-gray-500">
                  Enter previous weight, current weight, days between, and target weight to see the growth chart and projections.
                </div>
              ) : results && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <GrowthResults result={results} currentWeight={Number(currentWeight)} />
                  
                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Curve</h3>
                    <ChartView data={chartData} targetWeight={Number(targetWeight)} />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleReset}
                className="text-gray-600 hover:text-gray-900 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Formula & Assumptions</h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            <p>
              This tool uses standard industry formulas to calculate <strong>Average Daily Gain (ADG)</strong> based on sequential weigh-ins.
            </p>
            <ul className="space-y-2 mt-4">
              <li><strong>ADG Formula:</strong> (Current Weight - Previous Weight) ÷ Days Between Weigh-Ins.</li>
              <li><strong>Target Projection:</strong> Assumes the animal will maintain its exact current ADG until it reaches the target weight.</li>
              <li><strong>Accuracy:</strong> Young cattle grow rapidly, while older cattle's growth slows. The ADG is only a snapshot of the current growth phase. You should continuously update weights for accurate projections.</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-md flex gap-3 text-sm">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p className="m-0">
                <strong>Disclaimer:</strong> This tool assumes linear weight gain based on a two-point historical snapshot. Real-world cattle growth curves are non-linear, slowing down as they approach mature frame sizes. Actual results will vary heavily based on feed rations, weather, and genetics.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6 print:hidden">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a good Average Daily Gain (ADG) for cattle?</h3>
              <p className="text-gray-600 mb-2">
                It depends entirely on the breed and feed program. A grain-finished feedlot steer might achieve an ADG of 3.0 to 4.0 lbs per day. A grass-finished steer on good pasture might average 1.5 to 2.0 lbs per day.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why isn't my animal growing at the predicted rate?</h3>
              <p className="text-gray-600 mb-2">
                Growth is not perfectly linear. Animals experience compensatory gain (rapid growth after a period of poor feed), and their growth curve naturally flattens as they mature and begin depositing fat instead of muscle. Weather stress and parasites also significantly impact daily gain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
