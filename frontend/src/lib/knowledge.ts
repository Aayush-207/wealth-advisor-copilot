import catalogue from "./documents.json";
export type DocumentCategory =
  "Taxation" | "Compliance" | "Investor protection" | "Operations";
export type ReferenceDocument = {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  category: DocumentCategory;
  date: string;
  pages: number;
  source: string;
  file: string;
  summary: string;
  sha256: string;
  bytes: number;
  note: string;
};
export const documents = catalogue as ReferenceDocument[];
export type Citation = {
  documentId: string;
  page: number;
  section: string;
  summary: string;
};
export type Response = {
  id: string;
  eyebrow: string;
  title: string;
  status: string;
  intro: string;
  table?: { headers: string[]; rows: string[][] };
  sections: { title: string; text: string; citation?: number }[];
  example?: { label: string; text: string };
  next: string;
  citations: Citation[];
};
export const prompts = [
  {
    title: "Capital Gains Tax",
    text: "What is the capital gains tax for equity mutual funds?",
    tag: "TAXATION",
    icon: "chart",
  },
  {
    title: "Fee Structures",
    text: "Fee structure for Global Equity Fund",
    tag: "PRODUCT KNOWLEDGE",
    icon: "layers",
  },
  {
    title: "Compliance",
    text: "Are there any constraints for offshore trusts?",
    tag: "CROSS-BORDER",
    icon: "shield",
  },
] as const;
export const responses: Record<string, Response> = {
  tax: {
    id: "tax",
    eyebrow: "TAXATION / INDIA",
    title: "Equity gains, clearly explained.",
    status: "Context required",
    intro:
      "The reference framework distinguishes short-term and long-term gains. The figures below describe the post–23 July 2024 rules in the attached Income Tax Department materials under the Income-tax Act, 1961. Confirm the transaction date and applicable tax year before using them for a client.",
    table: {
      headers: ["Holding period", "Base tax rate", "What it applies to"],
      rows: [
        ["12 months or less", "20%", "Qualifying short-term gains"],
        [
          "More than 12 months",
          "12.5%",
          "Qualifying annual long-term gains above ₹1.25 lakh",
        ],
      ],
    },
    sections: [
      {
        title: "01 / Check the qualifying conditions",
        text: "These rates concern qualifying equity-oriented funds and the relevant STT conditions. Do not apply the equity treatment to every mutual fund. Applicable surcharge and cess are additional.",
        citation: 1,
      },
      {
        title: "02 / Read the allowance correctly",
        text: "The ₹1.25 lakh threshold relates to the aggregate qualifying long-term gains for the year; it is not a separate allowance for each fund or each sale.",
        citation: 0,
      },
      {
        title: "03 / Establish the client’s context",
        text: "Record residence, fund classification, acquisition and sale dates, gains and losses, and the tax year. This saved response does not establish the treatment under the Income-tax Act, 2025 or subsequent amendments.",
      },
    ],
    example: {
      label: "ILLUSTRATIVE CALCULATION",
      text: "Assuming ₹2,00,000 of qualifying annual long-term gains and the full ₹1,25,000 threshold available: (₹2,00,000 − ₹1,25,000) × 12.5% = ₹9,375 base tax, before surcharge, cess and other adjustments.",
    },
    next: "Confirm the applicable tax year and have the tax specialist review the calculation before sharing a client-specific figure.",
    citations: [
      {
        documentId: "capital-gains-guide",
        page: 20,
        section: "Section 112A · Aggregate annual gains",
        summary:
          "PDF page 20 explains the aggregate annual long-term gains threshold, qualifying securities and the associated STT conditions.",
      },
      {
        documentId: "capital-gains-guide",
        page: 21,
        section: "Tax rates · Specified listed securities",
        summary:
          "The departmental guide summarises the rates and STT conditions on PDF page 21. The holding-period table for equity-oriented funds appears on PDF page 2.",
      },
    ],
  },
  fees: {
    id: "fees",
    eyebrow: "PRODUCT KNOWLEDGE / FEES",
    title: "Start with the right share class.",
    status: "Source missing",
    intro:
      "“Global Equity Fund” is not uniquely identified in this collection. There is no authenticated fund prospectus or fee schedule for that name, so a management fee or total cost cannot be confirmed.",
    table: {
      headers: ["Cost to check", "What you need"],
      rows: [
        [
          "Ongoing fund expenses",
          "Exact share class, plan, currency and current expense disclosure",
        ],
        [
          "Entry or exit charges",
          "Subscription/redemption terms and holding-period conditions",
        ],
        [
          "Advisory & platform fees",
          "Client agreement and any separate service charges",
        ],
      ],
    },
    sections: [
      {
        title: "01 / Identify the product",
        text: "Ask for the issuer, full legal fund name, ISIN, domicile and share class (including Class A or Class I if applicable). A similar product name is not enough to quote a fee.",
      },
      {
        title: "02 / Separate fund costs from advice",
        text: "The SEBI investor charter calls for an adviser–client agreement that includes fee details and conflict disclosures. It does not establish the expenses of this particular fund.",
        citation: 0,
      },
      {
        title: "03 / Request the missing evidence",
        text: "Obtain the dated prospectus, current share-class fee schedule and applicable client agreement. Compare ongoing expenses, transaction charges and separately billed advice; do not assume one number includes all of them.",
      },
    ],
    example: {
      label: "SUGGESTED CLIENT LANGUAGE",
      text: "“I can confirm the charges once we identify your exact fund and share class and check the applicable fee schedule. I’ll separate the fund’s costs from any advisory charges.”",
    },
    next: "Create a specialist review request with the fund identifier and the missing fee schedule. No fee percentage is verified in this demo.",
    citations: [
      {
        documentId: "investor-charter-2025",
        page: 3,
        section: "Annexure A · Business transacted by the adviser",
        summary:
          "The investor charter addresses agreement-based disclosure of fees and conflicts, alongside risk profiling and suitability. This is disclosure context, not evidence of a Global Equity Fund fee.",
      },
    ],
  },
  trusts: {
    id: "trusts",
    eyebrow: "COMPLIANCE / CROSS-BORDER",
    title: "A trust needs more than a yes or no.",
    status: "Specialist review",
    intro:
      "Potential constraints depend on the trust’s jurisdiction, the residence of the parties and the proposed transaction. The attached Indian securities-market references provide a due-diligence starting point; they do not approve an offshore trust or resolve its tax and foreign-exchange treatment.",
    sections: [
      {
        title: "01 / Identify who owns and controls it",
        text: "The AML circular requires identification of the author, trustee, settlor, protector, beneficiaries with at least 10% interest, and other natural persons with ultimate effective control. Foreign-investor cases also need the applicable foreign-investor framework.",
        citation: 0,
      },
      {
        title: "02 / Collect the trust documents",
        text: "The KYC circular lists the trust deed, registration certificate where relevant, financial statements, a certified trustee list and trustee identity/address documentation.",
        citation: 1,
      },
      {
        title: "03 / Route the cross-border questions",
        text: "Ask a specialist to determine the applicable residence, source-of-funds, foreign-exchange, reporting and tax requirements. Neither document determines foreign trust law, sanctions clearance or an individual transaction’s permissibility.",
      },
    ],
    example: {
      label: "EXAMPLE IN PRACTICE",
      text: "For a trust formed overseas that wants to invest through an Indian intermediary, first establish the parties, control structure and investment route. Send the trust deed and proposed transaction to the relevant specialists before giving clearance.",
    },
    next: "Record the jurisdiction, parties’ tax residence, intended investment, amount and source of funds. Escalate for a written case-specific review.",
    citations: [
      {
        documentId: "aml-2024",
        page: 11,
        section: "Client due diligence · Trust beneficial ownership",
        summary:
          "The trust beneficial-ownership requirements are on PDF page 11. Page 9 also discusses verification of persons acting for a trust.",
      },
      {
        documentId: "kyc-2023",
        page: 13,
        section: "Additional documents for non-individuals · Trust",
        summary:
          "The trust documentation checklist appears on PDF page 13, including the deed, financial statements and trustee information.",
      },
    ],
  },
  unknown: {
    id: "unknown",
    eyebrow: "OUTSIDE THE CURATED COLLECTION",
    title: "Let’s find the right starting point.",
    status: "No saved answer",
    intro:
      "There is no hardcoded response for this question. This demo supports the three original topics: equity mutual fund capital gains, Global Equity Fund fees, and offshore-trust constraints.",
    sections: [
      {
        title: "Keep the question, get the right review",
        text: "You can save this question for specialist review, or select one of the original example questions. No answer has been generated and no external AI service has been called.",
      },
    ],
    next: "Choose a supported question below, or create a local specialist review request.",
    citations: [],
  },
};
export function matchResponse(question: string): Response {
  const q = question
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (
    (q.includes("capital gain") && q.includes("equity")) ||
    q === prompts[0].text.toLowerCase().replace("?", "")
  )
    return responses.tax;
  if (q.includes("fee") && q.includes("global equity fund"))
    return responses.fees;
  if (q.includes("offshore trust") && !q.includes("digital tax"))
    return responses.trusts;
  return responses.unknown;
}
export function responseAsText(query: string, r: Response) {
  return [
    query,
    r.title,
    r.intro,
    r.table
      ? [
          r.table.headers.join(" | "),
          ...r.table.rows.map((row) => row.join(" | ")),
        ].join("\n")
      : "",
    ...r.sections.map(
      (s) =>
        s.title +
        "\n" +
        s.text +
        (s.citation !== undefined ? " [" + (s.citation + 1) + "]" : ""),
    ),
    r.example?.text,
    r.next,
    "Sources:",
    ...r.citations.map(
      (c, i) =>
        `${i + 1}. ${documents.find((d) => d.id === c.documentId)?.title}, PDF p. ${c.page}. ${documents.find((d) => d.id === c.documentId)?.source}`,
    ),
    "Saved demo response; reference snapshots are not bank-approved.",
  ]
    .filter(Boolean)
    .join("\n\n");
}
