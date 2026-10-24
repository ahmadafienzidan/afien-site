import type { ComponentType } from "react";
import { AppGithub, AppNextstep, AppShapeshift, AppSoon } from "./AppIcon";
import Featured from "./Featured";
import Hero from "./Hero";

export type ModelName =
	| "hero"
	| "featured"
	| "app-shapeshift"
	| "app-nextstep"
	| "app-soon"
	| "app-github";

export const MODELS: Record<ModelName, ComponentType> = {
	hero: Hero,
	featured: Featured,
	"app-shapeshift": AppShapeshift,
	"app-nextstep": AppNextstep,
	"app-soon": AppSoon,
	"app-github": AppGithub,
};
