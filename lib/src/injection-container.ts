import { BuildSubject } from "./observers-container/application/BuildSubject";
import { CreateObserver } from "./observers-container/application/CreateObserver";
import { ObserverContainer } from "./observers-container/domain/ObserverContainer";
import { ObserversMap } from "./observers-container/domain/ObserversMap";
import { SubjectsMap } from "./observers-container/domain/SubjectsMap";

const subjectsMap = new SubjectsMap();
const observersMap = new ObserversMap();
const observerContainer = new ObserverContainer({ subjectsMap, observersMap });

export const observerCreator = new CreateObserver(observerContainer);
export const buildSubject = new BuildSubject(observerContainer);