import { Smile, Shirt, Beaker, Baby, Sparkles, FlaskConical, Flower2, Shield, Leaf, TrendingUp, Sun } from 'lucide-react';

interface BrandGridProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
}

const brands = [
  { name: 'Dr Smile', icon: Smile },
  { name: 'iLady', icon: Shirt },
  { name: 'Katamarine', icon: Beaker },
  { name: 'MFormula', icon: Baby },
  { name: 'Moesie', icon: Sparkles },
  { name: 'MPlusSkinPro', icon: FlaskConical },
  { name: 'Ninoko', icon: Flower2 },
  { name: 'NomoQ', icon: Shield },
  { name: 'Recovit', icon: Leaf },
  { name: 'ScaleStory', icon: TrendingUp },
  { name: 'SkinDae', icon: Sun },
];

export function BrandGrid({ selectedBrand, onSelectBrand }: BrandGridProps) {
  return (
    <section id="brands" className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">11 Managed Webstore Portals</h2>
        <p className="text-slate-600">Select a brand to view dedicated resources and operational context</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {brands.map((brand) => {
          const Icon = brand.icon;
          const isSelected = selectedBrand === brand.name;

          return (
            <button
              key={brand.name}
              onClick={() => onSelectBrand(brand.name)}
              className={`
                p-6 rounded-2xl transition-all hover:shadow-lg
                ${isSelected
                  ? 'bg-indigo-50 border-2 border-indigo-600 shadow-md'
                  : 'bg-slate-100 border-2 border-transparent hover:border-slate-300'
                }
              `}
            >
              <div className={`
                w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center
                ${isSelected ? 'bg-indigo-100' : 'bg-slate-200'}
              `}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-indigo-600' : 'text-slate-600'}`} />
              </div>
              <div className="font-bold text-slate-900 text-sm mb-1">{brand.name}</div>
              <div className="text-xs text-slate-500">Active Delivery</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
