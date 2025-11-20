import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function SettingPage() {
    const { t, i18n } = useTranslation();

    // When user changes language → update i18n & save in storage
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("app_language", lang);
    };

    return (
        <div className="min-h-screen bg-white sm:bg-purple-800 flex flex-col items-center sm:py-20 px-4">

            {/* Page Title */}
            <motion.h1
                className="text-3xl sm:text-4xl font-bold text-white text-center py-6 sm:py-10 w-full bg-purple-800 sm:bg-transparent sm:p-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {t("title.setting")}
            </motion.h1>

            {/* Container Card */}
            <motion.div
                className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-purple-200 p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {/* Card Title */}
                <h2 className="text-xl font-semibold text-purple-800 mb-4">
                    {t("settings.language")}
                </h2>

                {/* Language Selector */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-600">
                        {t("settings.language")}
                    </label>

                    <select
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={i18n.language}
                    >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                </div>
            </motion.div>
        </div>
    );
}
