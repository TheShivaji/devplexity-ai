import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, RotateCw, CheckCircle2, XCircle, Trophy } from 'lucide-react';

const InlineStudyContent = ({ studyData, messageId }) => {
  const [flippedCards, setFlippedCards] = useState(() => {
    try {
      const saved = localStorage.getItem(`study_flipped_${messageId}`);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {};
  });

  const [quizAnswers, setQuizAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`study_quiz_${messageId}`);
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return {};
  });

  useEffect(() => {
    if (messageId) {
      localStorage.setItem(`study_flipped_${messageId}`, JSON.stringify(flippedCards));
    }
  }, [flippedCards, messageId]);

  useEffect(() => {
    if (messageId) {
      localStorage.setItem(`study_quiz_${messageId}`, JSON.stringify(quizAnswers));
    }
  }, [quizAnswers, messageId]);

  if (!studyData) return null;

  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* Flashcards Section */}
      {studyData.flashcards && studyData.flashcards.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              Flashcards — {studyData.topic || 'Topic'}
            </h3>
            <span className="text-[11px] text-zinc-500">Click card to flip</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {studyData.flashcards.map((card, i) => {
              const isFlipped = !!flippedCards[i];
              return (
                <div
                  key={i}
                  onClick={() => setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="group cursor-pointer perspective-1000 min-h-[140px] focus:outline-none rounded-2xl"
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }));
                    }
                  }}
                >
                  <div
                    className={`
                      relative w-full h-full min-h-[140px] rounded-2xl p-5
                      border transition-all duration-300 ease-in-out transform-style-3d
                      flex flex-col justify-between
                      ${isFlipped
                        ? 'rotate-y-180 bg-[#16161c] border-white/20'
                        : 'bg-[#121216] border-white/[0.08] hover:border-white/20 hover:bg-[#16161b]'
                      }
                    `}
                  >
                    {/* Front (Question) */}
                    <div className={`backface-hidden flex flex-col justify-between h-full ${isFlipped ? 'hidden' : 'block'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest bg-white/[0.06] px-2 py-0.5 rounded">
                            Question #{i + 1}
                          </span>
                          <RotateCw className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-[13.5px] font-medium text-zinc-100 leading-relaxed">
                          {card.question}
                        </p>
                      </div>
                      <span className="text-[11px] text-zinc-500 mt-3 block">Tap card to see answer</span>
                    </div>

                    {/* Back (Answer) */}
                    <div className={`backface-hidden rotate-y-180 flex flex-col justify-between h-full ${isFlipped ? 'block' : 'hidden'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded">
                            Answer
                          </span>
                          <RotateCw className="w-3.5 h-3.5 text-zinc-500" />
                        </div>
                        <p className="text-[13.5px] text-zinc-100 leading-relaxed">
                          {card.answer}
                        </p>
                      </div>
                      <span className="text-[11px] text-zinc-500 mt-3 block">Tap card to flip back</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {studyData.quiz && studyData.quiz.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
            Knowledge Check Quiz
          </h3>

          <div className="flex flex-col gap-4">
            {studyData.quiz.map((q, qi) => {
              const answered = quizAnswers[qi] !== undefined;
              return (
                <div
                  key={qi}
                  className="p-5 rounded-2xl bg-[#121216] border border-white/[0.08] flex flex-col gap-3.5"
                >
                  <p className="text-[14px] font-medium text-zinc-100 leading-relaxed">
                    {qi + 1}. {q.question}
                  </p>

                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, oi) => {
                      const selected = quizAnswers[qi] === oi;
                      const isCorrect = oi === q.correct;

                      let optionStyle = 'bg-[#16161b] border-white/[0.06] text-zinc-300 hover:bg-[#1c1c22] hover:text-white hover:border-white/15';

                      if (answered) {
                        if (selected && isCorrect) {
                          optionStyle = 'bg-green-500/10 border-green-500/40 text-green-300 font-medium';
                        } else if (selected && !isCorrect) {
                          optionStyle = 'bg-red-500/10 border-red-500/40 text-red-300 font-medium';
                        } else if (isCorrect) {
                          optionStyle = 'bg-green-500/[0.06] border-green-500/25 text-green-400/80';
                        } else {
                          optionStyle = 'bg-[#0b0b0e] border-white/[0.04] text-zinc-600';
                        }
                      }

                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={answered}
                          onClick={() => setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))}
                          className={`
                            flex items-center justify-between text-left px-4 py-2.5 rounded-xl border
                            text-[13px] transition-all duration-150 cursor-pointer disabled:cursor-default
                            ${optionStyle}
                          `}
                        >
                          <span>{opt}</span>
                          {answered && selected && isCorrect && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
                          {answered && selected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score Banner */}
          {Object.keys(quizAnswers).length === studyData.quiz.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-center flex flex-col items-center gap-1.5 mt-2"
            >
              <Trophy className="w-6 h-6 text-blue-400 mb-1" />
              <p className="font-display text-[16px] font-bold text-white">
                Score: {studyData.quiz.filter((q, i) => quizAnswers[i] === q.correct).length} / {studyData.quiz.length}
              </p>
              <p className="text-[12.5px] text-zinc-400">
                {studyData.quiz.filter((q, i) => quizAnswers[i] === q.correct).length === studyData.quiz.length
                  ? '🎉 Perfect score! Excellent mastery.'
                  : 'Keep practicing key concepts!'}
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineStudyContent;
