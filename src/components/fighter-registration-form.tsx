"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, ShieldAlert, Loader2, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { weightClasses, divisions } from '@/lib/data';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  weightClass: z.string({ required_error: 'Please select a weight class.' }),
  discipline: z.string({ required_error: 'Please select a discipline.' }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function FighterRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    appId: string;
    values: FormValues;
    submittedAt: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const { db } = await import('@/lib/mock-db');
      const createdApp = await db.applications.create({
        name: values.name,
        email: values.email,
        weightClass: values.weightClass,
        discipline: values.discipline,
        message: values.message,
      });

      const submissionRecord = {
        appId: createdApp.dossierId,
        values,
        submittedAt: new Date(createdApp.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setSubmittedData(submissionRecord);

      toast({
        title: '⚔️ Application Officially Logged in IndexedDB!',
        description: `Dossier #${createdApp.dossierId}. Matchmaking & medical review queued for ${values.name}.`,
        duration: 6000,
      });
    } catch (err) {
      console.error('[IndexedDB Error]', err);
      toast({
        title: 'Database Error',
        description: 'Failed to record application in database.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedData(null);
    form.reset();
  }

  return (
    <div className="relative">
      {/* If submitted, show confirmation badge card */}
      {submittedData ? (
        <div className="bg-card border-2 border-primary/40 rounded-xl p-8 relative overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute inset-0 cage-pattern-subtle opacity-10" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full text-xs font-headline uppercase tracking-widest font-bold mb-2">
                Status: Pending Matchmaking Review
              </span>
              <h3 className="font-headline text-3xl font-black uppercase tracking-wider text-white">
                Fighter Dossier Created
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Your application has been received by the Octa Fighting Championship Athletic Commission.
              </p>
            </div>

            <div className="w-full max-w-md bg-black/60 border border-primary/20 rounded-lg p-5 text-left space-y-3 font-mono text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Application ID:</span>
                <span className="text-primary font-bold">{submittedData.appId}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Athlete:</span>
                <span className="text-white font-semibold">{submittedData.values.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Discipline:</span>
                <span className="text-white">{submittedData.values.discipline}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Weight Class:</span>
                <span className="text-white">{submittedData.values.weightClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered:</span>
                <span className="text-muted-foreground">{submittedData.submittedAt}</span>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-xs text-muted-foreground text-left max-w-md space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary" /> Next Verification Steps:
              </p>
              <p>1. Sanctioned fight record & medical records verification.</p>
              <p>2. Direct reach-out to designated camp coaches via registered email.</p>
            </div>

            <Button
              onClick={handleReset}
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary hover:text-white"
            >
              Submit Another Application
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Info Box */}
          <div className="mb-8 p-6 bg-card border-2 border-primary/30 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 cage-pattern-subtle opacity-10" />
            <h3 className="font-headline text-xl font-bold text-primary uppercase mb-3 relative z-10">
              What We're Looking For
            </h3>
            <ul className="space-y-2 text-muted-foreground relative z-10 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Documented competitive combat record with verified athletic credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Professional fight camp training, valid medicals, and physical discipline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Commitment to clean combat sports and anti-doping regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Willingness to compete on international fight night broadcasts</span>
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Full Legal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Marcus Vance" {...field} className="bg-black/40 border-border/80 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Official Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="athlete@fightcamp.com" {...field} className="bg-black/40 border-border/80 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weightClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Target Weight Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/40 border-border/80">
                            <SelectValue placeholder="Select competitive weight" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {weightClasses.map((wc) => (
                            <SelectItem key={wc} value={wc}>
                              {wc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discipline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Primary Discipline</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-black/40 border-border/80">
                            <SelectValue placeholder="Select division discipline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {divisions.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Fight Record, Camp & Accolades (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detail your pro/amateur record (e.g., 14-2-0), current gym/head coach, notable titles, or link to Tapology/BoxRec."
                        className="resize-none min-h-[110px] bg-black/40 border-border/80 focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="aggressive-glow font-bold text-lg px-12 strike-animation w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Registering Athlete...
                    </>
                  ) : (
                    <>
                      Submit Fighter Application <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  By submitting, you agree to Apex athletic screening, anti-doping standards, and commission rules.
                </p>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
