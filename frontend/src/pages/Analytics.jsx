import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { CheckCircle2, Clock, ListTodo, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#3b82f6',
  todo: '#64748b',
  'in-progress': '#eab308',
  done: '#22c55e',
};

export default function Analytics() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setTodos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 dark:border-gray-100 border-t-transparent" />
      </div>
    );
  }

  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.status === 'done').length;
  const inProgressTasks = todos.filter((t) => t.status === 'in-progress').length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const priorityData = [
    { name: 'High', value: todos.filter((t) => t.priority === 'high').length, color: COLORS.high },
    { name: 'Medium', value: todos.filter((t) => t.priority === 'medium').length, color: COLORS.medium },
    { name: 'Low', value: todos.filter((t) => t.priority === 'low').length, color: COLORS.low },
  ].filter((d) => d.value > 0);

  const statusData = [
    { name: 'To Do', count: todos.filter((t) => t.status === 'todo').length, fill: COLORS.todo },
    { name: 'In Progress', count: inProgressTasks, fill: COLORS['in-progress'] },
    { name: 'Done', count: completedTasks, fill: COLORS.done },
  ];

  const summaryCards = [
    { label: 'Total Tasks', value: totalTasks, Icon: ListTodo, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950' },
    { label: 'Completed', value: completedTasks, Icon: CheckCircle2, color: 'text-green-500 bg-green-50 dark:bg-green-950' },
    { label: 'In Progress', value: inProgressTasks, Icon: Clock, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950' },
    { label: 'Completion Rate', value: `${completionRate}%`, Icon: TrendingUp, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950' },
  ];

  const tooltipStyle = {
    backgroundColor: 'var(--tooltip-bg, #ffffff)',
    borderColor: 'var(--tooltip-border, #e4e4e7)',
    borderRadius: '8px',
    color: 'var(--tooltip-color, #09090b)',
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Track your productivity and task distribution.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {summaryCards.map(({ label, value, Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-3 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Priority Pie */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm"
        >
          <h3 className="mb-6 text-base font-semibold text-gray-900 dark:text-gray-100">Tasks by Priority</h3>
          <div className="h-[280px]">
            {priorityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={100}
                    paddingAngle={5} dataKey="value"
                  >
                    {priorityData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: '#71717a', fontSize: '13px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-600">No data available</div>
            )}
          </div>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm"
        >
          <h3 className="mb-6 text-base font-semibold text-gray-900 dark:text-gray-100">Tasks by Status</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f4f4f5', opacity: 0.1 }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
