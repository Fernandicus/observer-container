import { Subject } from "./Subject";
import { ObserverTags, Param } from "./types/types";

export class SubjectsMap {
  private subjects: Param.SubjectsMap = new Map();

  hasName(name: string) {
    return this.subjects.has(name);
  }

  getName(name: string) {
    return this.subjects.get(name);
  }

  getArrayFromName(name: string): Subject<unknown>[] {
    const subjectFound = this.getName(name);
    if (!subjectFound) return [];
    return Array.from(subjectFound);
  }

  addSubject<T>({ name, subject }: { name: string; subject: Subject<T> }) {
    if (this.subjects.has(name)) {
      this.subjects.get(name)!.add(subject);
    } else {
      this.subjects.set(name, new Set([subject]));
    }
  }

  findSubject({ name, subject }: ObserverTags) {
    const subjectFoundArray = this.getArrayFromName(name);
    const subjectFound = subjectFoundArray.find(
      (instance) => instance.subject === subject
    );
    return subjectFound;
  }
}
