import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeftRight, Calculator,
    ChevronRight,
    LayoutGrid,
    Menu,
    Settings,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const calculationStore = useSelector((state: any) => state.calculation);

    const toggleMenu = () => setIsOpen(!isOpen);

    const getTitle = () => {
        const path = location.pathname;
        if (path.startsWith('/multiple')) return t("title.converter") || "Area Converter";
        if (path.startsWith('/single')) return t("title.single_converter") || "Quick Swap";
        if (path.startsWith('/calculation')) return t("title.calculation") || "Calculations";
        if (path.startsWith('/setting')) return t("title.settings") || "Settings";
        return t("applicationTitle") || "Area Converter";
    };

    const navItems = [
        {
            label: t("title.converter"),
            path: "/multiple",
            icon: LayoutGrid,
            description: t("nav.converter.desc")
        },
        {
            label: t("title.single_converter"),
            path: "/single",
            icon: ArrowLeftRight,
            description: t("nav.single.desc")
        },
        {
            label: t("title.calculation"),
            path: "/calculation",
            icon: Calculator,
            badge: calculationStore?.listOfCalc?.length,
            description: t("nav.calc.desc")
        },
        {
            label: t("title.settings"),
            path: "/setting",
            icon: Settings,
            description: t("nav.settings.desc")
        }
    ];

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Top Bar (Header) */}
            <header className="fixed top-0 left-0 right-0 z-40 h-16 md:h-20 glass border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
                <button
                    onClick={toggleMenu}
                    className="p-2.5 bg-violet-600 rounded-xl text-white hover:bg-violet-700 transition-all duration-300 shadow-lg shadow-violet-500/20"
                    aria-label="Toggle Menu"
                >
                    <motion.div
                        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {isOpen ?
                            <X size={20} /> :
                            <Menu size={20} className="group-hover:scale-110 transition-transform" />
                        }
                    </motion.div>
                </button>

                <AnimatePresence mode="wait">
                    <motion.h2
                        key={location.pathname}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-sm font-extrabold tracking-widest uppercase bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent sm:text-lg"
                    >
                        {getTitle()}
                    </motion.h2>
                </AnimatePresence>

                <div className="w-10"></div> {/* Spacer for balance */}
            </header>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMenu}
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[50]"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[380px] glass-dark border-r border-slate-200 z-[55] flex flex-col pt-6 pb-8 shadow-2xl"
                    >
                        {/* Close Button Inside Sidebar */}
                        <div className="flex justify-start px-6 mb-4">
                            <button
                                onClick={toggleMenu}
                                className="p-2 bg-slate-100 rounded-xl text-slate-500 hover:text-rose-600 transition-all transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="flex-1 px-4 space-y-2">
                            {navItems.map((item, idx) => {
                                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                                const Icon = item.icon;

                                return (
                                    <motion.button
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        onClick={() => navigate(item.path)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group
                                            ${isActive
                                                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-violet-600"}`}
                                    >
                                        <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-slate-200"}`}>
                                            <Icon size={18} />
                                        </div>

                                        <div className="flex flex-col items-start flex-1">
                                            <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                            <span className={`text-[10px] text-left ${isActive ? "text-violet-100" : "text-slate-500"}`}>
                                                {item.description}
                                            </span>
                                        </div>

                                        {item.badge > 0 && (
                                            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                                                {item.badge}
                                            </span>
                                        )}

                                        <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-all ${isActive ? "translate-x-0" : "-translate-x-2"}`} />
                                    </motion.button>
                                );
                            })}
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="px-8 mt-auto pt-8 border-t border-slate-100">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-slate-500 hover:text-violet-600 transition-colors text-xs font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                {t("nav.github")}
                            </a>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
