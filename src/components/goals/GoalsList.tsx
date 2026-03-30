"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, CheckCircle2 } from "lucide-react";
import { GoalModal } from "./GoalModal";

export function GoalsList({ goals, currency = "USD" }: { goals: any[], currency?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGoal, setActiveGoal] = useState<any>(null);

  const handleCreate = () => {
    setActiveGoal(null);
    setIsModalOpen(true);
  };

  const handleDeposit = (goal: any) => {
    setActiveGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Your Milestones</h3>
        </div>
        <Button onClick={handleCreate} className="text-white gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Goal</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-8 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
            No savings goals currently mapped. Define your first milestone!
          </div>
        )}

        {goals.map((g) => {
          const rawPercent = g.targetAmount > 0 ? (g.currentAmount / g.targetAmount) * 100 : 0;
          const displayPercent = Math.min(rawPercent, 100);
          const isCompleted = rawPercent >= 100;

          return (
            <Card key={g.id} className={`shadow-sm border transition-shadow group ${isCompleted ? 'border-primary/50 bg-primary/5' : 'border-border/60 hover:shadow-md'}`}>
               <CardContent className="p-5">
                 
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-bold text-lg text-foreground truncate max-w-[180px]">{g.name}</h4>
                      <CardDescription className="mt-1">
                        {isCompleted ? "Goal Reached! 🎉" : "In Progress"}
                      </CardDescription>
                    </div>
                    <div className={`p-2 rounded-full ${isCompleted ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                       {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                    </div>
                 </div>

                 <div className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-2xl font-bold text-foreground">
                        {new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(g.currentAmount)}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        of {new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(g.targetAmount)}
                      </span>
                    </div>

                    <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${isCompleted ? 'bg-primary' : 'bg-primary/80'}`}
                        style={{ width: `${displayPercent}%` }}
                      />
                    </div>
                 </div>

                 <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-primary">{Math.round(displayPercent)}%</span>
                   <span className="text-muted-foreground">{new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(Math.max(g.targetAmount - g.currentAmount, 0))} left</span>
                 </div>
               </CardContent>
               <CardFooter className="p-4 pt-0">
                  <Button 
                    variant={isCompleted ? "outline" : "default"} 
                    className="w-full text-foreground hover:text-white"
                    onClick={() => handleDeposit(g)}
                    disabled={isCompleted}
                  >
                    {isCompleted ? "Completed" : "Add Funds"}
                  </Button>
               </CardFooter>
            </Card>
          );
        })}
      </div>

      <GoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        goal={activeGoal}
      />
    </>
  );
}
