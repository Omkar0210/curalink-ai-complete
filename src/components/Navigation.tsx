import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationProps {
  userType: "patient" | "researcher";
  onLogout: () => void;
}

export function Navigation({ userType, onLogout }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/experts", label: "Expert Directory" },
    { href: "/trials", label: "Clinical Trials" },
    { href: "/publications", label: "Publications" },
    { href: "/forums", label: "Forums" },
    { href: "/favourites", label: "Favourites" },
  ];

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">CuraLink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">
              <User className="h-4 w-4" />
              <span className="text-sm capitalize">{userType}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="hidden md:flex"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                    <User className="h-4 w-4" />
                    <span className="text-sm capitalize">{userType}</span>
                  </div>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-lg",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
