import { ChevronDown } from 'lucide-react';

export function ClientNavbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo */}
          <div>
            <div className="font-bold text-lg text-[#0F172A]">033 SERVICE HUB</div>
            <div className="text-xs text-slate-500">Client Content Pipeline</div>
          </div>

          {/* Right side: Status and Profile */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
              <span className="text-sm font-medium text-indigo-700">Active Project: Dr Smile Webstore</span>
            </div>

            <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-700">CP</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
