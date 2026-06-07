export const expertResponseTemplates: Record<
  string,
  { label: string; body: string }
> = {
  probation: {
    label: "Probation — general guidance",
    body: `Thank you for your request regarding probation declaration.

Based on the details provided, please verify:
1. Probation completion date (joining date + probation period ± EOL extension)
2. ACRs for the full probation period are on file
3. No pending disciplinary proceedings

Prepare proceedings citing the appointment order and route to your Head of Office for approval. Update the Service Register on the date of declaration.

If you can share your appointment order date and probation period, we can confirm the eligibility timeline.`,
  },
  apgli: {
    label: "APGLI loan — general guidance",
    body: `Thank you for your APGLI loan query.

Please confirm:
1. Current APGLI policy status and subscription
2. Loan amount within eligible limits
3. Application format with DDO endorsement

Forward the application through establishment to DDO. Retain office copy of sanction for audit.

Attach latest pay slip and APGLI policy statement if available.`,
  },
  gpf: {
    label: "GPF advance — general guidance",
    body: `Thank you for your GPF advance query.

Verify account balance and advance type (temporary/non-temporary) against GPF rules. Complete the prescribed application with purpose declaration and route through DDO.

Ensure recovery schedule is noted in the sanction order and SR entry is made on disbursement.`,
  },
  medical: {
    label: "Medical reimbursement — general guidance",
    body: `Thank you for your medical reimbursement query.

Check eligibility under current medical rules/EHS. Bills should include prescriptions, discharge summary (if inpatient), and payment receipts.

Prepare bill in prescribed format and route for administrative approval before treasury submission.`,
  },
  sr: {
    label: "Service Register — general guidance",
    body: `Thank you for your Service Register query.

SR entries must match authenticated orders. For corrections, prepare a note citing the incorrect entry, correct order, and route for Head of Office approval before amending the SR.

Never make retrospective entries without proper sanction.`,
  },
  general: {
    label: "General — request more info",
    body: `Thank you for contacting OfficeMitra Expert Assistance.

To provide specific guidance, please share:
1. Relevant order numbers and dates
2. Employee category and institution type
3. What action you have already taken

We will respond with procedure steps and document checklist based on your case.`,
  },
};
