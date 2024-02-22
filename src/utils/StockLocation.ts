
interface Stock {
    no: number;
    stockName: string;
    stockLocation: string;
    totalDesktop: number;
  }
  export const stockData: Stock[] = [
    { no: 1, stockName: "Stock A", stockLocation: "Location 1", totalDesktop: 500 },
    { no: 2, stockName: "Stock B", stockLocation: "Location 2", totalDesktop: 800 },
    { no: 3, stockName: "Stock C", stockLocation: "Location 3", totalDesktop: 1200 },
    { no: 4, stockName: "Stock D", stockLocation: "Location 4", totalDesktop: 1500 },
  ];
