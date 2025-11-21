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
        <div className="sm:flex flex-col items-center justify-center min-h-screen sm:bg-purple-800 sm:pb-20 sm:p-4 bg-white">

            {/* Title */}
            <motion.h1
                className="text-3xl sm:text-4xl font-extrabold p-6 bg-purple-800 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {t("title.settings")}
            </motion.h1>

            {/* Container Card */}
            <motion.div
                className="bg-white p-4 sm:p-6 sm:shadow-xl sm:h-full w-full mx-auto sm:border border-purple-200 sm:rounded-2xl sm:max-w-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
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
                        <option value="gu">ગુજરાતી</option>
                    </select>
                </div>
            </motion.div>
        </div>
    );
}
