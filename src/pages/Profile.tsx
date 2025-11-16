import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserCircle, Save, Edit2 } from "lucide-react";

interface ProfileProps {
  userType: "patient" | "researcher";
}

interface PatientData {
  fullName: string;
  email: string;
  age: string;
  gender: string;
  country: string;
  city: string;
  primaryCondition: string;
  symptoms: string;
  medicalFile: File | null;
  additionalNotes: string;
}

interface ResearcherData {
  name: string;
  email: string;
  institution: string;
  fieldOfResearch: string;
  yearsOfExperience: string;
  orcidId: string;
  researchGateUrl: string;
  linkedInUrl: string;
  bio: string;
  profilePicture: File | null;
}

export default function Profile({ userType }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Patient state
  const [patientData, setPatientData] = useState<PatientData>({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    country: "",
    city: "",
    primaryCondition: "",
    symptoms: "",
    medicalFile: null,
    additionalNotes: "",
  });

  // Researcher state
  const [researcherData, setResearcherData] = useState<ResearcherData>({
    name: "",
    email: "",
    institution: "",
    fieldOfResearch: "",
    yearsOfExperience: "",
    orcidId: "",
    researchGateUrl: "",
    linkedInUrl: "",
    bio: "",
    profilePicture: null,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    if (userType === "patient") {
      const saved = localStorage.getItem("curalink_patient_data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPatientData({ ...parsed, medicalFile: null });
        } catch (error) {
          console.error("Error loading patient data:", error);
        }
      }
    } else {
      const saved = localStorage.getItem("curalink_researcher_data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setResearcherData({ ...parsed, profilePicture: null });
        } catch (error) {
          console.error("Error loading researcher data:", error);
        }
      }
    }
  }, [userType]);

  const handleSavePatient = () => {
    localStorage.setItem("curalink_patient_data", JSON.stringify(patientData));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your patient profile has been saved successfully",
    });
  };

  const handleSaveResearcher = () => {
    localStorage.setItem("curalink_researcher_data", JSON.stringify(researcherData));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your researcher profile has been saved successfully",
    });
  };

  const handleSave = () => {
    if (userType === "patient") {
      handleSavePatient();
    } else {
      handleSaveResearcher();
    }
  };

  if (userType === "patient") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-xl text-muted-foreground">
                Manage your patient information
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{patientData.fullName || "Patient"}</h2>
                <p className="text-muted-foreground">{patientData.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={patientData.gender}
                    onValueChange={(value) => setPatientData({ ...patientData, gender: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={patientData.country}
                    onChange={(e) => setPatientData({ ...patientData, country: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={patientData.city}
                    onChange={(e) => setPatientData({ ...patientData, city: e.target.value })}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryCondition">Primary Condition *</Label>
                <Select
                  value={patientData.primaryCondition}
                  onValueChange={(value) => setPatientData({ ...patientData, primaryCondition: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cancer">Cancer</SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="heart-disease">Heart Disease</SelectItem>
                    <SelectItem value="neurological">Neurological Disorders</SelectItem>
                    <SelectItem value="autoimmune">Autoimmune Conditions</SelectItem>
                    <SelectItem value="respiratory">Respiratory Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Description / Symptoms *</Label>
                <Textarea
                  id="symptoms"
                  value={patientData.symptoms}
                  onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Describe your symptoms and condition..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={patientData.additionalNotes}
                  onChange={(e) => setPatientData({ ...patientData, additionalNotes: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Any additional information..."
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Researcher Profile
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-xl text-muted-foreground">
              Manage your researcher information
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{researcherData.name || "Researcher"}</h2>
              <p className="text-muted-foreground">{researcherData.institution}</p>
              <p className="text-sm text-muted-foreground">{researcherData.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={researcherData.name}
                  onChange={(e) => setResearcherData({ ...researcherData, name: e.target.value })}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={researcherData.email}
                  onChange={(e) => setResearcherData({ ...researcherData, email: e.target.value })}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution / Organization *</Label>
              <Input
                id="institution"
                value={researcherData.institution}
                onChange={(e) => setResearcherData({ ...researcherData, institution: e.target.value })}
                disabled={!isEditing}
                placeholder="e.g., Stanford University"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fieldOfResearch">Field of Research *</Label>
                <Select
                  value={researcherData.fieldOfResearch}
                  onValueChange={(value) => setResearcherData({ ...researcherData, fieldOfResearch: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neuroscience">Neuroscience</SelectItem>
                    <SelectItem value="Immunology">Immunology</SelectItem>
                    <SelectItem value="Genetics">Genetics</SelectItem>
                    <SelectItem value="Pharmacology">Pharmacology</SelectItem>
                    <SelectItem value="Clinical Trials">Clinical Trials</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  value={researcherData.yearsOfExperience}
                  onChange={(e) => setResearcherData({ ...researcherData, yearsOfExperience: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., 10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                value={researcherData.bio}
                onChange={(e) => setResearcherData({ ...researcherData, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell us about your research background and interests..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Professional Links (Optional)</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orcidId">ORCID ID</Label>
                  <Input
                    id="orcidId"
                    value={researcherData.orcidId}
                    onChange={(e) => setResearcherData({ ...researcherData, orcidId: e.target.value })}
                    disabled={!isEditing}
                    placeholder="0000-0000-0000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchGateUrl">ResearchGate URL</Label>
                  <Input
                    id="researchGateUrl"
                    value={researcherData.researchGateUrl}
                    onChange={(e) => setResearcherData({ ...researcherData, researchGateUrl: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://researchgate.net/profile/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedInUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedInUrl"
                    value={researcherData.linkedInUrl}
                    onChange={(e) => setResearcherData({ ...researcherData, linkedInUrl: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
