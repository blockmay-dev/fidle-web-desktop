<template>
  <div>
    <div>
      <div class="promote--post_container">
        <div class="promote--post_content p-3">
            <div class="mb-3  text-right" role="button" @click="close">
                <IconComponent icon="ant-design:close-circle-outlined" style="font-size:25px"/>
            </div>
          <div class="row">
            <div class="post--statistics col-md-7" >
            <h5>Post Statistics</h5>
            <ApexCharts
              width="400px"
              height="200px"
              type="bar"
              :options="options"
              :series="series"
            ></ApexCharts>
          </div>

          <div class="viewPost col-md-5 h-100">
            <h5>Ad Preview</h5>
           <div class="d-flex align-items-center mt-2 rounded-lg p-3" style="border: 1px solid rgba(0, 0, 0, 0.1)">
             <div class="content">
                <p class="small">
                    {{ single_post.content }}
                </p>
            </div>
            <div>
                <div v-for="media in single_post.media" :key="media.id">
                    <img
                    v-if="media.extension == 'jpg' || media.extension == 'png' || media.extension == 'jpeg' "
                      :src="media.file"
                      alt=""
                      width="100px"
                      class="rounded-lg"
                      height="100px"
                      style="object-fit: cover; object-position: top"
                    />
                    <video v-else :src="media.file" playsinline loop 
                     ></video>
                  </div>
                  
            </div>
           </div>
           <div class="mt-3 boost--post">
            <button>Promote Post</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "VueChart",
  props:["post_statistics", "single_post"],
  components: {
    ApexCharts: VueApexCharts,
  },
  data() {
    return {
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            height: 20,
            barHeight: "50%",
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
            },
          },
        },
        chart: {
          id: "vuechart-example",
        },
      },

      series: [
        {
          data: []
        //   [
        //     {
        //       x: "Views",
        //       y: 10,
        //     },
        //     {
        //       x: "Comments",
        //       y: 18,
        //     },
        //     {
        //       x: "Likes",
        //       y: 13,
        //     },
        //   ],
        },
      ],
    };
  },

  methods: {
    close(){
        this.$emit("close")
    }
  },
  mounted() {
    
    this.series[0].data = this.post_statistics;
    // console.log(this.series[0].data);
  },
//   computed: {
//     singlePost() {
//       return this.$store.getters.getSinglePost;
//     },
//   },
};
</script>