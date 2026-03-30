import { Suspense } from "react";
import { getUserSettings } from "@/app/actions/settings";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { DataExportCard } from "@/components/settings/DataExportCard";

async function SettingsDashboard() {
  const userData = await getUserSettings();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-500 mt-8">
      
      <SettingsForm initialData={userData} />

      <DataExportCard />
      
    </div>
  );
}

export default function SettingsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Global Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your universal profile configuration and secure your structured data exports.
        </p>
      </div>

      <Suspense fallback={
        <div className="space-y-8 animate-pulse mt-8">
           <div className="h-[400px] w-full bg-muted rounded-xl" />
           <div className="h-[200px] w-full bg-muted rounded-xl" />
        </div>
      }>
        <SettingsDashboard />
      </Suspense>
    </main>
  );
}
