import React from 'react';
import { SEO } from '../components/SEO';
import { Heart, Code2, Brain, Rocket, Database, Lock, Github, Search, FileText, Info } from 'lucide-react';

const techCredits = [
  {
    name: "Google AI Studio",
    url: "https://aistudio.google.com",
    role: "Agentic AI Coding & Prototyping",
    icon: <Code2 className="w-6 h-6" />,
    description: "Provided the rapid development environment and agentic AI assistance to build our application ecosystem efficiently."
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com",
    role: "Core AI Reasoning Engine",
    icon: <Brain className="w-6 h-6" />,
    description: "Powered the logic, code generation, and complex problem-solving that drives our development workflow."
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    role: "Deployment & Hosting",
    icon: <Rocket className="w-6 h-6" />,
    description: "Our front-end deployment infrastructure, ensuring fast, globally distributed access to our calculators."
  },
  {
    name: "GitHub",
    url: "https://github.com",
    role: "Source Control & Collaboration",
    icon: <Github className="w-6 h-6" />,
    description: "Hosts our extensive 26-repository ecosystem, managing version control and open collaboration."
  },
  {
    name: "Perplexity",
    url: "https://perplexity.ai",
    role: "Research & Verification",
    icon: <Search className="w-6 h-6" />,
    description: "Assisted in research, fact-checking, and surfacing reliable agricultural and scientific data sources."
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    role: "Backend Infrastructure",
    icon: <Database className="w-6 h-6" />,
    description: "Robust open-source backend architecture for data persistence and infrastructure scaling."
  },
  {
    name: "Clerk",
    url: "https://clerk.com",
    role: "Authentication & Security",
    icon: <Lock className="w-6 h-6" />,
    description: "Provides secure, modern user authentication and identity management."
  },
  {
    name: "Sanity",
    url: "https://sanity.io",
    role: "Structured Content Management",
    icon: <FileText className="w-6 h-6" />,
    description: "Content architecture enabling structured, scalable delivery of our rural resources."
  }
];

export default function Credits() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16 w-full flex-grow">
        <SEO 
          title="Credits & Technology | RuralUtilityCost.com" 
          description="Acknowledging the people, tools, and platforms that help power RuralUtilityCost.com." 
          path="/credits"
        />
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full mb-6 relative overflow-hidden">
             <Heart className="w-10 h-10 relative z-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Credits & <span className="text-blue-600 dark:text-blue-500">Technology</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            RuralUtilityCost.com was created to make rural calculators easier to use and easier to trust. Building this platform is made possible by incredible modern technology and public resources.
          </p>
        </div>

        {/* Technology Stack Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Code2 className="w-7 h-7 text-blue-600 dark:text-blue-500" />
            Built With Modern Infrastructure
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {techCredits.map((tech) => (
              <a 
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                key={tech.name} 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md hover:border-blue-500 transition-all duration-200 group flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tech.name}</h3>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{tech.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {tech.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-6 mb-16 border border-gray-200 dark:border-gray-700 flex gap-4 items-start">
          <Info className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Trademark Disclaimer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All trademarks, logos, and brand names are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement by them.
            </p>
          </div>
        </div>

        {/* Content & Review Policy */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 sm:p-10 mb-8">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What We Credit</h2>
            <p>
              We acknowledge the educators, researchers, extension offices, veterinarians, designers, and technical contributors whose public resources help inform our work. Their commitment to rural education makes our tools possible.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Content and Visuals</h2>
            <p>
              Calculator logic, explanations, and page layout are designed to be practical and mobile-friendly. Some visuals and diagrams may be created in-house or with approved creative tools.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Review Policy</h2>
            <p>We aim to keep our content accurate by:</p>
            <ul>
              <li>Reviewing calculator assumptions.</li>
              <li>Updating methods when better references are available.</li>
              <li>Clarifying limitations where needed.</li>
              <li>Keeping content simple and useful.</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            If you use one of our calculators, we hope it helps you make a better decision faster.
          </p>
        </div>

      </div>
    </div>
  );
}
