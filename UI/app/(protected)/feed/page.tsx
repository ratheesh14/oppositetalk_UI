'use client';

import React, { useEffect, useState } from 'react';
import { postService } from '@/services/postService';
import { Post } from '@/types/feed';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ReportModal } from '@/components/safety/ReportModal';
import { formatTimeAgo } from '@/lib/utils';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  Flag,
  Send,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        const data = await postService.getFeedPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeed();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const created = await postService.createPost(newPostContent);
    setPosts([created, ...posts]);
    setNewPostContent('');
  };

  const handleToggleLike = async (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return { ...p, isLiked, likesCount: p.likesCount + (isLiked ? 1 : -1) };
        }
        return p;
      })
    );
    await postService.toggleLikePost(postId);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Community Feed</h1>
          <p className="text-xs text-slate-500">Thoughtful insights on relationships, family vision, & career growth</p>
        </div>
      </div>

      {/* Post Composer Card */}
      <form onSubmit={handleCreatePost} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs mb-8">
        <textarea
          rows={3}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share a perspective on family values, financial readiness, or lifestyle..."
          className="w-full rounded-2xl border border-slate-200 p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none bg-slate-50"
        />

        <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400">Respectful community discourse</span>
          <Button type="submit" size="sm" className="bg-slate-900 text-white font-bold">
            <Plus className="w-3.5 h-3.5 mr-1" /> Post Perspective
          </Button>
        </div>
      </form>

      {/* Feed List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-slate-900 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-slate-900">{post.authorName}</h3>
                      {post.authorVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    {post.communityName && (
                      <span className="text-[11px] text-slate-500 font-medium">in {post.communityName}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{formatTimeAgo(post.createdAt)}</span>
                  <button
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setReportModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-600 transition"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">{post.content}</p>

              {/* Feed Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-500 text-xs font-semibold">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition ${
                    post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likesCount}</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-slate-900 transition">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-slate-900 transition">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-slate-900 transition">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPostId && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          contentType="Post"
          targetId={selectedPostId}
        />
      )}
    </div>
  );
}
