import type { User } from "@/types/user"

export type Replica = {
	replicas: number
	cpu_num: number
	gpu_num: number
	memory_size: number
	gpu_series: string
}

export type Job = {
	id: number
	create_time: number
	update_time: number
	cluster: string
	namespace: string
	entry: string
	code_type: string
	image: string
	training_type: string
	taint: string
	level: string
	git_path: string
	git_branch: string
	resources?: Replica
	replicas?: Map<string, Replica>
	status: string
	killed_by?: string
	killed_reason?: string
	edges: JobEdges
}

type JobEdges = {
	user: User
	tensorboard: Tensorboard
	project: Project
}

type Project = {
	id: number
	namespace: string
	name: string
}

export type Tensorboard = {
	id: number
	cluster: string
	namespace: string
	prefix: string
	path: string
	url: string
	status: string
}