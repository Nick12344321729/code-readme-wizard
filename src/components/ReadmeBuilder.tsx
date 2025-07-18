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
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { toast } from "sonner";
import axios from 'axios';
import { 
  FileText, 
  Plus, 
  Download, 
  Upload, 
  Sparkles, 
  Eye, 
  Code,
  Award,
  Camera,
  HelpCircle,
  Folder,
  Cpu,
  Bug,
  Heart,
  Star,
  Calendar,
  Target,
  Wrench,
  CheckCircle,
  Users,
  Shield,
  Book,
  Terminal,
  Layers,
  X,
  RotateCcw,
  Moon,
  Sun,
  Trash2
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

export function ReadmeBuilder({ onBack }: ReadmeBuilderProps) {
  const [activeSection, setActiveSection] = useState("title");
  const [aiModel, setAiModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customSectionName, setCustomSectionName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { id: "title", title: "Title & Description", icon: <FileText className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "badges", title: "🏷️ Badges", icon: <Award className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "features", title: "✨ Features", icon: <Sparkles className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "techStack", title: "🛠️ Tech Stack", icon: <Layers className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "installation", title: "📦 Installation", icon: <Download className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "usage", title: "🚀 Usage", icon: <Terminal className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "projectStructure", title: "📁 Project Structure", icon: <Folder className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "apiReference", title: "📚 API Reference", icon: <Book className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "deployment", title: "🚀 Deployment", icon: <Target className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "environmentVariables", title: "⚙️ Environment Variables", icon: <Cpu className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "screenshots", title: "📸 Screenshots", icon: <Camera className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "testing", title: "🧪 Testing", icon: <Bug className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "roadmap", title: "🗺️ Roadmap", icon: <Target className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "changelog", title: "📝 Changelog", icon: <Calendar className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "contributing", title: "🤝 Contributing", icon: <Users className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "license", title: "📄 License", icon: <Shield className="w-4 h-4" />, enabled: true, boilerplate: "" },
    { id: "acknowledgments", title: "🙏 Acknowledgments", icon: <Heart className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "authorInfo", title: "👨‍💻 Author Info", icon: <Star className="w-4 h-4" />, enabled: false, boilerplate: "" },
    { id: "faq", title: "❓ FAQ", icon: <HelpCircle className="w-4 h-4" />, enabled: false, boilerplate: "" },
  ]);
  
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    badges: `[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

<!-- More badge options (uncomment to use):
[![NPM Version](https://img.shields.io/npm/v/your-package.svg)](https://npmjs.org/package/your-package)
[![Build Status](https://img.shields.io/travis/username/repo.svg)](https://travis-ci.org/username/repo)
[![Coverage Status](https://img.shields.io/coveralls/username/repo.svg)](https://coveralls.io/r/username/repo)
[![Downloads](https://img.shields.io/npm/dm/your-package.svg)](https://npmjs.org/package/your-package)
-->`,
    features: `- ✨ **Feature 1**: Description of the first amazing feature
- 🚀 **Feature 2**: Description of the second powerful feature  
- 🎯 **Feature 3**: Description of the third useful feature
- 💡 **Feature 4**: Description of the fourth innovative feature

<!-- More feature emojis (uncomment to use):
- 🔒 **Security**: Enterprise-grade security features
- 📱 **Mobile**: Responsive design for all devices
- ⚡ **Performance**: Lightning-fast performance
- 🌍 **Global**: Multi-language support
- 🔄 **Real-time**: Live updates and synchronization
- 🎨 **Customizable**: Highly customizable interface
- 🧩 **Modular**: Plugin-based architecture
- 📊 **Analytics**: Built-in analytics dashboard
-->`,
    techStack: `**Client:** ⚛️ React, 🔥 Redux, 🎨 TailwindCSS

**Server:** 🟢 Node.js, 🚂 Express

**Database:** 🍃 MongoDB

<!-- More tech stack options (uncomment to use):
**Frontend:**
- ⚛️ React / 🖼️ Vue.js / 🅰️ Angular
- 📘 TypeScript / 🟨 JavaScript
- 🎨 Tailwind CSS / 💅 Styled Components
- ⚡ Vite / 📦 Webpack

**Backend:**
- 🟢 Node.js / 🐍 Python / ☕ Java / 🦀 Rust
- 🚂 Express / ⚡ FastAPI / 🌸 Spring Boot
- 🗄️ GraphQL / 🔄 REST API

**Database:**
- 🍃 MongoDB / 🐘 PostgreSQL / 🗄️ MySQL
- ⚡ Redis / 📊 Elasticsearch

**DevOps:**
- 🐳 Docker / ☸️ Kubernetes
- ☁️ AWS / 🔵 Azure / 🟡 GCP
- 🔄 GitHub Actions / 🦊 GitLab CI
-->`,
    installation: `## 📋 Prerequisites

Make sure you have the following installed:
- 📦 Node.js (v16 or higher)
- 📂 Git

## 🚀 Installation

\`\`\`bash
git clone https://github.com/yourusername/project-name.git
cd project-name
npm install
npm run dev
\`\`\`

<!-- Alternative installation methods (uncomment to use):
### 🐳 Docker Installation
\`\`\`bash
docker pull yourusername/project-name
docker run -p 3000:3000 yourusername/project-name
\`\`\`

### 📦 NPM Installation
\`\`\`bash
npm install project-name
\`\`\`

### 🧶 Yarn Installation
\`\`\`bash
yarn add project-name
\`\`\`
-->`,
    usage: `## 🏃 Quick Start

\`\`\`javascript
import { ProjectName } from 'project-name'

function App() {
  return (
    <div className="App">
      <ProjectName />
    </div>
  )
}
\`\`\`

<!-- More usage examples (uncomment to use):
### 🔧 Advanced Configuration
\`\`\`javascript
const config = {
  theme: 'dark',
  language: 'en',
  features: {
    ai: true,
    analytics: true
  }
};
\`\`\`

### 🌐 API Usage
\`\`\`javascript
// GET request example
const response = await fetch('/api/data');
const data = await response.json();
\`\`\`

### 🎯 CLI Usage
\`\`\`bash
npx project-name init
npx project-name build
npx project-name deploy
\`\`\`
-->`,
    projectStructure: `\`\`\`
project-name/
├── 📄 README.md
├── 📦 package.json
├── 📂 src/
│   ├── 🧩 components/
│   ├── 📄 pages/
│   ├── 🛠️ utils/
│   └── 📄 App.js
├── 📂 public/
│   └── 📄 index.html
└── 📂 docs/
    └── 📚 API.md
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
    deployment: `🚀 To deploy this project run

\`\`\`bash
npm run build
\`\`\``,
    license: "MIT",
    contributing: `🤝 Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.`,
    acknowledgments: ` - 🌟 [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - 📚 [Awesome README](https://github.com/matiassingers/awesome-readme)
 - 📖 [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)`,
    screenshots: `![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)`,
    environmentVariables: `⚙️ To run this project, you will need to add the following environment variables to your .env file

\`API_KEY\`

\`ANOTHER_API_KEY\``,
    authorInfo: `## 🚀 About Me
I'm a full stack developer...

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherinempeterson.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/username)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/username)`,
    faq: `#### ❓ Question 1

Answer 1

#### ❓ Question 2

Answer 2`,
    roadmap: `- [x] ✅ Add Changelog
- [x] ✅ Add back to top links
- [ ] 🔄 Add Additional Templates w/ Examples
- [ ] 🔄 Add "components" document to easily copy & paste sections of the readme
- [ ] 🌍 Multi-language Support
    - [ ] 🇨🇳 Chinese
    - [ ] 🇪🇸 Spanish`,
    changelog: `## [1.0.0] - 2023-01-01
### ✅ Added
- Initial release

## [0.1.0] - 2022-12-01
### ✅ Added
- Project setup`,
    testing: `🧪 To run tests, run the following command

\`\`\`bash
npm run test
\`\`\``
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, enabled: !section.enabled }
          : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, enabled: false }
          : section
      )
    );
  };

  const resetSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      updateProjectData(sectionId as keyof ProjectData, section.boilerplate);
    }
  };

  const addCustomSection = () => {
    if (!customSectionName) return;
    
    const customId = customSectionName.toLowerCase().replace(/\s+/g, '');
    const newSection: Section = {
      id: customId,
      title: `🎯 ${customSectionName}`,
      icon: <FileText className="w-4 h-4" />,
      enabled: true,
      boilerplate: `## ${customSectionName}\n\nAdd your custom content here...`
    };
    
    setSections(prev => [...prev, newSection]);
    setProjectData(prev => ({
      ...prev,
      [customId]: newSection.boilerplate
    }));
    setCustomSectionName("");
  };

  const generateMarkdown = () => {
    let markdown = `# ${projectData.title || "🚀 Project Title"}\n\n`;
    
    if (projectData.description) {
      markdown += `${projectData.description}\n\n`;
    }
    
    const enabledSections = sections.filter(s => s.enabled);
    
    enabledSections.forEach(section => {
      const content = projectData[section.id as keyof ProjectData] as string;
      if (content && section.id !== "title") {
        let sectionTitle = section.title;
        if (section.id === "techStack") sectionTitle = "🛠️ Tech Stack";
        if (section.id === "projectStructure") sectionTitle = "📁 Project Structure";
        if (section.id === "apiReference") sectionTitle = "📚 API Reference";
        if (section.id === "environmentVariables") sectionTitle = "⚙️ Environment Variables";
        if (section.id === "authorInfo") sectionTitle = "👨‍💻 Authors";
        
        markdown += `## ${sectionTitle}\n\n${content}\n\n`;
      }
    });
    
    return markdown;
  };

  const handleAIGeneration = async () => {
    if (!aiModel || !apiKey) {
      toast.error('Please select an AI model and enter your API key');
      return;
    }
    
    if (!repoUrl) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      toast.loading('🤖 Analyzing repository and generating README...', { id: 'ai-gen' });
      const response = await generateWithAI(aiModel, apiKey, projectData);
      
      // Update project data with AI-generated content
      setProjectData(prev => ({
        ...prev,
        ...response
      }));
      
      toast.success('✅ README generated successfully!', { id: 'ai-gen' });
      
    } catch (error: any) {
      console.error('AI generation failed:', error);
      toast.error(`Failed to generate README: ${error.message}`, { id: 'ai-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  // GitHub repo analysis and AI generation
  const fetchRepoTree = async (owner: string, repo: string, branch = "main") => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      return response.data.tree.filter((f: any) => f.type === "blob");
    } catch (error) {
      throw new Error("Failed to fetch repository. Make sure the repo is public.");
    }
  };

  const fetchFile = async (url: string) => {
    try {
      const response = await axios.get(url, { 
        headers: { Accept: "application/vnd.github.raw" } 
      });
      return response.data;
    } catch (error) {
      return "// Could not fetch file content";
    }
  };

  const buildPrompt = (files: { path: string; content: string }[]) => {
    const snippets = files
      .map((f) => `### ${f.path}\n\`\`\`\n${f.content.slice(0, 2000)}\n\`\`\``)
      .join("\n\n");
    
    return (
      `You are README-AI. Generate a professional README.md based ONLY on the files below.\n\n` +
      `Rules:\n- include Title, Description, Features, Tech Stack, Installation, Usage, Folder Structure, Contributing, License\n` +
      `- use emojis and shields.io badges\n- keep markdown clean\n- respond ONLY with the README content, no explanations\n\nFILES:\n${snippets}`
    );
  };

  const generateWithAI = async (model: string, apiKey: string, currentData: ProjectData) => {
    if (!repoUrl) {
      throw new Error("Please enter a GitHub repository URL");
    }

    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL format");
    }

    const [owner, repo] = match.slice(1, 3).map(s => s.replace(/\.git$/, ''));
    
    // Whitelist of important files
    const ALLOW = ["package.json", "requirements.txt", "pyproject.toml", "Cargo.toml", "go.mod", "README.md", "Dockerfile", ".env.example", "tsconfig.json", "setup.py"];
    
    try {
      const tree = await fetchRepoTree(owner, repo);
      
      // Read up to 15 most relevant files
      const toRead = tree
        .filter((f: any) => ALLOW.some((a) => f.path.endsWith(a)) || f.path.includes('src/') || f.path.includes('app/'))
        .slice(0, 15);

      const files = await Promise.all(
        toRead.map(async (f: any) => ({
          path: f.path,
          content: await fetchFile(f.url),
        }))
      );

      const prompt = buildPrompt(files);

      // Call the appropriate AI API
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
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    }
  };

  const callOpenAI = async (prompt: string, apiKey: string, model: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model === 'gpt-4' ? 'gpt-4-turbo-preview' : 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a README generation expert. Generate comprehensive, professional README content based on the project details provided. Return only the specific content for each section without markdown headers.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0]?.message?.content || '';
      
      // Parse the generated content and return structured data
      return parseAIResponse(generatedContent);
    } catch (error) {
      console.error('OpenAI API error:', error);
      toast.error('Failed to generate with OpenAI. Please check your API key.');
      throw error;
    }
  };

  const parseAIResponse = (content: string) => {
    // Try to extract sections from AI response or return structured fallback
    const lines = content.split('\n');
    let currentSection = '';
    let sections: any = {};
    
    // Simple parsing logic
    for (const line of lines) {
      if (line.startsWith('# ')) {
        const title = line.replace('# ', '').trim();
        if (!sections.title) sections.title = title;
      } else if (line.trim() && !line.startsWith('#') && !sections.description && !currentSection) {
        sections.description = line.trim();
      }
    }
    
    // If parsing fails, return the full content as description
    if (!sections.title && !sections.description) {
      sections.description = content.slice(0, 500) + "...";
      sections.title = projectData.title || "AI Generated Project";
    }
    
    return {
      title: sections.title || projectData.title || "AI Generated Project", 
      description: sections.description || content.slice(0, 500),
      features: `✨ **AI-Enhanced Features**
- 🚀 **Smart Generation**: Automatically analyzed from codebase
- 💡 **Intelligent Parsing**: Advanced code understanding
- 🎯 **Relevant Content**: Context-aware documentation
- 🔄 **Real-time Updates**: Live preview and editing`,
      techStack: `**Detected Technologies:**
⚛️ Frontend Framework
🔧 Build Tools  
📦 Package Manager
🗄️ Database/Storage
☁️ Deployment Platform`,
      installation: `## 📦 Quick Start

\`\`\`bash
git clone ${repoUrl || 'https://github.com/yourusername/project.git'}
cd ${repoUrl ? repoUrl.split('/').pop()?.replace('.git', '') || 'project' : 'project'}
npm install
npm run dev
\`\`\``,
      usage: `## 🚀 Usage

\`\`\`javascript
// Basic usage example
import { App } from './src/App';

// Initialize and run
const app = new App();
app.start();
\`\`\``
    };
  };

  const callGemini = async (prompt: string, apiKey: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a README generation expert. Generate comprehensive, professional README content based on this project: ${prompt}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2000,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return parseAIResponse(generatedContent);
    } catch (error) {
      console.error('Gemini API error:', error);
      toast.error('Failed to generate with Gemini. Please check your API key.');
      throw error;
    }
  };

  const callClaude = async (prompt: string, apiKey: string) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: `You are a README generation expert. Generate comprehensive, professional README content based on this project: ${prompt}`
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.content?.[0]?.text || '';
      return parseAIResponse(generatedContent);
    } catch (error) {
      console.error('Claude API error:', error);
      toast.error('Failed to generate with Claude. Please check your API key.');
      throw error;
    }
  };

  const updateProjectData = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportReadme = () => {
    const markdown = generateMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('📄 README.md downloaded successfully!');
  };

  const renderSectionContent = () => {
    const activeData = projectData[activeSection as keyof ProjectData] as string;
    
    // Emoji suggestions for different sections
    const getEmojiSuggestions = (sectionId: string) => {
      const emojiMap: { [key: string]: string[] } = {
        title: ["🚀", "💎", "⭐", "🎯", "🔥", "✨", "🌟", "💫"],
        features: ["✨", "🚀", "🎯", "💡", "🔒", "📱", "⚡", "🌍", "🔄", "🎨", "🧩", "📊"],
        techStack: ["⚛️", "🔥", "🎨", "🟢", "🚂", "🍃", "📘", "🟨", "💅", "⚡", "📦", "🐍", "☕", "🦀", "🗄️", "🔄", "🐳", "☸️", "☁️"],
        installation: ["📦", "🚀", "🐳", "🧶", "📋", "🔧", "⚙️"],
        usage: ["🏃", "🔧", "🌐", "🎯", "💻", "📖"],
        projectStructure: ["📁", "🧩", "📄", "🛠️", "📚"],
        deployment: ["🚀", "☁️", "🌐", "📦", "🔧"],
        testing: ["🧪", "✅", "🔍", "⚡", "🛡️"],
        contributing: ["🤝", "❤️", "🌟", "👥", "🎉"],
        license: ["📄", "⚖️", "🔒", "📜"],
      };
      return emojiMap[sectionId] || ["💡", "⭐", "🚀"];
    };

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
            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">💡 Emoji suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {getEmojiSuggestions('title').map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateProjectData('title', projectData.title + emoji)}
                    className="px-2 py-1 bg-background rounded hover:bg-secondary/50 text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        const currentSectionId = activeSection;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {sections.find(s => s.id === activeSection)?.title}
              </label>
              <Textarea 
                placeholder={sections.find(s => s.id === activeSection)?.boilerplate || "Enter content..."}
                rows={15}
                value={activeData || sections.find(s => s.id === activeSection)?.boilerplate || ""}
                onChange={(e) => updateProjectData(activeSection as keyof ProjectData, e.target.value)}
                className="min-h-[400px]"
              />
            </div>
            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">💡 Emoji suggestions for this section:</p>
              <div className="flex flex-wrap gap-2">
                {getEmojiSuggestions(currentSectionId).map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const currentContent = activeData || sections.find(s => s.id === activeSection)?.boilerplate || "";
                      updateProjectData(activeSection as keyof ProjectData, currentContent + emoji);
                    }}
                    className="px-2 py-1 bg-background rounded hover:bg-secondary/50 text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const enabledSections = sections.filter(s => s.enabled);
  const availableSections = sections.filter(s => !s.enabled);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex">
      {/* Sidebar */}
      <div className="w-80 bg-card/80 backdrop-blur-sm border-r border-border/50 flex flex-col shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground">
              ← Back to Home
            </Button>
            <Button variant="outline" size="sm" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">README Builder</span>
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
            
            <Input 
              placeholder="GitHub Repository URL (e.g., https://github.com/user/repo)" 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="bg-secondary/50"
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg" 
              disabled={!aiModel || !apiKey || !repoUrl || isGenerating}
              onClick={handleAIGeneration}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Repository
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Enabled Sections */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">Sections</span>
            <Button variant="ghost" size="sm" onClick={() => setSections(prev => prev.map(s => ({ ...s, enabled: false })))}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          
          {/* Selected Sections (Top Section like in image) */}
          <div className="space-y-2 mb-4">
            {enabledSections.map((section) => (
              <div
                key={section.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 ${
                  activeSection === section.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border/30 hover:border-border/60'
                }`}
              >
                <button
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {section.icon}
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-7 h-7 p-0"
                    onClick={() => resetSection(section.id)}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-7 h-7 p-0 text-destructive"
                    onClick={() => removeSection(section.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm font-medium text-muted-foreground mb-3">Click on a section below to add it to your readme</div>
          
          {/* Available Sections */}
          <div className="space-y-1 mb-4">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-secondary/80 border border-border/30"
              >
                {section.icon}
                <span className="text-sm font-medium">{section.title}</span>
                <Plus className="w-4 h-4 ml-auto text-muted-foreground" />
              </button>
            ))}
          </div>
          
          {/* Custom Section */}
          <div className="space-y-2">
            <Input 
              placeholder="Custom section name"
              value={customSectionName}
              onChange={(e) => setCustomSectionName(e.target.value)}
            />
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-secondary/50"
              onClick={addCustomSection}
              disabled={!customSectionName}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Section
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border/50 space-y-2 mt-auto">
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            onClick={handleAIGeneration}
            disabled={!aiModel || !apiKey || isGenerating}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
          <Button variant="outline" className="w-full border-2 hover:bg-secondary/50" onClick={exportReadme}>
            <Download className="w-4 h-4 mr-2" />
            Export README
          </Button>
        </div>
      </div>

      {/* Main Content - Resizable Side by Side */}
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* Editor Panel */}
          <Panel defaultSize={50} minSize={25} maxSize={75}>
            <div className="h-full p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">📝 Editor</h2>
              </div>
              
              <Card className="p-6 shadow-lg border-border/50">
                <h3 className="text-lg font-semibold mb-4">
                  {sections.find(s => s.id === activeSection)?.title}
                </h3>
                {renderSectionContent()}
              </Card>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-2 bg-border/30 hover:bg-primary/30 transition-all duration-200 group relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-8 bg-border/60 rounded-full group-hover:bg-primary/60 transition-all duration-200"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-primary/10 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs text-primary font-medium">Drag to resize</span>
              </div>
            </div>
          </PanelResizeHandle>

          {/* Live Preview Panel */}
          <Panel defaultSize={50} minSize={25} maxSize={75}>
            <div className="h-full p-6 overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <Eye className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">👁️ Live Preview</h2>
              </div>
              
              <Card className="p-6 shadow-lg border-border/50 h-full">
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
                          <h1 className="text-3xl font-bold mb-4 text-foreground border-b-2 border-border pb-2">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-semibold mb-3 text-foreground border-b border-border/70 pb-2">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold mb-2 text-foreground">{children}</h3>
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
                          <strong className="font-bold text-foreground">{children}</strong>
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
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}