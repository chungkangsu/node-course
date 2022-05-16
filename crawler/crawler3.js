const axios = require("axios");
const fs = require("fs/promises");

(async () => {
  try {
    const stockNo = await fs.readFile("stock.txt", "utf-8");
    const response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          // 設定 query string
          response: "json",
          date: "20220301",
          stockNo: stockNo,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
})();
