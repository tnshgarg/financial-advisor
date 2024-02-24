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
    question: "What type of content can be generated through Draaft?",
    answer:
      "With Draaft, you can generate multiple types of content including Youtube Shorts Scripts, Tweets, Linkedin Posts, Youtube Community Posts, Wordpress Blog Posts, Email Newsletter, Youtube Video Titles, Description and Video Tags",
  },
  {
    question: "Can I send Newsletters directly from Draaft",
    answer:
      "No, While draaft can help you generate newsletters, it does not provide you with functionality to send out newsletters",
  },
  {
    question: "Can I Cancel My Subscription?",
    answer:
      "Go To Settings Page, and Click on Manage Subscriptions to cancel the subscription using Stripe",
  },
  {
    question: "How can i contact support?",
    answer: "Please contact us at support@draaft.ai",
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
