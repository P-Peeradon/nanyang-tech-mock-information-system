export class Course implements ICourse {
    private _code!: string;
    private _title: string;
    private _au: number;
    private _description?: string;
    private _prerequisite: Array<string>;

    constructor(code: string, title: string, au: number, description?: string, prerequisite?: Array<string>) {
        this._code = code;
        this._title = title;
        this._au = au;
        this._description = description ?? '';
        this._prerequisite = prerequisite ?? [];
    };

    public get code(): string {
        return this._code;
    }

    public get title(): string {
        return this._title;
    };

    public get au(): number {
        return this._au;
    };

    public get description() {
        return this._description;
    };

    public get prerequisite() {
        return this._prerequisite;
    };

    public set title(newTitle: string) {
        this._title = newTitle;
    };

    public set au(newAU: number) {
        this._au = newAU;
    };

    public set prerequisite(newPrerequisite: string[]) {
        this._prerequisite = newPrerequisite;
    };

    public addNewPrereq(prereqCode: string) {
        if (!this.prerequisite.includes(prereqCode)) {
            this.prerequisite.push(prereqCode);
        }
    };

    public toJSON(): object {
        return {
            code: this._code,
            title: this._title,
            au: this._au,
            description: this._description,
            prerequisite: this._prerequisite
        }
    }
}

export interface ICourse {
    readonly code: string;
    title: string;
    au: number;
    description?: string;
    prerequisite: string[];
    addNewPrereq(prereqCode: string): void;
    toJSON(): object;
}