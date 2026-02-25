import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User } from 'lucide-react';
import { useSaveCallerUserProfile } from '../hooks/useAuthQueries';

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('कृपया अपना नाम दर्ज करें');
      return;
    }
    setError('');
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
    } catch {
      setError('प्रोफाइल सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।');
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-ivory border-gold/30" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <User className="w-8 h-8 text-gold" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-near-black font-serif">
            स्वागत है!
          </DialogTitle>
          <DialogDescription className="text-near-black/70">
            मस्जिद ए गौसिया वेलफेयर कमेटी में आपका स्वागत है। कृपया अपना नाम दर्ज करें।
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-near-black font-medium">
              आपका नाम
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="अपना पूरा नाम लिखें"
              className="border-gold/40 focus:border-gold bg-white"
              disabled={saveProfile.isPending}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={saveProfile.isPending || !name.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gold text-near-black font-semibold rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                सहेज रहे हैं...
              </>
            ) : (
              'जारी रखें'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
