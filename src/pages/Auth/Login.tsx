import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { BrandLogo } from "../../components/brand-logo";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import api from "../../lib/api";

function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", {
      email,
      password: pw,
    });

    const { user, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "staff":
        navigate("/staff");
        break;
      case "customer":
        navigate("/customer");
        break;
      default:
        navigate("/");
    }
  } catch {
    setError("Invalid email or password");
  }
};

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex">
        <div className="absolute inset-0 gradient-brand opacity-100" />
        <div className="absolute inset-0 bg-grid-soft opacity-15" />
        <BrandLogo className="relative [&_span]:text-primary-foreground" />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            "Bookly cut our no-shows in half and made our calendar feel
            effortless."
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15 font-semibold">
              SR
            </div>
            <div>
              <div className="text-sm font-medium">Sofia Reyes</div>
              <div className="text-xs opacity-80">Owner, Glow Studio</div>
            </div>
          </div>
        </div>
        <div className="relative text-xs opacity-80">© 2026 Bookly Inc.</div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <BrandLogo />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to your Bookly account.
          </p>

          <Card className="mt-6 border-border/70 shadow-sm">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={submit}>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-9 pr-9"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPw ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {error}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label
                    htmlFor="remember"
                    className="text-xs font-normal text-muted-foreground"
                  >
                    Keep me signed in
                  </Label>
                </div>
                <Button type="submit" className="w-full gap-2">
                  Sign in <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </p>

          <div className="mt-6 flex justify-center gap-2 text-xs">
            <Link
              to="/customer"
              className="rounded border border-border px-2 py-1 text-muted-foreground hover:bg-accent"
            >
              Customer demo
            </Link>
            <Link
              to="/staff"
              className="rounded border border-border px-2 py-1 text-muted-foreground hover:bg-accent"
            >
              Staff demo
            </Link>
            <Link
              to="/admin"
              className="rounded border border-border px-2 py-1 text-muted-foreground hover:bg-accent"
            >
              Admin demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
