import { FAQ_DATA } from "@/app/contents/landing";
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
} from "@mantine/core";
function FAQAccordionTabOne() {
  const FAQ_DATA_ONE = FAQ_DATA.slice(0, 3);
  const items = FAQ_DATA_ONE.map((item) => (
    <Accordion
      key={item.value}
      className="w-full max-w-[628px] mx-auto border-b border-dashed ">
      <AccordionItem value={item.value}>
        <AccordionControl className="flex flex-row-reverse justify-between w-full  border-gray-200 items-center">
          <p className="text-heading-4 leading-heading-4 font-bold pt-2 pb-3">
            {item.value}
          </p>
        </AccordionControl>
        <AccordionPanel className="text-body-2 leading-body-2 text-black/70">
          {item.description}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ));

  return <Accordion>{items}</Accordion>;
}

function FAQAccordionTabTwo() {
  const FAQ_DATA_TWO = FAQ_DATA.slice(3);

  const items = FAQ_DATA_TWO.map((item) => (
    <Accordion
      key={item.value}
      className="border-b border-dashed border-gray-200 w-full max-w-[628px] mx-auto">
      <AccordionItem value={item.value}>
        <AccordionControl className="flex flex-row-reverse justify-between w-full  border-gray-200 items-center">
          <p className="text-heading-4 leading-heading-4 font-bold pt-2 pb-3">
            {item.value}
          </p>
        </AccordionControl>
        <AccordionPanel className="text-body-2 leading-body-2 text-black/70">
          {item.description}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ));

  return <Accordion>{items}</Accordion>;
}

export { FAQAccordionTabOne, FAQAccordionTabTwo };
