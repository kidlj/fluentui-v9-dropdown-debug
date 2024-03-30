import type { Replica, Job } from "@/types/job"
import type { User } from "@/types/user"

export type Project = {
	id: number
	name: string
	description: string
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
	edges: ProjectEdges
}

export type ProjectEdges = {
	user: User
	jobs: Job[]
}