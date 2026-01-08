import { CalendarDate, type DateValue} from '@internationalized/date';

export class Event implements IEvent {
    private _name: string;
    private _year: number;
    private _month: number;
    private _day: number;

    constructor(name: string, year: number, month: number, day: number ) {
        this._name = name;
        this._year = year;
        this._month = month;
        this._day = day;
    };

    get name() {
        return this._name;
    };

    get year() {
        return this._year;
    };

    get month() {
        return this._month;
    };

    get day() {
        return this._day;
    };

    public toCalendarDate(): DateValue {
        return new CalendarDate(this._year, this._month, this._day)
    }
}

export interface IEvent {
    readonly name: string;
    readonly year: number;
    readonly month: number;
    readonly day: number;
    toCalendarDate(): DateValue;
}