import { OperationStep } from '@/lib/levenshtein';
import { cn } from '@/lib/utils';
import { Check, Plus, Minus, RefreshCw } from 'lucide-react';

interface OperationsListProps {
  operations: OperationStep[];
}

/**
 * Displays a list of operations needed to transform word1 into word2
 */
export function OperationsList({ operations }: OperationsListProps) {
  if (operations.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-4">
        No operations needed - the words are identical!
      </p>
    );
  }

  /**
   * Gets the appropriate icon for each operation type
   */
  const getOperationIcon = (type: OperationStep['type']) => {
    const iconClasses = 'w-4 h-4';
    switch (type) {
      case 'match':
        return <Check className={iconClasses} />;
      case 'insertion':
        return <Plus className={iconClasses} />;
      case 'deletion':
        return <Minus className={iconClasses} />;
      case 'substitution':
        return <RefreshCw className={iconClasses} />;
    }
  };

  /**
   * Gets the CSS classes for each operation type
   */
  const getOperationClasses = (type: OperationStep['type']): string => {
    switch (type) {
      case 'match':
        return 'cell-match';
      case 'insertion':
        return 'cell-insertion';
      case 'deletion':
        return 'cell-deletion';
      case 'substitution':
        return 'cell-substitution';
    }
  };

  return (
    <div className="space-y-2">
      {operations.map((op, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border border-border',
            getOperationClasses(op.type)
          )}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-background/50 shrink-0">
            {getOperationIcon(op.type)}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base truncate">
              {op.description}
            </p>
            <p className="text-xs opacity-70 capitalize">
              {op.type}
            </p>
          </div>
          <span className="text-xs sm:text-sm font-mono opacity-50 shrink-0">
            #{index + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
