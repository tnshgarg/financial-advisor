import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
);

const faqData = [
  {
    question: "In which languages is the platform available?",
    answer:
      "The platform supports multiple local Indian languages and dialects, ensuring that users can access information and communicate in their preferred language, making it easy to understand financial concepts.",
  },
  {
    question: "Is the advice provided by the platform fully automated?",
    answer:
      "No, the platform follows a hybrid model. While AI offers personalized recommendations, human financial advisors are available for complex decisions such as major loan approvals or long-term investments. This combination ensures accuracy and trust.",
  },
  {
    question: "How is my data secured on this platform?",
    answer:
      "The platform prioritizes data security and privacy. Community ambassadors—trusted members of rural areas—help educate users about the platform’s secure practices, alleviating concerns and building confidence in its use.",
  },
  {
    question: "Can I trust the financial advice provided by the platform?",
    answer: "Yes, the platform uses advanced AI and insights from local influencers, village leaders, and human financial advisors to deliver culturally relevant, personalized, and trustworthy advice suited to your financial needs.",
  },
];

export function LandingAccordian() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-3/4 mx-auto bg-[#192339] p-12 rounded-md text-white"
    >
      <FaqHeader
        title="Frequently Asked Questions"
        subtitle="See the Answers to Most Asked Questions"
      />
      {faqData.map(({ question, answer }) => (
        <AccordionItem value={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
