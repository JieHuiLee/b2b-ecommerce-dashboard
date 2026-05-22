export function TopNavbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 px-3 py-2 rounded-lg">
              <span className="text-white font-bold text-lg">033</span>
            </div>
            <div>
              <div className="font-bold text-slate-900">E-Commerce</div>
              <div className="text-xs text-slate-500">Service Hub</div>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#brands" className="text-slate-700 hover:text-indigo-600 transition-colors">
              11 Brands
            </a>
            <a href="#deliverables" className="text-slate-700 hover:text-indigo-600 transition-colors">
              8 Deliverables
            </a>
            <a href="#gdrive" className="text-slate-700 hover:text-indigo-600 transition-colors">
              G-Drive Rules
            </a>
            <a href="#faqs" className="text-slate-700 hover:text-indigo-600 transition-colors">
              FAQs
            </a>
          </div>

          {/* Right side: Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-700">Client Access Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
