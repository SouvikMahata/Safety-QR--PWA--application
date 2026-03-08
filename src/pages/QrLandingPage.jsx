// src/pages/QrLandingPage.jsx
// Public emergency profile — no auth required
// Accessed when first responder scans QR code on card

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { publicApi }   from '@api/publicApi';
import { formatDate, calcAge, formatPhone } from '@utils/formatters';

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">{title}</p>
    {children}
  </div>
);

const Row = ({ label, value, highlight }) => (
  <div className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-500">{label}</span>
    <span className={`text-sm font-semibold ${highlight ? 'text-red-600' : 'text-slate-800'}`}>
      {value || '—'}
    </span>
  </div>
);

const QrLandingPage = () => {
  const { cardId }                    = useParams();
  const [profile, setProfile]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error,   setError]           = useState(null);

  useEffect(() => {
    publicApi.getEmergencyProfile(cardId)
      .then((res) => setProfile(res.data))
      .catch((err) => setError(err.message || 'Profile not found or card is inactive'))
      .finally(() => setLoading(false));
  }, [cardId]);

  if (loading) return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-[3px] border-slate-200 border-t-red-500 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-dvh bg-slate-50 flex flex-col items-center justify-center p-6 gap-4">
      <span className="text-5xl">🔒</span>
      <h1 className="text-xl font-bold text-slate-700">Card Not Available</h1>
      <p className="text-sm text-slate-500 text-center">{error}</p>
    </div>
  );

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Emergency header */}
      <div className="bg-red-600 text-white px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
            🆘 Emergency Profile
          </p>
          <h1 className="text-2xl font-black">{profile.name}</h1>
          <p className="text-sm opacity-80 mt-0.5">
            {profile.class} · {profile.school_name}
          </p>
        </motion.div>
      </div>

      <div className="p-4">
        {/* Critical info */}
        <Section title="Critical Medical Info">
          <Row label="Blood Group"  value={profile.blood_group}          highlight />
          <Row label="Age"          value={calcAge(profile.dob)} />
          <Row label="Date of Birth" value={formatDate(profile.dob)} />
          <Row label="Allergies"    value={profile.allergies || 'None'}    highlight={!!profile.allergies} />
          <Row label="Medical Conditions" value={profile.medical_conditions || 'None'} highlight={!!profile.medical_conditions} />
        </Section>

        {/* Emergency contacts */}
        <Section title="Emergency Contacts">
          {profile.emergency_contacts?.map((c, i) => (
            <div key={i} className="py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.relation}</p>
                </div>
                <a
                  href={`tel:${c.mobile}`}
                  className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </Section>

        <p className="text-center text-xs text-slate-400 mt-4">
          SafetyQR Emergency Profile · For medical use only
        </p>
      </div>
    </div>
  );
};

export default QrLandingPage;