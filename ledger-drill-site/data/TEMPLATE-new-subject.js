/* ================================================================
   TEMPLATE — copy this file to add a new subject.

   HOW TO USE:
   1. Duplicate this file. Name it like the existing one:
        data/{level}-{subject}.js
      e.g. data/l2-equity.js  or  data/l1-fra.js

   2. Change the two lines below:
        DATA.l2               -> match the level key (l1 / l2 / l3)
        DATA.l2.equity        -> match the subject key from registry.js
      Subject keys (must match registry.js exactly):
        ethics, quant, economics, fra, corporate, equity,
        fixedincome, derivatives, alternatives, portfolio

   3. Replace the example formula below with your real formulas
      (same shape as every formula already in data/l2-fra.js).

   4. Open index.html, find the <script> list near the bottom, and
      add ONE line for your new file, BEFORE the app.js line:
        <script src="data/l2-equity.js"></script>

   That's it — the subject will appear on the grid automatically,
   with the correct formula count. Nothing else needs to change.
   ================================================================ */

DATA.l2 = DATA.l2 || {};
DATA.l2.equity = [
  // ---- EXAMPLE FORMULA — delete this once you add real ones ----
  {
    id: 'example_formula',
    name: 'Example Formula Name',
    type: 'list',            // use 'list' if there's no division, or 'fraction' if there is
    terms: [
      { id:'ex_term_1', label:'+ First Correct Term' },
      { id:'ex_term_2', label:'− Second Correct Term' },
    ],
    distractors: [
      { id:'ex_wrong_1', label:'A Plausible Wrong Term' },
      { id:'ex_wrong_2', label:'Another Plausible Wrong Term' },
    ],
  },

  // ---- FRACTION EXAMPLE (numerator / denominator) ----
  // {
  //   id: 'example_fraction',
  //   name: 'Example Ratio Name',
  //   type: 'fraction',
  //   numerator:   [ { id:'ex_num_1', label:'+ Numerator Term' } ],
  //   denominator: [ { id:'ex_den_1', label:'Denominator Term' } ],
  //   distractors: [
  //     { id:'ex_wrong_3', label:'Wrong Term' },
  //     { id:'ex_wrong_4', label:'Another Wrong Term' },
  //   ],
  // },
];
