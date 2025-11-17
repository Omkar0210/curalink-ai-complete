import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserType } from "@/lib/types";
import { Navigation } from "@/components/Navigation";
import { Chatbot } from "@/components/Chatbot";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { AuthPage } from "./components/auth/AuthPage";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Experts from "./pages/Experts";
import Trials from "./pages/Trials";
import Publications from "./pages/Publications";
import Forums from "./pages/Forums";
import Favourites from "./pages/Favourites";
import MyResearch from "./pages/MyResearch";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        setUserName(session.user.user_metadata?.name || session.user.email || "User");
        
        // Get user profile to check user type and onboarding
        const { data: profile } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.user_type) {
          setUserType(profile.user_type as UserType);
          setIsOnboarded(true);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (type: UserType) => {
    if (!userId) return;
    
    try {
      // Update profile with user type
      await supabase
        .from("profiles")
        .update({ user_type: type })
        .eq("id", userId);
      
      setUserType(type);
      setIsOnboarded(true);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const handleChangeAccountType = async () => {
    if (!userId) return;
    
    const newType = userType === "patient" ? "researcher" : "patient";
    
    try {
      await supabase
        .from("profiles")
        .update({ user_type: newType })
        .eq("id", userId);
      
      setUserType(newType);
      setIsOnboarded(false);
    } catch (error) {
      console.error("Error changing account type:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserType(null);
    setIsOnboarded(false);
    setIsAuthenticated(false);
    setUserId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!isAuthenticated ? (
            <AuthPage userType="patient" onAuthSuccess={checkAuth} />
          ) : !isOnboarded || !userType ? (
            <>
              <Onboarding onComplete={handleOnboardingComplete} />
              <Chatbot />
              <VoiceAssistant />
            </>
          ) : (
            <>
              <Navigation 
                userType={userType} 
                onChangeAccountType={handleChangeAccountType}
                onLogout={handleLogout}
              />
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/myresearch" element={<MyResearch userId={userId!} />} />
                <Route path="/dashboard" element={<Dashboard userType={userType} userId={userId!} />} />
                <Route path="/experts" element={<Experts userId={userId!} userType={userType} />} />
                <Route path="/trials" element={<Trials userId={userId!} />} />
                <Route path="/publications" element={<Publications userId={userId!} />} />
                <Route path="/forums" element={<Forums userId={userId!} userName={userName} />} />
                <Route path="/favourites" element={<Favourites userId={userId!} />} />
                <Route path="/profile" element={<Profile userType={userType} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Chatbot />
              <VoiceAssistant />
            </>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
