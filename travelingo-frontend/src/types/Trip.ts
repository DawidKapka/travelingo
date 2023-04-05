import {Country} from "@/types/Country";
import {Location} from "@/types/Location";

export interface Trip {
    country: Country,
    startDate: Date,
    endDate: Date,
    locations: Location[]
}
