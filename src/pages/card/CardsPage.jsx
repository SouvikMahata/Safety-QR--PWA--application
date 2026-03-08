// src/pages/card/CardsPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '../hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';

import { linkCardSchema } from '../validations/schemas';
import { useCards } from '../hooks/useCards';
import { useProfile } from '../hooks/useProfile';
import { ROUTES } from '../utils/constants';
import { notificationService } from '../services/notificationService';

import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import CardTile from '../components/card/CardTile';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const CardsPage = () => {
  const navigate = useNavigate();
  const [showLinkForm, setShowLinkForm] = useState(false);

  const { cards, loading, actionLoading, fetchCards, linkCard, setCardStatus, setCardBlocked } = useCards();
  const { students, fetchStudents } = useProfile();

  useEffect(() => {
    fetchCards();
    fetchStudents();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(linkCardSchema),
    defaultValues: { card_number: '', nonce: '', student_id: '' },
  });

  const onLinkSubmit = async (data) => {
    const result = await linkCard(data);
    if (result.success) {
      notificationService.success('Card linked successfully 💳');
      reset();
      setShowLinkForm(false);
    } else {
      notificationService.error(result.error || 'Failed to link card');
    }
  };

  const studentOptions = students.map((s) => ({ value: s.id, label: s.name }));

  return (
    <div>
      <PageHeader
        title="My Cards"
        subtitle={`${cards.length} card${cards.length !== 1 ? 's' : ''}`}
        action={
          <Button size="sm" onClick={() => setShowLinkForm((v) => !v)}>
            {showLinkForm ? 'Cancel' : '+ Link Card'}
          </Button>
        }
      />

      <div className="px-4 flex flex-col gap-4 pb-8">
        {/* Link card form */}
        <AnimatePresence>
          {showLinkForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleSubmit(onLinkSubmit)}
                className="bg-slate-800 rounded-2xl border border-slate-700 p-4 flex flex-col gap-3"
              >
                <h3 className="font-bold text-slate-200 text-sm">Link Physical Card</h3>
                <Input
                  label="Card Number" placeholder="SQRA-1234-5678"
                  autoCapitalize="characters"
                  error={errors.card_number?.message} required
                  {../.register('card_number')}
                />
                <Input
                  label="Nonce (Scratch Code)" type="password"
                  placeholder="Scratch &amp; enter code"
                  error={errors.nonce?.message} required
                  {../.register('nonce')}
                />
                <Select
                  label="Assign to Student" options={studentOptions}
                  placeholder="Select student"
                  error={errors.student_id?.message} required
                  {../.register('student_id')}
                />
                <Button type="submit" fullWidth loading={loading}>Link Card</Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card list */}
        {loading && cards.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="w-7 h-7 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          <EmptyState
            icon="💳"
            title="No cards linked"
            description="Link your physical SafetyQR card to get started"
            actionLabel="Link a Card"
            onAction={() => setShowLinkForm(true)}
          />
        ) : (
          cards.map((card) => (
            <CardTile
              key={card.id}
              card={card}
              actionLoading={actionLoading[card.id]}
              onPress={() => navigate(ROUTES.CARD_DETAIL.replace(':cardId', card.id))}
              onToggleStatus={(id, status) => setCardStatus(id, status)}
              onToggleBlock={(id, blocked) => setCardBlocked(id, blocked)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CardsPage;