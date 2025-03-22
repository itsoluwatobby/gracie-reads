import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  content: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: "Sarah Johnson",
    content: "This audiobook was absolutely amazing! The narrator's voice really brought the story to life.",
    date: "2024-03-15"
  },
  {
    id: 2,
    user: "Michael Chen",
    content: "I loved how the different characters were portrayed. Great production quality!",
    date: "2024-03-14"
  }
];

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      user: "Current User",
      content: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="text-sky-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center"
          >
            <Send size={18} className="mr-2" />
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">{comment.user}</h3>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}