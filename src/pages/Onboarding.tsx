import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/lib/types";
import { ArrowRight, User, Microscope } from "lucide-react";

interface OnboardingProps {
  onComplete: (userType: UserType) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<"select" | "details">("select");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    specialization: "",
    orcid: "",
    researchGate: "",
  });

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep("details");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userType) {
      onComplete(userType);
    }
  };

  if (step === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Welcome to CuraLink</h1>
            <p className="text-xl text-muted-foreground">
              Connect with experts, discover trials, and advance medical research
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
              onClick={() => handleUserTypeSelect("patient")}
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <User className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">I'm a Patient</h2>
                  <p className="text-muted-foreground">
                    Find experts, clinical trials, and connect with others who understand
                    your journey
                  </p>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Continue as Patient
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
              onClick={() => handleUserTypeSelect("researcher")}
            >
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Microscope className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">I'm a Researcher</h2>
                  <p className="text-muted-foreground">
                    Discover collaborators, stay updated on latest research, and manage
                    trials
                  </p>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Continue as Researcher
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Help us personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Dr. Jane Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="jane.smith@example.com"
              />
            </div>

            {userType === "researcher" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                    placeholder="University Hospital"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({ ...formData, specialization: e.target.value })
                    }
                    placeholder="Oncology, Immunotherapy"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orcid">ORCID (Optional)</Label>
                    <Input
                      id="orcid"
                      value={formData.orcid}
                      onChange={(e) =>
                        setFormData({ ...formData, orcid: e.target.value })
                      }
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="researchGate">ResearchGate (Optional)</Label>
                    <Input
                      id="researchGate"
                      value={formData.researchGate}
                      onChange={(e) =>
                        setFormData({ ...formData, researchGate: e.target.value })
                      }
                      placeholder="Profile URL"
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
