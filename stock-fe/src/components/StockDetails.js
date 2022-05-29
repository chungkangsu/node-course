import axios from "axios";
import { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { API_URL } from "../utils/config";

const StockDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { stockId } = useParams();
  useEffect(() => {
    let getPrice = async () => {
      let response = await axios.get(`${API_URL}/stocks/${stockId}`, {
        params: {
          page,
        },
      });
      setData(response.data.data);
      setLastPage(response.data.pagination.lastPage);
    };
    getPrice();
  }, [page]);
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      // page 是我們現在在第幾頁
      pages.push(
        <li
          onClick={() => {
            setPage(i);
          }}
          style={{
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#00d1b2" : "",
            borderColor: page === i ? "#00d1b2" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
            cursor: "pointer",
          }}
          key={i}
        >
          {i}
        </li>
      );
    }
    return pages;
    // pages.push(1); // [1]
    // pages.push(2); // [1, 2]
  };

  return (
    <div>
      <ul>{getPages()}</ul>
      {data.map((item) => {
        return (
          <div
            key={item.date}
            className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              日期： {item.date}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交金額：{item.amount}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交股數：{item.volume}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              開盤價：{item.open_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              收盤價：{item.close_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              漲跌價差：{item.delta_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最高價：{item.high_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              最低價：{item.low_price}
            </h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              成交筆數：{item.transactions}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
