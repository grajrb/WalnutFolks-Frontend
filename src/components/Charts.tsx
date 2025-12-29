import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dummy data for voice agent analytics
export const callSuccessData = [
  { time: '12:00 AM', successRate: 95, failureRate: 5 },
  { time: '3:00 AM', successRate: 92, failureRate: 8 },
  { time: '6:00 AM', successRate: 88, failureRate: 12 },
  { time: '9:00 AM', successRate: 94, failureRate: 6 },
  { time: '12:00 PM', successRate: 97, failureRate: 3 },
  { time: '3:00 PM', successRate: 96, failureRate: 4 },
  { time: '6:00 PM', successRate: 91, failureRate: 9 },
  { time: '9:00 PM', successRate: 93, failureRate: 7 },
];

export const latencyData = [
  { metric: 'STT', latency: 245 },
  { metric: 'LLM', latency: 385 },
  { metric: 'TTS', latency: 165 },
  { metric: 'Total', latency: 795 },
];

export const sentimentData = [
  { name: 'Positive', value: 65, color: '#10b981' },
  { name: 'Neutral', value: 25, color: '#f59e0b' },
  { name: 'Negative', value: 10, color: '#ef4444' },
];

export const callVolumeData = [
  { date: 'Dec 23', calls: 1234, avgDuration: 4.2 },
  { date: 'Dec 24', calls: 1456, avgDuration: 4.5 },
  { date: 'Dec 25', calls: 892, avgDuration: 3.8 },
  { date: 'Dec 26', calls: 2145, avgDuration: 5.1 },
  { date: 'Dec 27', calls: 1987, avgDuration: 4.9 },
  { date: 'Dec 28', calls: 2456, avgDuration: 5.3 },
  { date: 'Dec 29', calls: 2234, avgDuration: 5.0 },
];

export const ttsAccuracyData = [
  { agent: 'Agent A', accuracy: 96 },
  { agent: 'Agent B', accuracy: 92 },
  { agent: 'Agent C', accuracy: 98 },
  { agent: 'Agent D', accuracy: 94 },
  { agent: 'Agent E', accuracy: 91 },
];

interface CallSuccessChartProps {
  data?: typeof callSuccessData;
  onDataChange?: (newData: typeof callSuccessData) => void;
}

export function CallSuccessChart({ data = callSuccessData }: CallSuccessChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="time" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="successRate"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 4 }}
          name="Success Rate (%)"
        />
        <Line
          type="monotone"
          dataKey="failureRate"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ fill: '#ef4444', r: 4 }}
          name="Failure Rate (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LatencyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={latencyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="metric" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="latency" fill="#3b82f6" name="Latency (ms)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SentimentChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={sentimentData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {sentimentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CallVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={callVolumeData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" yAxisId="left" />
        <YAxis stroke="#9ca3af" yAxisId="right" orientation="right" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="calls" fill="#8b5cf6" name="Total Calls" radius={[8, 8, 0, 0]} />
        <Bar yAxisId="right" dataKey="avgDuration" fill="#06b6d4" name="Avg Duration (min)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TTSAccuracyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={ttsAccuracyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="agent" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" domain={[85, 100]} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
          }}
        />
        <Bar dataKey="accuracy" fill="#f59e0b" name="Accuracy (%)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
