
import { Prediction } from "@/pages/Index";

class CategoryPredictor {
  private static categories = [
    'POLITICS',
    'ENTERTAINMENT', 
    'TRAVEL',
    'BUSINESS',
    'FOOD & DRINK',
    'COMEDY',
    'SPORTS',
    'WEIRD NEWS',
    'PARENTS',
    'WELLNESS',
    'STYLE & BEAUTY',
    'TECH',
    'WORLD NEWS',
    'CRIME',
    'SCIENCE',
    'ARTS & CULTURE'
  ];

  private static keywordMap = {
    'POLITICS': ['election', 'vote', 'president', 'congress', 'government', 'policy', 'senator', 'debate', 'campaign'],
    'ENTERTAINMENT': ['movie', 'celebrity', 'actor', 'music', 'film', 'concert', 'star', 'hollywood', 'show', 'netflix'],
    'TRAVEL': ['vacation', 'hotel', 'flight', 'destination', 'trip', 'airport', 'tourism', 'beach', 'city', 'country'],
    'BUSINESS': ['company', 'stock', 'market', 'economy', 'investment', 'profit', 'startup', 'ceo', 'finance'],
    'FOOD & DRINK': ['recipe', 'restaurant', 'food', 'cooking', 'chef', 'meal', 'drink', 'wine', 'coffee', 'dinner'],
    'COMEDY': ['funny', 'hilarious', 'jokes', 'laugh', 'humor', 'comedy', 'meme', 'tweet', 'viral', 'ridiculous'],
    'SPORTS': ['game', 'team', 'player', 'score', 'championship', 'football', 'basketball', 'baseball', 'soccer'],
    'WEIRD NEWS': ['bizarre', 'strange', 'unusual', 'weird', 'shocking', 'unbelievable', 'crazy', 'wild'],
    'PARENTS': ['children', 'kids', 'family', 'parenting', 'baby', 'mom', 'dad', 'school', 'education'],
    'WELLNESS': ['health', 'fitness', 'exercise', 'diet', 'mental health', 'meditation', 'yoga', 'sleep'],
    'STYLE & BEAUTY': ['fashion', 'makeup', 'beauty', 'style', 'clothing', 'trend', 'outfit', 'skincare'],
    'TECH': ['technology', 'app', 'software', 'computer', 'internet', 'digital', 'ai', 'smartphone'],
    'WORLD NEWS': ['international', 'global', 'world', 'foreign', 'country', 'nation', 'diplomatic'],
    'CRIME': ['police', 'arrest', 'court', 'trial', 'criminal', 'investigation', 'murder', 'theft'],
    'SCIENCE': ['research', 'study', 'scientist', 'discovery', 'experiment', 'data', 'climate', 'space'],
    'ARTS & CULTURE': ['art', 'museum', 'culture', 'artist', 'painting', 'gallery', 'theater', 'book']
  };

  static predictCategories(headline: string, description: string = ""): Prediction[] {
    const text = (headline + " " + description).toLowerCase();
    const scores: { [key: string]: number } = {};

    // Initialize scores
    this.categories.forEach(category => {
      scores[category] = 0;
    });

    // Calculate keyword matches
    Object.entries(this.keywordMap).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        const keywordCount = (text.match(new RegExp(keyword, 'gi')) || []).length;
        scores[category] += keywordCount * 10;
      });
    });

    // Special pattern recognition
    if (text.includes('funny') || text.includes('hilarious') || text.includes('tweet')) {
      scores['COMEDY'] += 20;
    }
    
    if (text.includes('family') || text.includes('parent') || text.includes('children')) {
      scores['PARENTS'] += 15;
    }

    if (text.includes('bizarre') || text.includes('weird') || text.includes('unusual')) {
      scores['WEIRD NEWS'] += 25;
    }

    // Add some randomness for more realistic predictions
    this.categories.forEach(category => {
      scores[category] += Math.random() * 5;
    });

    // Sort by score and get top 3
    const sortedCategories = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return sortedCategories.map(([category, score], index) => ({
      category,
      confidence: Math.max(60 - (index * 15) + Math.random() * 20, 45),
      explanation: this.generateExplanation(category, text, index)
    }));
  }

  private static generateExplanation(category: string, text: string, rank: number): string {
    const explanations: { [key: string]: string[] } = {
      'COMEDY': ['humor, joke content', 'funny, entertaining tone', 'comedic, lighthearted style'],
      'PARENTS': ['family-related theme', 'parenting, child focus', 'family-oriented content'],
      'WEIRD NEWS': ['unusual, bizarre topic', 'strange, offbeat story', 'quirky, unconventional news'],
      'ENTERTAINMENT': ['celebrity, media focus', 'showbiz, pop culture', 'entertainment industry'],
      'POLITICS': ['political, government theme', 'election, policy focus', 'governmental content'],
      'BUSINESS': ['economic, financial focus', 'corporate, market news', 'business-related topic'],
      'TRAVEL': ['travel, destination theme', 'tourism, location focus', 'travel-related content'],
      'FOOD & DRINK': ['culinary, dining focus', 'food, restaurant theme', 'cooking, recipe content'],
      'SPORTS': ['athletic, game focus', 'sports, competition theme', 'team, player content'],
      'WELLNESS': ['health, fitness focus', 'wellness, lifestyle theme', 'medical, health content'],
      'STYLE & BEAUTY': ['fashion, beauty focus', 'style, trend theme', 'appearance, fashion content'],
      'TECH': ['technology, digital focus', 'tech, innovation theme', 'technological content'],
      'WORLD NEWS': ['international, global focus', 'world, foreign theme', 'global news content'],
      'CRIME': ['criminal, legal focus', 'crime, justice theme', 'law enforcement content'],
      'SCIENCE': ['scientific, research focus', 'discovery, study theme', 'academic, scientific content'],
      'ARTS & CULTURE': ['artistic, cultural focus', 'art, culture theme', 'creative, cultural content']
    };

    const categoryExplanations = explanations[category] || ['relevant topic match'];
    return categoryExplanations[rank] || categoryExplanations[0];
  }
}

export default CategoryPredictor;
