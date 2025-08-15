'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const v = localStorage.getItem('bestScore');
      return v ? parseInt(v) : 0;
    }
    return 0;
  });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || time <= 0) return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [running, time]);

  useEffect(() => {
    if (time === 0) {
      setRunning(false);
      if (score > best) {
        setBest(score);
        localStorage.setItem('bestScore', String(score));
      }
    }
  }, [time, score, best]);

  const start = () => {
    setScore(0);
    setTime(10);
    setRunning(true);
  };

  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'24px',fontFamily:'ui-sans-serif,system-ui'}}>
      <div style={{maxWidth:420,width:'100%',textAlign:'center',border:'1px solid #e5e7eb',borderRadius:16,padding:24,boxShadow:'0 6px 24px rgba(0,0,0,0.06)'}}>
        <h1 style={{fontSize:24,marginBottom:8}}>⚡ 10s Tap Challenge</h1>
        <p style={{color:'#6b7280',marginBottom:16}}>بزن روی دکمه و تو ۱۰ ثانیه بیشترین امتیاز رو بگیر!</p>

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
          <span>⏱ زمان: <b>{time}s</b></span>
          <span>🏁 امتیاز: <b>{score}</b></span>
          <span>🥇 رکورد: <b>{best}</b></span>
        </div>

        <button
          onClick={() => running && setScore((s) => s + 1)}
          disabled={!running || time===0}
          style={{width:'100%',padding:'20px 0',fontSize:20,fontWeight:700,borderRadius:12,border:'none',cursor:running?'pointer':'not-allowed',background:running?'#111827':'#9CA3AF',color:'#fff',marginBottom:12}}
        >
          TAP!
        </button>

        <button
          onClick={start}
          style={{width:'100%',padding:'12px 0',borderRadius:10,border:'1px solid #e5e7eb',background:'#fff',cursor:'pointer'}}
        >
          {running ? 'درحال بازی…' : 'شروع دوباره'}
        </button>
      </div>
    </main>
  );
}
