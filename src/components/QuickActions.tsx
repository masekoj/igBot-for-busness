import { ShoppingBag, Package, Headphones, Sparkles, LucideIcon } from 'lucide-react';
import { QuickAction } from '../lib/supabase';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Package,
  Headphones,
  Sparkles,
};

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick: (action: QuickAction) => void;
}

export default function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  if (actions.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-gray-100 bg-white">
      <p className="text-xs font-medium text-gray-500 mb-2">Quick Actions</p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || Sparkles;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 hover:from-orange-100 hover:via-pink-100 hover:to-purple-100 border border-gray-200 rounded-full transition-all flex-shrink-0 group"
            >
              <Icon className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
