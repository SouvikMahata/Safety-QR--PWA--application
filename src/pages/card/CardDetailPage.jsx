// src/pages/card/CardDetailPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCards } from '../hooks/useCards';
import { useConfirm } from '../hooks/useConfirm';
import { ROUTES } from '../utils/constants';
import { formatCardNumber, formatDateTime } from '../utils/formatters';
import { notificationService } from '../services/notificationService';

import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import QrCodeDisplay from '../components/card/QrCodeDisplay';

const Row = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-slate-800 last:border-0 items-center">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm text-slate-200 font-medium">{value}</span>
  </div>
);

const CardDetailPage = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const confirm = useConfirm();

  const { getCardById, fetchCards, setCardStatus, setCardBlocked, unlinkCard, actionLoading, loading } = useCards();
  const card = getCardById(cardId);

  useEffect(() => { if (!card) fetchCards(); }, []);

  const isLoading = actionLoading[cardId];
  const isBlocked = card?.blocked;
  const isActive = card?.status === 'active';

  const handleUnlink = async () => {
    const ok = await confirm({
      title: 'Unlink Card?',
      message: 'The QR code will stop working immediately. This cannot be undone.',
    });
    if (!ok) return;
    const res = await unlinkCard(cardId);
    if (res.success) {
      notificationService.success('Card unlinked');
      navigate(ROUTES.CARDS, { replace: true });
    } else {
      notificationService.error(res.error || 'Failed to unlink');
    }
  };

  if (loading && !card) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-7 h-7 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!card) return null;

  return (
    <div>
      <PageHeader title="Card Detail" backTo={ROUTES.CARDS} />

      <div className="px-4 flex flex-col gap-4 pb-8">
        {/* QR Code */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex justify-center">
          <QrCodeDisplay cardId={cardId} size={180} blocked={isBlocked} inactive={!isActive} />
        </div>

        {/* Card info */}
        <Card>
          <Row label="Card Number" value={<span className="font-mono">{formatCardNumber(card.card_number)}</span>} />
          <Row label="Student" value={card.student_name || '—'} />
          <Row label="Linked on" value={formatDateTime(card.created_at)} />
          <Row
            label="Status"
            value={
              <div className="flex gap-2">
                {isBlocked && <Badge label="Blocked" variant="blocked" />}
                <Badge label={isActive ? 'Active' : 'Inactive'} variant={isActive ? 'active' : 'inactive'} />
              </div>
            }
          />
        </Card>

        {/* Controls */}
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">Card Active</p>
                <p className="text-xs text-slate-500">QR scan will {isActive ? 'show' : 'hide'} emergency profile</p>
              </div>
              <Toggle
                checked={isActive}
                onChange={() => setCardStatus(cardId, isActive ? 'inactive' : 'active')}
                disabled={isBlocked || isLoading}
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-700 pt-4">
              <div>
                <p className="text-sm font-semibold text-slate-200">Block Card</p>
                <p className="text-xs text-slate-500">Emergency deny access completely</p>
              </div>
              <Toggle
                checked={!!isBlocked}
                onChange={() => setCardBlocked(cardId, !isBlocked)}
                disabled={isLoading}
              />
            </div>
          </div>
        </Card>

        {/* Danger */}
        <div className="pt-2 border-t border-slate-800">
          <Button variant="danger" size="sm" fullWidth onClick={handleUnlink}>
            🗑 Unlink Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailPage;