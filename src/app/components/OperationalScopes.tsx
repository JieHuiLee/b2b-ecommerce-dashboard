import { Search, Target, CreditCard, Wand2, Store, UsersRound, MessageSquare, MessageCircle } from 'lucide-react';

const scopes = [
  {
    icon: Search,
    title: 'SEO Execution',
    badge: '12 Tasks/Mo',
    description: 'Technical SEO audits, keyword research, on-page optimization, and organic ranking improvements.',
    oneTime: [
      'Complete technical SEO audit and baseline report',
      'Competitive keyword gap analysis',
      'Schema markup implementation'
    ],
    recurring: [
      'Monthly keyword ranking tracking',
      'On-page content optimization (3 pages)',
      'Backlink profile monitoring',
      'Google Search Console reporting'
    ]
  },
  {
    icon: Target,
    title: 'SEM & PPC Marketing',
    badge: '11 Tasks/Mo',
    description: 'Google Ads campaign management, budget optimization, A/B testing, and conversion tracking.',
    oneTime: [
      'Campaign structure & account setup',
      'Conversion tracking configuration',
      'Negative keyword list building'
    ],
    recurring: [
      'Bi-weekly ad copy testing (2 variants)',
      'Monthly budget reallocation analysis',
      'Landing page performance review',
      'Weekly bid adjustments'
    ]
  },
  {
    icon: CreditCard,
    title: 'Membership Management',
    badge: '6 Tasks/Mo',
    description: 'Loyalty program operations, tier management, reward fulfillment, and retention campaigns.',
    oneTime: [
      'Membership tier structure design',
      'Reward catalog setup',
      'Automated email flows configuration'
    ],
    recurring: [
      'Monthly member churn analysis',
      'Tier upgrade campaigns (2x)',
      'Reward redemption reconciliation'
    ]
  },
  {
    icon: Wand2,
    title: 'UI/UX Consultation',
    badge: '4 Tasks/Mo',
    description: 'User journey optimization, wireframe reviews, A/B test design, and conversion rate improvements.',
    oneTime: [
      'Heuristic evaluation of core flows',
      'Mobile responsiveness audit',
      'Accessibility compliance check'
    ],
    recurring: [
      'Monthly heatmap analysis',
      'Checkout flow optimization review',
      'A/B test recommendations'
    ]
  },
  {
    icon: Store,
    title: 'Instore 陈列 Management',
    badge: '4 Tasks/Mo',
    description: 'Physical retail display coordination, merchandising visual standards, and inventory presentation.',
    oneTime: [
      'Display template library creation',
      'Photo documentation standards',
      'Store audit checklist development'
    ],
    recurring: [
      'Monthly store visit photo review',
      'Seasonal display update coordination',
      'Inventory visibility optimization'
    ]
  },
  {
    icon: UsersRound,
    title: 'CRM & CRO Growth',
    badge: '3 Tasks/Mo',
    description: 'Customer segmentation, lifecycle campaigns, retention analytics, and conversion optimization.',
    oneTime: [
      'RFM segmentation model setup',
      'Lifecycle email automation build',
      'CRO funnel analysis baseline'
    ],
    recurring: [
      'Monthly cohort retention analysis',
      'Win-back campaign deployment',
      'Conversion funnel optimization'
    ]
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Automation',
    badge: '5 Tasks/Mo',
    description: 'Automated messaging flows, order notifications, customer support chatbots, and engagement campaigns.',
    oneTime: [
      'WhatsApp Business API integration',
      'Chatbot conversation flow design',
      'Template message approval process'
    ],
    recurring: [
      'Weekly bot performance review',
      'Message template updates (2x)',
      'Broadcast campaign execution',
      'Response time optimization'
    ]
  },
  {
    icon: MessageCircle,
    title: 'Comm & Decisions',
    badge: '3 Tasks/Mo',
    description: 'Strategic alignment meetings, performance reporting, stakeholder updates, and decision tracking.',
    oneTime: [
      'Communication protocol setup',
      'Dashboard access provisioning',
      'Decision log template creation'
    ],
    recurring: [
      'Monthly performance review meeting',
      'Strategic planning session',
      'Decision documentation & follow-up'
    ]
  }
];

export function OperationalScopes() {
  return (
    <section id="deliverables" className="max-w-7xl mx-auto px-6 py-16 bg-slate-50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">8 Monthly Core Deliverables & Progress</h2>
        <p className="text-slate-600">Comprehensive scope overview with one-time setup and recurring monthly activities</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scopes.map((scope, index) => {
          const Icon = scope.icon;

          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              {/* Top row: Icon and Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                  {scope.badge}
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="font-bold text-slate-900 mb-2">{scope.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{scope.description}</p>

              {/* One-Time Setup */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">One-Time Setup</div>
                <ul className="space-y-1.5">
                  {scope.oneTime.map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-slate-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monthly Recurring */}
              <div className="bg-emerald-50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                <div className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wide">Monthly Recurring</div>
                <ul className="space-y-1.5">
                  {scope.recurring.map((item, i) => (
                    <li key={i} className="text-xs text-emerald-700 flex gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
