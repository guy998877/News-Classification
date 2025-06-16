
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp } from "lucide-react";
import { Prediction } from "@/pages/Index";

interface PredictionResultsProps {
  predictions: Prediction[];
  isAnalyzing: boolean;
  headline: string;
}

const PredictionResults = ({ predictions, isAnalyzing, headline }: PredictionResultsProps) => {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'POLITICS': 'bg-red-100 text-red-800',
      'ENTERTAINMENT': 'bg-pink-100 text-pink-800',
      'TRAVEL': 'bg-blue-100 text-blue-800',
      'BUSINESS': 'bg-green-100 text-green-800',
      'FOOD & DRINK': 'bg-orange-100 text-orange-800',
      'COMEDY': 'bg-purple-100 text-purple-800',
      'SPORTS': 'bg-indigo-100 text-indigo-800',
      'WEIRD NEWS': 'bg-yellow-100 text-yellow-800',
      'PARENTS': 'bg-emerald-100 text-emerald-800',
      'WELLNESS': 'bg-teal-100 text-teal-800',
      'STYLE & BEAUTY': 'bg-rose-100 text-rose-800',
      'TECH': 'bg-slate-100 text-slate-800',
      'WORLD NEWS': 'bg-cyan-100 text-cyan-800',
      'CRIME': 'bg-gray-100 text-gray-800',
      'SCIENCE': 'bg-violet-100 text-violet-800',
      'ARTS & CULTURE': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (isAnalyzing) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Brain className="h-12 w-12 text-blue-600 animate-spin" />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Processing Article...
              </h3>
              <p className="text-slate-600">
                Analyzing text patterns and predicting categories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (predictions.length === 0) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">
            Prediction Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Ready to Analyze
            </h3>
            <p className="text-slate-500">
              Enter a headline and click "Predict Categories" to see results
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Top 3 Predictions
        </CardTitle>
        {headline && (
          <p className="text-sm text-slate-600 font-medium">
            "{headline.length > 60 ? headline.substring(0, 60) + '...' : headline}"
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border-2 border-slate-100 bg-gradient-to-r from-white to-slate-50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-slate-400">
                  #{index + 1}
                </span>
                <Badge className={getCategoryColor(prediction.category)}>
                  {prediction.category}
                </Badge>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getConfidenceColor(prediction.confidence)}`}>
                  {prediction.confidence.toFixed(0)}%
                </div>
                <div className="text-xs text-slate-500">confidence</div>
              </div>
            </div>
            <p className="text-slate-700 text-sm">
              <span className="font-medium">– {prediction.explanation}</span>
            </p>
            
            {/* Confidence bar */}
            <div className="mt-3">
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>ML Model:</strong> Predictions based on text analysis using keyword matching, 
            pattern recognition, and HuffPost category training data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
