import {ApiAdapter} from "@/adapter/ApiAdapter";
class TripsAdapter extends ApiAdapter {
    public getTrips() {
        return this.get("/trips");
    }
}

export const adapter = new TripsAdapter();
