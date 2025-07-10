import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function calculation() {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 p-4 relative">
            {/* Title */}
            <motion.h1
                className="text-4xl font-extrabold mb-6 text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Total Area
            </motion.h1>

            {/* Converter Box */}
            <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <h1>Hello</h1>
            </motion.div>
        </div>
    );
}
