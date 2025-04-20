import { z } from "zod"

import { FebCodeEventName, rooCodeEventsSchema, rooCodeSettingsSchema } from "./index"

/**
 * Ack
 */

export const ackSchema = z.object({
	clientId: z.string(),
	pid: z.number(),
	ppid: z.number(),
})

export type Ack = z.infer<typeof ackSchema>

/**
 * TaskCommand
 */

export enum TaskCommandName {
	StartNewTask = "StartNewTask",
	CancelTask = "CancelTask",
	CloseTask = "CloseTask",
}

export const taskCommandSchema = z.discriminatedUnion("commandName", [
	z.object({
		commandName: z.literal(TaskCommandName.StartNewTask),
		data: z.object({
			configuration: rooCodeSettingsSchema,
			text: z.string(),
			images: z.array(z.string()).optional(),
			newTab: z.boolean().optional(),
		}),
	}),
	z.object({
		commandName: z.literal(TaskCommandName.CancelTask),
		data: z.string(),
	}),
	z.object({
		commandName: z.literal(TaskCommandName.CloseTask),
		data: z.string(),
	}),
])

export type TaskCommand = z.infer<typeof taskCommandSchema>

/**
 * TaskEvent
 */

export const taskEventSchema = z.discriminatedUnion("eventName", [
	z.object({
		eventName: z.literal(FebCodeEventName.Message),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.Message],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskCreated),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskCreated],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskStarted),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskStarted],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskModeSwitched),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskModeSwitched],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskPaused),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskPaused],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskUnpaused),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskUnpaused],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskAskResponded),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskAskResponded],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskAborted),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskAborted],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskSpawned),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskSpawned],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskCompleted),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskCompleted],
	}),
	z.object({
		eventName: z.literal(FebCodeEventName.TaskTokenUsageUpdated),
		payload: rooCodeEventsSchema.shape[FebCodeEventName.TaskTokenUsageUpdated],
	}),
])

export type TaskEvent = z.infer<typeof taskEventSchema>

/**
 * IpcMessage
 */

export enum IpcMessageType {
	Connect = "Connect",
	Disconnect = "Disconnect",
	Ack = "Ack",
	TaskCommand = "TaskCommand",
	TaskEvent = "TaskEvent",
}

export enum IpcOrigin {
	Client = "client",
	Server = "server",
}

export const ipcMessageSchema = z.discriminatedUnion("type", [
	z.object({
		type: z.literal(IpcMessageType.Ack),
		origin: z.literal(IpcOrigin.Server),
		data: ackSchema,
	}),
	z.object({
		type: z.literal(IpcMessageType.TaskCommand),
		origin: z.literal(IpcOrigin.Client),
		clientId: z.string(),
		data: taskCommandSchema,
	}),
	z.object({
		type: z.literal(IpcMessageType.TaskEvent),
		origin: z.literal(IpcOrigin.Server),
		relayClientId: z.string().optional(),
		data: taskEventSchema,
	}),
])

export type IpcMessage = z.infer<typeof ipcMessageSchema>
