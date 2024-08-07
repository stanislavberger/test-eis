import { flow, types, Instance } from "mobx-state-tree";
import { Area, House, Meter } from "./CounterList";
import axiosInstance from "../api/axiosInstance";

const RootModel = types
    .model("RootModel", {
        meters: types.array(Meter),
        areas: types.array(Area),
        houses: types.array(House),
        limit: 400,
        offset: 20,
        currentPageMeters: 1,
        currentPageAreas: 1,
        totalMeters: 0,
        totalAreas: 0,
        totalFetchedMeters: 0,
        totalFetchedAreas: 0, 
    })
    .actions((self) => ({
      fetchMeters: flow(function* fetchMeters(page = self.currentPageMeters) {
        try {
          const offset = (page - 1) * self.limit;
          const response = yield axiosInstance.get(`test/meters/`, {
              params: {
                  limit: self.limit,
                  offset: offset
              }
          });
          const meters = response.data.results;
          self.totalMeters = response.data.count;
          self.totalFetchedMeters += meters.length;
          self.meters.replace(meters);
          self.currentPageMeters = page;

          if (self.totalFetchedMeters >= self.totalMeters) {
              self.limit = self.totalMeters - offset;
          }
        } catch (error) {
            console.error('Failed to fetch meters', error);
        }
      }),

      //Async request to address data
      fetchAreas: flow(function* fetchAreas(ids, page = self.currentPageAreas) {
        try {
            const offset = (page - 1) * self.limit;
            const response = yield axiosInstance.get(`test/areas/`, {
                params: {
                    id__in: ids,
                    limit: self.limit,
                    offset: offset
                }
            });
            const areas = response.data.results;
            self.totalAreas = response.data.count; 
            self.totalFetchedAreas += areas.length;
            self.currentPageAreas = page;

            if (self.totalFetchedAreas >= self.totalAreas) {
                self.limit = self.totalAreas - offset; 
            }
        } catch (error) {
            console.error('Failed to fetch areas', error);
        }
    }),
    
    //Delete function
    deleteMeter: flow(function* deleteMeter(meterId: string) {
        try {
            yield axiosInstance.delete(`test/meters/${meterId}/`);
            self.meters.replace(self.meters.filter(meter => meter.id !== meterId));
        } catch (error) {
            console.error('Failed to delete meter', error);
        }
    }),

    nextPageMeters() {
        if (self.currentPageMeters * self.limit < self.totalMeters) {
              self.fetchMeters(self.currentPageMeters + 1);
            }
        },
  
        previousPageMeters() {
            if (self.currentPageMeters > 1) {
                self.fetchMeters(self.currentPageMeters - 1);
            }
        },
  
        nextPageAreas(ids) {
          if (self.currentPageAreas * self.limit < self.totalAreas) {
              self.fetchAreas(ids, self.currentPageAreas + 1);
            }
        },
  
        previousPageAreas(ids) {
            if (self.currentPageAreas > 1) {
                self.fetchAreas(ids, self.currentPageAreas - 1);
            }
        }

}));

export interface IRootModel extends Instance<typeof RootModel> {}

export default RootModel;