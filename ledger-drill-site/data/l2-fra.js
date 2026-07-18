// LEVEL II  ›  FINANCIAL STATEMENT ANALYSIS
// ---------------------------------------------------------------
DATA.l2 = DATA.l2 || {};
DATA.l2.fra = [
  {
    id: 'noa',
    name: 'Net Operating Assets (NOA)',
    type: 'list',
    terms: [
      { id:'opassets', label:'+ Operating Assets' },
      { id:'opliab',   label:'− Operating Liabilities' },
    ],
    distractors: [
      { id:'totalassets', label:'Total Assets' },
      { id:'totalliab',   label:'Total Liabilities' },
      { id:'cash',         label:'Cash & Equivalents' },
    ],
  },
  {
    id: 'ccc',
    name: 'Cash Conversion Cycle',
    type: 'list',
    terms: [
      { id:'dso', label:'+ Days Sales Outstanding' },
      { id:'dio', label:'+ Days Inventory Outstanding' },
      { id:'dpo', label:'− Days Payables Outstanding' },
    ],
    distractors: [
      { id:'dcash',     label:'Days Cash on Hand' },
      { id:'assetturn', label:'Asset Turnover' },
    ],
  },
  {
    id: 'fcff_ni',
    name: 'FCFF from Net Income',
    type: 'list',
    terms: [
      { id:'ni3',      label:'+ Net Income' },
      { id:'ncc',      label:'+ Net Non-Cash Charges' },
      { id:'intafter', label:'+ Interest Expense × (1 − Tax Rate)' },
      { id:'fcinv',    label:'− Fixed Capital Investment' },
      { id:'wcinv',    label:'− Working Capital Investment' },
    ],
    distractors: [
      { id:'div',       label:'Dividends Paid' },
      { id:'netborrow', label:'Net Borrowing' },
    ],
  },
  {
    id: 'fcff_cfo',
    name: 'FCFF from CFO',
    type: 'list',
    terms: [
      { id:'cfo3',      label:'+ CFO' },
      { id:'intafter2', label:'+ Interest Expense × (1 − Tax Rate)' },
      { id:'fcinv2',    label:'− Fixed Capital Investment' },
    ],
    distractors: [
      { id:'wcinv2', label:'Working Capital Investment' },
      { id:'ni4',    label:'Net Income' },
    ],
  },
  {
    id: 'fcfe_fcff',
    name: 'FCFE from FCFF',
    type: 'list',
    terms: [
      { id:'fcff',      label:'+ FCFF' },
      { id:'intafter3', label:'− Interest Expense × (1 − Tax Rate)' },
      { id:'netborrow2',label:'+ Net Borrowing' },
    ],
    distractors: [
      { id:'ncc2', label:'Net Non-Cash Charges' },
      { id:'div2', label:'Dividends Paid' },
    ],
  },
  {
    id: 'fcfe_cfo',
    name: 'FCFE from CFO',
    type: 'list',
    terms: [
      { id:'cfo4',       label:'+ CFO' },
      { id:'fcinv3',     label:'− Fixed Capital Investment' },
      { id:'netborrow3', label:'+ Net Borrowing' },
    ],
    distractors: [
      { id:'intafter4', label:'Interest Expense × (1 − Tax Rate)' },
      { id:'ni5',       label:'Net Income' },
    ],
  },
  {
    id: 'fcfe_ni',
    name: 'FCFE from Net Income',
    type: 'list',
    terms: [
      { id:'ni6',        label:'+ Net Income' },
      { id:'ncc3',       label:'+ Net Non-Cash Charges' },
      { id:'fcinv4',     label:'− Fixed Capital Investment' },
      { id:'wcinv3',     label:'− Working Capital Investment' },
      { id:'netborrow4', label:'+ Net Borrowing' },
    ],
    distractors: [
      { id:'intafter5', label:'Interest Expense × (1 − Tax Rate)' },
      { id:'div3',      label:'Dividends Paid' },
    ],
  },
  {
    id: 'efftax',
    name: 'Effective Tax Rate',
    type: 'fraction',
    numerator:   [ { id:'taxexp', label:'Income Tax Expense' } ],
    denominator: [ { id:'pretax', label:'Pretax Income' } ],
    distractors: [
      { id:'statrate', label:'Statutory Tax Rate' },
      { id:'deftax',   label:'Deferred Tax Liability' },
    ],
  },
  {
    id: 'basiceps',
    name: 'Basic EPS',
    type: 'fraction',
    numerator: [
      { id:'nia',     label:'+ Net Income' },
      { id:'prefdiv', label:'− Preferred Dividends' },
    ],
    denominator: [ { id:'wasc', label:'Weighted Avg Shares Outstanding' } ],
    distractors: [
      { id:'dilutedshares', label:'Diluted Shares Outstanding' },
      { id:'totalequity',   label:'Total Equity' },
    ],
  },
  {
    id: 'full_goodwill',
    name: 'Full Goodwill',
    type: 'list',
    terms: [
      { id:'fg_fv_sub_1',          label:'+ Fair Value of Entire Subsidiary' },
      { id:'fg_identifiable_na_1', label:'− Fair Value of Identifiable Net Assets' },
    ],
    distractors: [
      { id:'fg_purchase_price_1', label:'Purchase Price' },
      { id:'fg_book_value_1',     label:'Book Value of Net Assets' },
      { id:'fg_nci_1',            label:'Noncontrolling Interest' },
    ],
  },
  {
    id: 'partial_goodwill',
    name: 'Partial Goodwill',
    type: 'list',
    terms: [
      { id:'pg_purchase_price_1',   label:'+ Purchase Price' },
      { id:'pg_owned_netassets_1',  label:'− % Owned × FV of Identifiable Net Assets' },
    ],
    distractors: [
      { id:'pg_full_sub_fv_1',    label:'Fair Value of Entire Subsidiary' },
      { id:'pg_book_na_1',        label:'Book Value of Net Assets' },
      { id:'pg_expected_return_1',label:'Expected Return on Plan Assets' },
    ],
  },
  {
    id: 'nci_full_goodwill',
    name: 'Noncontrolling Interest — Full Goodwill',
    type: 'list',
    terms: [
      { id:'nci_full_fv_1', label:'+ % Not Owned × Fair Value of Entire Subsidiary' },
    ],
    distractors: [
      { id:'nci_full_identifiable_1', label:'FV of Identifiable Net Assets' },
      { id:'nci_full_purchase_1',     label:'Purchase Price' },
    ],
  },
  {
    id: 'nci_partial_goodwill',
    name: 'Noncontrolling Interest — Partial Goodwill',
    type: 'list',
    terms: [
      { id:'nci_partial_identifiable_1', label:'+ % Not Owned × FV of Identifiable Net Assets' },
    ],
    distractors: [
      { id:'nci_partial_subfv_1',   label:'Fair Value of Entire Subsidiary' },
      { id:'nci_partial_goodwill_1',label:'Goodwill' },
    ],
  },
  {
    id: 'pension_expense_ifrs',
    name: 'Pension Expense — IFRS',
    type: 'list',
    terms: [
      { id:'pe_ifrs_csc_1',    label:'+ Current Service Cost' },
      { id:'pe_ifrs_psc_1',    label:'+ Past Service Cost' },
      { id:'pe_ifrs_netint_1', label:'+ Net Interest Cost' },
    ],
    distractors: [
      { id:'pe_ifrs_expected_1', label:'Expected Return on Plan Assets' },
      { id:'pe_ifrs_actual_1',   label:'Actual Return on Plan Assets' },
    ],
  },
  {
    id: 'net_interest_ifrs',
    name: 'Net Interest Cost — IFRS',
    type: 'list',
    terms: [
      { id:'ni_ifrs_funded_1',   label:'+ Beginning Funded Status' },
      { id:'ni_ifrs_psc_1',      label:'+ Past Service Cost' },
      { id:'ni_ifrs_discount_1', label:'× Discount Rate' },
    ],
    distractors: [
      { id:'ni_ifrs_planassets_1', label:'Beginning Plan Assets' },
      { id:'ni_ifrs_expected_1',   label:'Expected Return' },
    ],
  },
  {
    id: 'interest_cost_gaap',
    name: 'Interest Cost — US GAAP',
    type: 'list',
    terms: [
      { id:'ic_gaap_pbo_1',      label:'+ Beginning PBO' },
      { id:'ic_gaap_psc_1',      label:'+ Past Service Cost' },
      { id:'ic_gaap_discount_1', label:'× Discount Rate' },
    ],
    distractors: [
      { id:'ic_gaap_funded_1',   label:'Funded Status' },
      { id:'ic_gaap_expected_1', label:'Expected Return' },
    ],
  },
  {
    id: 'pension_expense_gaap',
    name: 'Pension Expense — US GAAP',
    type: 'list',
    terms: [
      { id:'peg_csc_1',      label:'+ Current Service Cost' },
      { id:'peg_interest_1', label:'+ Interest Cost' },
      { id:'peg_expected_1', label:'− Expected Return on Plan Assets' },
    ],
    distractors: [
      { id:'peg_actual_1', label:'Actual Return on Plan Assets' },
      { id:'peg_funded_1', label:'Funded Status' },
    ],
  },
  {
    id: 'ending_pbo',
    name: 'Ending Projected Benefit Obligation',
    type: 'list',
    terms: [
      { id:'pbo_begin_1',   label:'+ Beginning PBO' },
      { id:'pbo_csc_1',     label:'+ Current Service Cost' },
      { id:'pbo_interest_1',label:'+ Interest Cost' },
      { id:'pbo_psc_1',     label:'+ Past Service Cost' },
      { id:'pbo_actloss_1', label:'+ Actuarial Loss' },
      { id:'pbo_actgain_1', label:'− Actuarial Gain' },
      { id:'pbo_benefits_1',label:'− Benefits Paid' },
    ],
    distractors: [
      { id:'pbo_contribution_1', label:'Employer Contributions' },
      { id:'pbo_expected_1',     label:'Expected Return' },
    ],
  },
  {
    id: 'ending_plan_assets',
    name: 'Ending Plan Assets',
    type: 'list',
    terms: [
      { id:'pa_begin_1',    label:'+ Beginning Plan Assets' },
      { id:'pa_contrib_1',  label:'+ Contributions' },
      { id:'pa_actual_1',   label:'+ Actual Return' },
      { id:'pa_benefits_1', label:'− Benefits Paid' },
    ],
    distractors: [
      { id:'pa_expected_1', label:'Expected Return' },
      { id:'pa_interest_1', label:'Interest Cost' },
    ],
  },
  {
    id: 'combined_ratio',
    name: 'Combined Ratio',
    type: 'list',
    terms: [
      { id:'cr_loss_1',    label:'+ Loss Ratio' },
      { id:'cr_expense_1', label:'+ Expense Ratio' },
    ],
    distractors: [
      { id:'cr_dividend_1',   label:'Dividend Ratio' },
      { id:'cr_investment_1', label:'Investment Yield' },
    ],
  },
  {
    id: 'industry_combined_ratio',
    name: 'Industry Combined Ratio',
    type: 'fraction',
    numerator:   [ { id:'icr_expense_1', label:'+ Total Insurance Expense' } ],
    denominator: [ { id:'icr_premium_1', label:'Net Premium Earned' } ],
    distractors: [
      { id:'icr_written_1', label:'Net Premium Written' },
      { id:'icr_claims_1',  label:'Claims Paid' },
    ],
  },
  {
    id: 'expense_ratio',
    name: 'Expense Ratio',
    type: 'fraction',
    numerator: [
      { id:'er_underwriting_1', label:'+ Underwriting Expense' },
      { id:'er_commission_1',   label:'+ Commission' },
    ],
    denominator: [ { id:'er_premium_1', label:'Net Premium Written' } ],
    distractors: [
      { id:'er_claims_1',   label:'Claims Paid' },
      { id:'er_reserves_1', label:'Loss Reserves' },
    ],
  },
  {
    id: 'loss_ratio',
    name: 'Loss Ratio',
    type: 'fraction',
    numerator: [
      { id:'lr_claims_1',   label:'+ Claims Paid' },
      { id:'lr_reserves_1', label:'+ Change in Loss Reserves' },
    ],
    denominator: [ { id:'lr_premium_1', label:'Net Premium Earned' } ],
    distractors: [
      { id:'lr_commission_1', label:'Commission Expense' },
      { id:'lr_written_1',    label:'Net Premium Written' },
    ],
  },
  {
    id: 'crad',
    name: 'Combined Ratio After Dividends',
    type: 'list',
    terms: [
      { id:'crad_combined_1', label:'+ Combined Ratio' },
      { id:'crad_dividend_1', label:'+ Dividend Ratio' },
    ],
    distractors: [
      { id:'crad_loss_1',    label:'Loss Ratio' },
      { id:'crad_expense_1', label:'Expense Ratio' },
    ],
  },
  {
    id: 'accruals_bs',
    name: 'Accruals — Balance Sheet Approach',
    type: 'list',
    terms: [
      { id:'abs_noa_end_1',   label:'+ Ending NOA' },
      { id:'abs_noa_begin_1', label:'− Beginning NOA' },
    ],
    distractors: [
      { id:'abs_cfo_1', label:'CFO' },
      { id:'abs_ni_1',  label:'Net Income' },
    ],
  },
  {
    id: 'operating_assets',
    name: 'Operating Assets',
    type: 'list',
    terms: [
      { id:'oa_totalassets_1', label:'+ Total Assets' },
      { id:'oa_cash_1',        label:'− Cash' },
      { id:'oa_casheq_1',      label:'− Cash Equivalents' },
      { id:'oa_marketable_1',  label:'− Marketable Securities' },
    ],
    distractors: [
      { id:'oa_inventory_1', label:'Inventory' },
      { id:'oa_ppe_1',       label:'Property, Plant & Equipment' },
    ],
  },
  {
    id: 'operating_liabilities',
    name: 'Operating Liabilities',
    type: 'list',
    terms: [
      { id:'ol_totalliab_1', label:'+ Total Liabilities' },
      { id:'ol_debt_1',      label:'− Interest-Bearing Debt' },
    ],
    distractors: [
      { id:'ol_accounts_1', label:'Accounts Payable' },
      { id:'ol_accrued_1',  label:'Accrued Expenses' },
    ],
  },
  {
    id: 'accrual_ratio_bs',
    name: 'Accrual Ratio — Balance Sheet Approach',
    type: 'fraction',
    numerator: [
      { id:'arb_end_1',   label:'+ Ending NOA' },
      { id:'arb_begin_1', label:'− Beginning NOA' },
    ],
    denominator: [ { id:'arb_avg_1', label:'Average NOA' } ],
    distractors: [
      { id:'arb_assets_1', label:'Average Total Assets' },
      { id:'arb_equity_1', label:'Average Equity' },
    ],
  },
  {
    id: 'accrual_ratio_cf',
    name: 'Accrual Ratio — Cash Flow Approach',
    type: 'fraction',
    numerator: [
      { id:'arcf_ni_1',  label:'+ Net Income' },
      { id:'arcf_cfo_1', label:'− CFO' },
      { id:'arcf_cfi_1', label:'− CFI' },
    ],
    denominator: [ { id:'arcf_avgnoa_1', label:'Average NOA' } ],
    distractors: [
      { id:'arcf_cff_1',  label:'CFF' },
      { id:'arcf_ebit_1', label:'EBIT' },
      { id:'arcf_fcff_1', label:'FCFF' },
    ],
  },
  {
    id: 'cgo_cfo',
    name: 'Cash Generated from Operations — CFO Method',
    type: 'list',
    terms: [
      { id:'cgo_cfo_1',      label:'+ CFO' },
      { id:'cgo_interest_1', label:'+ Interest' },
      { id:'cgo_taxes_1',    label:'+ Taxes' },
    ],
    distractors: [
      { id:'cgo_cfi_1',      label:'CFI' },
      { id:'cgo_dividend_1', label:'Dividends Paid' },
    ],
  },
  {
    id: 'cgo_ebit',
    name: 'Cash Generated from Operations — EBIT Method',
    type: 'list',
    terms: [
      { id:'cgob_ebit_1',    label:'+ EBIT' },
      { id:'cgob_noncash_1', label:'+ Noncash Charges' },
      { id:'cgob_wc_1',      label:'− Increase in Working Capital' },
    ],
    distractors: [
      { id:'cgob_interest_1', label:'Interest Expense' },
      { id:'cgob_capex_1',    label:'Capital Expenditure' },
    ],
  },
  {
    id: 'treasury_shares',
    name: 'Treasury Shares Repurchased',
    type: 'fraction',
    numerator:   [ { id:'ts_proceeds_1', label:'+ Assumed Proceeds' } ],
    denominator: [ { id:'ts_avgprice_1', label:'Average Market Price' } ],
    distractors: [
      { id:'ts_exercise_1', label:'Exercise Price' },
      { id:'ts_book_1',     label:'Book Value per Share' },
    ],
  },
  {
    id: 'assumed_proceeds',
    name: 'Assumed Proceeds',
    type: 'list',
    terms: [
      { id:'ap_cash_1',  label:'+ Cash Proceeds' },
      { id:'ap_unrec_1', label:'+ Average Unrecognized Compensation' },
    ],
    distractors: [
      { id:'ap_market_1',   label:'Market Capitalization' },
      { id:'ap_retained_1', label:'Retained Earnings' },
    ],
  },
  {
    id: 'cash_proceeds',
    name: 'Cash Proceeds',
    type: 'list',
    terms: [
      { id:'cp_options_1',  label:'+ Number of Options' },
      { id:'cp_exercise_1', label:'× Exercise Price' },
    ],
    distractors: [
      { id:'cp_spot_1',     label:'Spot Price' },
      { id:'cp_avgprice_1', label:'Average Market Price' },
    ],
  },
  {
    id: 'incremental_shares',
    name: 'Incremental Shares',
    type: 'list',
    terms: [
      { id:'is_options_1',  label:'+ Options Outstanding' },
      { id:'is_treasury_1', label:'− Treasury Shares Repurchased' },
    ],
    distractors: [
      { id:'is_common_1',    label:'Common Shares Outstanding' },
      { id:'is_repurchase_1',label:'Share Buybacks' },
    ],
  },
  {
    id: 'goodwill_impairment_ifrs',
    name: 'Goodwill Impairment — IFRS',
    type: 'list',
    terms: [
      { id:'gwi_cv_1', label:'+ Carrying Value' },
      { id:'gwi_ra_1', label:'− Recoverable Amount' },
    ],
    distractors: [
      { id:'gwi_fv_1',   label:'Fair Value' },
      { id:'gwi_book_1', label:'Book Value of Net Assets' },
    ],
  },
  {
    id: 'goodwill_impairment_gaap',
    name: 'Goodwill Impairment — US GAAP',
    type: 'list',
    terms: [
      { id:'gwg_cv_1',       label:'+ Carrying Value' },
      { id:'gwg_impaired_1', label:'− Implied Fair Value' },
    ],
    distractors: [
      { id:'gwg_recoverable_1', label:'Recoverable Amount' },
      { id:'gwg_purchase_1',    label:'Purchase Price' },
    ],
  },
  {
    id: 'stock_grant_tax_deduction',
    name: 'Stock Grant Tax Deduction',
    type: 'list',
    terms: [
      { id:'sg_shareprice_1', label:'+ Share Price at Settlement' },
      { id:'sg_vested_1',     label:'× Shares Vested' },
    ],
    distractors: [
      { id:'sg_exercise_1',  label:'Exercise Price' },
      { id:'sg_avgmarket_1', label:'Average Market Price' },
    ],
  },
  {
    id: 'stock_option_tax_deduction',
    name: 'Stock Option Tax Deduction',
    type: 'list',
    terms: [
      { id:'so_spread_1',  label:'+ Spot Price − Exercise Price' },
      { id:'so_options_1', label:'× Options Exercised' },
    ],
    distractors: [
      { id:'so_settlement_1', label:'Settlement Date Price' },
      { id:'so_book_1',       label:'Book Value per Share' },
    ],
  },
];
