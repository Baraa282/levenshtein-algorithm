import { LevenshteinResult, MatrixCell } from '@/lib/levenshtein';
import { cn } from '@/lib/utils';

interface LevenshteinMatrixProps {
  result: LevenshteinResult;
}

/**
 * Renders the Levenshtein distance matrix as a responsive table
 */
export function LevenshteinMatrix({ result }: LevenshteinMatrixProps) {
  const { matrix, word1, word2 } = result;

  /**
   * Gets the CSS classes for a matrix cell based on its operation type
   */
  const getCellClasses = (cell: MatrixCell): string => {
    const baseClasses = 'transition-all duration-200';
    
    if (cell.isOnPath) {
      return cn(baseClasses, 'cell-path font-bold');
    }
    
    switch (cell.operation) {
      case 'match':
        return cn(baseClasses, 'cell-match');
      case 'insertion':
        return cn(baseClasses, 'cell-insertion');
      case 'deletion':
        return cn(baseClasses, 'cell-deletion');
      case 'substitution':
        return cn(baseClasses, 'cell-substitution');
      default:
        return baseClasses;
    }
  };

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="inline-block min-w-full">
        <table className="border-collapse mx-auto">
          <thead>
            <tr>
              {/* Empty corner cell */}
              <th className="w-10 h-10 sm:w-12 sm:h-12" />
              {/* Empty cell for word1 header offset */}
              <th className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xs sm:text-sm font-medium text-muted-foreground">
                ε
              </th>
              {/* Word2 characters as column headers */}
              {word2.split('').map((char, index) => (
                <th
                  key={index}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-sm sm:text-base font-semibold text-primary"
                >
                  {char}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {/* Row header: word1 character or empty string symbol */}
                <th className="w-10 h-10 sm:w-12 sm:h-12 text-center text-sm sm:text-base font-semibold text-primary">
                  {i === 0 ? (
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">ε</span>
                  ) : (
                    word1[i - 1]
                  )}
                </th>
                {/* Matrix cells */}
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={cn(
                      'w-10 h-10 sm:w-12 sm:h-12 text-center text-sm sm:text-base border border-border rounded-sm',
                      getCellClasses(cell)
                    )}
                  >
                    {cell.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
