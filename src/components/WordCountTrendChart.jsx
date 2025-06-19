import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function dateFormat(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDay();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
}

export default function WordCountTrendChart({ analyticsData }) {
  let data = [];

  Object.entries(analyticsData).map(([key, value]) => {
    data = [...data, { date: key, words: value }];
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: -25,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          padding={{ left: 20, right: 20 }}
          tickFormatter={dateFormat}
          stroke="#000"
          interval={0}
          angle={-30}
          textAnchor="end"
        />
        <YAxis stroke="#000" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="words"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
