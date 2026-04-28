import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeftRight, Calculator,
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
        if (path.startsWith('/multiple')) return t("title.converter") || "Unit Converter";
        if (path.startsWith('/single')) return t("title.single_converter") || "Quick Swap";
        if (path.startsWith('/calculation')) return t("title.calculation") || "Calculations";
        if (path.startsWith('/setting')) return t("title.settings") || "Settings";
        return t("applicationTitle") || "Unit Converter";
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
            <header className="fixed top-0 left-0 right-0 md:left-64 z-40 h-14 md:h-16 glass border-b border-slate-200/60 flex items-center justify-between px-4 md:px-8 transition-all duration-300">
                <button
                    onClick={toggleMenu}
                    className="p-2 bg-violet-600 rounded-lg text-white hover:bg-violet-700 transition-all duration-300 shadow-lg shadow-violet-500/20 md:hidden"
                    aria-label="Toggle Menu"
                >
                    <motion.div
                        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {isOpen ?
                            <X size={18} /> :
                            <Menu size={18} className="group-hover:scale-110 transition-transform" />
                        }
                    </motion.div>
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex flex-col"
                    >
                        <h1 className="text-sm font-black tracking-tight text-slate-800 sm:text-lg">
                            {getTitle()}
                        </h1>
                    </motion.div>
                </AnimatePresence>

                <div className="w-10 md:hidden"></div> {/* Spacer for balance */}
            </header>

            {/* Overlay - Mobile Only */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMenu}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Menu */}
            <aside
                className={`fixed top-0 left-0 bottom-0 w-full md:w-64 glass-dark border-r border-slate-100 z-55 flex flex-col pt-4 pb-6 shadow-xl transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Logo Section */}
                <div className="px-6 py-4 mb-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-xl shadow-violet-600/30">
                        <Calculator size={22} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">UNIT</span>
                        <span className="text-[10px] font-bold text-violet-600 tracking-[0.2em] uppercase leading-none">Converter</span>
                    </div>

                    {/* Close Button Inside Sidebar - Mobile Only */}
                    <button
                        onClick={toggleMenu}
                        className="ml-auto p-2 bg-slate-100 rounded-lg text-slate-500 hover:text-rose-600 transition-colors md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item, idx) => {
                        const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + idx * 0.03 }}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative
                                    ${isActive
                                        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                                        : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"}`}
                            >
                                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-slate-200"}`}>
                                    <Icon size={16} />
                                </div>

                                <div className="flex flex-col items-start flex-1 overflow-hidden">
                                    <span className="text-xs font-bold tracking-tight whitespace-nowrap">{item.label}</span>
                                    <span className={`text-[9px] text-left truncate w-full ${isActive ? "text-violet-100" : "text-slate-400"}`}>
                                        {item.description}
                                    </span>
                                </div>

                                {item.badge > 0 && (
                                    <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
                                        {item.badge}
                                    </span>
                                )}

                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute right-2 w-1 h-4 bg-white/40 rounded-full"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="px-6 mt-auto pt-6 border-t border-slate-100/50">
                    <a
                        href="https://github.com/Murlidhar08/Area-Converter"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-slate-400 hover:text-violet-600 transition-colors text-[10px] font-bold uppercase tracking-wider"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        {t("nav.github")}
                    </a>
                </div>
            </aside>
        </>
    );
}
