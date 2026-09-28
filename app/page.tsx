import Link from "next/link";
import { Check, FolderKanban, Users, FileText, Workflow, BarChart3, UsersRound } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";

const features = [
  { icon: Users, title: "Customers", text: "Keep every client, plan and status in one place." },
  { icon: FolderKanban, title: "Projects", text: "Track work from planning to done, with owners." },
  { icon: UsersRound, title: "Teams", text: "Organize people into teams with clear leads." },
  { icon: FileText, title: "Invoices", text: "Create invoices and see what is still unpaid." },
  { icon: Workflow, title: "Workflows", text: "Automate reminders and repeat tasks." },
  { icon: BarChart3, title: "Reports", text: "Revenue and project health at a glance." },
];

const plans = [
  { name: "Starter", price: "$0", note: "For trying it out", cta: "Start free", featured: false,
    items: ["1 user", "Up to 10 customers", "Basic reports"] },
  { name: "Team", price: "$29", note: "per month", cta: "Get started", featured: true,
    items: ["Up to 10 users", "Unlimited customers", "Invoices and workflows", "Priority support"] },
  { name: "Business", price: "$79", note: "per month", cta: "Get started", featured: false,
    items: ["Unlimited users", "Advanced reports", "Custom workflows", "Dedicated support"] },
];

const faqs = [
  { q: "Can I change plans later?", a: "Yes. You can upgrade or downgrade at any time." },
  { q: "Is there a free trial?", a: "The Starter plan is free with no time limit." },
  { q: "How do I get access?", a: "Click Get started and sign in to open your workspace." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface font-sans text-ink">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Run your customers, projects and invoices in one desk.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-secondary">
          Cooperate Desk helps small teams stay organized and get paid on time.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/login" className="rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover">Get started</Link>
          <a href="#pricing" className="rounded-md border border-gray-300 bg-white px-6 py-3 font-medium hover:border-primary hover:text-primary">See pricing</a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Everything your team needs</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-tint">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-ink-secondary">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
        <p className="mt-2 text-center text-ink-secondary">Pick a plan and upgrade whenever you grow.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name}
              className={"flex flex-col rounded-xl border bg-white p-8 shadow-sm " + (p.featured ? "border-primary ring-2 ring-primary-tint" : "border-gray-200")}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured && <span className="rounded-full bg-primary-tint px-3 py-1 text-xs font-medium text-primary">Most popular</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-ink-secondary">{p.note}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-semantic-success" aria-hidden /> {i}</li>
                ))}
              </ul>
              <Link href="/login"
                className={"mt-8 rounded-md px-4 py-2.5 text-center text-sm font-medium " +
                  (p.featured ? "bg-primary text-white hover:bg-primary-hover" : "border border-gray-300 hover:border-primary hover:text-primary")}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Questions</h2>
        <div className="mt-8 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {faqs.map((f) => (
            <div key={f.q} className="p-6">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 text-sm text-ink-secondary">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-ink-secondary">
        © {new Date().getFullYear()} Cooperate Desk. All rights reserved.
      </footer>
    </div>
  );
}
