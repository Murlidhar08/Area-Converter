import UnitDetails from "@/interface/UnitDetails";

const unitDetails: UnitDetails = {
    Guntha: {
        Guntha: 1,
        Bigha: 0.0625,
        Acre: 0.025,
        Hectare: 0.010162,
        Are: 0.098842,
        SquareFeet: 1089.0,
        SquareMeter: 101.1714,
    },
    Bigha: {
        Guntha: 16.0,
        Bigha: 1,
        Acre: 0.4,
        Hectare: 0.162597,
        Are: 1.618742,
        SquareFeet: 17424.0,
        SquareMeter: 1618.7424,
    },
    Acre: {
        Guntha: 40.0,
        Bigha: 2.5,
        Acre: 1,
        Hectare: 0.404686,
        Are: 4.04686,
        SquareFeet: 43560.0,
        SquareMeter: 4046.86,
    },
    Hectare: {
        Guntha: 98.425197,
        Bigha: 6.151575,
        Acre: 2.471054,
        Hectare: 1,
        Are: 10.0,
        SquareFeet: 107639.104167,
        SquareMeter: 10000.0,
    },
    Are: {
        Guntha: 0.988421,
        Bigha: 0.061776,
        Acre: 0.024711,
        Hectare: 0.1,
        Are: 1,
        SquareFeet: 1076.391042,
        SquareMeter: 100.0,
    },
    SquareFeet: {
        Guntha: 0.000918,
        Bigha: 0.000057,
        Acre: 0.000023,
        Hectare: 0.000093,
        Are: 0.000093,
        SquareFeet: 1,
        SquareMeter: 0.092903,
    },
    SquareMeter: {
        Guntha: 0.009882,
        Bigha: 0.000618,
        Acre: 0.000247,
        Hectare: 0.01,
        Are: 0.01,
        SquareFeet: 10.76391,
        SquareMeter: 1,
    }
};

export default unitDetails;