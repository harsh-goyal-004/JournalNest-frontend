import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Cell,
} from "recharts";

function dateFomat(isoDate) {
  {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

export default function EntriesPerDay({ entryData }) {
  let data = [];

  Object.entries(entryData).map(([key, value]) => {
    data = [...data, { date: key, entries: value }];
  });
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 50,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          stroke="#000"
          interval={0}
          tickFormatter={dateFomat}
        />
        <YAxis stroke="#000" dataKey="entries" />

        <Tooltip
          contentStyle={{
            backgroundColor: "green",
            border: "none",
            color: "#fff",
          }}
        />
        <Bar dataKey="entries" fill="#B3CDAD" barSize={35} radius={3}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
