'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { messageService } from '@/services/messageService';
import { signalRService } from '@/services/signalRService';
import { reportService } from '@/services/reportService';
import { Message, Conversation } from '@/types/message';
import { Button } from '@/components/ui/Button';
import { ReportModal } from '@/components/safety/ReportModal';
import { formatTimeAgo } from '@/lib/utils';
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  ShieldCheck,
  Flag,
  UserX,
  Trash2,
  CheckCheck,
} from 'lucide-react';

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.conversationId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initChat() {
      try {
        const history = await messageService.getMessages(conversationId);
        setMessages(history);

        // Start SignalR
        await signalRService.startConnection();
        const unsubMsg = signalRService.onReceiveMessage((newMsg) => {
          if (newMsg.conversationId === conversationId) {
            setMessages((prev) => [...prev, newMsg]);
          }
        });

        const unsubTyping = signalRService.onTyping((notif) => {
          if (notif.conversationId === conversationId) {
            setIsTyping(notif.isTyping);
          }
        });

        return () => {
          unsubMsg();
          unsubTyping();
        };
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    initChat();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !imageUrl) return;

    const newMsg = await messageService.sendMessage(conversationId, inputText, imageUrl || undefined);
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setImageUrl('');
  };

  const handleBlockUser = async () => {
    if (confirm('Are you sure you want to block this member? You will no longer receive messages.')) {
      await reportService.blockUser('user_1');
      router.push('/messages');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 mb-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/messages" className="p-2 text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Elena Vance"
            className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-slate-900">Elena Vance</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">● Online</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportOpen(true)}
            title="Report"
            className="p-2 text-slate-400 hover:text-amber-600 transition"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button
            onClick={handleBlockUser}
            title="Block member"
            className="p-2 text-slate-400 hover:text-red-600 transition"
          >
            <UserX className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Thread Box */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 p-6 overflow-y-auto max-h-[500px] space-y-4 shadow-inner">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-6 w-6 border-2 border-slate-900 border-t-transparent rounded-full" />
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === 'user_123';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/60'
                  }`}
                >
                  {msg.imageUrl && (
                    <img src={msg.imageUrl} alt="Uploaded attachment" className="rounded-xl mb-2 max-h-48 w-full object-cover" />
                  )}
                  <p>{msg.content}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                  <span>{formatTimeAgo(msg.createdAt)}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <span>Elena is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Controls */}
      <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          />
        </div>

        <Button type="submit" size="md" className="bg-slate-900 text-white font-bold rounded-2xl px-5 py-3">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        contentType="Message"
        targetId={conversationId}
        targetName="Elena Vance"
      />
    </div>
  );
}
