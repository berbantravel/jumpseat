type PaymentMethod = {
    id: number;
    name: string;
};

type PaymentGroup = {
    name: string;
    methods: PaymentMethod[];
};

export const paymentGroups: PaymentGroup[] = [
    {
        name: 'Credit Card',
        methods: [
            { id: 1, name: 'Credit Card (PHP)' },
            { id: 7, name: 'Credit Card (USD)' },
        ],
    },
    {
        name: 'Installments',
        methods: [
            { id: 37, name: 'BDO Installment' },
            { id: 134, name: 'BillEase' },
            // INSTALLMENTS in production//
            // { id: 107, name: 'BPI Installment 0%' },
            { id: 80, name: 'BPI Real 0% Installment (3 Months)' },
            { id: 81, name: 'BPI Real 0% Installment (6 Months)' },
            { id: 82, name: 'BPI Real 0% Installment (9 Months)' },
            { id: 83, name: 'BPI Real 0% Installment (12 Months)' },
            { id: 87, name: 'BPI SIP Monthly Add-On (3 Months)' },
            { id: 88, name: 'BPI SIP Monthly Add-On (6 Months)' },
            { id: 139, name: 'Home Credit' },
            { id: 94, name: 'Metrobank 0% Installment with Shop Now, Pay Later' },
            { id: 72, name: 'Metrobank 0% Installment' },
            { id: 104, name: 'Metrobank Regular Installment' },
            { id: 97, name: 'Robinsons Bank Installment' },
        ],
    },
    {
        name: 'e-Wallets',
        methods: [
            { id: 130, name: 'AliPay QR via AUB' },
            { id: 3, name: 'GCash' },
            { id: 38, name: 'GrabPay' },
            { id: 57, name: 'Maya' },
            { id: 6, name: 'PayPal' },
            { id: 103, name: 'ShopeePay' },
            { id: 129, name: 'WeChatPay QR via AUB' },
        ],
    },
    {
        name: 'Online Banking',
        methods: [
            { id: 58, name: 'BPI Online' },
            { id: 69, name: 'Brankas Online (BDO, BPI, Metrobank, UnionBank, RCBC, and Landbank' },
            { id: 18, name: 'DragonPay Online' },
        ],
    },
    {
        name: 'Offline Banking',
        methods: [
            { id: 20, name: 'DragonPay OTC Bank ((AUB Online / Cash Payment, Banco de Oro ATM, BDO Cash Deposit w/Ref, BDO Network Bank (formerly ONB) Cash Dep, China Bank Cash Payment, EastWest Online / Cash Payment, i2i Rural Banks, Landbank Cash Payment, Metrobank Cash Payment, PNB Cash Payment, PNB Internet Banking Bills Payment, RCBC ATM / Cash Payment, RobinsonsBank Cash Payment, Security Bank Cash Payment, BPI)' },
            { id: 19, name: 'DragonPay OTC Non-Bank (Cebuana Lhuillier Bills Payment, CVM Pawnshop and Money Changer, ECPay (GCash / Payment Centers), M. Lhuilier, Palawan Pawnshop, Perahub, Posible (Family Mart, Phoenix), Robinsons Dept Store, SM Dept / Supermarket / Savemore Counter, Tambunting Pawnshop, USSC, Villarica Pawnshop)' },
        ],
    },
];