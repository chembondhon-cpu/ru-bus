import { useState, useMemo, useEffect } from 'react';
import { routes } from './data';
import { Clock, Bus, Search, ArrowRightLeft, X, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Route } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [stopSearchTerm, setStopSearchTerm] = useState('');
  const [direction, setDirection] = useState<'toCampus' | 'fromCampus'>('fromCampus');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (routeId: string) => {
    setFavorites(prev => prev.includes(routeId) ? prev.filter(r => r !== routeId) : [...prev, routeId]);
  };
  
  const allStops = useMemo(() => Array.from(new Set(routes.flatMap(r => r.stops))).sort(), []);

  // Simplified estimation logic: Assume 5 minutes per stop
  const calculateDuration = (fromIndex: number, toIndex: number) => {
      return Math.abs(toIndex - fromIndex) * 5;
  };

  const calculateArrivalTime = (departureTimeStr: string, minutesToAdd: number) => {
      const [time, period] = departureTimeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      let date = new Date();
      date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
      date.setMinutes(minutes + minutesToAdd);
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const plannerRoutes = useMemo(() => {
    if (!fromStop || !toStop || fromStop === toStop) return [];
    return routes.filter(r => {
        const fromIndex = r.stops.indexOf(fromStop);
        const toIndex = r.stops.indexOf(toStop);
        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });
  }, [fromStop, toStop]);

  const stopSearchRoutes = useMemo(() => {
    if (!stopSearchTerm) return [];
    return routes.filter(r => r.stops.includes(stopSearchTerm));
  }, [stopSearchTerm]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-indigo-50 font-sans">
        <header className="bg-slate-950/60 backdrop-blur-xl shadow-lg sticky top-0 z-10 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
            <h1 className="text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-400 flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-xl backdrop-blur-sm border border-blue-500/20"><Bus className="w-6 h-6 text-blue-400" /></div> RU Bus
            </h1>
            <nav className="flex bg-slate-950/50 p-1.5 rounded-full text-sm font-semibold border border-white/5 backdrop-blur-sm">
            {['dashboard', 'schedule', 'find', 'search', 'favorites'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full transition-all duration-500 ${activeTab === tab ? 'bg-blue-600/30 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
             <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                      {label: "Total Buses", val: "52", icon: <Bus className="absolute -right-2 -bottom-2 w-16 h-16 text-blue-500/10" />},
                      {label: "Active Routes", val: "12", icon: <Bus className="absolute -right-2 -bottom-2 w-16 h-16 text-blue-500/10" />},
                      {label: "Total Bus Stops", val: "68", icon: <Bus className="absolute -right-2 -bottom-2 w-16 h-16 text-blue-500/10" />},
                      {label: "Current Time", val: currentTime, icon: <Clock className="absolute -right-2 -bottom-2 w-16 h-16 text-sky-500/10" />},
                  ].map((stat, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-[2rem] border border-white/10 backdrop-blur-sm shadow-xl relative overflow-hidden">
                        {stat.icon}
                        <p className="text-blue-200/60 text-sm">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stat.val}</h3>
                    </motion.div>
                  ))}
               </div>
               
               <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-gradient-to-r from-blue-900/40 to-sky-900/40 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome back, Student!</h2>
                  <p className="text-blue-100/70">Find your bus schedule, route and stops easily with our premium navigation.</p>
               </motion.div>
            </motion.div>
          )}
          {activeTab === 'schedule' && (
            <motion.div key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <h2 className="text-xl font-bold font-display text-white">Available Routes</h2>
               {routes.map(route => (
                  <motion.div key={route.id} whileHover={{ scale: 1.01 }} onClick={(e) => { 
                      if((e.target as HTMLElement).tagName !== 'BUTTON' && !(e.target as HTMLElement).closest('button')) setSelectedRoute(route) 
                  }} className="bg-slate-900/50 group p-6 rounded-[2rem] shadow-lg border border-white/5 cursor-pointer hover:border-blue-500/30 transition-all duration-300 flex items-center justify-between backdrop-blur-sm">
                      <h3 className="font-semibold text-lg text-slate-100 flex items-center gap-2">
                          <Bus className="w-5 h-5 text-blue-400" /> {route.name}
                      </h3>
                      <div className="flex items-center gap-3">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); toggleFavorite(route.id); }} className={`p-2 rounded-full transition-colors ${favorites.includes(route.id) ? 'text-red-400 bg-red-900/20' : 'text-slate-500 hover:text-red-400'}`}>
                              <Heart className="w-5 h-5" fill={favorites.includes(route.id) ? "currentColor" : "none" } />
                          </motion.button>
                          <motion.div whileHover={{ x: 5 }} className="bg-blue-600/20 p-2 rounded-full group-hover:bg-blue-600/40 group-hover:text-blue-300 transition-colors text-blue-400">
                              <ChevronRight />
                          </motion.div>
                      </div>
                  </motion.div>
               ))}
            </motion.div>
          )}
          
          {activeTab === 'favorites' && (
              <motion.div key="favorites" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6">
                 <h2 className="text-xl font-bold font-display text-white">Your Favorites</h2>
                 {favorites.length === 0 ? (
                     <div className="text-center py-20 text-blue-200/50">No favorite routes yet.</div>
                 ) : (
                    routes.filter(r => favorites.includes(r.id)).map(route => (
                        <motion.div key={route.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedRoute(route)} className="bg-slate-900/50 group p-6 rounded-[2rem] shadow-lg border border-red-500/10 cursor-pointer hover:border-red-500/30 transition-all duration-300 flex items-center justify-between backdrop-blur-sm">
                            <h3 className="font-semibold text-lg text-slate-100 flex items-center gap-2"><Bus className="w-5 h-5 text-red-400" /> {route.name}</h3>
                            <ChevronRight className="text-red-400"/>
                        </motion.div>
                    ))
                 )}
              </motion.div>
          )}
          </AnimatePresence>

          {activeTab === 'find' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="relative">
                      <label className="block text-xs font-semibold text-slate-400 mb-2">From</label>
                      <select 
                          className="w-full pl-4 pr-6 py-4 rounded-2xl border border-slate-800 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                          onChange={(e) => setFromStop(e.target.value)}
                          value={fromStop}
                      >
                          <option value="">Start stop...</option>
                          {allStops.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                      </select>
                  </div>
                  <div className="relative">
                      <label className="block text-xs font-semibold text-slate-400 mb-2">To</label>
                      <select 
                          className="w-full pl-4 pr-6 py-4 rounded-2xl border border-slate-800 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                          onChange={(e) => setToStop(e.target.value)}
                          value={toStop}
                      >
                          <option value="">Destination stop...</option>
                          {allStops.map(stop => <option key={stop} value={stop}>{stop}</option>)}
                      </select>
                  </div>
                 </div>
                    
                  <button
                      onClick={() => {
                          setDirection(direction === 'fromCampus' ? 'toCampus' : 'fromCampus');
                          const temp = fromStop;
                          setFromStop(toStop);
                          setToStop(temp);
                      }}
                      className="w-full flex items-center justify-center gap-3 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl font-semibold text-slate-200 transition"
                  >
                      <ArrowRightLeft className="w-5 h-5 text-blue-400" />
                      {direction === 'fromCampus' ? 'Leaving Campus' : 'Returning to Campus'}
                  </button>
               </div>

               {plannerRoutes.length > 0 && (
                  <div className="grid grid-cols-1 gap-6">
                      {plannerRoutes.map(route => {
                          const fromIndex = route.stops.indexOf(fromStop);
                          const toIndex = route.stops.indexOf(toStop);
                          const duration = calculateDuration(fromIndex, toIndex);
                          
                          return (
                              <div key={route.id} className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800">
                                  <h4 className="font-bold text-lg mb-1 text-slate-100">{route.name}</h4>
                                  <p className="text-xs text-blue-400 mb-4 font-semibold uppercase tracking-wider">
                                      Duration: Approx {duration} minutes
                                  </p>
                                  <div className="space-y-3">
                                      {route.schedule.map((s, i) => {
                                          const departureTime = direction === 'fromCampus' ? s.timeFromCampus : s.timeFromDestination;
                                          return (
                                          <div key={i} className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-xl border border-slate-700">
                                              <span className="text-sm font-semibold text-slate-200">
                                                  Dep: {departureTime}
                                              </span>
                                              <span className="text-xs text-blue-300 font-bold bg-blue-900/50 px-2 py-1 rounded">
                                                  Arrive: {calculateArrivalTime(departureTime, duration)}
                                              </span>
                                          </div>
                                          );
                                      })}
                                  </div>
                              </div>
                          );
                      })}
                  </div>
               )}
             </motion.div>
          )}

          {activeTab === 'search' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800">
                  <div className="relative">
                      <Search className="absolute left-4 top-4 text-slate-500" />
                      <input 
                          type="text"
                          placeholder="Search for a stop..."
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-800 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                          onChange={(e) => setStopSearchTerm(e.target.value)}
                          value={stopSearchTerm}
                      />
                  </div>
               </div>

               {stopSearchRoutes.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stopSearchRoutes.map(route => (
                          <div key={route.id} onClick={(e) => { 
                              if((e.target as HTMLElement).tagName !== 'BUTTON' && !(e.target as HTMLElement).closest('button')) setSelectedRoute(route)
                          }} className="bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-800 cursor-pointer hover:border-slate-700">
                               <div className="flex justify-between items-center">
                                  <h4 className="font-bold text-lg mb-1 text-slate-200">{route.name}</h4>
                                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(route.id); }} className={`p-2 rounded-full transition-colors ${favorites.includes(route.id) ? 'text-red-500 bg-red-900/20' : 'text-slate-500 hover:text-red-500'}`}>
                                      <Heart className="w-5 h-5" fill={favorites.includes(route.id) ? "currentColor" : "none" } />
                                  </button>
                               </div>
                              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                                  {route.stops.join(' → ')}
                              </p>
                          </div>
                      ))}
                  </div>
               )}
             </motion.div>
          )}
        </main>

        <AnimatePresence>
          {selectedRoute && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-20 flex items-center justify-center p-4">
                  <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-800">
                      <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2"><Bus className="w-6 h-6 text-blue-400" /> {selectedRoute.name}</h2>
                          <button onClick={() => setSelectedRoute(null)} className="text-slate-400 hover:text-white"><X /></button>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-slate-400 mb-2">Departure Time</label>
                        <div className="p-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-100 text-sm">
                            {selectedRoute.schedule[0].timeFromCampus}
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        {selectedRoute.stops.map((stop, i) => (
                           <div key={i} className="flex items-center text-sm text-slate-300">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs mr-3 border border-slate-700">
                                {i + 1}
                              </div>
                              <span className="flex-grow">{stop}</span>
                              <span className="text-xs text-blue-300 font-bold bg-blue-900/50 px-2 py-1 rounded">
                                  {calculateArrivalTime(selectedRoute.schedule[0].timeFromCampus, i * 5)}
                              </span>
                           </div>
                        ))}
                      </div>
                  </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
}
