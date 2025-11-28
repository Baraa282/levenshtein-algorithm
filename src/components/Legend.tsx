import { cn } from '@/lib/utils';

/**
 * Legend component explaining the color coding in the matrix
 */
export function Legend() {
  const items = [
    { label: 'Match', className: 'cell-match' },
    { label: 'Insertion', className: 'cell-insertion' },
    { label: 'Deletion', className: 'cell-deletion' },
    { label: 'Substitution', className: 'cell-substitution' },
    { label: 'Optimal Path', className: 'cell-path' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className={cn(
              'w-4 h-4 sm:w-5 sm:h-5 rounded border border-border',
              item.className
            )}
          />
          <span className="text-xs sm:text-sm text-muted-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
