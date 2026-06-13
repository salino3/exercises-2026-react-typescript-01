import $ from "jquery";

/**
 * Your legacy chart initializer function
 * @param {HTMLElement} element - The DOM element to attach the chart to
 * @param {Array} chartData - Financial data array
 */
export function initializeLegacyChart(element, chartData) {
  // Your original jQuery/JS code goes here completely untouched!
  const $container = $(element);

  $container.empty();
  $container.append(
    '<h3 style="color: #00ff00;">Financial Chart Loaded from .js File</h3>',
  );

  // Example loop simulating chart building
  chartData.forEach((item) => {
    $container.append(
      `<p style="color: #fff;">User: ${item.name} (${item.role})</p>`,
    );
  });

  // Example window resize listener common in old charts
  const handleResize = () => {
    console.log("Resizing legacy chart dynamically...");
  };
  $(window).on("resize", handleResize);

  // Return a cleanup function so React can unbind events later
  return function destroyChart() {
    $(window).off("resize", handleResize);
    $container.empty();
  };
}
