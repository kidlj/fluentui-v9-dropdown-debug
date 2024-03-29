export default async function fetchData<T>(url: string, init: RequestInit): Promise<T> {
	const jsonHeaders = new Headers({
		'Accept': 'application/json',
		'Content-Type': "application/json",
	})
	if (!init.headers) {
		init.headers = jsonHeaders
	}

	const res = await fetch(encodeURI(url), init)
	const result = await res.json()
	if (res.status == 401) {
		window.location.href = '/auth/sign-in'
		throw undefined
	}
	if (!res.ok) {
		const error = new Error(result.message)
		throw error
	}

	return result.data
}