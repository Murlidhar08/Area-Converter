import { BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalculatorIcon, ListCheck, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

export default function BottomMobileBar() {
    const { t } = useTranslation();
    const calculationStore = useSelector((state: any) => state.calculation);
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState('/multiple');

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const tabs = [
        {
            label: t("title.converter"),
            path: "/multiple",
            icon: <ListCheck />
        },
        // {
        //     label: "Single",
        //     path: "/single",
        //     icon: <Repeat />
        // },
        {
            label: t("title.calculation"),
            path: "/calculation",
            badgeCounts: calculationStore?.listOfCalc?.length,
            icon: <CalculatorIcon />
        },
        {
            label: t("title.settings"),
            path: "/setting",
            icon: <Settings />
        }
    ]

    return (
        <div className="fixed bottom-0 w-full z-50 border-t bg-white">
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                    navigate(newValue);
                }}
                showLabels
            >
                {tabs.map((tab, idx) =>
                    <BottomNavigationAction
                        key={idx}
                        label={tab.label}
                        value={tab.path}
                        icon={
                            <Badge badgeContent={tab.badgeCounts} color="primary">
                                {tab.icon}
                            </Badge>
                        }
                    />
                )}
            </BottomNavigation>
        </div>
    );
}
