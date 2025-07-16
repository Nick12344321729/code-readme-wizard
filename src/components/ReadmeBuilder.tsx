import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Download, 
  Upload, 
  Sparkles, 
  Eye, 
  Code,
  Settings,
  Palette,
  Zap,
  Book,
  Users,
  Shield,
  Globe,
  Terminal,
  Layers
} from "lucide-react";

interface ReadmeBuilderProps {
  onBack: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
  enabled: boolean;
}

export function ReadmeBuilder({ onBack }: ReadmeBuilderProps) {
  const [activeSection, setActiveSection] = useState("title");
  const [aiModel, setAiModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    features: "",
    installation: "",
    usage: "",
    techStack: "",
    license: "MIT"
  });

  const sections: Section[] = [
    { id: "title", title: "Title & Description", icon: <FileText className="w-4 h-4" />, content: "", enabled: true },
    { id: "features", title: "Features", icon: <Sparkles className="w-4 h-4" />, content: "", enabled: true },
    { id: "techstack", title: "Tech Stack", icon: <Layers className="w-4 h-4" />, content: "", enabled: true },
    { id: "installation", title: "Installation", icon: <Download className="w-4 h-4" />, content: "", enabled: true },
    { id: "usage", title: "Usage", icon: <Terminal className="w-4 h-4" />, content: "", enabled: true },
    { id: "api", title: "API Reference", icon: <Book className="w-4 h-4" />, content: "", enabled: false },
    { id: "contributing", title: "Contributing", icon: <Users className="w-4 h-4" />, content: "", enabled: true },
    { id: "license", title: "License", icon: <Shield className="w-4 h-4" />, content: "", enabled: true },
    { id: "acknowledgments", title: "Acknowledgments", icon: <Globe className="w-4 h-4" />, content: "", enabled: false },
  ];

  const generateMarkdown = () => {
    let markdown = `# ${projectData.title}\n\n`;
    if (projectData.description) {
      markdown += `${projectData.description}\n\n`;
    }
    
    if (projectData.features) {
      markdown += `## Features\n\n${projectData.features}\n\n`;
    }
    
    if (projectData.techStack) {
      markdown += `## Tech Stack\n\n${projectData.techStack}\n\n`;
    }
    
    if (projectData.installation) {
      markdown += `## Installation\n\n\`\`\`bash\n${projectData.installation}\n\`\`\`\n\n`;
    }
    
    if (projectData.usage) {
      markdown += `## Usage\n\n${projectData.usage}\n\n`;
    }
    
    markdown += `## License\n\n${projectData.license}\n`;
    
    return markdown;
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-72 bg-card border-r flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0 h-auto font-normal">
            ← Back to Home
          </Button>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold">README Builder</span>
          </div>
          
          {/* AI Controls */}
          <div className="space-y-3">
            <Select value={aiModel} onValueChange={setAiModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gemini">Google Gemini</SelectItem>
                <SelectItem value="claude">Anthropic Claude</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              placeholder="Enter API Key" 
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            
            <Button className="w-full" disabled={!aiModel || !apiKey}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Codebase
            </Button>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 p-4">
          <div className="text-sm font-medium text-muted-foreground mb-3">Sections</div>
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all ${
                  activeSection === section.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary'
                }`}
              >
                {section.icon}
                <span className="text-sm">{section.title}</span>
                {section.enabled && (
                  <Badge variant="secondary" className="ml-auto">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </Badge>
                )}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4 justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Section
          </Button>
        </div>

        {/* Actions */}
        <div className="p-4 border-t space-y-2">
          <Button className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export README
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="edit" className="h-full">
            <TabsList className="mb-6">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="h-full">
              <div className="space-y-6">
                {activeSection === "title" && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Project Title & Description</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Project Title</label>
                        <Input 
                          placeholder="My Awesome Project"
                          value={projectData.title}
                          onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <Textarea 
                          placeholder="A brief description of what this project does and who it's for"
                          rows={4}
                          value={projectData.description}
                          onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                        />
                      </div>
                    </div>
                  </Card>
                )}

                {activeSection === "features" && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Features</h2>
                    <Textarea 
                      placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3"
                      rows={8}
                      value={projectData.features}
                      onChange={(e) => setProjectData({...projectData, features: e.target.value})}
                    />
                  </Card>
                )}

                {activeSection === "techstack" && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
                    <Textarea 
                      placeholder="**Client:** React, Redux, TailwindCSS&#10;&#10;**Server:** Node, Express"
                      rows={6}
                      value={projectData.techStack}
                      onChange={(e) => setProjectData({...projectData, techStack: e.target.value})}
                    />
                  </Card>
                )}

                {activeSection === "installation" && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Installation</h2>
                    <Textarea 
                      placeholder="npm install my-project&#10;cd my-project"
                      rows={6}
                      value={projectData.installation}
                      onChange={(e) => setProjectData({...projectData, installation: e.target.value})}
                    />
                  </Card>
                )}

                {activeSection === "usage" && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Usage</h2>
                    <Textarea 
                      placeholder="Explain how to use your project..."
                      rows={8}
                      value={projectData.usage}
                      onChange={(e) => setProjectData({...projectData, usage: e.target.value})}
                    />
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="h-full">
              <Card className="p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Markdown Preview</h2>
                <div className="bg-secondary rounded-lg p-4 h-full overflow-auto">
                  <pre className="whitespace-pre-wrap text-sm">
                    {generateMarkdown()}
                  </pre>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}