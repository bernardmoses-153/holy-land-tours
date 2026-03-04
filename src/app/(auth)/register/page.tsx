"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inputStyles =
  "w-full rounded-lg border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/verify");
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold tracking-widest text-secondary uppercase">
          Holy Land Tours
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted">
          Join thousands of Holy Land travelers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-foreground"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className={cn(inputStyles)}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={cn(inputStyles)}
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={cn(inputStyles)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
