import { BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalculatorIcon, ListCheck, Repeat } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function BottomMobileBar() {
    const calculationStore = useSelector((state: any) => state.calculation);
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState('/multiple');

    useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    const tabs = [
        {
            label: "Multiple",
            path: "/multiple",
            icon: <ListCheck />
        },
        {
            label: "Single",
            path: "/single",
            icon: <Repeat />
        },
        {
            label: "Calculation",
            path: "/calculation",
            badgeCounts: calculationStore?.listOfCalc?.length,
            icon: <CalculatorIcon />
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
