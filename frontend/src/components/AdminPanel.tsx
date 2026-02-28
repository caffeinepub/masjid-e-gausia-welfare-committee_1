import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Loader2,
  Bell,
  Wallet,
  MessageSquare,
  ShieldAlert,
  Calendar,
  IndianRupee,
  Mail,
  User,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsCallerAdmin } from '../hooks/useAuthQueries';
import {
  useGetAnnouncements,
  useAddAnnouncement,
  useDeleteAnnouncement,
  useGetJumaCollections,
  useAddJumaCollection,
  useDeleteJumaCollection,
  useGetContactInquiries,
} from '../hooks/useQueries';

interface AdminPanelProps {
  onClose: () => void;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatJumaDate(timestamp: bigint): string {
  const ms = Number(timestamp) * 1000;
  return new Date(ms).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatAmount(amount: bigint): string {
  return new Intl.NumberFormat('hi-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

// ─── Announcements Tab ───────────────────────────────────────────────────────
function AnnouncementsTab() {
  const { data: announcements, isLoading } = useGetAnnouncements();
  const addMutation = useAddAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setFeedback({ type: 'error', msg: 'शीर्षक और विवरण दोनों आवश्यक हैं।' });
      return;
    }
    try {
      await addMutation.mutateAsync({ title: title.trim(), body: body.trim() });
      setTitle('');
      setBody('');
      setFeedback({ type: 'success', msg: 'घोषणा सफलतापूर्वक जोड़ी गई!' });
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback({ type: 'error', msg: 'घोषणा जोड़ने में त्रुटि हुई। पुनः प्रयास करें।' });
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      setFeedback({ type: 'success', msg: 'घोषणा हटा दी गई।' });
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback({ type: 'error', msg: 'घोषणा हटाने में त्रुटि हुई।' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-champagne rounded-2xl p-6 border border-gold/20">
        <h3 className="font-bold text-near-black font-serif text-lg mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange" />
          नई घोषणा जोड़ें
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-near-black/75 mb-1">शीर्षक</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="घोषणा का शीर्षक..."
              className="w-full px-4 py-2.5 rounded-xl border border-gold/30 bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-near-black/75 mb-1">विवरण</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="घोषणा का विवरण..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gold/30 bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange/40 resize-none"
            />
          </div>
          {feedback && (
            <p className={`text-sm font-medium ${feedback.type === 'success' ? 'text-forest' : 'text-red-600'}`}>
              {feedback.msg}
            </p>
          )}
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange text-white font-semibold text-sm rounded-full hover:bg-orange/90 transition-colors disabled:opacity-50"
          >
            {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            घोषणा जोड़ें
          </button>
        </form>
      </div>

      {/* List */}
      <div>
        <h3 className="font-bold text-near-black font-serif text-base mb-3">
          मौजूदा घोषणाएं ({announcements?.length ?? 0})
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-orange animate-spin" />
          </div>
        ) : !announcements || announcements.length === 0 ? (
          <p className="text-near-black/50 text-sm text-center py-8">कोई घोषणा नहीं है।</p>
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => (
              <div
                key={String(a.id)}
                className="flex items-start justify-between gap-4 bg-ivory rounded-xl p-4 border border-gold/20"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-near-black text-sm truncate">{a.title}</p>
                  <p className="text-near-black/60 text-xs mt-1 line-clamp-2">{a.body}</p>
                  <p className="text-near-black/40 text-xs mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(a.date)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="हटाएं"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Juma Collection Tab ─────────────────────────────────────────────────────
function JumaCollectionTab() {
  const { data: collections, isLoading } = useGetJumaCollections();
  const addMutation = useAddJumaCollection();
  const deleteMutation = useDeleteJumaCollection();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(amount, 10);
    if (!amountNum || amountNum <= 0) {
      setFeedback({ type: 'error', msg: 'कृपया सही राशि दर्ज करें।' });
      return;
    }
    if (!description.trim()) {
      setFeedback({ type: 'error', msg: 'विवरण आवश्यक है।' });
      return;
    }
    if (!date) {
      setFeedback({ type: 'error', msg: 'तारीख आवश्यक है।' });
      return;
    }
    const dateTimestamp = BigInt(Math.floor(new Date(date).getTime() / 1000));
    try {
      await addMutation.mutateAsync({
        amount: BigInt(amountNum),
        description: description.trim(),
        date: dateTimestamp,
      });
      setAmount('');
      setDescription('');
      setDate('');
      setFeedback({ type: 'success', msg: 'जुमा रिकॉर्ड सफलतापूर्वक जोड़ा गया!' });
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback({ type: 'error', msg: 'रिकॉर्ड जोड़ने में त्रुटि हुई। पुनः प्रयास करें।' });
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      setFeedback({ type: 'success', msg: 'रिकॉर्ड हटा दिया गया।' });
      setTimeout(() => setFeedback(null), 3000);
    } catch {
      setFeedback({ type: 'error', msg: 'रिकॉर्ड हटाने में त्रुटि हुई।' });
    }
  };

  const totalAmount = collections
    ? collections.reduce((sum, c) => sum + Number(c.amount), 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Add form */}
      <div className="bg-champagne rounded-2xl p-6 border border-gold/20">
        <h3 className="font-bold text-near-black font-serif text-lg mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-orange" />
          नया जुमा रिकॉर्ड जोड़ें
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-near-black/75 mb-1">
                राशि (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="जैसे: 5000"
                min="1"
                className="w-full px-4 py-2.5 rounded-xl border border-gold/30 bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-near-black/75 mb-1">तारीख</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold/30 bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-near-black/75 mb-1">विवरण</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="जुमा का विवरण..."
              className="w-full px-4 py-2.5 rounded-xl border border-gold/30 bg-ivory text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-orange/40"
            />
          </div>
          {feedback && (
            <p className={`text-sm font-medium ${feedback.type === 'success' ? 'text-forest' : 'text-red-600'}`}>
              {feedback.msg}
            </p>
          )}
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange text-white font-semibold text-sm rounded-full hover:bg-orange/90 transition-colors disabled:opacity-50"
          >
            {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            रिकॉर्ड जोड़ें
          </button>
        </form>
      </div>

      {/* Total */}
      {!isLoading && collections && collections.length > 0 && (
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange/10 to-gold/10 rounded-xl px-5 py-3 border border-gold/20">
          <IndianRupee className="w-5 h-5 text-orange" />
          <span className="text-near-black/70 text-sm font-medium">कुल जुमा राशि:</span>
          <span className="text-orange font-bold text-base font-serif">
            {new Intl.NumberFormat('hi-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(totalAmount)}
          </span>
        </div>
      )}

      {/* List */}
      <div>
        <h3 className="font-bold text-near-black font-serif text-base mb-3">
          जुमा रिकॉर्ड ({collections?.length ?? 0})
        </h3>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-orange animate-spin" />
          </div>
        ) : !collections || collections.length === 0 ? (
          <p className="text-near-black/50 text-sm text-center py-8">कोई जुमा रिकॉर्ड नहीं है।</p>
        ) : (
          <div className="space-y-3">
            {collections.map((c) => (
              <div
                key={String(c.id)}
                className="flex items-start justify-between gap-4 bg-ivory rounded-xl p-4 border border-gold/20"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-orange text-base font-serif">
                      {formatAmount(c.amount)}
                    </span>
                  </div>
                  <p className="text-near-black/70 text-sm">{c.description}</p>
                  <p className="text-near-black/40 text-xs mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatJumaDate(c.date)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="हटाएं"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Contact Inquiries Tab ────────────────────────────────────────────────────
function ContactInquiriesTab() {
  const { data: inquiries, isLoading, isError } = useGetContactInquiries();

  function formatInquiryDate(timestamp: bigint): string {
    const ms = Number(timestamp / 1_000_000n);
    return new Date(ms).toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-near-black font-serif text-base">
          संपर्क संदेश ({inquiries?.length ?? 0})
        </h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-orange animate-spin" />
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <p className="text-red-500 text-sm">डेटा लोड करने में त्रुटि हुई।</p>
        </div>
      ) : !inquiries || inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-orange" />
          </div>
          <p className="text-near-black/50 text-sm">कोई संपर्क संदेश नहीं है।</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq, idx) => (
            <div
              key={idx}
              className="bg-ivory rounded-xl p-4 border border-gold/20 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange/15 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-near-black text-sm">{inq.name}</p>
                    <p className="text-near-black/50 text-xs flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {inq.email}
                    </p>
                  </div>
                </div>
                <p className="text-near-black/35 text-xs flex-shrink-0">
                  {formatInquiryDate(inq.submittedAt)}
                </p>
              </div>
              <p className="text-near-black/70 text-sm leading-relaxed pl-10">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────
export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  if (adminLoading) {
    return (
      <div className="fixed inset-0 z-[100] bg-near-black/60 flex items-center justify-center">
        <div className="bg-ivory rounded-2xl p-8 flex items-center gap-3">
          <Loader2 className="w-6 h-6 text-orange animate-spin" />
          <span className="text-near-black font-medium">लोड हो रहा है...</span>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-[100] bg-near-black/60 flex items-center justify-center">
        <div className="bg-ivory rounded-2xl p-8 max-w-sm w-full mx-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-near-black font-bold font-serif text-lg">अनुमति नहीं है</h2>
          <p className="text-near-black/60 text-sm">
            यह पैनल केवल एडमिन के लिए है।
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-orange text-white font-semibold text-sm rounded-full hover:bg-orange/90 transition-colors"
          >
            बंद करें
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-near-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-ivory w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-screen sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 bg-champagne flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-forest/15 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-forest" />
            </div>
            <div>
              <h2 className="font-bold text-near-black font-serif text-lg leading-tight">
                एडमिन पैनल
              </h2>
              <p className="text-near-black/50 text-xs">मस्जिद ए गौसिया वेलफेयर कमेटी</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-near-black/50 hover:text-near-black hover:bg-gold/20 rounded-lg transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="announcements" className="h-full">
            <div className="px-6 pt-4 pb-0 border-b border-gold/20 flex-shrink-0 bg-ivory sticky top-0 z-10">
              <TabsList className="w-full bg-champagne rounded-xl p-1 h-auto gap-1">
                <TabsTrigger
                  value="announcements"
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-white"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">घोषणाएं</span>
                  <span className="sm:hidden">घोषणा</span>
                </TabsTrigger>
                <TabsTrigger
                  value="juma"
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-white"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">जुमा कलेक्शन</span>
                  <span className="sm:hidden">जुमा</span>
                </TabsTrigger>
                <TabsTrigger
                  value="inquiries"
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm py-2 rounded-lg data-[state=active]:bg-orange data-[state=active]:text-white"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">संपर्क संदेश</span>
                  <span className="sm:hidden">संदेश</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 py-6">
              <TabsContent value="announcements" className="mt-0">
                <AnnouncementsTab />
              </TabsContent>
              <TabsContent value="juma" className="mt-0">
                <JumaCollectionTab />
              </TabsContent>
              <TabsContent value="inquiries" className="mt-0">
                <ContactInquiriesTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
