import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, type Chat } from "@google/genai";
import { systemInstruction } from '../constants';
import type { Message } from '../types';
import { CloseIcon, AiIcon, UserIcon, SendIcon } from './Icons';

interface ChatWidgetProps {
  isVisible: boolean;
  onClose: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5">
        <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce"></span>
        <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.16s]"></span>
        <span className="w-2 h-2 rounded-full bg-text-secondary animate-bounce [animation-delay:-0.32s]"></span>
    </div>
);

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isVisible, onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && !chat) {
      const initChat = async () => {
        try {
          if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
          }
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const newChat = ai.chats.create({
            model: "gemini-2.5-flash",
            config: { systemInstruction },
          });
          setChat(newChat);
          setMessages([
            {
              role: "model",
              text: "Olá! Sou o assistente virtual do Dr. Gustavo. Como posso te ajudar com agendamentos, especialidades ou sobre o método de trabalho?",
            },
          ]);
        } catch (error) {
          console.error("Failed to initialize AI Chat:", error);
          setMessages([
            {
              role: "model",
              text: "Desculpe, meu sistema está temporariamente indisponível. Por favor, tente novamente mais tarde.",
            },
          ]);
        }
      };
      initChat();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const stream = await chat.sendMessageStream({ message: inputValue });
      let modelResponse = "";
      let firstChunk = true;

      for await (const chunk of stream) {
        if (firstChunk) {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "model", text: "" }]);
          firstChunk = false;
        }
        modelResponse += chunk.text;
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-28 right-8 w-[90%] max-w-md h-[70vh] max-h-[600px] bg-glass-bg/80 border border-glass-border-darker rounded-2xl shadow-glass z-[999] flex flex-col overflow-hidden transition-all duration-300 ease-in-out sm:w-full backdrop-blur-2xl ${
        isVisible ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-5 scale-95'
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-glass-border-darker shadow-glass-inset">
        <h3 className="font-heading text-lg font-semibold text-text-primary">Assistente Virtual</h3>
        <button onClick={onClose} aria-label="Fechar chat" className="text-text-secondary hover:text-text-primary">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-5">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border shadow-glass-inset backdrop-blur-lg ${msg.role === 'model' ? 'bg-white/60 border-glass-border-darker text-primary-accent' : 'bg-primary-accent/20 border-primary-accent/30 text-primary-accent'}`}>
              {msg.role === 'model' ? <AiIcon /> : <UserIcon />}
            </div>
            <div className={`px-4 py-3 rounded-[1.25rem] transition-all duration-300 ${msg.role === 'user' ? 'bg-gradient-to-br from-primary-accent to-primary-accent-hover text-white rounded-br-lg' : 'bg-glass-bg/90 text-text-primary rounded-bl-lg shadow-subtle border border-glass-border-darker backdrop-blur-sm'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-3 max-w-[85%] mr-auto">
             <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border shadow-glass-inset backdrop-blur-lg bg-white/60 border-glass-border-darker text-primary-accent">
               <AiIcon />
            </div>
             <div className="px-4 py-3 bg-white/70 border border-black/5 rounded-2xl rounded-bl-md shadow-subtle">
                <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="flex-shrink-0 p-4 border-t border-glass-border-darker flex items-center gap-2 shadow-glass-inset" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite sua mensagem..."
          aria-label="Digite sua mensagem"
          disabled={isLoading}
          className="flex-grow w-full border border-glass-border-darker rounded-lg py-2.5 px-4 text-base font-body focus:outline-none focus:ring-2 focus:ring-primary-accent/50 focus:border-primary-accent bg-white/50 text-text-primary placeholder:text-text-secondary"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          aria-label="Enviar mensagem"
          className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-accent text-white flex items-center justify-center transition-all duration-200 hover:bg-primary-accent-hover disabled:bg-primary-accent/50 disabled:cursor-not-allowed hover:shadow-glow"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};