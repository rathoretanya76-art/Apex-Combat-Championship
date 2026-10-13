"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Database, 
  ShieldCheck, 
  Trophy, 
  Ticket, 
  Users, 
  Mail, 
  RotateCcw, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  Plus, 
  ArrowLeft,
  Activity,
  Layers,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ApplicationEntity, 
  TicketReservationEntity, 
  ContactMessageEntity, 
  FighterEntity,
  AuditLogEntity 
} from '@/lib/mock-db/types';

export default function AdminPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'applications' | 'tickets' | 'messages' | 'fighters' | 'audit' | 'diagnostics'>('applications');
  const [searchFilter, setSearchFilter] = useState('');
  
  const [testResults, setTestResults] = useState<{
    total: number;
    passed: number;
    failed: number;
    results: any[];
  } | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const [applications, setApplications] = useState<ApplicationEntity[]>([]);
  const [tickets, setTickets] = useState<TicketReservationEntity[]>([]);
  const [messages, setMessages] = useState<ContactMessageEntity[]>([]);
  const [fighters, setFighters] = useState<FighterEntity[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Fighter Form state
  const [newFighter, setNewFighter] = useState({
    name: '',
    nickname: '',
    division: 'MMA' as const,
    weightClass: 'Heavyweight (265 lbs)',
    wins: 15,
    losses: 1,
    kos: 10,
    submissions: 2,
    country: 'United States',
    flag: '🇺🇸',
    height: '6\'2"',
    reach: '76"',
    stance: 'Orthodox' as const,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    isChampion: false,
    bio: 'Explosive contender trained at elite camp.',
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const { db } = await import('@/lib/mock-db');
      const [allApps, allTkts, allMsgs, allFighters, logs] = await Promise.all([
        db.applications.getAll(),
        db.tickets.getAll(),
        db.contacts.getAll(),
        db.fighters.getAll(),
        db.admin.getAuditLogs(),
      ]);
      setApplications(allApps);
      setTickets(allTkts);
      setMessages(allMsgs);
      setFighters(allFighters);
      setAuditLogs(logs);
    } catch (err) {
      console.error('[Admin] Error loading db records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateAppStatus = async (id: string, status: 'APPROVED' | 'REJECTED' | 'PENDING') => {
    try {
      const { db } = await import('@/lib/mock-db');
      await db.applications.updateStatus(id, status, `Reviewed in Admin Commission Portal at ${new Date().toLocaleTimeString()}`);
      await loadData();
      toast({
        title: `Dossier ${status}`,
        description: `Application status updated in IndexedDB.`,
      });
    } catch (err) {
      toast({ title: 'Error', description: 'Could not update status', variant: 'destructive' });
    }
  };

  const handleDeleteApp = async (id: string) => {
    try {
      const { db } = await import('@/lib/mock-db');
      await db.applications.delete(id);
      await loadData();
      toast({ title: 'Record Removed', description: 'Application deleted from IndexedDB.' });
    } catch (err) {
      toast({ title: 'Error', description: 'Could not delete record', variant: 'destructive' });
    }
  };

  const handleUpdateTicketStatus = async (id: string, status: 'CHECKED_IN' | 'CONFIRMED' | 'CANCELLED') => {
    try {
      const { db } = await import('@/lib/mock-db');
      await db.tickets.updateStatus(id, status);
      await loadData();
      toast({ title: 'Ticket Updated', description: `Pass status set to ${status}.` });
    } catch (err) {
      toast({ title: 'Error', description: 'Could not update ticket', variant: 'destructive' });
    }
  };

  const handleUpdateMsgStatus = async (id: string, status: 'REVIEWED' | 'ARCHIVED') => {
    try {
      const { db } = await import('@/lib/mock-db');
      await db.contacts.updateStatus(id, status);
      await loadData();
      toast({ title: 'Message Updated', description: `Transmission marked as ${status}.` });
    } catch (err) {
      toast({ title: 'Error', description: 'Could not update message', variant: 'destructive' });
    }
  };

  const handleCreateFighter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { db } = await import('@/lib/mock-db');
      await db.fighters.create({
        name: newFighter.name,
        nickname: newFighter.nickname,
        division: newFighter.division,
        weightClass: newFighter.weightClass,
        record: {
          wins: Number(newFighter.wins),
          losses: Number(newFighter.losses),
          draws: 0,
          kos: Number(newFighter.kos),
          submissions: Number(newFighter.submissions),
        },
        country: newFighter.country,
        flag: newFighter.flag,
        height: newFighter.height,
        reach: newFighter.reach,
        stance: newFighter.stance,
        imageUrl: newFighter.imageUrl,
        isChampion: newFighter.isChampion,
        bio: newFighter.bio,
      });

      await loadData();
      setNewFighter({
        ...newFighter,
        name: '',
        nickname: '',
      });

      toast({
        title: '🥊 Athlete Enrolled in Database!',
        description: `${newFighter.name} added to IndexedDB and visible on /fighters roster.`,
      });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create fighter', variant: 'destructive' });
    }
  };

  const handleResetDb = async () => {
    if (!window.confirm('⚠️ WARNING: Are you sure you want to restore the initial synthetic demonstration dataset? All modified and newly submitted records will be reset.')) {
      return;
    }

    try {
      const { db } = await import('@/lib/mock-db');
      await db.admin.resetDatabase();
      await loadData();
      toast({
        title: '🔄 Database Re-Seeded!',
        description: 'IndexedDB restored to clean initial seed dataset.',
      });
    } catch (err) {
      toast({ title: 'Reset Error', description: 'Could not reset database.', variant: 'destructive' });
    }
  };

  const handleExportBackup = async () => {
    try {
      const { db } = await import('@/lib/mock-db');
      const json = await db.admin.exportSnapshot();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `apex_database_export_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Snapshot Exported', description: 'Downloaded JSON backup.' });
    } catch (err) {
      toast({ title: 'Export Failed', description: 'Could not export backup.', variant: 'destructive' });
    }
  };

  const handleRunDiagnostics = async () => {
    setIsRunningTests(true);
    try {
      const { runMockDbTestSuite } = await import('@/lib/mock-db/test-runner');
      const report = await runMockDbTestSuite();
      setTestResults(report);
      toast({
        title: `✅ Diagnostics Completed: ${report.passed}/${report.total} Passed`,
        description: `Verified schema, idempotent seeding, CRUD, query engine & integrity.`,
      });
    } catch (err) {
      toast({ title: 'Diagnostics Failed', description: 'Could not run test harness', variant: 'destructive' });
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border-2 border-primary/30 p-6 rounded-2xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-white">
                <Link href="/">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Public Site
                </Link>
              </Button>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                ● Live IndexedDB Engine Active
              </span>
            </div>
            <h1 className="font-headline text-3xl sm:text-4xl font-black uppercase tracking-wider text-white">
              Apex Athletic Commission & Database Portal
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Operational console for inspecting, validating, and managing synthetic demonstration records in IndexedDB.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleResetDb}
              variant="outline"
              size="sm"
              className="border-primary/40 text-primary hover:bg-primary/20 text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Re-Seed Database
            </Button>
            <Button
              onClick={handleExportBackup}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
            </Button>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-card border border-primary/20 p-4 rounded-xl">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>Fighters</span>
              <Trophy className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline text-3xl font-black text-white">{fighters.length}</p>
            <span className="text-[10px] text-primary">{fighters.filter(f => f.isChampion).length} Titleholders</span>
          </div>

          <div className="bg-card border border-primary/20 p-4 rounded-xl">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>Applications</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline text-3xl font-black text-white">{applications.length}</p>
            <span className="text-[10px] text-amber-400 font-bold">
              {applications.filter(a => a.status === 'PENDING').length} Pending Review
            </span>
          </div>

          <div className="bg-card border border-primary/20 p-4 rounded-xl">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>Tickets Sold</span>
              <Ticket className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline text-3xl font-black text-white">
              {tickets.reduce((sum, t) => sum + t.quantity, 0)}
            </p>
            <span className="text-[10px] text-muted-foreground">{tickets.length} Bookings</span>
          </div>

          <div className="bg-card border border-primary/20 p-4 rounded-xl">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>Transmissions</span>
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline text-3xl font-black text-white">{messages.length}</p>
            <span className="text-[10px] text-emerald-400">
              {messages.filter(m => m.status === 'NEW').length} Unread
            </span>
          </div>

          <div className="bg-card border border-primary/20 p-4 rounded-xl col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>Audit Entries</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline text-3xl font-black text-white">{auditLogs.length}</p>
            <span className="text-[10px] text-muted-foreground">Transactions Logged</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-primary/20 pb-2">
          {[
            { id: 'applications', label: `Fighter Applications (${applications.length})`, icon: Users },
            { id: 'tickets', label: `Ticket Reservations (${tickets.length})`, icon: Ticket },
            { id: 'messages', label: `Contact Inquiries (${messages.length})`, icon: Mail },
            { id: 'fighters', label: `Roster CRUD (${fighters.length})`, icon: Trophy },
            { id: 'audit', label: `Audit Logs (${auditLogs.length})`, icon: Activity },
            { id: 'diagnostics', label: 'DB QA Test Suite (12 Tests)', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchFilter('');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-headline uppercase tracking-wider font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-black shadow-[0_0_15px_hsl(var(--primary)/0.5)]'
                    : 'bg-card text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="bg-card border border-primary/20 rounded-xl overflow-hidden shadow-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-headline text-2xl font-black uppercase text-white">
                  Athlete Application Dossiers
                </h3>
                <p className="text-xs text-muted-foreground">
                  Records submitted through the public "Join the Ranks" registration form, stored in IndexedDB.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Filter name, ref, discipline..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-8 text-xs bg-black/60 border-white/10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground font-mono uppercase text-[10px]">
                    <th className="py-3 px-3">Dossier ID</th>
                    <th className="py-3 px-3">Athlete Name</th>
                    <th className="py-3 px-3">Discipline</th>
                    <th className="py-3 px-3">Weight Class</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Commission Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications
                    .filter(a => 
                      !searchFilter ||
                      a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      a.dossierId.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      a.discipline.toLowerCase().includes(searchFilter.toLowerCase())
                    )
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-3 font-mono font-bold text-primary">{app.dossierId}</td>
                        <td className="py-3.5 px-3 font-bold text-white">
                          {app.name}
                          <span className="block text-[10px] text-muted-foreground font-normal">{app.email}</span>
                        </td>
                        <td className="py-3.5 px-3">{app.discipline}</td>
                        <td className="py-3.5 px-3 text-muted-foreground">{app.weightClass}</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            app.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-muted-foreground font-mono text-[11px]">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-3 text-right space-x-1.5">
                          {app.status !== 'APPROVED' && (
                            <Button 
                              onClick={() => handleUpdateAppStatus(app.id, 'APPROVED')}
                              size="sm" 
                              className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5"
                            >
                              Approve
                            </Button>
                          )}
                          {app.status !== 'REJECTED' && (
                            <Button 
                              onClick={() => handleUpdateAppStatus(app.id, 'REJECTED')}
                              size="sm" 
                              variant="outline"
                              className="h-7 text-[10px] border-red-500/40 text-red-400 hover:bg-red-500/20 font-bold px-2.5"
                            >
                              Reject
                            </Button>
                          )}
                          <Button
                            onClick={() => handleDeleteApp(app.id)}
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-red-400"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TICKETS */}
        {activeTab === 'tickets' && (
          <div className="bg-card border border-primary/20 rounded-xl overflow-hidden shadow-xl p-6 space-y-4">
            <div>
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                Ticket Reservations Ledger
              </h3>
              <p className="text-xs text-muted-foreground">
                Fight night passes issued through the public Events box office modal, stored in IndexedDB.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground font-mono uppercase text-[10px]">
                    <th className="py-3 px-3">Pass Code</th>
                    <th className="py-3 px-3">Fight Night Event</th>
                    <th className="py-3 px-3">Customer Name</th>
                    <th className="py-3 px-3">Seating Tier</th>
                    <th className="py-3 px-3">Quantity</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tickets.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-mono font-bold text-secondary">{t.ticketCode}</td>
                      <td className="py-3 px-3 font-semibold text-white">{t.eventName}</td>
                      <td className="py-3 px-3">
                        {t.customerName}
                        <span className="block text-[10px] text-muted-foreground">{t.customerEmail}</span>
                      </td>
                      <td className="py-3 px-3 font-bold">{t.tier}</td>
                      <td className="py-3 px-3 font-mono">{t.quantity} seats</td>
                      <td className="py-3 px-3 font-mono text-primary font-bold">{t.totalPrice}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          t.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400' :
                          t.status === 'CHECKED_IN' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {t.status === 'CONFIRMED' && (
                          <Button
                            onClick={() => handleUpdateTicketStatus(t.id, 'CHECKED_IN')}
                            size="sm"
                            className="h-7 text-[10px] bg-primary/20 text-primary hover:bg-primary hover:text-black font-bold"
                          >
                            Check-In Guest
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-card border border-primary/20 rounded-xl overflow-hidden shadow-xl p-6 space-y-4">
            <div>
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                Contact & Partnership Transmissions
              </h3>
              <p className="text-xs text-muted-foreground">
                Inquiries dispatched via the Contact page form, stored in IndexedDB.
              </p>
            </div>

            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="p-4 bg-black/50 border border-white/10 rounded-lg space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-primary font-bold">{m.subject}</span>
                      <h4 className="font-headline text-lg font-bold text-white uppercase">{m.name}</h4>
                      <span className="text-xs text-muted-foreground">{m.email} • {new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      m.status === 'NEW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-muted-foreground'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed bg-card/60 p-3 rounded border border-white/5">
                    {m.message}
                  </p>
                  {m.status === 'NEW' && (
                    <Button
                      onClick={() => handleUpdateMsgStatus(m.id, 'REVIEWED')}
                      size="sm"
                      variant="outline"
                      className="h-7 text-[10px] border-primary/30 text-primary"
                    >
                      Mark as Reviewed
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ROSTER CRUD */}
        {activeTab === 'fighters' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-card border border-primary/20 rounded-xl p-6 shadow-xl space-y-4">
              <div>
                <h3 className="font-headline text-2xl font-black uppercase text-white">
                  Add Athlete to Database
                </h3>
                <p className="text-xs text-muted-foreground">
                  Creates a new record directly in the IndexedDB `fighters` object store.
                </p>
              </div>

              <form onSubmit={handleCreateFighter} className="space-y-3 text-xs">
                <div>
                  <label className="text-muted-foreground uppercase font-bold block mb-1">Athlete Full Name</label>
                  <Input
                    required
                    placeholder="e.g. Roman Sterling"
                    value={newFighter.name}
                    onChange={(e) => setNewFighter({ ...newFighter, name: e.target.value })}
                    className="bg-black/60 border-white/10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-muted-foreground uppercase font-bold block mb-1">Nickname</label>
                    <Input
                      placeholder="e.g. Iron Hammer"
                      value={newFighter.nickname}
                      onChange={(e) => setNewFighter({ ...newFighter, nickname: e.target.value })}
                      className="bg-black/60 border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground uppercase font-bold block mb-1">Division</label>
                    <select
                      value={newFighter.division}
                      onChange={(e) => setNewFighter({ ...newFighter, division: e.target.value as any })}
                      className="w-full bg-black/60 border border-white/10 rounded-md p-2 text-xs text-white"
                    >
                      <option value="MMA">MMA</option>
                      <option value="Boxing">Boxing</option>
                      <option value="Kickboxing">Kickboxing</option>
                      <option value="Grappling">Grappling</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-muted-foreground uppercase font-bold block mb-1">Wins</label>
                    <Input
                      type="number"
                      value={newFighter.wins}
                      onChange={(e) => setNewFighter({ ...newFighter, wins: Number(e.target.value) })}
                      className="bg-black/60 border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground uppercase font-bold block mb-1">Losses</label>
                    <Input
                      type="number"
                      value={newFighter.losses}
                      onChange={(e) => setNewFighter({ ...newFighter, losses: Number(e.target.value) })}
                      className="bg-black/60 border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground uppercase font-bold block mb-1">KOs</label>
                    <Input
                      type="number"
                      value={newFighter.kos}
                      onChange={(e) => setNewFighter({ ...newFighter, kos: Number(e.target.value) })}
                      className="bg-black/60 border-white/10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground uppercase font-bold block mb-1">Bio Profile</label>
                  <Input
                    value={newFighter.bio}
                    onChange={(e) => setNewFighter({ ...newFighter, bio: e.target.value })}
                    className="bg-black/60 border-white/10 text-xs"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full aggressive-glow font-bold text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Commit Fighter Record
                </Button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-card border border-primary/20 rounded-xl p-6 shadow-xl space-y-4">
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                Stored Fighters ({fighters.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {fighters.map((f) => (
                  <div key={f.id} className="p-3 bg-black/50 border border-white/10 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white font-headline text-sm uppercase">{f.name}</span>
                      <span className="text-xs">{f.flag}</span>
                    </div>
                    <p className="text-[10px] text-primary uppercase font-mono">{f.division} • {f.weightClass}</p>
                    <p className="text-muted-foreground font-mono">
                      Record: <strong className="text-white">{f.record.wins}-{f.record.losses}</strong> ({f.record.kos} KOs)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-card border border-primary/20 rounded-xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="font-headline text-2xl font-black uppercase text-white">
                IndexedDB Transaction & Audit Logs
              </h3>
              <p className="text-xs text-muted-foreground">
                Automatic ledger tracking all entity mutations, initializations, and state transitions.
              </p>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto font-mono text-xs pr-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-2.5 bg-black/60 border border-white/5 rounded flex justify-between items-center text-xs">
                  <div>
                    <span className="text-primary font-bold mr-2">[{log.action}]</span>
                    <span className="text-white">{log.entity}</span>
                    {log.entityId && <span className="text-muted-foreground ml-1">#{log.entityId}</span>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DIAGNOSTICS & TEST HARNESS */}
        {activeTab === 'diagnostics' && (
          <div className="bg-card border border-primary/20 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-headline text-2xl font-black uppercase text-white">
                  Automated Database QA Test Harness
                </h3>
                <p className="text-xs text-muted-foreground">
                  Validates IndexedDB schema, seed idempotency, ACID-like transactions, multi-field queries, and referential integrity.
                </p>
              </div>

              <Button
                onClick={handleRunDiagnostics}
                disabled={isRunningTests}
                size="sm"
                className="aggressive-glow font-bold text-xs uppercase"
              >
                {isRunningTests ? 'Running Test Suites...' : 'Execute All 12 QA Tests'}
              </Button>
            </div>

            {testResults ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="grid grid-cols-3 gap-4 max-w-xl">
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg text-center">
                    <span className="text-[10px] uppercase text-muted-foreground block font-mono">Total Tests</span>
                    <span className="font-headline text-2xl font-black text-white">{testResults.total}</span>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-lg text-center">
                    <span className="text-[10px] uppercase text-emerald-400 block font-mono">Passed</span>
                    <span className="font-headline text-2xl font-black text-emerald-400">{testResults.passed}</span>
                  </div>
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg text-center">
                    <span className="text-[10px] uppercase text-muted-foreground block font-mono">Failed</span>
                    <span className="font-headline text-2xl font-black text-red-400">{testResults.failed}</span>
                  </div>
                </div>

                <div className="overflow-x-auto bg-black/60 border border-white/10 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-muted-foreground font-mono uppercase text-[10px]">
                        <th className="py-2.5 px-3">Suite</th>
                        <th className="py-2.5 px-3">Test Scenario</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Execution Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {testResults.results.map((r, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-mono text-primary">{r.suite}</td>
                          <td className="py-2.5 px-3 text-white font-medium">
                            {r.name}
                            {r.details && (
                              <span className="block text-[10px] text-red-400 font-mono mt-0.5">{r.details}</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              r.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {r.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-[11px] text-muted-foreground">
                            {r.durationMs}ms
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-black/40 border border-white/5 rounded-lg space-y-2">
                <ShieldCheck className="w-10 h-10 text-primary mx-auto opacity-70" />
                <h4 className="font-headline text-lg uppercase text-white font-bold">
                  Test Harness Ready
                </h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Click "Execute All 12 QA Tests" to run automated tests validating schema, seeding, CRUD operations, query engine filtering, sorting, pagination, and referential integrity directly in the browser.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
