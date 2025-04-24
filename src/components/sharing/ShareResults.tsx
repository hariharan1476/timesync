import React, { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';
import { useMeeting } from '../../context/MeetingContext';
import Button from '../ui/Button';

const ShareResults: React.FC = () => {
  const { meeting } = useMeeting();
  const [copied, setCopied] = useState(false);
  
  // Only show if we have suggested times
  if (meeting.suggestedTimes.length === 0) {
    return null;
  }

  const shareUrl = `${window.location.origin}/share/${meeting.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy', err);
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `TimeSync: ${meeting.title}`,
          text: 'Check out these suggested meeting times',
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm animate-slide-up">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Share These Results
      </h3>

      <div className="flex flex-col space-y-4">
        <div className="flex">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-l-md text-sm text-gray-800 dark:text-gray-200"
          />
          <Button
            onClick={handleCopyLink}
            variant="primary"
            className="rounded-l-none"
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        <Button
          onClick={handleShare}
          variant="outline"
          icon={<Share2 className="h-4 w-4" />}
          className="w-full"
        >
          {navigator.share ? 'Share' : 'Copy Link'}
        </Button>
      </div>
    </div>
  );
};

export default ShareResults;