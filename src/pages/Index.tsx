import { LevenshteinCalculator } from '@/components/LevenshteinCalculator';
import { Github } from 'lucide-react';

/**
 * Main page for the Levenshtein Distance Calculator
 */
const Index = () => {
  const githubUsername = 'Baraa282';
  const githubUrl = `https://github.com/${githubUsername}`;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4 sm:py-6 relative">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-muted transition-colors duration-200 group"
            aria-label="Visit GitHub profile"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
            Levenshtein Distance Calculator
          </h1>
          <p className="text-muted-foreground text-center mt-1 text-sm sm:text-base">
            Free Online Edit Distance Tool - Calculate the minimum edit distance between two words
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container py-6 sm:py-8">
        <LevenshteinCalculator />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container py-4 text-center text-xs sm:text-sm text-muted-foreground space-y-2">
          <p>
            The Levenshtein distance measures the minimum number of single-character edits
            (insertions, deletions, or substitutions) required to change one word into another.
          </p>
          <p className="text-xs opacity-75">
            Use this free online calculator for string similarity analysis, spell checking algorithms, 
            fuzzy matching, and learning dynamic programming concepts.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
