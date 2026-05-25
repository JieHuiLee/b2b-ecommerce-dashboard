import { useState, useEffect } from 'react';
import { Upload, Folder, FolderOpen, AlertTriangle, Copy, Check, GripVertical, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// 保持你原有的基础数据配置
const brands = ['Dr Smile', 'iLady', 'Katamarine', 'MFormula', 'Moesie', 'MPlusSkinPro', 'Ninoko', 'NomoQ', 'Recovit', 'ScaleStory', 'SkinDae'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const deliverableTypes = [
  'SEM & PPC Marketing',
  'Communication & Discussion',
  'Instore Display Management',
  'SEO Execution',
  'WhatsApp Automation',
  'CRM & CRO Growth',
  'UI/UX Consultation',
  'Membership & Points System'
];

// 定义内部文件对象接口，保存原始 File 对象、生成的唯一 ID 盒当前格式化后的名字
interface ManagedFile {
  id: string;
  originalName: string;
  extension: string;
  fileObject: File;
}

// 你的后端 GAS 部署后的 Web App URL (请在步骤二部署后替换此处)
// 动态读取本地或线上托管平台的安全环境变量
const GAS_WEB_APP_URL = import.meta.env.VITE_GAS_WEB_APP_URL || "";

export function FileSubmissionSection() {
  const [selectedBrand, setSelectedBrand] = useState('Dr Smile');
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedType, setSelectedType] = useState('SEO Execution');
  const [campaignName, setCampaignName] = useState('Spring Campaign');
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // 核心状态：管理带顺序的文件列表以及上传状态
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);

  // 辅助函数：根据规则、当前索引生成单个文件的标准格式化名称
  const formatSingleFileName = (file: ManagedFile, index: number) => {
    const cleanCampaign = campaignName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_');
    const shortType = selectedType.split(' ')[0];
    const cleanBrand = selectedBrand.replace(/\s+/g, '');
    // 增加 index 序号（如 01, 02）来支持批量拖拽多文件时的唯一性和顺序展现
    const orderStr = String(index + 1).padStart(2, '0');
    return `${selectedMonth}_${shortType}_${cleanBrand}_${cleanCampaign}_${orderStr}${file.extension}`;
  };

  // 生成通用的目标文件夹路径描述（UI 展示用）
  const generateFolderPath = () => {
    return `${selectedBrand} Webstore / Brand Complete File / Ongoing Task Folder (${selectedMonth}_${selectedType.split(' ')[0]}_${selectedBrand.replace(/\s+/g, '')})`;
  };

  // 处理文件拖入解析
  const processFiles = (files: FileList) => {
    const newFiles: ManagedFile[] = Array.from(files).map((file, index) => {
      const lastDot = file.name.lastIndexOf('.');
      const originalName = lastDot !== -1 ? file.name.substring(0, lastDot) : file.name;
      const extension = lastDot !== -1 ? file.name.substring(lastDot) : '';
      return {
        id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 5)}`,
        originalName,
        extension,
        fileObject: file
      };
    });
    setManagedFiles(prev => [...prev, ...newFiles]);
  };

  // 拖拽事件监听
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // 处理前端列表拖拽排序（Reorder）
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(managedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setManagedFiles(items);
  };

  // 一键复制预览信息
  const handleCopy = () => {
    const summary = managedFiles.map((file, i) => `File ${i+1}: ${formatSingleFileName(file, i)}`).join('\n');
    const output = `Folder Path: ${generateFolderPath()}\n\nFormatted Files:\n${summary}`;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 核心：将文件转换为 Base64 并真实上传到 Google Drive (通过 GAS)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFormatAndUpload = async () => {
    if (managedFiles.length === 0) {
      alert("Please upload at least one file first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      // 循环顺序上传各个文件，确保严格按照前端排好的队列执行
      for (let i = 0; i < managedFiles.length; i++) {
        const fileItem = managedFiles[i];
        const finalName = formatSingleFileName(fileItem, i);
        const base64Data = await fileToBase64(fileItem.fileObject);

        // 构造发送给 Google Apps Script 后端的 Payload
        const payload = {
          brand: selectedBrand,
          month: selectedMonth,
          type: selectedType.split(' ')[0],
          folderPath: generateFolderPath(),
          fileName: finalName,
          mimeType: fileItem.fileObject.type,
          fileData: base64Data
        };

        // 使用 fetch 发送到后端的 Web App 节点
        const response = await fetch(GAS_WEB_APP_URL, {
          method: 'POST',
          mode: 'no-cors', // 配合 GAS 跨域重定向特性
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      setUploadStatus({ success: true, message: `Successfully structured and uploaded ${managedFiles.length} files to Google Drive!` });
      setManagedFiles([]); // 上传成功后清空文件队列
    } catch (error) {
      console.error(error);
      setUploadStatus({ success: false, message: "Upload failed. Please verify Google Apps Script deployment configurations." });
    } finally {
      setIsUploading(false);
    }
  };

  // 过渡方案：先支持本地批量下载重命名后的文件
  const handleFormatAndDownload = () => {
    if (managedFiles.length === 0) {
      alert("Please upload at least one file first.");
      return;
    }

    managedFiles.forEach((file, index) => {
      const renamedFile = new File([file.fileObject], formatSingleFileName(file, index), {
        type: file.fileObject.type,
      });
      const url = URL.createObjectURL(renamedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = renamedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Client Content Submission & Precise File Formatter</h2>
        <p className="text-slate-600 text-sm">
          上传文件后可通过左侧手柄自由调节命名顺序。系统将直接强制绑定 Google Drive 的标准化品牌架构，实现自动化重命名并定点上传。
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* 左侧栏：G-Drive 架构视窗与严苛命名规范说明 */}
        <div className="bg-[#0F172A] rounded-xl p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-6">Standardized G-Drive Folder Architecture View</h3>
            <div className="space-y-3 font-mono text-sm mb-6">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-300">{selectedBrand} Webstore Folder</span>
              </div>
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">Brand Done File 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">Brand Complete File</span>
                </div>
              </div>
              <div className="ml-12 border-l-2 border-slate-700 pl-4">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">Ongoing Task Folder</span>
                </div>
                <div className="ml-6 mt-1 text-xs text-slate-400 truncate">
                  ({selectedMonth}_{selectedType.split(' ')[0]}_{selectedBrand.replace(/\s+/g, '')})
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-300 text-sm mb-2">Strict Naming Restrictions</div>
                <ul className="text-xs text-amber-200/90 space-y-1">
                  <li>• 强制包含前置月份序号，严禁随机数字或空占位符</li>
                  <li>• 格式标准：Month_Type_Brand_CampaignName_Index</li>
                  <li>• 上传时系统将自动应用此命名模板，精准送达对应 Product Page G-Drive。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧栏：文件提交、元数据设置与实时排序 formatter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-[#0F172A] mb-6">Interactive File Submission Form & Direct Uploader</h3>

          {/* 步骤 1: 拖拽/选择上传域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Step 1: Drop Files & Arrange Sequence</label>
            <div
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
              }`}
            >
              <input type="file" multiple onChange={handleFileInput} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">Drag & Drop Files or Click to Browse</p>
            </div>

            {/* 核心改动：加入文件拖拽重排序区域与前后名称对照表 */}
            {managedFiles.length > 0 && (
              <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Adjust order & check naming transformation:
                </div>
                
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="files-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {managedFiles.map((file, index) => (
                          <Draggable key={file.id} draggableId={file.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-xs"
                              >
                                {/* 拖拽手柄 */}
                                <div {...provided.dragHandleProps} className="text-slate-400 hover:text-slate-600 px-1 cursor-grab">
                                  <GripVertical className="w-4 h-4" />
                                </div>
                                
                                {/* 前后改名状态对照 */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 items-center min-w-0">
                                  <div className="flex items-center gap-1.5 text-slate-500 truncate">
                                    <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                    <span className="truncate" title={file.originalName}>{file.originalName}{file.extension}</span>
                                  </div>
                                  <div className="flex items-center gap-2 min-w-0">
                                    <ArrowRight className="w-3 h-3 text-indigo-400 flex-shrink-0 hidden md:block" />
                                    <span className="font-mono text-indigo-600 font-medium truncate" title={formatSingleFileName(file, index)}>
                                      {formatSingleFileName(file, index)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>

          {/* 步骤 2: 填充归类信息 */}
          <div className="mb-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <label className="block text-sm font-medium text-[#0F172A] mb-3">Step 2: Define Location Meta-data</label>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Target Brand</label>
                  <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs">
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Execution Month</label>
                  <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs">
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Scope / Deliverable</label>
                  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs">
                    {deliverableTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Campaign Description</label>
                  <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g., Spring Campaign" className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* 步骤 3: 触发执行上传 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleFormatAndDownload}
              disabled={managedFiles.length === 0}
              className={`w-full text-white font-bold py-3 rounded-lg transition-colors ${
                managedFiles.length === 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0F766E] hover:bg-[#0D5E58]'
              }`}
            >
              Format Name & Download Files
            </button>

            <button
              onClick={handleFormatAndUpload}
              disabled={isUploading || managedFiles.length === 0}
              className={`w-full text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isUploading || managedFiles.length === 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#4F46E5] hover:bg-[#4338CA]'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Format Name & Secure Upload to G-Drive"
              )}
            </button>
          </div>

          {/* 上传反馈状态框 */}
          {uploadStatus && (
            <div className={`p-3 rounded-lg text-xs font-medium mb-4 ${uploadStatus.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
              {uploadStatus.message}
            </div>
          )}

          {/* 路径与总体预览区 */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wide">Target G-Drive Destination</div>
              <button onClick={handleCopy} className="px-2 py-1 bg-white border border-indigo-300 text-indigo-700 rounded text-xs flex items-center gap-1">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy Details
              </button>
            </div>
            <div className="text-xs font-mono text-slate-700 bg-white p-2 rounded border border-indigo-100 break-all">
              {generateFolderPath()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
