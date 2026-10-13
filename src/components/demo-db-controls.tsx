"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  RotateCcw, 
  Download, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink, 
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function DemoDbControls() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [stats, setStats] = useState<{
    totalFighters: number;
    totalEvents: number;
    totalApplications: number;
    totalReservations: number;
    totalMessages: number;
  } | null>(null);

  const fetchStats = async () => {
    try {
      const { db } = await import('@/lib/mock-db');
      const data = await db.admin.getDatabaseStats();
      setStats({
        totalFighters: data.totalFighters,
        totalEvents: data.totalEvents,
        totalApplications: data.totalApplications,
        totalReservations: data.totalReservations,
        totalMessages: data.totalMessages,
      });
    } catch (err) {
      console.warn('[DemoDbControls] Failed to load stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      const { db } = await import('@/lib/mock-db');
      await db.admin.resetDatabase();
      await fetchStats();
      setShowConfirmReset(false);
      setIsOpen(false);
      toast({
        title: '🔄 IndexedDB Reset Complete!',
        description: 'Demonstration database restored to clean initial synthetic seed state.',
        duration: 5000,
      });
      // Trigger a gentle reload so all UI components update smoothly
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      toast({
        title: 'Reset Error',
        description: 'Failed to reset IndexedDB.',
        variant: 'destructive',
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleExportJson = async () => {
    try {
      const { db } = await import('@/lib/mock-db');
      const json = await db.admin.exportSnapshot();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apex_database_snapshot_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: '💾 Snapshot Exported',
        description: 'Downloaded full IndexedDB JSON backup file.',
      });
    } catch (err) {
      toast({
        title: 'Export Error',
        description: 'Could not export database state.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {/* Floating Pill Indicator */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            fetchStats();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-primary/40 text-white hover:border-primary shadow-2xl backdrop-blur-md transition-all hover:scale-105 group text-xs font-mono"
          title="Click to view Mock Database Status & Controls"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Database className="w-3.5 h-3.5 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-[11px] font-bold tracking-wider hidden sm:inline">
            IndexedDB Active
          </span>
          {stats && (
            <span className="px-1.5 py-0.2 bg-primary/20 text-primary rounded text-[10px] font-bold">
              {stats.totalFighters + stats.totalEvents + stats.totalApplications + stats.totalReservations} items
            </span>
          )}
        </button>
      </div>

      {/* Database Controls Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border-2 border-primary/40 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowConfirmReset(false);
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="font-headline text-xl font-bold uppercase text-white tracking-wider">
                Demonstration Database
              </h3>
            </div>

            {/* Synthetic Data Disclaimer */}
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs text-muted-foreground mb-4 space-y-1">
              <span className="text-primary font-bold block uppercase text-[10px] tracking-wider">
                • Environment: Browser-Local IndexedDB
              </span>
              <p>
                All athlete records, bouts, and financial numbers are <strong>synthetic demonstration data</strong> for portfolio presentation purposes. Data is persisted privately inside your browser.
              </p>
            </div>

            {/* Live Object Store Stats */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-3.5 space-y-2 font-mono text-xs mb-5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block border-b border-white/10 pb-1">
                Live Store Inventory
              </span>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fighter Roster:</span>
                <span className="text-white font-bold">{stats?.totalFighters ?? '...'} athletes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Events & Cards:</span>
                <span className="text-white font-bold">{stats?.totalEvents ?? '...'} cards</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fighter Applications:</span>
                <span className="text-primary font-bold">{stats?.totalApplications ?? '...'} dossiers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ticket Reservations:</span>
                <span className="text-secondary font-bold">{stats?.totalReservations ?? '...'} passes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact Transmissions:</span>
                <span className="text-white font-bold">{stats?.totalMessages ?? '...'} messages</span>
              </div>
            </div>

            {/* Actions */}
            {showConfirmReset ? (
              <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-lg space-y-3 animate-in zoom-in-95">
                <p className="text-xs text-red-200 font-semibold">
                  ⚠️ <strong>Confirm Reset?</strong> This will purge all modifications and re-install the pristine seed dataset.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleReset}
                    disabled={isResetting}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  >
                    {isResetting ? 'Resetting...' : 'Yes, Purge & Re-seed'}
                  </Button>
                  <Button
                    onClick={() => setShowConfirmReset(false)}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => setShowConfirmReset(true)}
                    variant="outline"
                    size="sm"
                    className="border-primary/40 text-primary hover:bg-primary/20 text-xs font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset Database
                  </Button>
                  <Button
                    onClick={handleExportJson}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
                  </Button>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="w-full aggressive-glow font-bold text-xs uppercase tracking-wider"
                >
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Layers className="w-3.5 h-3.5 mr-2" /> Open Commission Admin Panel
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
