import { GrowthInput, GrowthResult } from './calculator';

export function generateChartData(input: GrowthInput, result: GrowthResult) {
  const { currentWeight, previousWeight, daysBetween, targetWeight, futureDays } = input;
  
  const data: { day: number; weight: number; isProjection?: boolean }[] = [
    { day: 0, weight: previousWeight },
    { day: daysBetween, weight: currentWeight }
  ];

  if (result.adg > 0) {
    if (result.daysToTarget !== null && result.daysToTarget > 0) {
        data.push({ 
            day: daysBetween + Math.ceil(result.daysToTarget), 
            weight: targetWeight,
            isProjection: true
        });
    }

    if (futureDays !== undefined && futureDays > 0) {
        const futureDayTotal = daysBetween + futureDays;
        // Only add if it's not super close to the target day to avoid cramped tooltips
        if (result.daysToTarget === null || Math.abs(futureDayTotal - (daysBetween + result.daysToTarget)) > 2) {
            data.push({
                day: futureDayTotal,
                weight: currentWeight + (result.adg * futureDays),
                isProjection: true
            });
        }
    }
  }

  // Sort by day just in case
  return data.sort((a, b) => a.day - b.day);
}
