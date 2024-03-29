import * as React from "react";
import {
	makeStyles,
	shorthands,
	useId,
	Body1,
	Button,
	Input,
	Label,
	Text,
	Divider
} from "@fluentui/react-components";
import { PersonRegular, MicRegular } from "@fluentui/react-icons";
import styles from '@/styles/page.module.scss';

export const EditFrom = () => {
	const beforeId = useId("content-before");
	const afterId = useId("content-after");
	const beforeAndAfterId = useId("content-before-and-after");
	const beforeLabelId = useId("before-label");
	const afterLabelId = useId("after-label");

	return (
		<div className={styles.form}>
			<div className={styles.inputgroupheader}>
				<h2>基本信息</h2>
				<Divider></Divider>
			</div>
			<div className={styles.inputgroup}>
				<div>
					<Label htmlFor={beforeId}>Full name</Label>
					<Input contentBefore={<PersonRegular />} id={beforeId} />
					<Body1>
						An input with a decorative icon in the <code>contentBefore</code>{" "}
						slot.
					</Body1>
				</div>

				<div>
					<Label htmlFor={afterId}>First name</Label>
					<Input
					/>
					<Body1>
						An input with a button in the <code>contentAfter</code> slot.
					</Body1>
				</div>

				<div>
					<Label htmlFor={beforeAndAfterId}>Amount to pay</Label>
					<Input
						contentBefore={
							<Text size={400} id={beforeLabelId}>
								$
							</Text>
						}
						contentAfter={
							<Text size={400} id={afterLabelId}>
								.00
							</Text>
						}
						aria-labelledby={`${beforeAndAfterId} ${beforeLabelId} ${afterLabelId}`}
						id={beforeAndAfterId}
					/>

					<Body1>
						An input with a presentational value in the slot.
					</Body1>
				</div>
			</div>
		</div>
	);
};