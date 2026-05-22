import { useState } from 'react';
import {
  Target,
  MessageSquare,
  Store,
  Search,
  MessageCircle,
  UsersRound,
  Wand2,
  CreditCard
} from 'lucide-react';

const scopes = [
  {
    icon: Target,
    title: 'SEM & PPC Marketing',
    badge: '11 Tasks / Weekly & Monthly',
    description: 'Google Ads campaign management, budget optimization, A/B testing, conversion tracking, bid adjustments, and landing page performance monitoring.',
    tasks: [
      'Weekly bid adjustments and budget monitoring',
      'Bi-weekly ad copy A/B testing',
      'Monthly campaign performance review',
      'Conversion tracking validation',
      'Landing page optimization recommendations'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Communication & Discussion',
    badge: '3 Tasks / Weekly & Monthly',
    description: 'Strategic alignment meetings, performance reporting, stakeholder updates, decision tracking, and cross-team collaboration sessions.',
    tasks: [
      'Weekly progress check-in meetings',
      'Monthly strategic planning session',
      'Performance dashboard review',
      'Decision documentation and tracking'
    ]
  },
  {
    icon: Store,
    title: 'Instore Display Management',
    badge: '4 Tasks / As needed & Weekly',
    description: 'Physical retail display coordination, merchandising visual standards, inventory presentation, and store audit documentation.',
    tasks: [
      'Weekly store visit photo documentation',
      'Display template updates as needed',
      'Seasonal merchandising coordination',
      'Inventory visibility optimization'
    ]
  },
  {
    icon: Search,
    title: 'SEO Execution',
    badge: '12 Tasks / Monthly Recurring',
    description: 'Technical SEO audits, keyword research, on-page optimization, schema markup, backlink monitoring, and organic ranking improvements.',
    tasks: [
      'Monthly keyword ranking tracking',
      'On-page content optimization (3 pages)',
      'Backlink profile monitoring',
      'Google Search Console reporting',
      'Technical SEO issue resolution'
    ]
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Automation',
    badge: '5 Tasks / Monthly Recurring',
    description: 'Automated messaging flows, order notifications, customer support chatbots, template management, and engagement campaigns.',
    tasks: [
      'Weekly bot performance review',
      'Message template updates (2x monthly)',
      'Broadcast campaign execution',
      'Response time optimization',
      'Chatbot conversation flow refinement'
    ]
  },
  {
    icon: UsersRound,
    title: 'CRM & CRO Growth',
    badge: '3 Tasks / Monthly Recurring',
    description: 'Customer segmentation, lifecycle campaigns, retention analytics, RFM analysis, and conversion optimization strategies.',
    tasks: [
      'Monthly cohort retention analysis',
      'Win-back campaign deployment',
      'Conversion funnel optimization',
      'Customer segmentation updates'
    ]
  },
  {
    icon: Wand2,
    title: 'UI/UX Consultation',
    badge: '4 Tasks / Monthly or Per Update',
    description: 'User journey optimization, wireframe reviews, A/B test design, heatmap analysis, and conversion rate improvements.',
    tasks: [
      'Monthly heatmap analysis',
      'Checkout flow optimization review',
      'A/B test recommendations',
      'Mobile responsiveness audit'
    ]
  },
  {
    icon: CreditCard,
    title: 'Membership & Points System',
    badge: '6 Tasks / Occasionally',
    description: 'Loyalty program operations, tier management, reward fulfillment, member retention campaigns, and points reconciliation.',
    tasks: [
      'Member churn analysis (as needed)',
      'Tier upgrade campaigns',
      'Reward redemption reconciliation',
      'Loyalty program configuration updates'
    ]
  }
];

export function OperationalScopesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Operational Core Deliverables</h2>
        <p className="text-slate-600 text-sm">
          Review ongoing scopes. (Descriptions are hidden by default, visible only on component hover states)
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scopes.map((scope, index) => {
          const Icon = scope.icon;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{ minHeight: isHovered ? '320px' : '180px' }}
            >
              {/* Default State */}
              <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="px-2.5 py-1 bg-[#10B981]/10 rounded-md">
                    <span className="text-xs font-medium text-[#10B981]">{scope.badge}</span>
                  </div>
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm">{scope.title}</h3>
              </div>

              {/* Hover State */}
              <div
                className={`absolute inset-0 p-5 bg-white transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-[#0F172A] text-sm">{scope.title}</h3>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">{scope.description}</p>

                <div className="space-y-1.5">
                  {scope.tasks.map((task, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-[#10B981] text-xs mt-0.5">✓</span>
                      <span className="text-xs text-slate-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
