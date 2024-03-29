import * as React from "react";
import {
	Accordion,
	AccordionHeader,
	AccordionItem,
	AccordionPanel,
} from "@fluentui/react-components";

export default () => (
	<Accordion collapsible>
		<AccordionItem value="1">
			<AccordionHeader>Accordion Header 1</AccordionHeader>
			<AccordionPanel>
				<div>Accordion Panel 1</div>
			</AccordionPanel>
		</AccordionItem>
	</Accordion>
);