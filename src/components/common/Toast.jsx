import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/30 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-200',
    error: 'border-rose-500/30 bg-rose-50 text-rose-950 dark:bg-rose-950/80 dark:text-rose-200',
    info: 'border-blue-500/30 bg-blue-50 text-blue-950 dark:bg-blue-950/80 dark:text-blue-200'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-in max-w-sm w-full p-4 rounded-xl shadow-2xl border backdrop-blur flex items-start gap-3 transition-all duration-300 pointer-events-auto">
      <div className={`flex items-start gap-3 p-3 rounded-xl border w-full ${borderColors[toast.type] || borderColors.info}`}>
        {icons[toast.type] || icons.info}
        <div className="flex-1 text-sm font-medium">
          {toast.message}
        </div>
      </div>
    </div>
  );
}
