import { User, BookOpen, GraduationCap, Code2 } from 'lucide-react';

export default function About() {
  const techStack = ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'TailwindCSS'];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">About</h1>
        <p className="text-gray-500 mt-1 text-sm">Student information and project details.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
        {/* Card Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900/10 text-gray-900">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Student Profile</h2>
              <p className="text-sm text-gray-500">DevOps Mini Project</p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <User className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <dt className="text-xs font-medium text-gray-500 mb-1">Họ và tên</dt>
                <dd className="text-sm font-semibold text-gray-900">Đồng Thanh Huyền</dd>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <BookOpen className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <dt className="text-xs font-medium text-gray-500 mb-1">Mã số sinh viên</dt>
                <dd className="text-sm font-semibold text-gray-900">2251220032</dd>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2">
              <GraduationCap className="mt-0.5 h-5 w-5 text-gray-400" />
              <div>
                <dt className="text-xs font-medium text-gray-500 mb-1">Lớp</dt>
                <dd className="text-sm font-semibold text-gray-900">22CT1</dd>
              </div>
            </div>
          </dl>

          {/* Tech Stack */}
          <div className="mt-6 pt-5 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="h-4 w-4 text-gray-400" />
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Tech Stack</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
