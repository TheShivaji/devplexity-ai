import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles } from 'lucide-react';
import EmptyStateHero from './EmptyStateHero';
import ChatComposer from './ChatComposer';
import SearchIndicator from './SearchIndicator';
import InlineStudyContent from './InlineStudyContent';

const tryParseStudyData = (content) => {
  try {
    const cleaned = content.replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleaned);
    if (data && typeof data === 'object' && (data.topic || data.flashcards || data.quiz)) {
      return data;
    }
  } catch (e) {
    return null;
  }
  return null;
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 py-2 px-1">
    {[0, 150, 300].map((delay) => (
      <span
        key={delay}
        className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);

const AIAvatar = () => (
  <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-200 shrink-0 mt-1">
    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
  </div>
);

const ChatWindow = ({
  currentChatId,
  chats,
  isLoading,
  messagesEndRef,
  chatInput,
  setChatInput,
  handleSubmitMessage,
  searchEnable,
  setSearchEnable,
  studyEnable,
  setStudyEnable
}) => {
  const currentMessages = currentChatId ? chats[currentChatId]?.messages || [] : [];
  const showEmptyState = !currentChatId || currentMessages.length === 0;

  const handleSelectSuggestion = (promptText) => {
    setChatInput(promptText);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative bg-[#050507]">
      {/* Scrollable Conversation Stream */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/[0.04] flex flex-col">
        {showEmptyState ? (
          <EmptyStateHero onSelectPrompt={handleSelectSuggestion} />
        ) : (
          <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
            {currentMessages.map((message) => {
              const studyData = message.role === 'assistant' ? tryParseStudyData(message.content) : null;

              return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start gap-3.5'}`}
              >
                {message.role === 'assistant' && <AIAvatar />}

                <div
                  className={`
                    ${message.role === 'user'
                      ? 'max-w-[85%] sm:max-w-[78%] px-4 py-3 bg-[#121216] border border-white/[0.06] rounded-2xl rounded-tr-xs text-[13.5px] text-zinc-100 shadow-xs'
                      : 'flex-1 min-w-0 text-[14.5px] text-zinc-200 leading-relaxed font-sans'
                    }
                  `}
                >
                  {message.role === 'user' ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  ) : studyData ? (
                    <InlineStudyContent studyData={studyData} messageId={message.id} />
                  ) : (
                    <div className="prose prose-invert max-w-none text-zinc-200">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-zinc-300">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-zinc-300">{children}</ol>,
                          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                          code: ({ inline, children }) =>
                            inline ? (
                              <code className="bg-white/[0.08] px-1.5 py-0.5 rounded text-[12.5px] font-mono text-zinc-200 border border-white/[0.06]">
                                {children}
                              </code>
                            ) : (
                              <code className="text-[12.5px] font-mono leading-relaxed">{children}</code>
                            ),
                          pre: ({ children }) => (
                            <div className="my-4 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0f]">
                              <div className="px-4 py-2 bg-[#121216] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                                <span>Code Snippet</span>
                              </div>
                              <pre className="p-4 overflow-x-auto text-[12.5px] font-mono leading-relaxed text-zinc-200">
                                {children}
                              </pre>
                            </div>
                          ),
                          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                          h1: ({ children }) => <h1 className="font-display text-lg sm:text-xl font-bold text-white mb-3 mt-5">{children}</h1>,
                          h2: ({ children }) => <h2 className="font-display text-base sm:text-lg font-semibold text-white mb-2.5 mt-4">{children}</h2>,
                          h3: ({ children }) => <h3 className="font-display text-[15px] font-semibold text-zinc-100 mb-2 mt-3">{children}</h3>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-zinc-500 pl-4 text-zinc-400 italic my-4 py-0.5">
                              {children}
                            </blockquote>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white underline underline-offset-3 hover:text-blue-300 transition-colors"
                            >
                              {children}
                            </a>
                          ),
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-4 border border-white/[0.08] rounded-xl">
                              <table className="w-full text-left text-[13px] border-collapse">{children}</table>
                            </div>
                          ),
                          th: ({ children }) => <th className="bg-[#121216] px-3.5 py-2.5 border-b border-white/[0.08] font-semibold text-zinc-200">{children}</th>,
                          td: ({ children }) => <td className="px-3.5 py-2.5 border-b border-white/[0.04] text-zinc-300">{children}</td>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            )})}

            {/* Loading / Search Status */}
            {isLoading && (
              <div className="flex flex-col gap-1 items-start">
                {searchEnable && <SearchIndicator />}
                <div className="flex items-center gap-3">
                  <AIAvatar />
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Multiline Anchored Composer */}
      <ChatComposer
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSubmitMessage={handleSubmitMessage}
        isLoading={isLoading}
        searchEnable={searchEnable}
        setSearchEnable={setSearchEnable}
        studyEnable={studyEnable}
        setStudyEnable={setStudyEnable}
      />
    </div>
  );
};

export default ChatWindow;