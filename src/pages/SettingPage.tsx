import { motion } from "framer-motion";
import { Globe } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function SettingPage() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("app_language", lang);
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start md:px-4">
            <div className="flex-1 flex flex-col w-full max-w-lg space-y-4">
                <motion.div
                    className="glass-card flex-1 md:w-auto overflow-hidden bg-white border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {t("settings.language") || "Display Language"}
                        </h2>
                    </div>
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
                </motion.div>
            </div>
        </div>
    );
}
