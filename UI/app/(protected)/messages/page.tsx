'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { messageService } from '@/services/messageService';
import { Conversation } from '@/types/message';
import { formatTimeAgo } from '@/lib/utils';
import { MessageSquare, ShieldCheck, CheckCheck, Trash2, ShieldAlert } from 'lucide-react';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await messageService.getConversations();
        setConversations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Conversations</h1>
          <p className="text-xs text-slate-500">Private, SignalR-encrypted real-time chat with matched members</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
          <MessageSquare className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900 text-lg">No Messages Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Once you connect mutually with a member on Discover, your conversation will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => (
            <Link key={conv.id} href={`/messages/${conv.id}`}>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={conv.participant.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                      alt={conv.participant.displayName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                    />
                    {conv.participant.onlineStatus === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{conv.participant.displayName}</h3>
                      {conv.participant.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    {conv.lastMessage && (
                      <p className="text-xs text-slate-500 mt-0.5 max-w-md truncate">
                        {conv.lastMessage.content}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400">
                    {formatTimeAgo(conv.lastMessage?.createdAt)}
                  </span>
                  {conv.unreadCount > 0 && (
                    <span className="block mt-1 ml-auto text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full w-fit">
                      {conv.unreadCount} new
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
