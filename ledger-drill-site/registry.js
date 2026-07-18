/* ================================================================
   REGISTRY
   ----------------------------------------------------------------
   This file defines:
   1) The 3 CFA levels (name + roman numeral shown on the landing page)
   2) The 10 CFA subjects (name + short code shown as tiles/tabs)
   3) The empty DATA container that each data/*.js file plugs into

   You will almost never need to edit this file. Renaming a level or
   subject, or changing a display code, is the only reason to.
   ================================================================ */

const LEVELS = [
  { key:'l1', label:'Level I',   roman:'I'   },
  { key:'l2', label:'Level II',  roman:'II'  },
  { key:'l3', label:'Level III', roman:'III' },
];

const SUBJECTS = [
  { key:'ethics',       name:'Ethical and Professional Standards',      code:'ETH'   },
  { key:'quant',        name:'Quantitative Methods',                    code:'QM'    },
  { key:'economics',    name:'Economics',                               code:'ECON'  },
  { key:'fra',          name:'Financial Statement Analysis',            code:'FRA'   },
  { key:'corporate',    name:'Corporate Issuers',                       code:'CI'    },
  { key:'equity',       name:'Equity Investments',                      code:'EQ'    },
  { key:'fixedincome',  name:'Fixed Income',                            code:'FI'    },
  { key:'derivatives',  name:'Derivatives',                             code:'DERIV' },
  { key:'alternatives', name:'Alternative Investments',                 code:'ALT'   },
  { key:'portfolio',    name:'Portfolio Management and Wealth Planning',code:'PM'    },
];

// Every data/*.js file plugs its formulas into this shared object,
// e.g. DATA.l2.fra = [...], DATA.l2.equity = [...], DATA.l1.fra = [...]
const DATA = {};
