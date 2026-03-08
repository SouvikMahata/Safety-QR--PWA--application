// src/components/card/QrCodeDisplay.jsx
import { QRCodeSVG } from 'qrcode.react';
import { ENV } from '@utils/env';

/**
 * Renders QR code for a card.
 * @param {{ cardId: string, size?: number, blocked?: boolean, inactive?: boolean }} props
 */
const QrCodeDisplay = ({ cardId, size = 200, blocked = false, inactive = false }) => {
  const url = `${ENV.QR_BASE_URL}/e/${cardId}`;
  const disabled = blocked || inactive;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={[
        'bg-white p-4 rounded-2xl transition-opacity',
        disabled ? 'opacity-30 grayscale' : '',
      ].join(' ')}>
        <QRCodeSVG
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#0f172a"
          level="H"
          includeMargin={false}
        />
      </div>
      {disabled && (
        <p className="text-xs text-rose-400 font-semibold">
          {blocked ? '🔒 Card is blocked' : '⏸ Card is inactive'}
        </p>
      )}
      {!disabled && (
        <p className="text-xs text-slate-500 text-center">
          Scan to view emergency profile
        </p>
      )}
    </div>
  );
};

export default QrCodeDisplay;