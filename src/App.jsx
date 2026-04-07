import { useState, useEffect, useRef, useCallback } from "react";

const PURPLE = "#7B2BFC";
const GRAY_BG = "#F2F2F2";

/* ── Menu icons ── */
const IconTasks = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#444" stroke="none"><circle cx="12" cy="7" r="4"/><path d="M12 13c-5 0-8 2.5-8 5v1h16v-1c0-2.5-3-5-8-5z"/><circle cx="12" cy="3.5" r="1.5"/></svg>);
const IconPromo = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#444" stroke="none"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="8" cy="12" r="2" fill="#f3f3f3"/><path d="M14 9l1.5 3 3 .5-2.2 2 .5 3-2.8-1.5-2.8 1.5.5-3-2.2-2 3-.5z" fill="#f3f3f3"/></svg>);
const IconHeadphones = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z"/></svg>);
const IconLang = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#444" strokeWidth="2" fill="#444"/><text x="12" y="16" textAnchor="middle" fontSize="13" fill="white" fontWeight="700" fontFamily="-apple-system,sans-serif">A</text></svg>);
const IconPrivacy = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#444" stroke="none"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6H6z"/></svg>);
const IconTerms = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="3" stroke="#444" strokeWidth="2"/><path d="M9 12l2 2 4-4" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconCourier = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="#444" stroke="none"><circle cx="14" cy="4" r="2.5"/><path d="M8 11l3-3 2 2 3-3 1.5 1.5-4 4-2-2-2 2z"/><path d="M6 17l3-6h2l1 3h4l1 3H6z"/></svg>);
const IconExit = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="6" y="3" width="12" height="18" rx="2" stroke="#444" strokeWidth="2"/><line x1="10" y1="10" x2="14" y2="10" stroke="#444" strokeWidth="2" strokeLinecap="round"/><line x1="10" y1="14" x2="14" y2="14" stroke="#444" strokeWidth="2" strokeLinecap="round"/></svg>);

const TabRestaurants = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97M21 3l-7.07 16.97M8 3v6a4 4 0 0 0 8 0V3"/></svg>);
const TabCart = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V9l9-6 9 6v12H3z"/><path d="M9 21V13h6v8"/></svg>);
const TabOrders = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h12l2 5H4l2-5z"/><path d="M4 7v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"/><path d="M9 11h6"/></svg>);
const TabMarket = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v10c0 3.31 2.69 6 6 6s6-2.69 6-6V4"/></svg>);
const TabProfile = ({ color }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill={color}><circle cx="12" cy="8" r="5"/><ellipse cx="12" cy="21" rx="9" ry="5"/></svg>);

function BotAvatar() {
  return (<div className="avatar-bot"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6 4v10c0 3.31 2.69 6 6 6s6-2.69 6-6V4h-3v10c0 1.66-1.34 3-3 3s-3-1.34-3-3V4H6z"/></svg></div>);
}
function SpecAvatar() {
  return (<div className="avatar-spec">U</div>);
}
function Dots() {
  return (<div className="dots-wrap">{[0,1,2].map(i=>(<div key={i} className="dot" style={{animationDelay:i*0.16+"s"}}/>))}</div>);
}

/* ── PROFIL ── */
function ProfileScreen({ onSupport }) {
  const items = [
    { icon: <IconTasks/>, label: "Topshiriqlar" },
    { icon: <IconPromo/>, label: "Promokodlar" },
    { icon: <IconHeadphones/>, label: "Yordam", action: onSupport },
    { icon: <IconLang/>, label: "Til" },
    { icon: <IconPrivacy/>, label: "Maxfiylik siyosati" },
    { icon: <IconTerms/>, label: "Foydalanuvchi shartnomasi" },
    { icon: <IconCourier/>, label: "Kuryer bo'lish" },
    { icon: <IconExit/>, label: "Chiqish" },
  ];
  return (
    <div className="screen-col">
      <div className="scroll-area">
        <div className="profile-name">Malika</div>
        {items.map((it, i) => (
          <div key={i} onClick={it.action} className="menu-row">
            <div className="menu-icon">{it.icon}</div>
            <span className="menu-label">{it.label}</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1l6 6-6 6" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
      </div>
      <div className="tab-bar">
        {[
          { C: TabRestaurants, label: "Restoranlar" },
          { C: TabCart, label: "Savat" },
          { C: TabOrders, label: "Buyurtmalar" },
          { C: TabMarket, label: "Market" },
          { C: TabProfile, label: "Profil", active: true },
        ].map(t => {
          const c = t.active ? PURPLE : "#aaa";
          return (<div key={t.label} className="tab-item" style={{color:c,fontWeight:t.active?600:400}}><t.C color={c}/><span>{t.label}</span></div>);
        })}
      </div>
    </div>
  );
}

/* ── CHAT ── */
function ChatScreen({ onBack }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState("empty");
  const [fired, setFired] = useState(false);
  const endRef = useRef(null);
  const rootRef = useRef(null);

  const scroll = useCallback(() => {
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const sync = () => {
      const el = rootRef.current;
      if (!el) return;
      el.style.height = vv.height + "px";
      el.style.top = vv.offsetTop + "px";
      scroll();
    };
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    sync();
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, [scroll]);

  useEffect(() => {
    if (input.length > 0 && !fired && phase === "empty") {
      setFired(true);
      setPhase("bot_typing");
      scroll();
      setTimeout(() => { setPhase("buttons"); scroll(); }, 1200);
    }
  }, [input, fired, phase, scroll]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMsgs(p => [...p, { r: "user", text }]);
    scroll();

    if (phase === "done" || phase === "replied" || phase === "spec_typing") {
      setTimeout(() => {
        setMsgs(p => [...p, {
          r: "spec", name: "Ulug'bek",
          text: "Ma'lumot uchun rahmat! Murojaatingiz allaqachon ko'rib chiqilmoqda. Savolni o'rganib, tez orada javob beraman.",
        }]);
        scroll();
      }, 1500);
      return;
    }

    setFired(true);
    setPhase("picked");
    setTimeout(() => {
      setMsgs(p => [...p, {
        r: "bot",
        text: "Murojaatingiz uchun rahmat 💜. Iltimos, «Mutaxassisni chaqirish» tugmasini bosing, sizga yordam bera olaylik.",
      }]);
      setPhase("call_spec");
      scroll();
    }, 1000);
  };

  const pickButton = (label) => {
    setPhase("picked");
    setInput("");
    setMsgs(p => [
      ...p,
      { r: "bot", text: "Iltimos, murojaatingiz sababini tanlang, sizga yordam bera olaylik" },
      { r: "user", text: label },
    ]);
    scroll();
    setTimeout(() => {
      const reps = {
        "📦 Buyurtma holati": "Buyurtmangiz #4821 yo'lda! Taxminiy yetkazib berish vaqti: bugun soat 18:00 gacha.",
        "📍 Manzilni o'zgartirish": "Yetkazib berish manzilini o'zgartirish uchun yangi manzilni xabarda yozing.",
        "⚠️ Buyurtma bilan muammo": "Muammo yuzaga kelgani uchun uzr so'raymiz. Mutaxassis allaqachon ulanmoqda!",
      };
      setMsgs(p => [...p, { r: "bot", text: reps[label] }]);
      setPhase("replied");
      scroll();
      connectSpec();
    }, 700);
  };

  const callSpec = () => {
    setMsgs(p => [...p, { r: "user", text: "Mutaxassisni chaqirish" }]);
    setPhase("replied");
    scroll();
    connectSpec();
  };

  const connectSpec = () => {
    setTimeout(() => {
      setPhase("spec_typing"); scroll();
      setTimeout(() => {
        setPhase("done");
        setMsgs(p => [...p, {
          r: "spec", name: "Ulug'bek",
          text: "Assalomu alaykum! Mening ismim Ulug'bek. Murojaatingiz qabul qilindi, savolni o'rganib chiqyapman. Iltimos, biroz kuting.",
        }]);
        scroll();
      }, 2200);
    }, 1000);
  };

  return (
    <div className="chat-root" ref={rootRef}>
      <div className="chat-header">
        <span onClick={onBack} className="close-btn">×</span>
        <span className="header-title">Yordam</span>
      </div>

      <div className="chat-body">
        {msgs.map((m, i) => {
          if (m.r === "bot") return (
            <div key={i} className="msg-in msg-block">
              <div className="sender">Uzum Tezkor Bot 🤖</div>
              <div className="msg-row">
                <BotAvatar/>
                <div className="msg-content">
                  <div className="bubble-left">{m.text}</div>
                  <div className="msg-time">Hozirgina</div>
                </div>
              </div>
            </div>
          );
          if (m.r === "user") return (
            <div key={i} className="msg-in msg-block" style={{display:"flex",justifyContent:"flex-end"}}>
              <div className="bubble-right">{m.text}</div>
            </div>
          );
          if (m.r === "spec") return (
            <div key={i} className="msg-in msg-block">
              <div className="sender">{m.name}</div>
              <div className="msg-row">
                <SpecAvatar/>
                <div className="msg-content">
                  <div className="bubble-left">{m.text}</div>
                  <div className="msg-time">Hozirgina</div>
                </div>
              </div>
            </div>
          );
          return null;
        })}

        {phase === "bot_typing" && (
          <div className="msg-in"><div className="sender">Uzum Tezkor Bot 🤖</div><div className="msg-row"><BotAvatar/><Dots/></div></div>
        )}

        {phase === "buttons" && (
          <div className="msg-in">
            <div className="sender">Support Bot</div>
            <div className="msg-row" style={{marginBottom:6}}>
              <BotAvatar/>
              <div className="msg-content">
                <div className="bubble-left">Iltimos, murojaatingiz sababini tanlang, sizga yordam bera olaylik</div>
                <div className="msg-time">Hozirgina</div>
              </div>
            </div>
            <div className="buttons-row">
              {["📦 Buyurtma holati","📍 Manzilni o'zgartirish","⚠️ Buyurtma bilan muammo"].map(l=>(
                <button key={l} onClick={()=>pickButton(l)} className="action-btn">{l}</button>
              ))}
            </div>
          </div>
        )}

        {phase === "call_spec" && (
          <div className="msg-in">
            <div className="buttons-row">
              <button onClick={callSpec} className="action-btn">Mutaxassisni chaqirish</button>
            </div>
          </div>
        )}

        {phase === "spec_typing" && (
          <div className="msg-in"><div className="sender">Ulug'bek</div><div className="msg-row"><SpecAvatar/><Dots/></div></div>
        )}

        <div ref={endRef} style={{height:1}}/>
      </div>

      <div className="input-bar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round" style={{flexShrink:0}}>
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
        </svg>
        <div className="input-wrap">
          <input
            type="text" placeholder="Xabar yozing"
            value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();handleSend();}}}
            enterKeyHint="send"
          />
        </div>
        {input && (
          <div onClick={handleSend} style={{flexShrink:0,cursor:"pointer",padding:4}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={PURPLE} style={{transform:"rotate(-30deg)"}}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("profile");
  return (
    <>
      <style>{`
        @keyframes dot {
          0%,60%,100%{transform:translateY(0);opacity:.3}
          30%{transform:translateY(-5px);opacity:1}
        }
        @keyframes msgIn {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes btnPop {
          from{opacity:0;transform:scale(.95) translateY(10px)}
          to{opacity:1;transform:scale(1) translateY(0)}
        }

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%;height:100%;overflow:hidden;overscroll-behavior:none;background:#f5f5f5}
        input::placeholder{color:#aaa}

        .app-shell{
          position:fixed;top:0;left:50%;transform:translateX(-50%);
          width:100%;max-width:430px;height:100%;
          display:flex;flex-direction:column;background:white;overflow:hidden;
          font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif;
        }
        @media(min-width:431px){
          .app-shell{top:20px;height:calc(100% - 40px);max-height:900px;border-radius:24px;box-shadow:0 0 80px rgba(0,0,0,.06)}
        }

        .screen-col{flex:1;display:flex;flex-direction:column;overflow:hidden}
        .scroll-area{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
        .profile-name{padding:max(env(safe-area-inset-top,20px),20px) 20px 20px;font-size:clamp(28px,8vw,36px);font-weight:700;color:#000;letter-spacing:-1px}
        .menu-row{display:flex;align-items:center;gap:clamp(12px,4vw,18px);padding:clamp(14px,4vw,20px) 20px;border-top:1px solid #f0f0f0;cursor:pointer}
        .menu-icon{width:clamp(38px,10vw,48px);height:clamp(38px,10vw,48px);border-radius:50%;background:#f3f3f3;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .menu-label{flex:1;font-size:clamp(14px,4vw,17px);color:#111}
        .tab-bar{display:flex;justify-content:space-around;padding:8px 0;border-top:1px solid #eee;flex-shrink:0;padding-bottom:max(env(safe-area-inset-bottom,4px),4px)}
        .tab-item{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px}

        .chat-root{position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;height:100%;display:flex;flex-direction:column;background:white;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',sans-serif}
        @media(min-width:431px){.chat-root{top:20px;height:calc(100% - 40px);max-height:900px;border-radius:24px;box-shadow:0 0 80px rgba(0,0,0,.06)}}

        .chat-header{display:flex;align-items:center;padding:clamp(10px,3vw,14px) 16px;padding-top:max(env(safe-area-inset-top,12px),12px);border-bottom:1px solid #f0f0f0;background:white;flex-shrink:0;z-index:10}
        .close-btn{font-size:clamp(24px,7vw,30px);color:#222;cursor:pointer;line-height:1;font-weight:300}
        .header-title{flex:1;text-align:center;font-size:clamp(15px,4.5vw,18px);font-weight:600;margin-right:28px}

        .chat-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior-y:contain;padding:clamp(12px,4vw,20px) clamp(10px,3vw,16px)}

        .msg-block{margin-bottom:clamp(10px,3vw,16px)}
        .msg-in{animation:msgIn .3s ease}
        .sender{font-size:clamp(11px,3vw,13px);color:#999;margin-bottom:4px;margin-left:clamp(38px,10vw,46px)}
        .msg-row{display:flex;gap:clamp(6px,2vw,8px);align-items:flex-end}
        .msg-content{max-width:calc(100% - 50px);min-width:0}
        .msg-time{font-size:11px;color:#bbb;margin-top:4px}

        .avatar-bot{width:clamp(30px,8vw,36px);height:clamp(30px,8vw,36px);border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#6366F1,#8B5CF6);display:flex;align-items:center;justify-content:center}
        .avatar-spec{width:clamp(30px,8vw,36px);height:clamp(30px,8vw,36px);border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#60A5FA,#818CF8);display:flex;align-items:center;justify-content:center;color:white;font-size:clamp(13px,3.5vw,15px);font-weight:600}
        .dots-wrap{display:flex;gap:4px;padding:clamp(8px,2.5vw,12px) clamp(12px,3vw,16px);background:${GRAY_BG};border-radius:18px 18px 18px 4px}
        .dot{width:clamp(5px,1.8vw,7px);height:clamp(5px,1.8vw,7px);border-radius:50%;background:#999;animation:dot 1.4s ease-in-out infinite}

        .bubble-left{background:${GRAY_BG};border-radius:18px 18px 18px 4px;padding:clamp(8px,2.5vw,11px) clamp(10px,3vw,14px);font-size:clamp(13px,3.8vw,15px);line-height:1.5;color:#111;word-break:break-word}
        .bubble-right{background:#111;color:#fff;border-radius:18px 18px 4px 18px;padding:clamp(8px,2.5vw,11px) clamp(12px,3.5vw,16px);font-size:clamp(13px,3.8vw,15px);max-width:75%;word-break:break-word}

        .buttons-row{display:flex;flex-wrap:wrap;gap:clamp(6px,2vw,8px);justify-content:center;padding:clamp(4px,1.5vw,6px) 0;animation:btnPop .35s cubic-bezier(.16,1,.3,1)}
        .action-btn{padding:clamp(6px,2vw,9px) clamp(10px,3vw,16px);border-radius:22px;border:1.5px solid ${PURPLE};background:white;color:${PURPLE};font-size:clamp(12px,3.5vw,14px);font-weight:500;cursor:pointer;font-family:inherit;-webkit-tap-highlight-color:transparent;transition:all .15s}
        .action-btn:active{background:${PURPLE};color:#fff;transform:scale(.96)}
        @media(hover:hover){.action-btn:hover{background:${PURPLE};color:#fff}}

        .input-bar{padding:clamp(6px,2vw,10px) clamp(10px,3vw,14px);display:flex;gap:clamp(8px,2.5vw,12px);align-items:center;border-top:1px solid #eee;background:white;flex-shrink:0;padding-bottom:max(env(safe-area-inset-bottom,8px),8px)}
        .input-wrap{flex:1;border:1px solid #e0e0e0;border-radius:24px;padding:0 clamp(12px,3vw,16px)}
        .input-wrap input{width:100%;border:none;outline:none;padding:clamp(8px,2.5vw,11px) 0;font-size:16px;font-family:inherit;background:transparent;color:#111}
      `}</style>
      <div className="app-shell">
        {screen === "profile" && <ProfileScreen onSupport={()=>setScreen("chat")}/>}
        {screen === "chat" && <ChatScreen onBack={()=>setScreen("profile")}/>}
      </div>
    </>
  );
}
