"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile } from "lucide-react"
import Link from "next/link"

const dummyNGOs = [
  {
    id: 1,
    name: "Green Forest Foundation",
    regId: "NGO/2023/001",
    status: "online",
    lastMessage: "Thank you for the update on the CFR claims",
    lastSeen: "2 min ago",
    unreadCount: 2,
    workingAreas: ["Odisha", "Madhya Pradesh"],
  },
  {
    id: 2,
    name: "Tribal Rights Collective",
    regId: "NGO/2023/002",
    status: "offline",
    lastMessage: "We need clarification on the new guidelines",
    lastSeen: "1 hour ago",
    unreadCount: 0,
    workingAreas: ["Telangana", "Tripura"],
  },
  {
    id: 3,
    name: "Forest Community Alliance",
    regId: "NGO/2023/003",
    status: "online",
    lastMessage: "The documentation has been submitted",
    lastSeen: "5 min ago",
    unreadCount: 1,
    workingAreas: ["Odisha"],
  },
  {
    id: 4,
    name: "Adivasi Welfare Society",
    regId: "NGO/2023/004",
    status: "away",
    lastMessage: "Can we schedule a meeting for next week?",
    lastSeen: "30 min ago",
    unreadCount: 0,
    workingAreas: ["Madhya Pradesh"],
  },
  {
    id: 5,
    name: "Rural Development Trust",
    regId: "NGO/2023/005",
    status: "online",
    lastMessage: "The field survey report is ready",
    lastSeen: "Just now",
    unreadCount: 3,
    workingAreas: ["Telangana", "Odisha"],
  },
  {
    id: 6,
    name: "Indigenous Rights Forum",
    regId: "NGO/2023/006",
    status: "offline",
    lastMessage: "Please review the submitted claims",
    lastSeen: "2 hours ago",
    unreadCount: 0,
    workingAreas: ["Tripura"],
  },
  {
    id: 7,
    name: "Community Forest Network",
    regId: "NGO/2023/007",
    status: "online",
    lastMessage: "The training session was very helpful",
    lastSeen: "10 min ago",
    unreadCount: 1,
    workingAreas: ["Madhya Pradesh", "Odisha"],
  },
]

const conversationData = {
  1: [
    // Green Forest Foundation
    {
      id: 1,
      sender: "ngo",
      message: "Hello, we have completed the field survey for the CFR claims in Rayagada district.",
      timestamp: "10:30 AM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "Thank you for the update. Can you please share the detailed report?",
      timestamp: "10:35 AM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "Sure, I'll upload the report to the system by end of day.",
      timestamp: "10:37 AM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Perfect. Also, please coordinate with the local forest department for the verification process.",
      timestamp: "10:40 AM",
      delivered: true,
      read: false,
    },
  ],
  2: [
    // Tribal Rights Collective
    {
      id: 1,
      sender: "ngo",
      message: "We need clarification on the new FRA guidelines released last month.",
      timestamp: "9:15 AM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "I'll send you the detailed guidelines document. Which specific section needs clarification?",
      timestamp: "9:20 AM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "Mainly the community rights verification process and documentation requirements.",
      timestamp: "9:25 AM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Got it. I'll schedule a video call tomorrow to discuss this in detail.",
      timestamp: "9:30 AM",
      delivered: true,
      read: false,
    },
  ],
  3: [
    // Forest Community Alliance
    {
      id: 1,
      sender: "ngo",
      message: "The documentation for 15 CFR claims has been submitted through the portal.",
      timestamp: "2:10 PM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "Excellent work! I can see all submissions. The review process will take 3-5 days.",
      timestamp: "2:15 PM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "Thank you. Should we expect any field verification visits?",
      timestamp: "2:18 PM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Yes, our team will visit next week. I'll share the schedule soon.",
      timestamp: "2:20 PM",
      delivered: true,
      read: false,
    },
  ],
  4: [
    // Adivasi Welfare Society
    {
      id: 1,
      sender: "ngo",
      message: "Can we schedule a meeting to discuss the upcoming training program for tribal communities?",
      timestamp: "11:00 AM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "How about next Tuesday at 2 PM? We can meet at the district office.",
      timestamp: "11:05 AM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "That works perfectly. Should I bring the training materials draft?",
      timestamp: "11:10 AM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Yes, please. Also bring the list of participating villages.",
      timestamp: "11:15 AM",
      delivered: true,
      read: false,
    },
  ],
  5: [
    // Rural Development Trust
    {
      id: 1,
      sender: "ngo",
      message: "The comprehensive field survey report for Telangana region is ready for review.",
      timestamp: "3:45 PM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "Great timing! How many claims were surveyed in total?",
      timestamp: "3:50 PM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "We covered 127 individual claims and 23 community claims across 8 villages.",
      timestamp: "3:55 PM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Impressive coverage! Please upload the report and I'll prioritize the review.",
      timestamp: "4:00 PM",
      delivered: true,
      read: false,
    },
  ],
  6: [
    // Indigenous Rights Forum
    {
      id: 1,
      sender: "ngo",
      message: "Please review the 45 submitted claims from Tripura region. All documentation is complete.",
      timestamp: "1:30 PM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "I'll start the review process today. Are there any urgent cases that need priority?",
      timestamp: "1:35 PM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "Yes, 5 cases involve elderly claimants who need immediate attention.",
      timestamp: "1:40 PM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Understood. I'll fast-track those 5 cases. Can you send me the claim IDs?",
      timestamp: "1:45 PM",
      delivered: true,
      read: false,
    },
  ],
  7: [
    // Community Forest Network
    {
      id: 1,
      sender: "ngo",
      message: "The training session on digital claim submission was very helpful for our team.",
      timestamp: "4:30 PM",
      delivered: true,
      read: true,
    },
    {
      id: 2,
      sender: "officer",
      message: "I'm glad it was useful! How many team members attended?",
      timestamp: "4:35 PM",
      delivered: true,
      read: true,
    },
    {
      id: 3,
      sender: "ngo",
      message: "12 field coordinators participated. They're now confident about using the new system.",
      timestamp: "4:40 PM",
      delivered: true,
      read: true,
    },
    {
      id: 4,
      sender: "officer",
      message: "Perfect! Let me know if you need any follow-up sessions or support.",
      timestamp: "4:45 PM",
      delivered: true,
      read: false,
    },
  ],
}

export default function CommunicationPortal() {
  const [selectedNGO, setSelectedNGO] = useState(dummyNGOs[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(conversationData[selectedNGO.id] || [])

  const filteredNGOs = dummyNGOs.filter(
    (ngo) =>
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ngo.regId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleNGOSelect = (ngo) => {
    setSelectedNGO(ngo)
    setMessages(conversationData[ngo.id] || [])
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "officer",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        delivered: false,
        read: false,
      }
      const updatedMessages = [...messages, message]
      setMessages(updatedMessages)
      conversationData[selectedNGO.id] = updatedMessages
      setNewMessage("")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-all duration-200 rounded-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-gradient-to-b from-gray-300 to-gray-400" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Communication Portal</h1>
              <p className="text-gray-600 text-sm">Chat with registered NGOs and field officers</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-sm bg-green-50 border-green-200 text-green-700 shadow-sm px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              {filteredNGOs.filter((ngo) => ngo.status === "online").length} Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex min-h-0">
        {/* NGO List Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Search className="h-4 w-4 text-white" />
              </div>
              <Input
                placeholder="Search NGOs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 bg-transparent placeholder:text-white/70 text-white"
              />
            </div>
          </div>
          
          {/* NGO List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNGOs.map((ngo) => (
              <div
                key={ngo.id}
                onClick={() => handleNGOSelect(ngo)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 ${
                  selectedNGO.id === ngo.id ? "bg-gradient-to-r from-green-50 to-emerald-50 border-r-3 border-r-green-500 shadow-sm" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-11 w-11 ring-2 ring-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold">
                        {ngo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${getStatusColor(ngo.status)} ${
                        ngo.status === "online" ? "animate-pulse" : ""
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">{ngo.name}</p>
                      {ngo.unreadCount > 0 && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-sm animate-pulse">
                          {ngo.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1 font-medium">{ngo.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{ngo.lastSeen}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white shadow-lg">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                    <AvatarFallback className="bg-white text-green-600 font-bold text-lg">
                      {selectedNGO.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${getStatusColor(selectedNGO.status)} ${
                      selectedNGO.status === "online" ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedNGO.name}</h3>
                  <p className="text-sm text-white/80">{selectedNGO.regId}</p>
                  <div className="flex gap-1 mt-1">
                    {selectedNGO.workingAreas.map((area) => (
                      <Badge key={area} variant="outline" className="text-xs bg-white/20 border-white/30 text-white shadow-sm">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "officer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                        message.sender === "officer"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <p className={`text-xs mt-2 ${message.sender === "officer" ? "text-green-100" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all duration-200">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-full px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
              />
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all duration-200">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
