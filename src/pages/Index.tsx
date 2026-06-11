import { ArrowRight, CalendarCheck2, Shield, Users, Sparkles } from "lucide-react";
import { BrandLogo } from "../components/brand-logo";
import { Button } from "../components/ui/button";

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <BrandLogo />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><a href="/login">Sign in</a></Button>
            <Button asChild size="sm"><a href="/register">Get started</a></Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> New · Smart scheduling for teams
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Appointments, <span className="text-gradient-brand">beautifully booked.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Bookly is a modern booking platform for salons, clinics, and studios. Customers self-serve, staff stay in flow, admins keep control.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <a href="/customer">Try the customer app <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/admin">Open admin console</a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Demo accounts available · <a href="/staff" className="underline underline-offset-2">Staff workspace</a>
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarCheck2, title: "Smart calendar", desc: "Real-time availability across services and staff." },
              { icon: Users, title: "Team-ready", desc: "Roles for customers, staff, and admins out of the box." },
              { icon: Shield, title: "Secure by default", desc: "Permissions, audit trails, and reliable scheduling." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <f.icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
