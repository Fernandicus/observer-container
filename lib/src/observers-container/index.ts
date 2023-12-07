import { BuildSubject } from "./application/BuildSubject";
import { CreateObserver } from "./application/CreateObserver";
import { ObserverContainer } from "./entities/ObserverContainer";
import { ObserversMap } from "./entities/ObserversMap";
import { SubjectsMap } from "./entities/SubjectsMap";

const subjectsMap = new SubjectsMap();
const observersMap = new ObserversMap();
const observerContainer = new ObserverContainer({ subjectsMap, observersMap });

export const observerCreator = new CreateObserver(observerContainer);
export const buildSubject = new BuildSubject(observerContainer);
export * from "./application/ObserverTagHub";
