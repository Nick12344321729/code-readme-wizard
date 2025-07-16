import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, FileText, Zap } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">README AI</span>
          </div>
          <Button variant="outline" onClick={onGetStarted}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            The easiest way to create a{" "}
            <span className="text-primary">README</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Our simple editor allows you to quickly add and customize all the sections you need 
            for your project's readme. Plus, our AI understands your code and writes it for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg shadow-elegant hover:shadow-lg transition-all"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              View Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="p-6 text-center border-0 shadow-elegant hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Manual Builder</h3>
              <p className="text-muted-foreground leading-relaxed">
                Drag-and-drop sections with real-time Markdown preview. 
                Beautiful templates included.
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-elegant hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload your codebase and let AI analyze your project to 
                generate comprehensive documentation.
              </p>
            </Card>

            <Card className="p-6 text-center border-0 shadow-elegant hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Models</h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose from GPT, Gemini, Claude, and more. 
                Use your own API keys for full control.
              </p>
            </Card>
          </div>

          {/* Preview Mock */}
          <div className="relative">
            <div className="bg-card rounded-lg shadow-elegant border p-2 max-w-4xl mx-auto">
              <div className="bg-secondary rounded-md p-8">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Beautiful README builder interface preview</p>
                  <p className="text-sm mt-2">Click "Get Started" to begin crafting your perfect README</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            Made with ❤️ by README AI • Open Source
          </div>
        </div>
      </footer>
    </div>
  );
}