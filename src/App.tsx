import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const Spinner = () => {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  };
  const retrieveData = () => {
    setLoading(true);
    try {
      axios
        .get("http://localhost:5000/api/betting-data")
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="p-10 flex gap-10">
        <div className="font-bold text-4xl">Betting Data</div>
        <button
          className="px-5 py-2 rounded-xl flex justify-center items-center bg-black text-2xl text-white"
          onClick={retrieveData}
        >
          Retrieve
        </button>
      </div>
      {loading && <Spinner />}
      {data.length > 0 && (
        <table className="max-w-full divide-y divide-gray-200 m-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Match
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item: any, index: number) => (
              <tr className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.marketName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.event.venue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.totalMatched}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {dayjs(item.event.openDate).format("YYYY-MM-DD HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
