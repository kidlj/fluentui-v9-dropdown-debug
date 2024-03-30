import * as React from "react";
import {
	Button,
	Field,
	Input,
	Divider,
	Dropdown,
	Option,
	Label,
} from "@fluentui/react-components";
import styles from '@/styles/page.module.scss';
import { Project } from "./types";
import { Replica } from "../job/types";

const formReducer = (state: Partial<Project>, action: { type: string; payload: any }) => {
	switch (action.type) {
		case 'UPDATE_FIELD':
			return {
				...state,
				[action.payload.fieldName]: action.payload.value,
			};
		case 'UPDATE_REPLICA':
			{
				const { prop, value } = action.payload;
				const replica = { ...state.resources!, [prop]: value };
				return {
					...state,
					resources: replica
				}
			}
		case 'UPDATE_REPLICA_MAP':
			{
				const { key, prop, value } = action.payload;
				const newDataMap = new Map<string, Replica>(state.replicas);
				const replica = { ...newDataMap.get(key)!, [prop]: value };
				newDataMap.set(key, replica);
				return {
					...state,
					replicas: newDataMap,
				};
			}
		default:
			return state;
	}
};

export const ProjectForm = (props: { edit: Partial<Project> }) => {
	const [project, dispatch] = React.useReducer(formReducer, props.edit)

	const handleFieldChange = (fieldName: keyof Project, value: string | number) => {
		dispatch({ type: 'UPDATE_FIELD', payload: { fieldName, value } });
	};

	const handleReplicaChange = (prop: keyof Replica, value: string | number) => {
		dispatch({ type: 'UPDATE_REPLICA', payload: { prop, value } });
	};

	const handleReplicaMapChange = (key: string, prop: keyof Replica, value: string | number) => {
		dispatch({ type: 'UPDATE_REPLICA_MAP', payload: { key, prop, value } });
	};

	const handleSubmit = () => {
		console.log('Form Data:', project);
	};

	const trainingTypeOptions = new Map<string, string>(
		[
			["job", "Job"],
			["pytorchjob", "PyTorchJob"],
		]
	)
	const gpuSeriesOptions = new Map<string, string>(
		[
			["a800", "A800"],
			["a100", "A100"],
		]
	)

	return (
		<div className={styles.form}>
			<div className={styles.inputgroupheader}>
				<h2>基本信息</h2>
				<Divider></Divider>
			</div>
			<div className={styles.inputgroup}>
				<Field label="项目名称" required>
					<Input value={project.name} />
				</Field>

				<Field label="项目描述">
					<Input value={project.description} onChange={(e, data) => handleFieldChange('description', data.value)} />
				</Field>
				<Field label="训练方式">
					<Dropdown value={trainingTypeOptions.get(project.training_type!)} selectedOptions={[project.training_type!]} onOptionSelect={(e, data) => handleFieldChange('training_type', data.optionValue || "")}>
						{Array.from(trainingTypeOptions).map(([key, text]) => (
							<Option key={key} value={key}>{text}</Option>
						))}
					</Dropdown>
				</Field>
			</div>

			<div className={styles.inputgroupheader}>
				<h2>资源设置</h2>
				<Divider></Divider>
			</div>
			{project.training_type == "job" && project.resources &&
				<div className={styles.inputgroup}>
					<Field label="GPU" required>
						<Input type="number" value={project.resources.gpu_num?.toString()} onChange={(e, data) => handleReplicaChange('gpu_num', data.value)} />
					</Field>

					<Field label="GPU型号" required>
						<Dropdown value={gpuSeriesOptions.get(project.resources.gpu_series!)} selectedOptions={[project.resources.gpu_series!]} onOptionSelect={(e, data) => handleReplicaChange('gpu_series', data.optionValue || "")}>
							{Array.from(gpuSeriesOptions).map(([key, text]) => (
								<Option key={key} value={key}>{text}</Option>
							))}
						</Dropdown>
					</Field>
				</div>
			}
			{project.training_type == "pytorchjob" && project.replicas &&
				Array.from(project.replicas).map(([key, replica]) => (
					<div key={key} className={styles.inputgroup}>
						<Label>{key}</Label>
						<Field label="GPU" required>
							<Input type="number" value={replica.gpu_num.toString()} onChange={(e, data) => handleReplicaMapChange(key, 'gpu_num', data.value)} />
						</Field>

						<Field label="GPU型号" required>
							<Dropdown value={gpuSeriesOptions.get(replica.gpu_series)} selectedOptions={[replica.gpu_series]} onOptionSelect={(e, data) => handleReplicaMapChange(key, 'gpu_series', data.optionValue || "")}>
								{Array.from(gpuSeriesOptions).map(([key, text]) => (
									<Option key={key} value={key}>{text}</Option>
								))}
							</Dropdown>
						</Field>
					</div>
				))
			}

			<div className={styles.inputgroupheader}>
				<h2>操作</h2>
				<Divider></Divider>
				<Button onClick={handleSubmit}>提交</Button>
			</div>
		</div >
	);
};