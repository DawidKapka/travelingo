import {Trip} from "@/types/Trip";
import {ActionTree, GetterTree, MutationTree} from "vuex";

import {adapter} from "@/adapter/TripsAdapter";

interface TripsState {
    trips: Trip[],
    currentTrip: Trip | undefined,
    pastTrips: Trip[],
    upcomingTrips: Trip[]
}
const state = (): TripsState => ({
    trips: [],
    currentTrip: undefined,
    pastTrips: [],
    upcomingTrips: []
})

const mutations: MutationTree<TripsState> = {
    setTrips: (state, trips: Trip[]) => {
        state.trips = trips;
    },
    resetTrips: (state) => {
        state.trips = [];
    },
    setCurrentTrip: (state, trip: Trip) => {
        state.currentTrip = trip;
    },
    resetCurrentTrip: (state) => {
        state.currentTrip = undefined;
    },
    setPastTrips: (state, trips: Trip[]) => {
        state.pastTrips = trips;
    },
    resetPastTrips: (state) => {
        state.pastTrips = [];
    },
    setUpcomingTrips: (state, trips: Trip[]) => {
        state.upcomingTrips = trips;
    },
    resetUpcomingTrips: (state) => {
        state.upcomingTrips = [];
    }
}

const actions: ActionTree<TripsState, TripsState> = {
    fetchTrips: async ({commit}) => {
        commit('resetTrips');
        const trips = await adapter.getTrips();
        commit('setTrips', trips);
        return trips;
    },
    setCurrentTrip: async ({commit}, trip: Trip) => {
        commit('resetCurrentTrip')
        commit('setCurrentTrip', trip);
    },
    setPastTrips: async ({commit}, trips: Trip[]) => {
        commit('resetPastTrips')
        commit('setPastTrips', trips);
    },
    setUpcomingTrips: async ({commit}, trips: Trip[]) => {
        commit('resetUpcomingTrips')
        commit('setUpcomingTrips', trips);
    }

}

const getters: GetterTree<TripsState, TripsState> = {
    trips: (state) => state.trips,
    currentTrip: (state) => {
        return state.currentTrip;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
