<template>
  <v-layout align-center justify-center>
    <v-container>
      <v-layout text-center wrap>
        <v-flex xs12></v-flex>
        <v-flex mb-4>
          <h1 class="display-2 font-weight-bold mb-3">Welcome to God Mode!</h1>
          <AdminStats :data="data" />
          <v-tabs
            v-model="tab"
            background-color="deep-purple accent-4"
            class="elevation-2"
            dark
            grow
          >
            <v-tab v-for="i in tabs" :key="i">{{ i }}</v-tab>

            <v-tab-item key="tabs[0]">
              <v-card class="pa-6" flat tile>
                <v-container>
                  <v-row>
                    <h1 class="display-1 pb-10">
                      Recap
                      <v-btn
                        class="display-1"
                        text
                        @click="toggleYearSelect = !toggleYearSelect"
                        >{{ years[yearIndex] }}</v-btn
                      >
                    </h1>
                  </v-row>
                  <v-card v-if="toggleYearSelect">
                    <v-subheader>Select a Year</v-subheader>
                    <v-list-item-group v-model="yearIndex" color="primary">
                      <v-list-item v-for="(year, i) in years" :key="i">
                        <v-list-item-content>
                          <v-list-item-title>{{ year }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-card>

                  <v-row>
                    <v-col class="col-3">
                      <PieChart
                        :year="yearIndex"
                        :chartData="majorChartData"
                        :options="majorChartData.options"
                        id="majorChart"
                      />
                    </v-col>
                    <v-col class="col-3">
                      <PieChart
                        :year="yearIndex"
                        :chartData="genderChartData"
                        :options="genderChartData.options"
                        id="genderChart"
                      />
                    </v-col>
                    <v-col class="col-3">
                      <PieChart
                        :year="yearIndex"
                        :chartData="educationChartData"
                        :options="educationChartData.options"
                        id="educationChart"
                      />
                    </v-col>
                    <v-col class="col-3">
                      <PieChart
                        :year="yearIndex"
                        :chartData="hackathonsChartData"
                        :options="hackathonsChartData.options"
                        id="hackathonsChart"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-tab-item>

            <v-tab-item key="tabs[1]">
              <v-card flat tile>
                <v-card-actions>
                  <v-select
                    :items="statusList"
                    v-model="itemStatus"
                    label="Status"
                    multiple
                    @change="filterStatus"
                  ></v-select>
                </v-card-actions>
                <v-card-text>
                  <HackerTable :data="currentData" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item key="tabs[2]">
              <v-card flat tile>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import HackerTable from "@/components/common/HackerTable";
import AdminStats from "@/components/admin/AdminStats";
import PieChart from "@/components/common/PieChart";
import { functions } from "@/firebase/init";

export default {
  name: "Admin",
  components: {
    HackerTable,
    AdminStats,
    PieChart
  },
  methods: {
    async filterStatus() {
      if (this.itemStatus.length == 0) {
        this.currentData = this.data;
      } else {
        this.currentData = this.data.filter(item =>
          this.itemStatus.includes(this.statusList[item.status])
        );
      }
    }
  },
  data() {
    return {
      data: null,
      currentData: null,
      tab: null,
      itemStatus: [],
      statusList: [
        "Started",
        "Submitted",
        "Rejected",
        "Waitlisted",
        "Accepted",
        "Confirmed",
        "Declined",
        "Checked In"
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tabs: ["Stats", "God Mode", "Settings"],
      toggleYearSelect: false,
      yearIndex: "3",
      lastYearIndex: "3",
      years: ["2016", "2017", "2018", "2019"],
      majorChartData: {
        options: {
          title: {
            display: true,
            text: "Majors"
          }
        },
        labels: [
          "Computer Science",
          "Electrical Engineering",
          "Computer Engineering"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [40, 20, 10]
          },
          {
            label: "Data Two",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [10, 90, 10]
          },
          {
            label: "Data Three",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [15, 15, 70]
          },
          {
            label: "Data Four",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [5, 5, 90]
          },
          {
            label: "Data Five",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [20, 70, 5]
          }
        ]
      },
      genderChartData: {
        options: {
          title: {
            display: true,
            text: "Genders"
          }
        },
        labels: ["Male", "Female", "Other"],
        datasets: [
          {
            label: "2016",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [40, 20, 10]
          },
          {
            label: "2017",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [10, 90, 10]
          },
          {
            label: "2018",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [15, 15, 70]
          },
          {
            label: "2019",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [5, 5, 90]
          },
          {
            label: "2020",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [20, 70, 5]
          }
        ]
      },
      educationChartData: {
        options: {
          title: {
            display: true,
            text: "Education Levels"
          }
        },
        labels: ["High School", "Undergraduate", "Graduate"],
        datasets: [
          {
            label: "2016",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [40, 20, 10]
          },
          {
            label: "2017",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [10, 90, 10]
          },
          {
            label: "2018",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [15, 15, 70]
          },
          {
            label: "2019",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [5, 5, 90]
          },
          {
            label: "2020",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            data: [20, 70, 5]
          }
        ]
      },
      hackathonsChartData: {
        options: {
          title: {
            display: true,
            text: "Hackathons Attended"
          }
        },
        labels: ["0", "1", "2", "3+"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            data: [40, 20, 10, 30]
          },
          {
            label: "Data Two",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            data: [10, 90, 10, 40]
          },
          {
            label: "Data Three",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            data: [15, 15, 70]
          },
          {
            label: "Data Four",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            data: [5, 5, 90, 20]
          },
          {
            label: "Data Five",
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            data: [20, 70, 5, 50]
          }
        ]
      }
    };
  },
  async mounted() {
    var out = await functions.httpsCallable("retrieveAllApplications")({});
    this.data = out.data;
    this.currentData = this.data;
  },
  watch: {
    yearIndex: {
      handler: function() {
        if (this.yearIndex === undefined) {
          this.yearIndex = this.lastYearIndex;
        } else {
          this.lastYearIndex = this.yearIndex;
        }
      },
      deep: true
    }
  }
};
</script>
