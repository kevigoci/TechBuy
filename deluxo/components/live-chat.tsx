"use client"

import { useState } from "react"
import { MessageCircle, X, Send, User } from "lucide-react"

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // Redirect to Discord for live chat
      window.open("https://discord.gg/j2AaVSpkad", "_blank")
      setMessage("")
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Deluxo Support</h3>
                <p className="text-green-400 text-xs">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white/5 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">Hi! Welcome to Deluxo Marketplace. How can I help you today?</p>
                  <p className="text-xs text-gray-400 mt-1">Just now</p>
                </div>
              </div>

              <div className="bg-purple-600/20 rounded-lg p-3 text-center">
                <p className="text-purple-400 text-sm font-medium mb-2">🚀 Get Instant Support</p>
                <p className="text-gray-300 text-xs mb-3">
                  Join our Discord server for immediate assistance from our support team!
                </p>
                <button
                  onClick={() => window.open("https://discord.gg/j2AaVSpkad", "_blank")}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Join Discord
                </button>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Click send to continue in Discord</p>
          </div>
        </div>
      )}
    </>
  )
}
