import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CollaborationChat from "./CollaborationChat";

interface Collaboration {
  id: string;
  expert_id: string;
  requester_id: string;
  status: string;
  message: string | null;
  created_at: string;
  expert_name?: string;
  requester_name?: string;
}

export default function CollaborationManager({ userId }: { userId: string }) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatState, setChatState] = useState<{
    open: boolean;
    collaborationId: string;
    roomId: string;
    expertName: string;
  }>({
    open: false,
    collaborationId: "",
    roomId: "",
    expertName: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadCollaborations();
    
    // Subscribe to collaboration updates
    const channel = supabase
      .channel("collaborations-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collaborations",
          filter: `requester_id=eq.${userId}`,
        },
        () => {
          loadCollaborations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const loadCollaborations = async () => {
    try {
      const { data, error } = await supabase
        .from("collaborations")
        .select(`
          *,
          experts!collaborations_expert_id_fkey (name)
        `)
        .eq("requester_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedData = (data || []).map((collab: any) => ({
        ...collab,
        expert_name: collab.experts?.name || "Unknown Expert",
      }));

      setCollaborations(formattedData);
    } catch (error) {
      console.error("Error loading collaborations:", error);
    } finally {
      setLoading(false);
    }
  };

  const openChat = async (collaboration: Collaboration) => {
    try {
      // Check if chat room exists
      const { data: existingRoom } = await supabase
        .from("chat_rooms")
        .select("id")
        .eq("collaboration_id", collaboration.id)
        .single();

      let roomId = existingRoom?.id;

      // Create chat room if it doesn't exist
      if (!roomId) {
        const { data: newRoom, error } = await supabase
          .from("chat_rooms")
          .insert({ collaboration_id: collaboration.id })
          .select("id")
          .single();

        if (error) throw error;
        roomId = newRoom.id;
      }

      setChatState({
        open: true,
        collaborationId: collaboration.id,
        roomId: roomId,
        expertName: collaboration.expert_name || "Expert",
      });
    } catch (error) {
      console.error("Error opening chat:", error);
      toast({
        title: "Error",
        description: "Failed to open chat",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading collaborations...</div>;
  }

  if (collaborations.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No collaboration requests yet</p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {collaborations.map((collab) => (
          <Card key={collab.id} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{collab.expert_name}</h3>
                  <Badge
                    variant={
                      collab.status === "accepted"
                        ? "default"
                        : collab.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {collab.status}
                  </Badge>
                </div>
                {collab.message && (
                  <p className="text-sm text-muted-foreground">{collab.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Requested {new Date(collab.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                {collab.status === "accepted" && (
                  <Button
                    onClick={() => openChat(collab)}
                    variant="default"
                    size="sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <CollaborationChat
        collaborationId={chatState.collaborationId}
        roomId={chatState.roomId}
        currentUserId={userId}
        expertName={chatState.expertName}
        isOpen={chatState.open}
        onClose={() =>
          setChatState({
            open: false,
            collaborationId: "",
            roomId: "",
            expertName: "",
          })
        }
      />
    </>
  );
}
