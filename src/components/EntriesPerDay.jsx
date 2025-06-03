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

const data = [
  { date: "2025-06-02", entries: 3 },
  { date: "2025-06-03", entries: 2 },
  { date: "2025-06-05", entries: 1 },
  { date: "2025-06-04", entries: 7 },
];

function dateFomat(isoDate) {
  {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF"];

export default function EntriesPerDay() {
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
          stroke="#00000"
          interval={0}
          tickFormatter={dateFomat}
        />
        <YAxis dataKey="entries" />
        <Tooltip />
        <Bar dataKey="entries" fill="#B3CDAD" barSize={35} radius={3}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
