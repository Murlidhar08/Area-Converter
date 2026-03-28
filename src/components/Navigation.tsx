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
            label: t("title.converter") || "Multiple Converter",
            path: "/multiple",
            icon: LayoutGrid,
            description: "Convert one unit to all others"
        },
        {
            label: t("title.single_converter") || "Single Converter",
            path: "/single",
            icon: ArrowLeftRight,
            description: "One-to-one precise"
        },
        {
            label: t("title.calculation") || "Quick Calculations",
            path: "/calculation",
            icon: Calculator,
            badge: calculationStore?.listOfCalc?.length,
            description: "Compute total area and costs"
        },
        {
            label: t("title.settings") || "Settings",
            path: "/setting",
            icon: Settings,
            description: "Language and preferences"
        }
    ];

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* Top Bar (Header) */}
            <header className="fixed top-0 left-0 right-0 z-40 h-20 glass border-b border-white/5 flex items-center justify-between px-6">
                <button
                    onClick={toggleMenu}
                    className="p-2.5 bg-violet-600 rounded-xl text-white hover:bg-violet-600 transition-all duration-300 group"
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
                        className="text-sm font-extrabold tracking-widest uppercase bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent sm:text-lg"
                    >
                        {getTitle()}
                    </motion.h2>
                </AnimatePresence>

                <div></div>
            </header>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMenu}
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[50]"
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
                        className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[380px] glass-dark border-r border-white/5 z-[55] flex flex-col pt-6 pb-8"
                    >
                        {/* Close Button Inside Sidebar */}
                        <div className="flex justify-start px-6 mb-4">
                            <button
                                onClick={toggleMenu}
                                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all transition-colors"
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
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                                    >
                                        <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-white/20" : "bg-slate-800/50 group-hover:bg-slate-700"}`}>
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
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
