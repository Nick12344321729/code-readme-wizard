import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  FileText, 
  Plus, 
  Download, 
  Upload, 
  Sparkles, 
  Eye, 
  Code,
  Languages,
  Award,
  Camera,
  HelpCircle,
  Folder,
  GitBranch,
  Cpu,
  Database,
  Bug,
  Heart,
  Star,
  Calendar,
  Coffee,
  Rocket,
  Target,
  Wrench,
  CheckCircle,
  AlertCircle,
  Users,
  Shield,
  Globe,
  Terminal,
  Layers,
  Book
} from "lucide-react";

interface ReadmeBuilderProps {
  onBack: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  enabled: boolean;
  boilerplate: string;
}

interface ProjectData {
  title: string;
  description: string;
  badges: string;
  features: string;
  techStack: string;
  installation: string;
  usage: string;
  projectStructure: string;
  apiReference: string;
  deployment: string;
  license: string;
  contributing: string;
  acknowledgments: string;
  screenshots: string;
  environmentVariables: string;
  authorInfo: string;
  faq: string;
  roadmap: string;
  changelog: string;
  testing: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' }
];

export function ReadmeBuilder({ onBack }: ReadmeBuilderProps) {
  const [activeSection, setActiveSection] = useState("title");
  const [aiModel, setAiModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    badges: `[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)`,
    features: `- ✨ **Feature 1**: Description of the first amazing feature
- 🚀 **Feature 2**: Description of the second powerful feature  
- 🎯 **Feature 3**: Description of the third useful feature
- 💡 **Feature 4**: Description of the fourth innovative feature`,
    techStack: `**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB`,
    installation: `git clone https://github.com/yourusername/project-name.git
cd project-name
npm install
npm run dev`,
    usage: `\`\`\`javascript
import { ProjectName } from 'project-name'

function App() {
  return (
    <div className="App">
      <ProjectName />
    </div>
  )
}
\`\`\``,
    projectStructure: `\`\`\`
project-name/
├── README.md
├── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.js
├── public/
│   └── index.html
└── docs/
    └── API.md
\`\`\``,
    apiReference: `#### Get all items

\`\`\`http
  GET /api/items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |

#### Get item

\`\`\`http
  GET /api/items/\${id}
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`id\`      | \`string\` | **Required**. Id of item to fetch |`,
    deployment: `To deploy this project run

\`\`\`bash
  npm run build
\`\`\``,
    license: "MIT",
    contributing: `Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.`,
    acknowledgments: ` - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)`,
    screenshots: `![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)`,
    environmentVariables: `To run this project, you will need to add the following environment variables to your .env file

\`API_KEY\`

\`ANOTHER_API_KEY\``,
    authorInfo: `## 🚀 About Me
I'm a full stack developer...

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherinempeterson.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/username)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/username)`,
    faq: `#### Question 1

Answer 1

#### Question 2

Answer 2`,
    roadmap: `- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish`,
    changelog: `## [1.0.0] - 2023-01-01
### Added
- Initial release

## [0.1.0] - 2022-12-01
### Added
- Project setup`,
    testing: `To run tests, run the following command

\`\`\`bash
  npm run test
\`\`\``
  });

  const sections: Section[] = [
    { id: "title", title: "Title & Description", icon: <FileText className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "badges", title: "Badges", icon: <Award className="w-4 h-4" />, enabled: true, boilerplate: projectData.badges },
    { id: "features", title: "Features", icon: <Sparkles className="w-4 h-4" />, enabled: true, boilerplate: projectData.features },
    { id: "techStack", title: "Tech Stack", icon: <Layers className="w-4 h-4" />, enabled: true, boilerplate: projectData.techStack },
    { id: "installation", title: "Installation", icon: <Download className="w-4 h-4" />, enabled: true, boilerplate: projectData.installation },
    { id: "usage", title: "Usage", icon: <Terminal className="w-4 h-4" />, enabled: true, boilerplate: projectData.usage },
    { id: "projectStructure", title: "Project Structure", icon: <Folder className="w-4 h-4" />, enabled: true, boilerplate: projectData.projectStructure },
    { id: "apiReference", title: "API Reference", icon: <Book className="w-4 h-4" />, enabled: false, boilerplate: projectData.apiReference },
    { id: "deployment", title: "Deployment", icon: <Rocket className="w-4 h-4" />, enabled: false, boilerplate: projectData.deployment },
    { id: "environmentVariables", title: "Environment Variables", icon: <Cpu className="w-4 h-4" />, enabled: false, boilerplate: projectData.environmentVariables },
    { id: "screenshots", title: "Screenshots", icon: <Camera className="w-4 h-4" />, enabled: false, boilerplate: projectData.screenshots },
    { id: "testing", title: "Testing", icon: <Bug className="w-4 h-4" />, enabled: false, boilerplate: projectData.testing },
    { id: "roadmap", title: "Roadmap", icon: <Target className="w-4 h-4" />, enabled: false, boilerplate: projectData.roadmap },
    { id: "changelog", title: "Changelog", icon: <Calendar className="w-4 h-4" />, enabled: false, boilerplate: projectData.changelog },
    { id: "contributing", title: "Contributing", icon: <Users className="w-4 h-4" />, enabled: true, boilerplate: projectData.contributing },
    { id: "license", title: "License", icon: <Shield className="w-4 h-4" />, enabled: true, boilerplate: projectData.license },
    { id: "acknowledgments", title: "Acknowledgments", icon: <Heart className="w-4 h-4" />, enabled: false, boilerplate: projectData.acknowledgments },
    { id: "authorInfo", title: "Author Info", icon: <Star className="w-4 h-4" />, enabled: false, boilerplate: projectData.authorInfo },
    { id: "faq", title: "FAQ", icon: <HelpCircle className="w-4 h-4" />, enabled: false, boilerplate: projectData.faq },
  ];

  const generateMarkdown = () => {
    let markdown = `# ${projectData.title || "Project Title"}\n\n`;
    
    if (projectData.description) {
      markdown += `${projectData.description}\n\n`;
    }
    
    const enabledSections = sections.filter(s => s.enabled);
    
    enabledSections.forEach(section => {
      const content = projectData[section.id as keyof ProjectData] as string;
      if (content && section.id !== "title") {
        let sectionTitle = section.title;
        if (section.id === "techStack") sectionTitle = "Tech Stack";
        if (section.id === "projectStructure") sectionTitle = "Project Structure";
        if (section.id === "apiReference") sectionTitle = "API Reference";
        if (section.id === "environmentVariables") sectionTitle = "Environment Variables";
        if (section.id === "authorInfo") sectionTitle = "Authors";
        
        markdown += `## ${sectionTitle}\n\n${content}\n\n`;
      }
    });
    
    return markdown;
  };

  const handleAIGeneration = async () => {
    if (!aiModel || !apiKey) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate AI generation with different models
      const response = await generateWithAI(aiModel, apiKey, projectData);
      
      // Update project data with AI-generated content
      setProjectData(prev => ({
        ...prev,
        ...response
      }));
      
    } catch (error) {
      console.error('AI generation failed:', error);
      // Handle error appropriately
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWithAI = async (model: string, apiKey: string, currentData: ProjectData) => {
    // This would be the actual AI integration logic
    // For now, returning improved versions of the current data
    
    const prompt = `Generate a comprehensive README for a project with the following details:
    Title: ${currentData.title}
    Description: ${currentData.description}
    
    Please provide content for all sections in a structured format.`;
    
    // Placeholder for different AI model integrations
    switch (model) {
      case 'gpt-4':
      case 'gpt-3.5':
        return await callOpenAI(prompt, apiKey, model);
      case 'gemini':
        return await callGemini(prompt, apiKey);
      case 'claude':
        return await callClaude(prompt, apiKey);
      default:
        throw new Error('Unsupported AI model');
    }
  };

  const callOpenAI = async (prompt: string, apiKey: string, model: string) => {
    // OpenAI API integration would go here
    // This is a placeholder that returns enhanced content
    return {
      description: `${projectData.description}\n\nThis project provides a seamless experience for users looking to ${projectData.title.toLowerCase()}. Built with modern technologies and best practices in mind.`,
      features: `- 🚀 **Lightning Fast**: Optimized for performance and speed
- 💡 **Smart AI Integration**: Powered by advanced machine learning
- 🔒 **Secure**: Enterprise-grade security measures
- 🎨 **Beautiful UI**: Modern and intuitive user interface
- 📱 **Responsive**: Works perfectly on all devices
- 🔄 **Real-time Updates**: Live synchronization and updates`,
      techStack: `**Frontend:** React, TypeScript, Tailwind CSS
**Backend:** Node.js, Express
**Database:** PostgreSQL
**AI/ML:** OpenAI API, TensorFlow
**DevOps:** Docker, AWS, CI/CD
**Testing:** Jest, Cypress`,
      installation: `# Installation Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

## Quick Start
\`\`\`bash
git clone https://github.com/yourusername/${projectData.title.toLowerCase().replace(/\s+/g, '-')}.git
cd ${projectData.title.toLowerCase().replace(/\s+/g, '-')}
npm install
npm run dev
\`\`\`

## Environment Setup
Copy the environment file and configure your variables:
\`\`\`bash
cp .env.example .env
\`\`\``,
      usage: `## Getting Started

### Basic Usage
\`\`\`javascript
import { ${projectData.title.replace(/\s+/g, '')} } from './${projectData.title.toLowerCase().replace(/\s+/g, '-')}';

// Initialize the application
const app = new ${projectData.title.replace(/\s+/g, '')}({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Start using the features
app.start();
\`\`\`

### Advanced Configuration
\`\`\`javascript
const config = {
  theme: 'dark',
  language: 'en',
  features: {
    aiMode: true,
    analytics: true
  }
};

app.configure(config);
\`\`\``
    };
  };

  const callGemini = async (prompt: string, apiKey: string) => {
    // Google Gemini API integration would go here
    return callOpenAI(prompt, apiKey, 'gemini'); // Placeholder
  };

  const callClaude = async (prompt: string, apiKey: string) => {
    // Anthropic Claude API integration would go here
    return callOpenAI(prompt, apiKey, 'claude'); // Placeholder
  };

  const toggleSection = (sectionId: string) => {
    // Toggle section enabled/disabled state
    // This would need to be implemented with state management
  };

  const updateProjectData = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderSectionContent = () => {
    const activeData = projectData[activeSection as keyof ProjectData] as string;
    
    switch (activeSection) {
      case "title":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Title</label>
              <Input 
                placeholder="My Awesome Project"
                value={projectData.title}
                onChange={(e) => updateProjectData('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="A brief description of what this project does and who it's for"
                rows={4}
                value={projectData.description}
                onChange={(e) => updateProjectData('description', e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">
              {sections.find(s => s.id === activeSection)?.title}
            </label>
            <Textarea 
              placeholder={sections.find(s => s.id === activeSection)?.boilerplate || "Enter content..."}
              rows={12}
              value={activeData || sections.find(s => s.id === activeSection)?.boilerplate || ""}
              onChange={(e) => updateProjectData(activeSection as keyof ProjectData, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex">
      {/* Sidebar */}
      <div className="w-80 bg-card/80 backdrop-blur-sm border-r border-border/50 flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">README Builder</span>
          </div>
          
          {/* Language Toggle */}
          <div className="mb-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                  <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* AI Controls */}
          <div className="space-y-3">
            <Select value={aiModel} onValueChange={setAiModel}>
              <SelectTrigger className="bg-secondary/50">
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
              className="bg-secondary/50"
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg" 
              disabled={!aiModel || !apiKey}
              onClick={handleAIGeneration}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Codebase
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-sm font-medium text-muted-foreground mb-3">Sections</div>
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-secondary/80'
                }`}
              >
                {section.icon}
                <span className="text-sm font-medium">{section.title}</span>
                {section.enabled && (
                  <Badge variant="secondary" className="ml-auto">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  </Badge>
                )}
              </button>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4 justify-start hover:bg-secondary/50">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Section
          </Button>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            onClick={handleAIGeneration}
            disabled={!aiModel || !apiKey || isGenerating}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
          <Button variant="outline" className="w-full border-2 hover:bg-secondary/50">
            <Download className="w-4 h-4 mr-2" />
            Export README
          </Button>
        </div>
      </div>

      {/* Main Content - Side by Side */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className="flex-1 p-6 border-r border-border/50">
          <div className="h-full">
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Editor</h2>
            </div>
            
            <Card className="p-6 h-full shadow-lg border-border/50">
              <h3 className="text-lg font-semibold mb-4">
                {sections.find(s => s.id === activeSection)?.title}
              </h3>
              {renderSectionContent()}
            </Card>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 p-6">
          <div className="h-full">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Live Preview</h2>
            </div>
            
            <Card className="p-6 h-full shadow-lg border-border/50">
              <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg p-6 h-full overflow-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    components={{
                      code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            style={tomorrow}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mb-4 text-primary">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-semibold mb-3 text-primary border-b border-border/50 pb-2">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mb-2 text-primary">{children}</h3>
                      ),
                      img: ({ src, alt }) => (
                        <img 
                          src={src} 
                          alt={alt} 
                          className="max-w-full h-auto rounded-lg shadow-sm border border-border/50"
                        />
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-border/50 rounded-lg">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-border/50 bg-secondary/50 px-4 py-2 text-left font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-border/50 px-4 py-2">
                          {children}
                        </td>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 space-y-1 mb-4">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="mb-1">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 italic bg-secondary/20 py-2 my-4">
                          {children}
                        </blockquote>
                      ),
                      a: ({ href, children }) => (
                        <a 
                          href={href} 
                          className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-primary">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-muted-foreground">{children}</em>
                      ),
                    }}
                  >
                    {generateMarkdown()}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}