
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp } from "lucide-react";
import CategoryPredictor from "@/components/CategoryPredictor";
import PredictionResults from "@/components/PredictionResults";

export interface Prediction {
  category: string;
  confidence: number;
  explanation: string;
}

const Index = () => {
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!headline.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newPredictions = CategoryPredictor.predictCategories(headline, description);
    setPredictions(newPredictions);
    setIsAnalyzing(false);
  };

  const handleClear = () => {
    setHeadline("");
    setDescription("");
    setPredictions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NewsClassify AI
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Intelligent news category prediction powered by advanced text analysis
          </p>
          <Badge variant="secondary" className="mt-4">
            <TrendingUp className="h-3 w-3 mr-1" />
            HuffPost-Style Categories
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800">
                Article Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-lg font-medium">
                  Headline *
                </Label>
                <Input
                  id="headline"
                  placeholder="Enter the article headline..."
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-medium">
                  Short Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter a brief description or excerpt..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] text-base"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleAnalyze}
                  disabled={!headline.trim() || isAnalyzing}
                  className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Predict Categories
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleClear}
                  className="h-12 px-6"
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <PredictionResults 
            predictions={predictions} 
            isAnalyzing={isAnalyzing}
            headline={headline}
          />
        </div>

        {/* Example Section */}
        <Card className="mt-12 shadow-lg border-0 bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Example Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✅ Example Input:</h4>
                <p className="font-medium">Headline:</p>
                <p className="text-slate-700 mb-2">23 Of The Funniest Tweets About Cats And Dogs</p>
                <p className="font-medium">Short Description:</p>
                <p className="text-slate-700 italic">"Until you have a dog you don't understand what it means to do something for someone else."</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">✅ Example Output:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">COMEDY</Badge>
                    <span className="text-sm text-slate-600">– humor, tweet-based content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">PARENTS</Badge>
                    <span className="text-sm text-slate-600">– family-related tone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-orange-100 text-orange-800">WEIRD NEWS</Badge>
                    <span className="text-sm text-slate-600">– unusual, meme-like theme</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
