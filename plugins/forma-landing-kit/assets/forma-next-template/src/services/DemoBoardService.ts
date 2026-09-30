export type Collection = "All notes" | "Ideas" | "References";
export interface DemoNote {
  id: string;
  kind: Exclude<Collection, "All notes">;
  title: string;
  text: string;
  color: "sand" | "sage" | "ink";
  label: string;
}

export interface NoteRepository { getNotes(): readonly DemoNote[] }

export class ExampleNoteRepository implements NoteRepository {
  getNotes(): readonly DemoNote[] {
    return [
      { id: "01", kind: "Ideas", title: "A slower kind of studio", text: "Less noise. More room for the things we want to make.", color: "sand", label: "Studio direction" },
      { id: "02", kind: "References", title: "Light, shape, and a little space", text: "A study in balance. Keep the details that matter.", color: "sage", label: "Visual reference" },
      { id: "03", kind: "Ideas", title: "Start with one good question", text: "What would make this week feel a little more considered?", color: "ink", label: "Working note" },
      { id: "04", kind: "References", title: "The launch checklist", text: "Write the story. Choose the images. Make the next step clear.", color: "sand", label: "Project reference" },
    ];
  }
}

export class DemoBoardService {
  constructor(private readonly repository: NoteRepository) {}

  find(collection: Collection, query: string): readonly DemoNote[] {
    const normalized = query.trim().toLocaleLowerCase();
    return this.repository.getNotes().filter(note =>
      (collection === "All notes" || note.kind === collection) &&
      `${note.title} ${note.text} ${note.label}`.toLocaleLowerCase().includes(normalized),
    );
  }
}
