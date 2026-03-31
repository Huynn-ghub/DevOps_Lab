import { useState, useEffect } from 'react';
import {
  Plus, Trash2, AlertCircle, Clock, ArrowUpCircle,
  GripVertical, Trophy, Flame, Play, Pause, Square, Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const priorityConfig = {
  low: {
    color: 'text-blue-500 bg-blue-50',
    icon: Clock,
    label: 'Low',
  },
  medium: {
    color: 'text-amber-500 bg-amber-50',
    icon: AlertCircle,
    label: 'Medium',
  },
  high: {
    color: 'text-red-500 bg-red-50',
    icon: ArrowUpCircle,
    label: 'High',
  },
};

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-100 border-slate-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-amber-50 border-amber-200' },
  { id: 'done', title: 'Done', color: 'bg-green-50 border-green-200' },
];

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ exp: 0, level: 1, streak: 0 });

  // Pomodoro state
  const [activePomodoro, setActivePomodoro] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerFinished, setIsTimerFinished] = useState(false);

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsTimerFinished(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#f59e0b', '#18181b'] });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      if (res.ok) setTodos(await res.json());
    } catch (e) {
      console.error('Fetch todos failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error('Fetch stats failed:', e);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask.trim(), priority }),
      });
      if (res.ok) {
        const todo = await res.json();
        setTodos((prev) => [todo, ...prev]);
        setNewTask('');
      }
    } catch (e) {
      console.error('Add todo failed:', e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      if (res.ok) setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      console.error('Delete todo failed:', e);
    }
  };

  const updateStatus = async (id, status) => {
    const prevTodo = todos.find((t) => t.id === id);
    // Optimistic update
    setTodos((prevList) => prevList.map((t) => (t.id === id ? { ...t, status } : t)));
    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        // Backend trả về { todo: {...}, stats: {...} }
        if (data.todo) {
          setTodos((prevList) => prevList.map((t) => (t.id === id ? data.todo : t)));
        }
        if (data.stats) setStats(data.stats);
      } else {
        // Rollback nếu API lỗi
        setTodos((prevList) => prevList.map((t) => (t.id === id ? prevTodo : t)));
      }
    } catch (e) {
      // Rollback nếu network lỗi
      setTodos((prevList) => prevList.map((t) => (t.id === id ? prevTodo : t)));
      console.error('Update status failed:', e);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newStatus = destination.droppableId;
    const movedTodo = todos.find((t) => t.id === draggableId);

    if (newStatus === 'done' && source.droppableId !== 'done') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#22c55e', '#18181b', '#f59e0b'] });
      const expGain = movedTodo?.priority === 'low' ? 10 : movedTodo?.priority === 'medium' ? 20 : 30;
      setStats((prev) => {
        const newExp = prev.exp + expGain;
        return { ...prev, exp: newExp, level: Math.floor(newExp / 100) + 1 };
      });
    } else if (source.droppableId === 'done' && newStatus !== 'done') {
      const expLoss = movedTodo?.priority === 'low' ? 10 : movedTodo?.priority === 'medium' ? 20 : 30;
      setStats((prev) => {
        const newExp = Math.max(0, prev.exp - expLoss);
        return { ...prev, exp: newExp, level: Math.floor(newExp / 100) + 1 };
      });
    }

    updateStatus(draggableId, newStatus);
  };

  const handleSessionEnd = async (isDone) => {
    if (!activePomodoro) return;
    const taskId = activePomodoro;
    setActivePomodoro(null);
    setIsTimerFinished(false);

    if (isDone) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#22c55e', '#18181b', '#f59e0b', '#ef4444'] });
      await updateStatus(taskId, 'done');
    } else {
      try {
        const res = await fetch(`${API_URL}/stats/exp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 15 }),
        });
        if (res.ok) setStats(await res.json());
      } catch (e) {
        console.error('Add focus exp failed:', e);
      }
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const currentLevelExp = stats.exp % 100;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 transition-colors duration-300">
      {/* Header + Stats */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Kanban Board</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Drag and drop tasks to organize your workflow.</p>
        </div>

        {/* Gamification */}
        <div className="flex items-center gap-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level {stats.level}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${currentLevelExp}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{currentLevelExp}/100</span>
              </div>
            </div>
          </div>

          <div className="h-7 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Streak</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{stats.streak} Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTodo} className="mb-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
        <input
          id="task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     ring-offset-white dark:ring-offset-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2 transition"
        />
        <div className="flex gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-3 text-sm text-gray-700 dark:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:ring-offset-2 transition cursor-pointer"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            id="add-task-btn"
            type="submit"
            disabled={!newTask.trim()}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white
                       hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </form>

      {/* Kanban Board */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {columns.map((col) => {
              const colTodos = todos.filter((t) => t.status === col.id);
              return (
                <div key={col.id} className={`flex flex-col rounded-xl border p-4 ${col.color} dark:bg-gray-900/50 dark:border-gray-700`}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">{col.title}</h3>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 shadow-sm">
                      {colTodos.length}
                    </span>
                  </div>

                  <Droppable droppableId={col.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex-1 min-h-[200px] space-y-3"
                      >
                        {colTodos.map((todo, index) => {
                          const PIcon = priorityConfig[todo.priority].icon;
                          return (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`group relative flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition-all
                                    ${snapshot.isDragging ? 'rotate-1 scale-105 shadow-xl ring-2 ring-gray-900/20 dark:ring-white/20' : ''}
                                    ${todo.status === 'done' ? 'opacity-75' : ''}`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="mt-0.5 cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing"
                                    >
                                      <GripVertical className="h-4 w-4" />
                                    </div>
                                    <span
                                      className={`flex-1 text-sm font-medium ${
                                        todo.status === 'done' ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'
                                      }`}
                                    >
                                      {todo.text}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between pl-7">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${priorityConfig[todo.priority].color}`}>
                                      <PIcon className="h-3 w-3" />
                                      {priorityConfig[todo.priority].label}
                                    </span>

                                    <div className="flex items-center gap-1">
                                      {todo.status !== 'done' && (
                                        <button
                                          onClick={() => {
                                            setActivePomodoro(todo.id);
                                            setSelectedDuration(25);
                                            setTimeLeft(25 * 60);
                                            setIsTimerRunning(false);
                                            setIsTimerFinished(false);
                                          }}
                                          title="Start Pomodoro"
                                          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 opacity-0 transition
                                                     hover:bg-gray-900 hover:text-white group-hover:opacity-100"
                                        >
                                          <Timer className="h-3.5 w-3.5" />
                                        </button>
                                      )}
                                      <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 opacity-0 transition
                                                   hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      )}

      {/* Pomodoro Floating Widget */}
      <AnimatePresence>
        {activePomodoro && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 inset-x-0 mx-auto w-fit z-50 flex items-center gap-6 rounded-2xl border border-gray-200 dark:border-gray-700
                       bg-white/95 dark:bg-gray-900/95 px-6 py-4 shadow-2xl backdrop-blur-md"
          >
            {isTimerFinished ? (
              <div className="flex flex-col items-center gap-3 px-2">
                <div className="text-center">
                  <h3 className="text-base font-bold text-gray-900">Focus Session Complete! 🎉</h3>
                  <p className="text-xs text-gray-500">Did you finish this task?</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSessionEnd(true)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 transition"
                  >
                    Yes, it's Done!
                  </button>
                  <button
                    onClick={() => handleSessionEnd(false)}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
                  >
                    Not yet
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Pomodoro Focus</span>
                  <span className="max-w-[180px] truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {todos.find((t) => t.id === activePomodoro)?.text}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="text-4xl font-bold font-mono text-gray-900 dark:text-gray-100">{formatTime(timeLeft)}</div>
                  {!isTimerRunning && timeLeft === selectedDuration * 60 && (
                    <div className="flex gap-1">
                      {[15, 25, 50].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => { setSelectedDuration(mins); setTimeLeft(mins * 60); }}
                          className={`rounded px-2 py-0.5 text-xs font-medium transition ${
                            selectedDuration === mins
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning((r) => !r)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-700 transition"
                  >
                    {isTimerRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => { setActivePomodoro(null); setIsTimerRunning(false); setIsTimerFinished(false); }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <Square className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
