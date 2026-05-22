export function HeroBanner() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left columns */}
          <div>
            <div className="inline-block px-4 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-sm font-medium mb-6">
              README & OPERATIONAL PORTAL
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome to 033 Brand Alliance Delivery Center
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Your centralized hub for transparent operations tracking, standardized file management,
              and real-time visibility into all brand deliverables. Built for efficiency, compliance,
              and seamless cross-team collaboration.
            </p>

            {/* Metric chips */}
            <div className="flex gap-4 flex-wrap">
              <div className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold">11</div>
                <div className="text-sm text-slate-300">Managed Brands</div>
              </div>
              <div className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl font-bold">48</div>
                <div className="text-sm text-slate-300">Active Tasks/Mo</div>
              </div>
            </div>
          </div>

          {/* Right columns: Quick Start Guide */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-lg mb-4">Quick Start Guide</h3>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="text-slate-200">
                  Select your brand from the portal grid below to view dedicated resources
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="text-slate-200">
                  Review monthly deliverables and progress tracking in the scopes section
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span className="text-slate-200">
                  Use the naming generator tool to ensure file compliance with G-Drive standards
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
