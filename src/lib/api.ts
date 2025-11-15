// Mock data and API functions for CuraLink

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  institution: string;
  country: string;
  tags: string[];
  photo: string;
  match: number;
  isFollowing?: boolean;
}

export interface ClinicalTrial {
  id: string;
  title: string;
  phase: string;
  status: string;
  description: string;
  location: string;
  summary: string;
  tags: string[];
  isSaved?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  summary: string;
  tags: string[];
  year: number;
  isSaved?: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  tags: string[];
  replies: number;
  views: number;
  timestamp: Date;
}

// Mock Experts Data
export const mockExperts: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialization: "Oncology & Immunotherapy",
    institution: "Memorial Sloan Kettering Cancer Center",
    country: "United States",
    tags: ["Cancer Research", "Immunotherapy", "Clinical Trials"],
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    match: 95,
  },
  {
    id: "2",
    name: "Prof. Michael Anderson",
    specialization: "Cardiovascular Disease",
    institution: "Mayo Clinic",
    country: "United States",
    tags: ["Cardiology", "Heart Disease", "Prevention"],
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
    match: 92,
  },
  {
    id: "3",
    name: "Dr. Yuki Tanaka",
    specialization: "Neurodegenerative Diseases",
    institution: "University of Tokyo",
    country: "Japan",
    tags: ["Alzheimer's", "Parkinson's", "Neurology"],
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
    match: 90,
  },
  {
    id: "4",
    name: "Dr. Maria Rodriguez",
    specialization: "Rare Genetic Disorders",
    institution: "Hospital Universitario La Paz",
    country: "Spain",
    tags: ["Genetics", "Rare Diseases", "Pediatrics"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    match: 88,
  },
  {
    id: "5",
    name: "Prof. David Kim",
    specialization: "Diabetes & Metabolic Disorders",
    institution: "Seoul National University Hospital",
    country: "South Korea",
    tags: ["Diabetes", "Metabolism", "Endocrinology"],
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    match: 87,
  },
  // More experts...
  {
    id: "6",
    name: "Dr. Emma Williams",
    specialization: "Infectious Diseases",
    institution: "London School of Hygiene",
    country: "United Kingdom",
    tags: ["Virology", "Epidemiology", "Public Health"],
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    match: 85,
  },
  {
    id: "7",
    name: "Prof. Ahmed Hassan",
    specialization: "Cancer Genomics",
    institution: "King Faisal Specialist Hospital",
    country: "Saudi Arabia",
    tags: ["Genomics", "Precision Medicine", "Cancer"],
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
    match: 84,
  },
  {
    id: "8",
    name: "Dr. Lisa Müller",
    specialization: "Autoimmune Diseases",
    institution: "Charité University Hospital",
    country: "Germany",
    tags: ["Rheumatology", "Autoimmune", "Immunology"],
    photo: "https://images.unsplash.com/photo-1588731234159-8b630409b0f8?w=400",
    match: 83,
  },
  {
    id: "9",
    name: "Dr. Raj Patel",
    specialization: "Stem Cell Therapy",
    institution: "All India Institute of Medical Sciences",
    country: "India",
    tags: ["Stem Cells", "Regenerative Medicine", "Research"],
    photo: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=400",
    match: 82,
  },
  {
    id: "10",
    name: "Prof. Sophie Dubois",
    specialization: "Pediatric Oncology",
    institution: "Institut Curie",
    country: "France",
    tags: ["Pediatrics", "Cancer", "Clinical Research"],
    photo: "https://images.unsplash.com/photo-1614608682850-2f026e6a3c67?w=400",
    match: 81,
  },
];

// Mock Clinical Trials Data
export const mockTrials: ClinicalTrial[] = [
  {
    id: "trial-1",
    title: "Phase III Study of Novel Immunotherapy for Advanced Melanoma",
    phase: "Phase III",
    status: "Recruiting",
    description: "A randomized, double-blind, placebo-controlled trial evaluating the efficacy and safety of a novel checkpoint inhibitor combination in patients with advanced melanoma who have progressed on standard therapy.",
    location: "Multiple sites across US, EU, and Asia",
    summary: "This trial tests a new combination of drugs that help the immune system fight melanoma cancer cells.",
    tags: ["Melanoma", "Immunotherapy", "Oncology"],
  },
  {
    id: "trial-2",
    title: "Gene Therapy for Sickle Cell Disease - Long-term Follow-up",
    phase: "Phase II",
    status: "Active",
    description: "A long-term follow-up study of patients who received CRISPR-based gene therapy for sickle cell disease, monitoring safety, efficacy, and quality of life outcomes.",
    location: "Boston, San Francisco, London",
    summary: "Following patients who received gene editing treatment to see if it continues to help with sickle cell disease.",
    tags: ["Gene Therapy", "CRISPR", "Sickle Cell"],
  },
  {
    id: "trial-3",
    title: "Alzheimer's Disease Prevention Trial in High-Risk Individuals",
    phase: "Phase II",
    status: "Recruiting",
    description: "A prevention trial testing whether an investigational drug can delay the onset of Alzheimer's disease in cognitively normal individuals with genetic risk factors.",
    location: "Academic medical centers worldwide",
    summary: "Testing if a new drug can prevent or delay Alzheimer's in people at high risk.",
    tags: ["Alzheimer's", "Prevention", "Neurology"],
  },
  {
    id: "trial-4",
    title: "CAR-T Cell Therapy for Refractory Multiple Myeloma",
    phase: "Phase I/II",
    status: "Recruiting",
    description: "Evaluating the safety and preliminary efficacy of BCMA-targeted CAR-T cell therapy in patients with relapsed/refractory multiple myeloma.",
    location: "Major cancer centers in North America",
    summary: "Using modified immune cells to attack multiple myeloma cancer that hasn't responded to other treatments.",
    tags: ["CAR-T", "Multiple Myeloma", "Cell Therapy"],
  },
  {
    id: "trial-5",
    title: "Digital Therapeutics for Type 2 Diabetes Management",
    phase: "Phase III",
    status: "Active",
    description: "A pragmatic trial testing an AI-powered digital therapeutic platform for improving glycemic control and medication adherence in type 2 diabetes patients.",
    location: "Conducted remotely - International",
    summary: "Testing if an app with AI coaching can help people manage their diabetes better.",
    tags: ["Diabetes", "Digital Health", "AI"],
  },
];

// Mock Publications Data
export const mockPublications: Publication[] = [
  {
    id: "pub-1",
    title: "CRISPR-Cas9 Gene Editing: Mechanisms, Applications, and Clinical Prospects",
    authors: ["Zhang, F.", "Doudna, J.A.", "Charpentier, E."],
    abstract: "CRISPR-Cas9 has revolutionized genome editing with its precision and versatility. This review examines the molecular mechanisms underlying CRISPR-Cas9 function, discusses current applications in basic research and therapeutic development, and explores the prospects and challenges for clinical translation.",
    summary: "A comprehensive review of how CRISPR gene editing works and its potential medical uses.",
    tags: ["CRISPR", "Gene Editing", "Molecular Biology"],
    year: 2024,
  },
  {
    id: "pub-2",
    title: "Immunotherapy Combinations in Advanced Cancer: Synergy and Resistance Mechanisms",
    authors: ["Chen, D.S.", "Mellman, I.", "Wolchok, J.D."],
    abstract: "Combination immunotherapy strategies have shown remarkable efficacy in various cancers. This article explores the biological rationale for different combination approaches, mechanisms of synergy, patterns of resistance, and biomarkers for patient selection.",
    summary: "Explains how combining different immunotherapy drugs can work better against cancer.",
    tags: ["Immunotherapy", "Cancer", "Oncology"],
    year: 2024,
  },
  {
    id: "pub-3",
    title: "Artificial Intelligence in Medical Diagnosis: Current Capabilities and Future Directions",
    authors: ["Topol, E.J.", "Rajpurkar, P.", "Lungren, M.P."],
    abstract: "AI and deep learning have achieved human-level performance in various diagnostic tasks. This review assesses current AI applications in radiology, pathology, and clinical decision support, discusses limitations and bias concerns, and projects future developments.",
    summary: "Reviews how AI is being used to help doctors diagnose diseases and what's coming next.",
    tags: ["AI", "Diagnostics", "Machine Learning"],
    year: 2024,
  },
  {
    id: "pub-4",
    title: "The Microbiome-Gut-Brain Axis in Neurological Disorders",
    authors: ["Cryan, J.F.", "Dinan, T.G.", "Mayer, E.A."],
    abstract: "Emerging evidence suggests bidirectional communication between gut microbiota and the central nervous system. This article reviews the role of the microbiome in neurodevelopmental and neurodegenerative disorders and discusses therapeutic implications.",
    summary: "How bacteria in your gut might affect brain health and diseases like Parkinson's and Alzheimer's.",
    tags: ["Microbiome", "Neuroscience", "Gut-Brain Axis"],
    year: 2023,
  },
  {
    id: "pub-5",
    title: "Precision Medicine in Cardiovascular Disease: Genomics, Biomarkers, and Personalized Treatment",
    authors: ["Anderson, K.M.", "Mehta, L.S.", "Shah, R.V."],
    abstract: "Cardiovascular disease remains the leading cause of mortality worldwide. This review examines how genomic profiling, novel biomarkers, and advanced imaging are enabling personalized risk stratification and targeted therapies in cardiovascular medicine.",
    summary: "How genetic testing and biomarkers can help tailor heart disease treatment to each patient.",
    tags: ["Precision Medicine", "Cardiology", "Genomics"],
    year: 2023,
  },
];

// Mock Forum Posts Data
export const mockForums: ForumPost[] = [
  {
    id: "forum-1",
    title: "Looking for collaborators on cancer immunotherapy research",
    category: "Collaboration Opportunities",
    content: "I'm leading a research group focused on CAR-T cell therapy for solid tumors. We're looking for collaborators with expertise in tumor microenvironment analysis. Interested in sharing techniques and data.",
    author: "Dr. Sarah Chen",
    tags: ["Collaboration", "CAR-T", "Cancer"],
    replies: 12,
    views: 234,
    timestamp: new Date("2024-01-15"),
  },
  {
    id: "forum-2",
    title: "What are the latest developments in Alzheimer's biomarkers?",
    category: "Research Questions",
    content: "Can anyone share insights on the most promising biomarkers for early Alzheimer's detection? Particularly interested in blood-based markers vs. CSF analysis.",
    author: "Dr. Yuki Tanaka",
    tags: ["Alzheimer's", "Biomarkers", "Diagnostics"],
    replies: 8,
    views: 156,
    timestamp: new Date("2024-01-14"),
  },
  {
    id: "forum-3",
    title: "Experience with CRISPR clinical trials - seeking advice",
    category: "Clinical Trials",
    content: "We're preparing to initiate a Phase I CRISPR trial for a rare genetic disorder. Would appreciate any advice from those who've navigated the regulatory process for gene editing trials.",
    author: "Dr. Maria Rodriguez",
    tags: ["CRISPR", "Clinical Trials", "Regulations"],
    replies: 15,
    views: 289,
    timestamp: new Date("2024-01-13"),
  },
  {
    id: "forum-4",
    title: "My experience with immunotherapy side effects",
    category: "Patient Experience",
    content: "I've been on checkpoint inhibitor therapy for melanoma for 6 months. Happy to share my experience with managing side effects and what helped me through the journey.",
    author: "Patient Advocate",
    tags: ["Immunotherapy", "Side Effects", "Patient Support"],
    replies: 24,
    views: 412,
    timestamp: new Date("2024-01-12"),
  },
  {
    id: "forum-5",
    title: "Best practices for patient recruitment in rare disease trials",
    category: "Clinical Trials",
    content: "We're struggling with recruitment for our rare disease trial. What strategies have worked for others? Any recommended patient advocacy groups or platforms?",
    author: "Prof. David Kim",
    tags: ["Recruitment", "Rare Disease", "Clinical Trials"],
    replies: 19,
    views: 301,
    timestamp: new Date("2024-01-11"),
  },
];

// API Functions
export async function getExperts(): Promise<Expert[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockExperts;
}

export async function getTrials(): Promise<ClinicalTrial[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTrials;
}

export async function getPublications(): Promise<Publication[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPublications;
}

export async function getForums(): Promise<ForumPost[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockForums;
}

export interface Recommendation {
  type: "expert" | "trial" | "publication";
  item: Expert | ClinicalTrial | Publication;
  reason: string;
}

export async function getRecommendations(userType: "patient" | "researcher"): Promise<Recommendation[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (userType === "patient") {
    return [
      {
        type: "expert",
        item: mockExperts[0],
        reason: "Top-rated oncology specialist with expertise in your condition",
      },
      {
        type: "trial",
        item: mockTrials[0],
        reason: "Currently recruiting for a trial matching your profile",
      },
      {
        type: "publication",
        item: mockPublications[0],
        reason: "Latest research relevant to your condition",
      },
    ];
  } else {
    return [
      {
        type: "publication",
        item: mockPublications[1],
        reason: "Highly cited paper in your field of research",
      },
      {
        type: "expert",
        item: mockExperts[1],
        reason: "Potential collaborator with complementary expertise",
      },
      {
        type: "trial",
        item: mockTrials[1],
        reason: "Trial seeking researchers with your background",
      },
    ];
  }
}

// n8n Webhook Integration
export async function sendToN8n(eventType: string, payload: any) {
  try {
    const response = await fetch("http://localhost:5678/webhook-test/ca5d7c57-8e03-4009-ba66-c5d493488908", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        payload,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      console.error("n8n webhook error:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending to n8n:", error);
  }
}

// OpenAI Integration for Chatbot
export async function sendChatMessage(message: string, conversationHistory: Array<{ role: string; content: string }>) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are CuraLink AI, a helpful medical research assistant. Help users find experts, clinical trials, and publications. Provide clear summaries and actionable next steps. Be empathetic with patients and professional with researchers.",
        },
        ...conversationHistory,
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    }),
  });

  return response;
}
