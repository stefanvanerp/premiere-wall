'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Star, Monitor, Shield, Upload, RefreshCw, Film, Pause, Play, Search } from 'lucide-react'

type Story = {
  id: number
  username: string
  followers: string
  status: 'new' | 'approved' | 'favorite' | 'rejected'
  type: 'video' | 'image'
  image: string
  note: string
  createdAt: string
}

const initialStories: Story[] = [
  { id: 1, username: '@noorlucas', followers: '184K', status: 'new', type: 'video', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=900&auto=format&fit=crop', note: 'Rode loper moment', createdAt: '20:11' },
  { id: 2, username: '@milanvdb', followers: '92K', status: 'new', type: 'image', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=900&auto=format&fit=crop', note: 'Tagde filmaccount', createdAt: '20:13' },
  { id: 3, username: '@saaronline', followers: '246K', status: 'approved', type: 'video', image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=900&auto=format&fit=crop', note: 'Cast selfie', createdAt: '20:15' },
  { id: 4, username: '@julianscene', followers: '61K', status: 'approved', type: 'image', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=900&auto=format&fit=crop', note: 'Première look', createdAt: '20:16' },
  { id: 5, username: '@laurensmedia', followers: '338K', status: 'approved', type: 'video', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=900&auto=format&fit=crop', note: 'Zaal binnenkomst', createdAt: '20:18' },
  { id: 6, username: '@filmliefde', followers: '37K', status: 'approved', type: 'image', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=900&auto=format&fit=crop', note: 'Poster wall', createdAt: '20:19' },
  { id: 7, username: '@emmavdberg', followers: '128K', status: 'favorite', type: 'video', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=900&auto=format&fit=crop', note: 'Hoofdcast aanwezig', createdAt: '20:21' }
]

function Button({ children, onClick, variant = 'default', className = '' }: any) {
  const styles = variant === 'default' ? 'bg-neutral-950 text-white hover:bg-neutral-800' : variant === 'outline' ? 'border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100' : 'bg-neutral-200 text-neutral-950 hover:bg-neutral-300'
  return <button onClick={onClick} className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition ${styles} ${className}`}>{children}</button>
}

function StoryCard({ story, onApprove, onReject, onFavorite }: any) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="relative aspect-[9/16] overflow-hidden bg-neutral-900">
          <img src={story.image} alt={story.username} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
            <div className="text-sm font-semibold">{story.username}</div>
            <div className="text-xs opacity-80">{story.followers} volgers · {story.createdAt}</div>
          </div>
          <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">{story.type === 'video' ? 'Video' : 'Story'}</div>
        </div>
        <div className="space-y-3 p-3">
          <p className="text-sm text-neutral-700">{story.note}</p>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => onApprove(story.id)}><Check className="mr-1 h-4 w-4" />Goed</Button>
            <Button variant="secondary" onClick={() => onFavorite(story.id)}><Star className="h-4 w-4" /></Button>
            <Button variant="outline" onClick={() => onReject(story.id)}><X className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DisplayWall({ stories, paused }: { stories: Story[], paused: boolean }) {
  const approved = stories.filter((story) => story.status === 'approved' || story.status === 'favorite').slice(0, 5)
  return (
    <div className="min-h-[720px] rounded-3xl bg-neutral-950 p-5 text-white shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white/60"><Film className="h-4 w-4" /> Première Stories Wall</div>
          <h2 className="mt-1 text-3xl font-bold">Tag @filmaccount in je story</h2>
        </div>
        <div className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">Live tijdens inloop</div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {approved.map((story) => (
            <motion.div key={story.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: paused ? 0.65 : 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-neutral-800 shadow-xl ring-1 ring-white/10">
              <img src={story.image} alt={story.username} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-lg font-bold">{story.username}</div>
                <div className="text-sm text-white/70">{story.followers} volgers</div>
              </div>
              {story.status === 'favorite' && <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-neutral-900"><Star className="h-4 w-4" /></div>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Page() {
  const [stories, setStories] = useState<Story[]>(initialStories)
  const [mode, setMode] = useState<'moderation' | 'display'>('moderation')
  const [paused, setPaused] = useState(false)
  const [query, setQuery] = useState('')
  const updateStatus = (id: number, status: Story['status']) => setStories((current) => current.map((story) => story.id === id ? { ...story, status } : story))
  const filteredStories = useMemo(() => stories.filter((story) => story.username.toLowerCase().includes(query.toLowerCase()) || story.note.toLowerCase().includes(query.toLowerCase())), [stories, query])
  const newStories = filteredStories.filter((story) => story.status === 'new')
  const approvedStories = filteredStories.filter((story) => story.status === 'approved' || story.status === 'favorite')
  const rejectedStories = filteredStories.filter((story) => story.status === 'rejected')

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 p-6 text-neutral-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white/80 p-5 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-500">Prototype</div>
            <h1 className="text-3xl font-bold">Premiere Stories Wall</h1>
            <p className="mt-1 max-w-2xl text-neutral-600">Moderatie en bioscoopscherm voor Instagram story mentions tijdens filmpremières.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={mode === 'moderation' ? 'default' : 'secondary'} onClick={() => setMode('moderation')}><Shield className="mr-2 h-4 w-4" />Moderatie</Button>
            <Button variant={mode === 'display' ? 'default' : 'secondary'} onClick={() => setMode('display')}><Monitor className="mr-2 h-4 w-4" />Scherm</Button>
            <Button variant="outline" onClick={() => setPaused(!paused)}>{paused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}{paused ? 'Hervat' : 'Pauze'}</Button>
          </div>
        </div>

        {mode === 'display' ? <DisplayWall stories={stories} paused={paused} /> : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                ['Nieuw', stories.filter(s => s.status === 'new').length],
                ['Goedgekeurd', stories.filter(s => s.status === 'approved' || s.status === 'favorite').length],
                ['Afgewezen', stories.filter(s => s.status === 'rejected').length],
                ['Refresh', '12 sec']
              ].map(([label, value]) => <div key={label} className="rounded-3xl bg-white p-5 shadow-sm"><div className="text-sm text-neutral-500">{label}</div><div className="flex items-center gap-2 text-3xl font-bold">{label === 'Refresh' && <RefreshCw className="h-6 w-6" />}{value}</div></div>)}
            </div>

            <div className="flex flex-col gap-3 rounded-3xl bg-white/80 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md"><Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek op username of notitie" className="w-full rounded-2xl border border-neutral-200 bg-white py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-neutral-900" /></div>
              <Button onClick={() => alert('Hier komt later de Instagram webhook of handmatige import.')}><Upload className="mr-2 h-4 w-4" />Nieuwe mentions ophalen</Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <section className="space-y-3"><h2 className="text-xl font-bold">Nieuw binnen</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{newStories.map((story) => <StoryCard key={story.id} story={story} onApprove={(id: number) => updateStatus(id, 'approved')} onReject={(id: number) => updateStatus(id, 'rejected')} onFavorite={(id: number) => updateStatus(id, 'favorite')} />)}</div></section>
              <section className="space-y-3"><h2 className="text-xl font-bold">Op scherm</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{approvedStories.map((story) => <StoryCard key={story.id} story={story} onApprove={(id: number) => updateStatus(id, 'approved')} onReject={(id: number) => updateStatus(id, 'rejected')} onFavorite={(id: number) => updateStatus(id, 'favorite')} />)}</div></section>
              <section className="space-y-3"><h2 className="text-xl font-bold">Afgewezen</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">{rejectedStories.map((story) => <StoryCard key={story.id} story={story} onApprove={(id: number) => updateStatus(id, 'approved')} onReject={(id: number) => updateStatus(id, 'rejected')} onFavorite={(id: number) => updateStatus(id, 'favorite')} />)}</div></section>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
