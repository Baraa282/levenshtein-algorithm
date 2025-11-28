import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateLevenshtein, LevenshteinResult } from '@/lib/levenshtein';
import { LevenshteinMatrix } from './LevenshteinMatrix';
import { OperationsList } from './OperationsList';
import { Legend } from './Legend';
import { ArrowRight, RotateCcw } from 'lucide-react';

/**
 * Main calculator component for computing Levenshtein distance
 */
export function LevenshteinCalculator() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState<LevenshteinResult | null>(null);
  const [error, setError] = useState('');

  /**
   * Handles the calculation when the button is clicked
   */
  const handleCalculate = () => {
    setError('');
    
    // Validate inputs
    if (!word1.trim() || !word2.trim()) {
      setError('Please enter both words');
      return;
    }
    
    // Calculate Levenshtein distance
    const levenshteinResult = calculateLevenshtein(word1.trim(), word2.trim());
    setResult(levenshteinResult);
  };

  /**
   * Resets the calculator to initial state
   */
  const handleReset = () => {
    setWord1('');
    setWord2('');
    setResult(null);
    setError('');
  };

  /**
   * Handles Enter key press to trigger calculation
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Card */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Input Words</CardTitle>
          <CardDescription>
            Enter two words to calculate the edit distance between them
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="w-full sm:flex-1">
              <label htmlFor="word1" className="sr-only">First word</label>
              <Input
                id="word1"
                type="text"
                placeholder="First word"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-center text-lg"
                maxLength={20}
              />
            </div>
            
            <ArrowRight className="hidden sm:block w-5 h-5 text-muted-foreground shrink-0" />
            
            <div className="w-full sm:flex-1">
              <label htmlFor="word2" className="sr-only">Second word</label>
              <Input
                id="word2"
                type="text"
                placeholder="Second word"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-center text-lg"
                maxLength={20}
              />
            </div>
          </div>
          
          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}
          
          <div className="flex gap-3 justify-center">
            <Button onClick={handleCalculate} size="lg">
              Calculate Distance
            </Button>
            {result && (
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Distance Result */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm uppercase tracking-wide mb-2">
                  Levenshtein Distance
                </p>
                <p className="text-5xl sm:text-6xl font-bold text-primary">
                  {result.distance}
                </p>
                <p className="text-muted-foreground mt-2">
                  {result.distance === 0 
                    ? 'The words are identical' 
                    : `${result.distance} edit${result.distance > 1 ? 's' : ''} required`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Legend />

          {/* Matrix Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Dynamic Programming Matrix</CardTitle>
              <CardDescription>
                Each cell shows the minimum edits needed. Highlighted path shows optimal solution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LevenshteinMatrix result={result} />
            </CardContent>
          </Card>

          {/* Operations List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Step-by-Step Operations</CardTitle>
              <CardDescription>
                Transform "{result.word1}" into "{result.word2}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsList operations={result.operations} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
