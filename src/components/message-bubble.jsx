"use client";

import { User, Bot, AlertCircle } from "lucide-react";

export function MessageBubble({ message, isUser, isError = false }) {
  return (
    <div
      className={`flex gap-3 w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isError ? "bg-gray-400" : "bg-black"}`}
        >
          {isError ? (
            <AlertCircle className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-black text-white rounded-br-md"
            : isError
            ? "bg-gray-50 text-gray-600 rounded-bl-md border border-gray-300"
            : "bg-gray-100 text-black rounded-bl-md border border-gray-200"
        }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>

      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
}
