import UnitDetails from "@/interface/UnitDetails";

const unitDetails: UnitDetails = {
    Guntha: {
        Guntha: 1,
        Bigha: 0.0625, // 1/16
        Acre: 0.025, // 1/40
        Hectare: 0.010162, // Approx, based on 1 Guntha = 101.1714 sq m
        Are: 0.098842, // Approx, based on 1 Guntha = 101.1714 sq m
        Var: 121, // 1089 sq ft / 9 sq ft/var
        SquareFeet: 1089.0, // 33ft x 33ft
        SquareMeter: 101.1714, // 1089 sq ft * 0.092903 sq m/sq ft
    },
    Bigha: {
        Guntha: 16.0, // 16 Guntha = 1 Bigha (Dwarka, Gujarat)
        Bigha: 1,
        Acre: 0.4, // Approx, 16 Guntha / 40 Guntha per Acre
        Hectare: 0.162597, // Approx, based on 1 Bigha = 1618.7424 sq m
        Are: 1.618742, // Approx, based on 1 Bigha = 1618.7424 sq m
        Var: 1936, // 16 Guntha * 121 Var/Guntha
        SquareFeet: 17424.0, // 1936 Var * 9 sq ft/Var
        SquareMeter: 1618.7424, // 17424 sq ft * 0.092903 sq m/sq ft
    },
    Acre: {
        Guntha: 40.0, // 40 Guntha = 1 Acre
        Bigha: 2.5, // 40 Guntha / 16 Guntha per Bigha
        Acre: 1,
        Hectare: 0.404686, // Standard conversion
        Are: 40.4686, // 1 Acre = 4046.86 sq m, 1 Are = 100 sq m
        Var: 4840, // 4840 Square Yards = 1 Acre
        SquareFeet: 43560.0, // Standard conversion
        SquareMeter: 4046.86, // Standard conversion
    },
    Hectare: {
        Guntha: 98.425197, // 10000 sq m / 101.1714 sq m/guntha
        Bigha: 6.1776, // 10000 sq m / 1618.7424 sq m/bigha
        Acre: 2.471054, // Standard conversion
        Hectare: 1,
        Are: 100.0, // 1 Hectare = 100 Are
        Var: 11959.900463, // 10000 sq m / 0.83612736 sq m/var
        SquareFeet: 107639.104167, // 10000 sq m / 0.092903 sq m/sq ft
        SquareMeter: 10000.0, // Standard conversion
    },
    Are: {
        Guntha: 0.988421, // 100 sq m / 101.1714 sq m/guntha
        Bigha: 0.061776, // 100 sq m / 1618.7424 sq m/bigha
        Acre: 0.024711, // 100 sq m / 4046.86 sq m/acre
        Hectare: 0.01, // 1 Are = 0.01 Hectare
        Are: 1,
        Var: 119.599, // 100 sq m / 0.83612736 sq m/var
        SquareFeet: 1076.391042, // 100 sq m / 0.092903 sq m/sq ft
        SquareMeter: 100.0, // Standard conversion
    },
    Var: {
        Guntha: 0.008264, // 1/121 approx.
        Bigha: 0.0005165, // 1/1936 approx.
        Acre: 0.0002066, // 1/4840 approx.
        Hectare: 0.00008361, // 1/11959.900463 approx.
        Are: 0.008361, // 1/119.599 approx.
        Var: 1,
        SquareFeet: 9,
        SquareMeter: 0.83612736,
    },
    SquareFeet: {
        Guntha: 0.000918, // 1/1089
        Bigha: 0.000057, // 1/17424
        Acre: 0.000023, // 1/43560
        Hectare: 0.000093, // 1/107639.104167
        Are: 0.000093, // 1/1076.391042
        Var: 0.111111, // 1/9
        SquareFeet: 1,
        SquareMeter: 0.092903, // Standard conversion
    },
    SquareMeter: {
        Guntha: 0.009882, // 1/101.1714
        Bigha: 0.000618, // 1/1618.7424
        Acre: 0.000247, // 1/4046.86
        Hectare: 0.0001, // 1/10000
        Are: 0.01, // 1/100
        Var: 1.19599, // 1/0.83612736
        SquareFeet: 10.76391, // 1/0.092903
        SquareMeter: 1,
    }
};

export default unitDetails;