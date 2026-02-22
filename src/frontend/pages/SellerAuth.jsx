
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Store, User, ArrowRight, Eye, EyeOff, Loader2, 
  ShieldCheck, PlayCircle, TrendingUp, Zap // <-- Added new icons for the copy
} from 'lucide-react';

export default function SellerAuth() {
  const navigate = useNavigate();
  
  // State to control sliding panel and form type
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard'); 
    }, 1500);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', storeName: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen w-full relative bg-slate-50 overflow-hidden font-sans">
      
      {/* ================================================================
        LEFT/RIGHT SLIDING TECH PANEL
        ================================================================
      */}
      <div 
        className={`hidden lg:flex absolute top-0 left-0 w-1/2 h-full bg-[#0B1120] z-20 flex-col justify-between p-12 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-transform duration-[800ms] ease-in-out ${
          isLogin ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Animated Glowing Orbs */}
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white text-2xl font-black tracking-tighter">I</span>
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">INDIAFY</span>
        </div>

        {/* --- ENHANCED DYNAMIC HERO COPY --- */}
        <div className="relative z-10 max-w-lg transition-all duration-500">
          {isLogin ? (
            <div key="login-copy" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <ShieldCheck size={14} /> Secure Access
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
                Your local commerce <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">command center.</span>
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-8">
                Take absolute control of your business. Monitor live fulfillments, track hyper-local trends, and review daily settlements with zero friction.
              </p>
              
              {/* Premium Feature Checklist */}
              <div className="flex flex-col gap-3.5 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-1.5 rounded-lg bg-white/5 text-blue-400 border border-white/5"><PlayCircle size={16} /></div>
                  <span className="text-sm font-semibold">Live Video-Verified Fulfillment</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-1.5 rounded-lg bg-white/5 text-indigo-400 border border-white/5"><TrendingUp size={16} /></div>
                  <span className="text-sm font-semibold">Real-time Hyperlocal Analytics</span>
                </div>
              </div>
            </div>
          ) : (
            <div key="signup-copy" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <Zap size={14} /> Zero Setup Fees
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
                Dominate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">local market.</span>
              </h1>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-8">
                Transform your offline store into a digital powerhouse in under 5 minutes. Leverage industry-first video-verification to build unparalleled customer trust.
              </p>

              {/* Premium Feature Checklist */}
              <div className="flex flex-col gap-3.5 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-1.5 rounded-lg bg-white/5 text-emerald-400 border border-white/5"><Store size={16} /></div>
                  <span className="text-sm font-semibold">Reach customers across your entire city</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-1.5 rounded-lg bg-white/5 text-teal-400 border border-white/5"><ShieldCheck size={16} /></div>
                  <span className="text-sm font-semibold">Exclusive "Trusted Seller" platform badge</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} Indiafy Technologies.
        </div>
      </div>

      {/* ================================================================
        FORM PANEL 
        ================================================================
      */}
      <div 
        className={`absolute top-0 left-0 w-full lg:w-1/2 h-full bg-white z-10 flex flex-col justify-center p-6 sm:p-12 md:p-20 transition-transform duration-[800ms] ease-in-out ${
          isLogin ? "translate-x-0 lg:translate-x-full" : "translate-x-0"
        }`}
      >
        
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-black tracking-tighter">I</span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">INDIAFY</span>
        </div>

        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-8 relative h-[80px]">
            {isLogin ? (
              <div key="login-header" className="absolute inset-0 animate-in fade-in slide-in-from-left-4 duration-500">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
                <p className="text-slate-500 mt-2 font-medium">Enter your details to access your dashboard.</p>
              </div>
            ) : (
              <div key="signup-header" className="absolute inset-0 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create your store</h2>
                <p className="text-slate-500 mt-2 font-medium">Start selling locally with zero upfront setup fees.</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative min-h-[300px]">
            
            {/* SIGNUP SPECIFIC FIELDS */}
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">Store Name</label>
                  <div className="relative group">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input required name="storeName" value={formData.storeName} onChange={handleChange} type="text" placeholder="Jai Store" className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/10" />
                  </div>
                </div>
              </div>
            )}

            {/* COMMON FIELDS (EMAIL & PASSWORD) */}
            <div className="space-y-1.5 animate-in fade-in duration-500 delay-100">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-0.5">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="store@example.com" className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/10" />
              </div>
            </div>

            <div className="space-y-1.5 animate-in fade-in duration-500 delay-150">
              <div className="flex items-center justify-between pl-0.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input required name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl py-3 pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed group animate-in fade-in duration-500 delay-200"
            >
              {isLoading ? (
                <><Loader2 size={18} className="animate-spin" /> Authenticating...</>
              ) : (
                <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          {/* TOGGLE TEXT */}
          <p className="text-center text-sm font-medium text-slate-500 mt-8 animate-in fade-in duration-700 delay-300">
            {isLogin ? "Don't have an account yet?" : "Already have a seller account?"}{" "}
            <button type="button" onClick={toggleAuthMode} className="text-blue-600 font-bold hover:text-blue-800 transition-colors ml-1 focus:outline-none">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}