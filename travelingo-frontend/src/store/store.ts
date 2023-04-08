import {createStore} from "vuex";
import TripsModule from "@/store/TripsModule";

export const store = createStore({
    modules: {
        trips: TripsModule
    }
});
