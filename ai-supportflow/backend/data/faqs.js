const faqs = [
  {
    id: 1,
    category: "refund",
    keywords: ["refund", "money back", "return", "reimburse", "cancel order", "refunded"],
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day full refund policy on all purchases. To initiate a refund, contact us within 30 days of your purchase date. Digital products are refundable within 7 days if not downloaded. Refunds are processed within 5–7 business days back to your original payment method.",
  },
  {
    id: 2,
    category: "delivery",
    keywords: ["delivery", "shipping", "ship", "arrive", "track", "package", "when will", "how long", "dispatch"],
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 5–7 business days. Express shipping (2–3 business days) is available at checkout for an additional fee. International orders may take 10–15 business days depending on customs. You will receive a tracking link via email once your order is dispatched.",
  },
  {
    id: 3,
    category: "account",
    keywords: ["account", "login", "password", "sign in", "forgot password", "reset", "locked", "access", "username"],
    question: "I'm having trouble with my account.",
    answer:
      "For login issues, use the 'Forgot Password' link on the login page to reset your password. Your reset link is valid for 24 hours. If your account is locked after multiple failed attempts, wait 15 minutes before trying again. For persistent issues, ensure you're using the email address associated with your account.",
  },
  {
    id: 4,
    category: "subscription",
    keywords: ["subscription", "cancel", "unsubscribe", "plan", "billing", "recurring", "auto-renew", "downgrade", "upgrade"],
    question: "How do I cancel my subscription?",
    answer:
      "To cancel your subscription, go to Account Settings → Billing → Cancel Subscription. Your access continues until the end of the current billing period. We don't offer partial refunds for unused subscription time. You can reactivate your subscription at any time. Note: cancelling stops future charges but does not delete your account or data.",
  },
  {
    id: 5,
    category: "payment",
    keywords: ["payment", "failed", "declined", "charge", "card", "transaction", "invoice", "billing", "pay", "credit card", "debit"],
    question: "My payment failed. What should I do?",
    answer:
      "Payment failures are usually caused by: (1) Insufficient funds, (2) Incorrect card details, (3) Bank blocking the transaction, or (4) Expired card. Please verify your card details, ensure sufficient funds, or try a different payment method. If your bank blocked the charge, contact them to whitelist our merchant. Alternatively, try PayPal or another card.",
  },
  {
    id: 6,
    category: "contact",
    keywords: ["contact", "email", "phone", "support", "reach", "talk", "speak", "help center", "hours"],
    question: "How can I contact support?",
    answer:
      "Our support team is available Monday–Friday, 9 AM–6 PM EST. You can reach us via: Email: support@aisupportflow.com | Live Chat: Available on this page | Phone: +1-800-SUPPORT. Average response time is under 2 hours during business hours.",
  },
  {
    id: 7,
    category: "product",
    keywords: ["product", "feature", "how to use", "tutorial", "guide", "documentation", "works", "what is"],
    question: "Where can I find product documentation?",
    answer:
      "Our full documentation and tutorials are available at docs.aisupportflow.com. We also have video guides on our YouTube channel. For quick tips, check out the 'Getting Started' section in your dashboard after logging in.",
  },
];

module.exports = faqs;
