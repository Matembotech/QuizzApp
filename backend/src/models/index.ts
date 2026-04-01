// Model barrel export - import all models from a single entry point
// Usage: import { User, Module, Question, Result, IUser, IModule, IQuestion, IResult } from './models';

export { default as User } from "./User.js";
export { default as Module } from "./Module.js";
export { default as Question } from "./Question.js";
export { default as Result } from "./Result.js";
export { default as Contact } from "./contact.js";

export type { IUser } from "./User.js";
export type { IModule } from "./Module.js";
export type { IQuestion } from "./Question.js";
export type { IResult } from "./Result.js";
export type { IContact } from "./contact.js";
