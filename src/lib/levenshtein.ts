/**
 * Represents a cell in the Levenshtein distance matrix
 */
export interface MatrixCell {
  value: number;
  operation: 'match' | 'insertion' | 'deletion' | 'substitution' | 'initial';
  isOnPath: boolean;
}

/**
 * Result of the Levenshtein distance calculation
 */
export interface LevenshteinResult {
  distance: number;
  matrix: MatrixCell[][];
  word1: string;
  word2: string;
  operations: OperationStep[];
}

/**
 * Represents a single operation step in the transformation
 */
export interface OperationStep {
  type: 'match' | 'insertion' | 'deletion' | 'substitution';
  from?: string;
  to?: string;
  position: number;
  description: string;
}

/**
 * Calculates the Levenshtein distance between two strings
 * using dynamic programming approach
 * 
 * @param word1 - First input word
 * @param word2 - Second input word
 * @returns LevenshteinResult containing distance, matrix, and operations
 */
export function calculateLevenshtein(word1: string, word2: string): LevenshteinResult {
  const m = word1.length;
  const n = word2.length;
  
  // Initialize the matrix with dimensions (m+1) x (n+1)
  const matrix: MatrixCell[][] = [];
  
  // Fill the matrix
  for (let i = 0; i <= m; i++) {
    matrix[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        // First row: insertions from empty string
        matrix[i][j] = {
          value: j,
          operation: j === 0 ? 'initial' : 'insertion',
          isOnPath: false,
        };
      } else if (j === 0) {
        // First column: deletions to empty string
        matrix[i][j] = {
          value: i,
          operation: 'deletion',
          isOnPath: false,
        };
      } else {
        // Calculate costs
        const substitutionCost = word1[i - 1] === word2[j - 1] ? 0 : 1;
        
        const deletion = matrix[i - 1][j].value + 1;
        const insertion = matrix[i][j - 1].value + 1;
        const substitution = matrix[i - 1][j - 1].value + substitutionCost;
        
        // Find minimum cost and operation
        const minCost = Math.min(deletion, insertion, substitution);
        
        let operation: MatrixCell['operation'];
        if (minCost === substitution) {
          operation = substitutionCost === 0 ? 'match' : 'substitution';
        } else if (minCost === deletion) {
          operation = 'deletion';
        } else {
          operation = 'insertion';
        }
        
        matrix[i][j] = {
          value: minCost,
          operation,
          isOnPath: false,
        };
      }
    }
  }
  
  // Trace back the optimal path
  const operations = tracePath(matrix, word1, word2);
  
  return {
    distance: matrix[m][n].value,
    matrix,
    word1,
    word2,
    operations,
  };
}

/**
 * Traces back through the matrix to find the optimal path
 * and generate operation steps
 */
function tracePath(
  matrix: MatrixCell[][],
  word1: string,
  word2: string
): OperationStep[] {
  const operations: OperationStep[] = [];
  let i = word1.length;
  let j = word2.length;
  
  // Mark the final cell as on path
  matrix[i][j].isOnPath = true;
  
  while (i > 0 || j > 0) {
    const current = matrix[i][j];
    
    if (i > 0 && j > 0 && 
        (current.operation === 'match' || current.operation === 'substitution')) {
      // Diagonal movement
      matrix[i - 1][j - 1].isOnPath = true;
      
      if (current.operation === 'match') {
        operations.unshift({
          type: 'match',
          from: word1[i - 1],
          to: word2[j - 1],
          position: j,
          description: `Keep '${word1[i - 1]}'`,
        });
      } else {
        operations.unshift({
          type: 'substitution',
          from: word1[i - 1],
          to: word2[j - 1],
          position: j,
          description: `Replace '${word1[i - 1]}' with '${word2[j - 1]}'`,
        });
      }
      i--;
      j--;
    } else if (i > 0 && matrix[i][j].value === matrix[i - 1][j].value + 1) {
      // Vertical movement (deletion)
      matrix[i - 1][j].isOnPath = true;
      operations.unshift({
        type: 'deletion',
        from: word1[i - 1],
        position: i,
        description: `Delete '${word1[i - 1]}'`,
      });
      i--;
    } else if (j > 0) {
      // Horizontal movement (insertion)
      matrix[i][j - 1].isOnPath = true;
      operations.unshift({
        type: 'insertion',
        to: word2[j - 1],
        position: j,
        description: `Insert '${word2[j - 1]}'`,
      });
      j--;
    }
  }
  
  // Mark the origin
  matrix[0][0].isOnPath = true;
  
  return operations;
}
