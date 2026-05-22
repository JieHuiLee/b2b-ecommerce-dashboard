import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I access G-Drive folders for my brand?',
    answer: 'Each brand has a dedicated Google Drive folder shared with authorized team members. Contact your account manager to request access permissions. Once granted, you\'ll find the folder structure organized into Complete Files, Ongoing Tasks, and Archive sections for easy navigation.'
  },
  {
    question: 'What is the standard turnaround time for deliverables?',
    answer: 'Standard turnaround varies by deliverable type: SEO reports (5 business days), SEM campaign setup (3 business days), UI/UX reviews (7 business days), and monthly recurring tasks follow the agreed-upon schedule. Rush requests can be accommodated with 48-hour notice and may incur additional fees.'
  },
  {
    question: 'How are monthly tasks prioritized across 11 brands?',
    answer: 'Task prioritization follows a tiered system based on contract SLA, campaign urgency, and business impact. High-priority items (product launches, time-sensitive campaigns) are flagged in our project management system and addressed first. Each brand receives a monthly capacity allocation to ensure balanced service delivery.'
  },
  {
    question: 'Can I request ad-hoc tasks outside the 8 core scopes?',
    answer: 'Yes, ad-hoc requests are evaluated on a case-by-case basis. Submit requests through the client portal with detailed requirements and desired timeline. Our team will provide a scope assessment, estimated hours, and quote within 24 hours. Ad-hoc work is billed separately from monthly retainer agreements.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Operational & Delivery FAQs</h2>
        <p className="text-slate-600">Common questions about workflows, timelines, and service standards</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-start gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-indigo-600">Q</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-slate-900 pr-8">{faq.question}</h3>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6 pl-16">
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
