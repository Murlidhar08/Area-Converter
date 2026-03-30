import { motion } from "framer-motion";
import { Globe, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
    const { t, i18n } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved === "dark" || !saved; // Default to dark as per current design
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("app_language", lang);
    };

    const settingSections = [
        {
            id: 'language',
            title: t("settings.language") || "Display Language",
            icon: Globe,
            color: "text-violet-600",
            bg: "bg-violet-50",
            content: (
                <div className="relative">
                    <select
                        className="input-field appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12 font-medium"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={i18n.language}
                    >
                        <option value="en">English (US)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="gu">ગુજરાતી (Gujarati)</option>
                    </select>
                </div>
            )
        },
        {
            id: 'theme',
            title: t("settings.theme"),
            hidden: false,
            icon: isDarkMode ? Moon : Sun,
            color: isDarkMode ? "text-indigo-400" : "text-amber-500",
            bg: isDarkMode ? "bg-indigo-500/10" : "bg-amber-500/10",
            content: (
                <div className="flex items-center justify-between p-1">
                    <span className="text-sm text-slate-400 font-medium">
                        {isDarkMode ? t("settings.nightMode") : t("settings.lightMode")}
                    </span>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${isDarkMode ? "bg-violet-600" : "bg-slate-200"}`}
                    >
                        <motion.div
                            animate={{ x: isDarkMode ? 28 : 4 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 left-0 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center"
                        >
                            {isDarkMode ? <Moon size={10} className="text-violet-600" /> : <Sun size={10} className="text-amber-500" />}
                        </motion.div>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col items-center justify-start px-4">
            <div className="w-full max-w-lg space-y-4">
                {settingSections.map((section, idx) => (
                    <motion.div
                        key={section.id}
                        hidden={section.hidden}
                        className="glass-card !p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${section.bg.replace('bg-', 'bg-opacity-10 dark:bg-opacity-10 bg-')} ${section.color}`}>
                                <section.icon size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h2>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/20">
                            {section.content}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
