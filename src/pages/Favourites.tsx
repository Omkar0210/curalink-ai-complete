import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Beaker, Users, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Mock saved items (in real app, these would come from API)
const mockSavedItems = {
  reading: [
    {
      id: "pub-1",
      title: "CRISPR-Cas9 Gene Editing: Mechanisms and Applications",
      type: "publication",
      authors: ["Zhang, F.", "Doudna, J.A."],
      year: 2024,
    },
    {
      id: "pub-2",
      title: "Immunotherapy Combinations in Advanced Cancer",
      type: "publication",
      authors: ["Chen, D.S.", "Mellman, I."],
      year: 2024,
    },
  ],
  trials: [
    {
      id: "trial-1",
      title: "Phase III Study of Novel Immunotherapy for Advanced Melanoma",
      type: "trial",
      phase: "Phase III",
      status: "Recruiting",
    },
  ],
  collaborations: [
    {
      id: "expert-1",
      name: "Dr. Sarah Chen",
      specialization: "Oncology & Immunotherapy",
      institution: "Memorial Sloan Kettering Cancer Center",
      type: "expert",
    },
    {
      id: "expert-2",
      name: "Prof. Michael Anderson",
      specialization: "Cardiovascular Disease",
      institution: "Mayo Clinic",
      type: "expert",
    },
  ],
};

export default function Favourites({ userId }: { userId: string }) {
  const [savedItems, setSavedItems] = useState(mockSavedItems);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [summaryDialog, setSummaryDialog] = useState(false);
  const [summary, setSummary] = useState("");
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const removeItem = (category: keyof typeof savedItems, id: string) => {
    setSavedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item: any) => item.id !== id),
    }));

    // Remove from selected items if it was selected
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    toast({
      title: "Removed",
      description: "Item removed from favourites",
    });
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const generateSummary = async () => {
    if (selectedItems.size === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to summarize",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      // Collect all selected items
      const allItems = [
        ...savedItems.reading,
        ...savedItems.trials,
        ...savedItems.collaborations,
      ];
      const itemsToSummarize = allItems.filter((item) =>
        selectedItems.has(item.id)
      );

      // Call edge function to generate summary
      const { data, error } = await supabase.functions.invoke(
        "summarize-favourites",
        {
          body: { items: itemsToSummarize },
        }
      );

      if (error) throw error;

      setSummary(data.summary);
      setSummaryDialog(true);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied",
      description: "Summary copied to clipboard",
    });
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "medical-research-summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Summary downloaded successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Favourites</h1>
        <p className="text-xl text-muted-foreground">
          Your saved items and collections
        </p>
      </div>

      {selectedItems.size > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {selectedItems.size} item{selectedItems.size > 1 ? "s" : ""}{" "}
                selected
              </p>
              <p className="text-sm text-muted-foreground">
                Generate an AI summary to share with your doctor
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedItems(new Set())}
              >
                Clear Selection
              </Button>
              <Button onClick={generateSummary} disabled={generating}>
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Summary
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Tabs defaultValue="reading" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reading" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Reading List ({savedItems.reading.length})
          </TabsTrigger>
          <TabsTrigger value="trials" className="gap-2">
            <Beaker className="h-4 w-4" />
            Trials ({savedItems.trials.length})
          </TabsTrigger>
          <TabsTrigger value="collaborations" className="gap-2">
            <Users className="h-4 w-4" />
            Collaborations ({savedItems.collaborations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reading" className="space-y-4">
          {savedItems.reading.length === 0 ? (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No saved publications yet</p>
            </Card>
          ) : (
            savedItems.reading.map((item: any) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.authors.join(", ")} • {item.year}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("reading", item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="trials" className="space-y-4">
          {savedItems.trials.length === 0 ? (
            <Card className="p-8 text-center">
              <Beaker className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No saved trials yet</p>
            </Card>
          ) : (
            savedItems.trials.map((item: any) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Badge variant="default">{item.phase}</Badge>
                      <Badge variant="secondary">{item.status}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("trials", item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-4">
          {savedItems.collaborations.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No saved collaborators yet
              </p>
            </Card>
          ) : (
            savedItems.collaborations.map((item: any) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.specialization}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("collaborations", item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Summary Dialog */}
      <Dialog open={summaryDialog} onOpenChange={setSummaryDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Research Summary</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg whitespace-pre-wrap">
                {summary}
              </div>
            </div>
          </ScrollArea>
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={copySummary}>
              Copy to Clipboard
            </Button>
            <Button onClick={downloadSummary}>
              Download Summary
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
