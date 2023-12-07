export class ObserverTagHub<
  TName extends string = string,
  TSubject extends string = string
> {
  private name: TName;
  private subjects: TSubject[];

  constructor({ name, subjects }: { name: TName; subjects: TSubject[] }) {
    this.name = name;
    this.subjects = subjects;
  }

  getName(): TName {
    return this.name;
  }

  getSubject(s: TSubject): TSubject {
    const subject = this.subjects.find((sub) => sub === s);
    if (!subject)
      throw new Error(
        `The subject "${s}" do not exist for the name "${this.name}"`
      );
    return subject;
  }

  getTagsForSubject(s: TSubject): { name: TName; subject: TSubject } {
    return {
      name: this.name,
      subject: this.getSubject(s),
    };
  }
}
