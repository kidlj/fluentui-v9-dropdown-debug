import styles from '@/styles/page.module.scss';
import { ProjectForm } from "@/components/form";
import { Replica } from '@/types/job';

export default function Project() {
	const init = {
		name: "",
		training_type: "job",
		code_type: "git",
		level: "C",
		namespace: "jeeves-agi",
		entry: "",
		image: "",
		taint: "",
		git_path: "",
		git_branch: "",
		resources: {
			replicas: 1,
			gpu_num: 0,
			cpu_num: 0,
			gpu_series: "",
			memory_size: 0,
		},
		replicas: new Map<string, Replica>([
			["master", {
				replicas: 0,
				gpu_num: 0,
				cpu_num: 0,
				gpu_series: "",
				memory_size: 0,
			}],
			["worker", {
				replicas: 0,
				gpu_num: 0,
				cpu_num: 0,
				gpu_series: "",
				memory_size: 0,
			}],
		])
	}
	return (
		<div>
			<ProjectForm edit={init}></ProjectForm>
		</div>
	)
}