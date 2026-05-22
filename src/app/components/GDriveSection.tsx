import { useState } from 'react';
import { Copy, Check, Folder, FolderOpen, AlertTriangle } from 'lucide-react';

interface GDriveSectionProps {
  currentBrand: string;
}

export function GDriveSection({ currentBrand }: GDriveSectionProps) {
  const [month, setMonth] = useState('2026-05');
  const [deliverableType, setDeliverableType] = useState('SEO');
  const [campaignName, setCampaignName] = useState('Spring Promotion');
  const [copied, setCopied] = useState<string | null>(null);

  const months = [
    '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06',
    '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'
  ];

  const deliverableTypes = [
    'SEO', 'SEM-PPC', 'Membership', 'UIUX', 'Instore', 'CRM-CRO', 'WhatsApp', 'Comm'
  ];

  const generateFileName = () => {
    const cleanCampaign = campaignName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `${month}_${currentBrand}_${deliverableType}_${cleanCampaign}`;
  };

  const generateFolderPath = () => {
    return `${currentBrand} Webstore / Complete Files / ${deliverableType} Deliverables`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="gdrive" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">G-Drive Rules & Interactive Naming Generator</h2>
        <p className="text-slate-600">Standardized folder structure and file naming conventions for seamless collaboration</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: G-Drive Folder Structure */}
        <div className="bg-slate-900 rounded-2xl p-6 text-slate-100">
          <h3 className="font-bold text-lg mb-4 text-white">G-Drive Folder Structure View</h3>

          <div className="space-y-3 font-mono text-sm">
            {/* Level 1 */}
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300">{currentBrand} Webstore</span>
            </div>

            {/* Level 2 */}
            <div className="ml-6 space-y-2">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Complete Files</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-slate-500" />
                <span className="text-slate-400">Ongoing Tasks</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-slate-500" />
                <span className="text-slate-400">Archive</span>
              </div>
            </div>

            {/* Level 3 */}
            <div className="ml-12 space-y-2 border-l-2 border-slate-700 pl-4">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">SEO Deliverables</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">SEM-PPC Deliverables</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">Membership Deliverables</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300">UIUX Deliverables</span>
              </div>
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-slate-600" />
                <span className="text-slate-500">...</span>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <div className="mt-6 bg-amber-900/30 border border-amber-700/50 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-300 text-sm mb-1">File Naming Restrictions</div>
                <ul className="text-xs text-amber-200/80 space-y-1">
                  <li>• No special characters: @#$%^&*()</li>
                  <li>• Use hyphens instead of spaces</li>
                  <li>• Follow format: YYYY-MM_Brand_Type_Description</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Naming Tester Tool */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4 text-slate-900">Naming Tester Tool</h3>

          <div className="space-y-4">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Deliverable Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Deliverable Type</label>
              <select
                value={deliverableType}
                onChange={(e) => setDeliverableType(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {deliverableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Name Description</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Spring Promotion"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Current Brand (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Current Brand</label>
              <input
                type="text"
                value={currentBrand}
                readOnly
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl bg-slate-100 text-slate-600 cursor-not-allowed"
              />
            </div>

            {/* Output Box */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 mt-6">
              <div className="text-xs font-bold text-indigo-900 mb-3 uppercase tracking-wide">Standardized Output</div>

              {/* File Name */}
              <div className="mb-3">
                <div className="text-xs text-indigo-700 mb-1.5 font-medium">File Name:</div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-indigo-200">
                  <code className="text-sm text-slate-900 flex-grow font-mono">{generateFileName()}</code>
                  <button
                    onClick={() => handleCopy(generateFileName(), 'filename')}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 text-sm"
                  >
                    {copied === 'filename' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Folder Path */}
              <div>
                <div className="text-xs text-indigo-700 mb-1.5 font-medium">Folder Path:</div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-indigo-200">
                  <code className="text-sm text-slate-900 flex-grow font-mono">{generateFolderPath()}</code>
                  <button
                    onClick={() => handleCopy(generateFolderPath(), 'folderpath')}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 text-sm"
                  >
                    {copied === 'folderpath' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
