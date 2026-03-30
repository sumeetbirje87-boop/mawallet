import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="h-8 w-8 bg-primary rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
          M
        </div>
        <span className="font-bold text-xl tracking-tight hidden md:block">MaWallet</span>
      </div>
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        {children}
      </div>
    </div>
  );
}
