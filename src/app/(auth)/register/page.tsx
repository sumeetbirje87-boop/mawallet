"use client";

import { useState } from "react";
import { registerUser, authenticate } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    
    // Quick local validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      setIsPending(false);
      return;
    }

    const result = await registerUser(undefined, formData);
    
    if (result === "SUCCESS") {
      setSuccess(true);
      // Automatically log them in
      await authenticate(undefined, formData);
    } else {
      setErrorMessage(result || "Registration failed.");
      setIsPending(false);
    }
  };

  if (success) {
    return (
      <Card className="shadow-lg border-border text-center">
        <CardContent className="pt-10 pb-8 flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center text-success">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Account Created!</h2>
          <p className="text-muted-foreground">Redirecting you to the dashboard...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
        <CardDescription>
          Join MaWallet and take control of your finances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input 
              id="displayName" 
              name="displayName" 
              type="text" 
              placeholder="John Doe" 
              required 
              className="bg-card text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
              className="bg-card text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Min 8 characters"
              required 
              className="bg-card text-foreground"
            />
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <Button type="submit" className="w-full text-white" disabled={isPending}>
            {isPending ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
