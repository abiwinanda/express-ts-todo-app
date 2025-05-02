export const users = new Map<string, { username: string; password: string}>();

// key = username
export const todos = new Map<string, { id: string; title: string; done: boolean}[]>();