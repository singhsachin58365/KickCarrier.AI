import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Load saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') {
            setDarkMode(true)
            document.documentElement.classList.add('dark-mode')
        }
    }, [])

    const toggleTheme = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        if (newMode) {
            document.documentElement.classList.add('dark-mode')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark-mode')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", {withCredentials: true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <style>{`
                :root {
                    --bg-main: #f3f3f3;
                    --bg-navbar: #ffffff;
                    --border-color: #e5e7eb;
                    --text-primary: #111827;
                    --text-secondary: #6b7280;
                    --bg-btn: #f3f4f6;
                    --bg-btn-hover: #e5e7eb;
                    --bg-popup: #ffffff;
                    --shadow: 0 4px 24px rgba(0,0,0,0.08);
                }
                .dark-mode {
                    --bg-main: #0f0f1a;
                    --bg-navbar: #1a1a2e;
                    --border-color: rgba(255,255,255,0.08);
                    --text-primary: #e8e8f0;
                    --text-secondary: #9ca3af;
                    --bg-btn: rgba(255,255,255,0.08);
                    --bg-btn-hover: rgba(255,255,255,0.12);
                    --bg-popup: #1e1e30;
                    --shadow: 0 4px 24px rgba(0,0,0,0.4);
                }
                body {
                    background: var(--bg-main) !important;
                    color: var(--text-primary) !important;
                    transition: background 0.3s, color 0.3s;
                }
                .dark-mode .min-h-screen,
                .dark-mode .bg-\\[\\#f3f3f3\\] {
                    background: var(--bg-main) !important;
                }
                .theme-toggle {
                    width: 52px;
                    height: 28px;
                    background: var(--bg-btn);
                    border: 1px solid var(--border-color);
                    border-radius: 99px;
                    display: flex;
                    align-items: center;
                    padding: 3px;
                    cursor: pointer;
                    transition: all 0.3s;
                    position: relative;
                }
                .toggle-thumb {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    font-size: 12px;
                }
                .toggle-thumb-light {
                    background: #f59e0b;
                    transform: translateX(0px);
                    box-shadow: 0 2px 8px rgba(245,158,11,0.4);
                }
                .toggle-thumb-dark {
                    background: #6366f1;
                    transform: translateX(24px);
                    box-shadow: 0 2px 8px rgba(99,102,241,0.4);
                }
            `}</style>

            <div style={{ background: 'var(--bg-main)', display: 'flex', justifyContent: 'center', padding: '24px 16px 0', transition: 'background 0.3s' }}>
                <motion.div
                    initial={{opacity: 0, y: -40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3}}
                    style={{
                        width: '100%',
                        maxWidth: '1152px',
                        background: 'var(--bg-navbar)',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow)',
                        border: '1px solid var(--border-color)',
                        padding: '16px 32px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'all 0.3s'
                    }}>

                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <div style={{ background: darkMode ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#111827', color: 'white', padding: '8px', borderRadius: '10px' }}>
                            <BsRobot size={18}/>
                        </div>
                        <h1 style={{ fontWeight: 800, fontSize: '20px', color: 'var(--text-primary)', letterSpacing: '-0.5px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>KickCarrier.AI</h1>
                    </div>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>

                        {/* Theme Toggle */}
                        <button className="theme-toggle" onClick={toggleTheme} title={darkMode ? 'Switch to Light' : 'Switch to Dark'}>
                            <div className={`toggle-thumb ${darkMode ? 'toggle-thumb-dark' : 'toggle-thumb-light'}`}>
                                {darkMode ? <BsMoon size={12} color="#fff"/> : <BsSun size={12} color="#fff"/>}
                            </div>
                        </button>

                        {/* Credits */}
                        <div style={{ position: 'relative' }}>
                            <button onClick={() => {
                                if (!userData) { setShowAuth(true); return }
                                setShowCreditPopup(!showCreditPopup)
                                setShowUserPopup(false)
                            }} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                background: 'var(--bg-btn)', padding: '8px 16px',
                                borderRadius: '99px', border: '1px solid var(--border-color)',
                                color: 'var(--text-primary)', cursor: 'pointer', fontSize: '14px',
                                transition: 'all 0.2s'
                            }}>
                                <BsCoin size={18} color={darkMode ? '#a78bfa' : '#374151'}/>
                                {userData?.credits || 0}
                            </button>

                            {showCreditPopup && (
                                <div style={{
                                    position: 'absolute', right: '-50px', top: 'calc(100% + 10px)',
                                    width: '240px', background: 'var(--bg-popup)',
                                    border: '1px solid var(--border-color)', borderRadius: '16px',
                                    padding: '20px', zIndex: 50, boxShadow: 'var(--shadow)'
                                }}>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                                        Need more credits to continue interviews?
                                    </p>
                                    <button onClick={() => navigate("/pricing")} style={{
                                        width: '100%', background: darkMode ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#111827',
                                        color: 'white', padding: '10px', borderRadius: '10px',
                                        border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px'
                                    }}>
                                        Buy more credits
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* User Avatar */}
                        <div style={{ position: 'relative' }}>
                            <button onClick={() => {
                                if (!userData) { setShowAuth(true); return }
                                setShowUserPopup(!showUserPopup)
                                setShowCreditPopup(false)
                            }} style={{
                                width: '36px', height: '36px',
                                background: darkMode ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#111827',
                                color: 'white', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer'
                            }}>
                                {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={15}/>}
                            </button>

                            {showUserPopup && (
                                <div style={{
                                    position: 'absolute', right: 0, top: 'calc(100% + 10px)',
                                    width: '180px', background: 'var(--bg-popup)',
                                    border: '1px solid var(--border-color)', borderRadius: '16px',
                                    padding: '16px', zIndex: 50, boxShadow: 'var(--shadow)'
                                }}>
                                    <p style={{ fontSize: '14px', color: '#6366f1', fontWeight: 500, marginBottom: '8px' }}>
                                        {userData?.name}
                                    </p>
                                    <button onClick={() => navigate("/history")} style={{
                                        width: '100%', textAlign: 'left', fontSize: '13px',
                                        padding: '8px 0', color: 'var(--text-secondary)',
                                        background: 'none', border: 'none', cursor: 'pointer'
                                    }}>
                                        Interview History
                                    </button>
                                    <button onClick={handleLogout} style={{
                                        width: '100%', textAlign: 'left', fontSize: '13px',
                                        padding: '8px 0', color: '#ef4444',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px'
                                    }}>
                                        <HiOutlineLogout size={15}/> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)}/>}
        </>
    )
}

export default Navbar
