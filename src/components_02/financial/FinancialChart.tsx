import React, { useEffect, useRef } from "react";
import { initializeLegacyChart } from "../../legacy/myLegacyChart.js";

interface FinancialChartProps {
  data: any[];
}

export const FinancialChart: React.FC<FinancialChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanupLegacyChart: (() => void) | undefined;

    if (chartContainerRef.current) {
      // Pass the raw DOM node and data directly into your vanilla JS file
      cleanupLegacyChart = initializeLegacyChart(
        chartContainerRef.current,
        data,
      );
    }

    // The Cleanup Rule: React will invoke this when the component unmounts
    return () => {
      if (cleanupLegacyChart) {
        cleanupLegacyChart(); // Cleans up global event listeners from the JS file
      }
    };
  }, [data]); // Re-renders cleanly if your financial data changes

  return <div ref={chartContainerRef} className="legacy-chart-container" />;
};
