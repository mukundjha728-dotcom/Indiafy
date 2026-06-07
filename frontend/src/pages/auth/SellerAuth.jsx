import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useSellerAuthStore } from '../../store/sellerAuthStore';
import { toast } from 'react-toastify';
import { 
  Mail, Lock, Store, User, ArrowRight, ArrowLeft, Eye, EyeOff, Loader2, 
  ShieldCheck, Zap, Phone, MapPin, Building, CreditCard, CheckCircle, 
  X 
} from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").regex(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{6,}$/, "Must contain at least 1 letter and 1 number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const InputField = ({ label, icon: Icon, required, error, register, name, className = "", ...props }) => (
  <div className={`space-y-1.5 w-full ${className}`}>
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />}
      <input 
        {...(register ? register(name) : {})}
        {...props} 
        className={`w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'} rounded-2xl py-4 ${Icon ? 'pl-12' : 'pl-5'} pr-5 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4 ${error ? 'focus:ring-red-500/10' : 'focus:ring-blue-500/10'}`} 
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold pl-1 uppercase tracking-wider">{error}</p>}
  </div>
);

export default function SellerAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const loginAuth = useSellerAuthStore((state) => state.login);
  const isBackendAvailable = useSellerAuthStore((state) => state.isBackendAvailable);
  
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/seller/auth/login', data);
      const sellerData = res?.data;
      const accessToken = res?.data?.accessToken;

      if (sellerData?._id) {
        loginAuth(sellerData, accessToken);
        toast.success("Login successful! Welcome back.");
        navigate('/seller-hub');
      } else {
        toast.error("Login failed — invalid response. Please try again.");
      }
    } catch(err) {
      console.error("Seller login error:", err);
      const msg = err?.response?.data?.message || err?.message || "Login failed. Check your credentials.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignup = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/seller/auth/signup', data);
      if (res.success || res.statusCode === 200 || res.data) {
        toast.success("Account created! Please log in.");
        setIsLogin(true);
        resetSignup();
      }
    } catch(err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center lg:p-8 font-sans">
      
      <div className="relative w-full h-[100dvh] lg:h-[92vh] lg:min-h-[700px] lg:max-w-6xl bg-white lg:rounded-[2.5rem] lg:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex">
        
        {/* --- LEFT PANEL: BRANDING (Hidden on Mobile) --- */}
        <div 
          className={`hidden lg:flex absolute top-0 left-0 w-1/2 h-full bg-[#0B1120] z-20 flex-col justify-between p-14 shadow-2xl transition-transform duration-[800ms] ease-in-out ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[20%] w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-80 h-80 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          </div>

          {/* DESKTOP LOGO IMAGE */}
          <div className="relative z-10 flex items-center">
            <img loading="lazy" decoding="async" src="/Images/logo.png" alt="Indiafy Logo" className="h-12 w-auto object-contain" />
          </div>

          <div className="relative z-10 w-full max-w-md space-y-8">
            {isLogin ? (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                  <ShieldCheck size={16} /> Secure Dashboard
                </div>
                <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.15] mb-8 tracking-tight">
                  Your local commerce <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">command center.</span>
                </h1>
                <p className="text-lg text-slate-400 font-medium leading-relaxed">
                  Take absolute control of your business. Monitor live fulfillments, track hyper-local trends, and review daily settlements.
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
                  <Zap size={16} /> Zero Setup Fees
                </div>
                <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.15] mb-8 tracking-tight">
                  Dominate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">local market.</span>
                </h1>
                <p className="text-lg text-slate-400 font-medium leading-relaxed">
                  Transform your offline store into a digital powerhouse. Register in minutes and reach thousands of customers across your city.
                </p>
              </div>
            )}
          </div>

          <div className="relative z-10 text-sm font-medium text-slate-600">
            © {new Date().getFullYear()} Indiafy Technologies.
          </div>
        </div>

        {/* --- RIGHT PANEL: SCROLLABLE FORMS --- */}
        <div 
          className={`absolute top-0 left-0 w-full lg:w-1/2 h-full bg-white z-10 transition-transform duration-[800ms] ease-in-out ${
            isLogin ? "translate-x-0 lg:translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="w-full h-full overflow-y-auto custom-scrollbar bg-white relative">
            
            <div className={`w-full max-w-xl mx-auto px-6 sm:px-12 lg:px-16 transition-all duration-300 ${
              isLogin
                ? 'min-h-full flex flex-col justify-center py-8' 
                : 'flex flex-col min-h-full pt-12 pb-48 sm:pb-40' 
            }`}>
              
              {/* MOBILE LOGO IMAGE */}
              <div className="flex lg:hidden items-center justify-center mb-8 sm:mb-12 pb-6 border-b border-slate-100 shrink-0">
                <img loading="lazy" decoding="async" src="/Images/logo.png" alt="Indiafy Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </div>

              {/* Form Headers */}
              <div className={`${isLogin ? 'mb-10' : 'mb-14'} text-center sm:text-left shrink-0`}>
                {isLogin ? (
                  <div className="animate-in fade-in duration-500 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
                    <p className="text-slate-500 font-medium text-base sm:text-lg">Enter your details to access your dashboard.</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Create Seller Account</h2>
                    <p className="text-slate-500 font-medium text-base sm:text-lg">Set up your master account to manage your businesses.</p>
                  </div>
                )}
              </div>

              {/* Form Fields Area */}
              <div className="w-full shrink-0">
                {isLogin ? (
                  /* LOGIN FORM */
                  <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <InputField 
                      label="Email Address" 
                      icon={Mail} 
                      name="email" 
                      type="email" 
                      register={registerLogin}
                      error={loginErrors.email?.message}
                      placeholder="store@example.com" 
                      required 
                    />
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between pl-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                        <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-800">Forgot password?</button>
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input 
                          {...registerLogin("password")}
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className={`w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border ${loginErrors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'} rounded-2xl py-4 pl-12 pr-12 text-sm font-medium text-slate-900 outline-none transition-all shadow-sm focus:shadow-md focus:ring-4`} 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    {loginErrors.password && <p className="text-[10px] text-red-500 font-bold pl-1 uppercase tracking-wider">{loginErrors.password.message}</p>}
                  </div>
                  
                  {!isBackendAvailable && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 flex items-center justify-center rounded-xl text-xs font-bold mt-6 mb-2">
                      Authentication service temporarily unavailable
                    </div>
                  )}
                  
                  <button type="submit" disabled={isLoading || !isBackendAvailable} className="w-full flex items-center justify-center gap-3 py-4 mt-6 bg-slate-900 text-white rounded-2xl font-bold text-base hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/20 disabled:opacity-70 h-[60px]">
                    {isLoading ? <><Loader2 size={20} className="animate-spin" /> Authenticating...</> : <>Secure Login <ArrowRight size={20} className="ml-1" /></>}
                  </button>
                </form>
                ) : (
                  /* REGISTRATION FORM */
                  <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-7 animate-in fade-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <InputField label="First Name" icon={User} name="firstName" register={registerSignup} error={signupErrors.firstName?.message} placeholder="First Name" required />
                      <InputField label="Last Name" name="lastName" register={registerSignup} error={signupErrors.lastName?.message} placeholder="Last Name" />
                    </div>
                    <InputField label="Email Address" icon={Mail} name="email" type="email" register={registerSignup} error={signupErrors.email?.message} placeholder="you@business.com" required />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <InputField label="Password" icon={Lock} name="password" type="password" register={registerSignup} error={signupErrors.password?.message} placeholder="Min 6 chars" required />
                      <InputField label="Confirm Password" icon={Lock} name="confirmPassword" type="password" register={registerSignup} error={signupErrors.confirmPassword?.message} placeholder="Re-enter" required />
                    </div>
                    
                    {!isBackendAvailable && (
                      <div className="bg-red-50 border border-red-100 text-red-600 p-3 flex items-center justify-center rounded-xl text-xs font-bold mt-6 mb-2">
                        Authentication service temporarily unavailable
                      </div>
                    )}
                    
                    <button type="submit" disabled={isLoading || !isBackendAvailable} className="w-full flex items-center justify-center gap-3 py-4 mt-6 bg-blue-600 text-white rounded-2xl font-bold text-base hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 h-[60px]">
                      {isLoading ? <><Loader2 size={20} className="animate-spin" /> Creating Account...</> : "Create Seller Account"}
                    </button>
                  </form>
                )}
              </div>

              {/* FIXED TOGGLE TEXT */}
              <div className={`${isLogin ? 'mt-8 sm:mt-10' : 'mt-10 pb-10'} shrink-0`}>
                <p className="text-center text-sm font-medium text-slate-500">
                  {isLogin ? "Don't have an account yet?" : "Already have a seller account?"}{" "}
                  <button type="button" onClick={toggleAuthMode} className="text-blue-600 font-bold hover:text-blue-800 transition-colors ml-1 focus:outline-none focus:underline underline-offset-4">
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #94a3b8; }
        .custom-scrollbar { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
      `}} />
    </div>
  );
}