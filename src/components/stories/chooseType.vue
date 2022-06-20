<template>
  <div>
    <div>
      <div class="">
        <div class="story-type-selection">
          <div
            class="photo-story rounded-bg"
            role="button"
            @click="goToPreview('photo')"
          >
            <div class="text-center">
              <div class="icon">
                <IconComponent
                  style="font-size: 30px"
                  icon="clarity:image-gallery-line"
                />
              </div>
              <p class="mt-1">Create a photo story</p>
            </div>
          </div>

          <div
            class="text-story rounded-bg"
            role="button"
            @click="goToTextPreview()"
          >
            <div class="text-center">
              <div class="icon">
                <IconComponent
                  icon="codicon:text-size"
                  style="font-size: 30px"
                />
              </div>
              <p class="mt-1">Create a text story</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals for Story Types  -->
      <!-- Modal For Text Story  -->
      <el-dialog title="Enter Story Text" :visible.sync="dialogFormVisible">
        <el-form :model="payload">
          <el-form-item label="Enter Text">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Please input"
                v-model="payload.content">
              </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addStory"
            >Add Story</el-button
          >
        </span>
      </el-dialog>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      payload:{
        content: '',
      }
    };
  },
  methods: {
    goToTextPreview() {
       this.dialogFormVisible = true
    },
    addStory(){
      let payload = {
        content: this.payload.content
      }
      this.$axios.post('/user/stories/', payload)
      .then((res)=>{
        console.log(res)
        this.$notify({
          title: 'Success',
          message: 'This is a success message',
          type: 'success'
        })
      })
      .catch((err)=>{
        console.log(err);
        this.$notify({
          title: 'error',
          message: 'This is a success message',
          type: 'success'
        })
      })
      .finally(()=>{
        this.dialogFormVisible = false
      })
    }
  },
  mounted() {
    
  },
};
</script>