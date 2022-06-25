<template>
  <div>
    <div>
      <div class="">
        <div class="story-type-selection">
          <div
            class="photo-story rounded-bg"
            role="button"
            @click="goToPreview()"
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

       <!-- Modal For Photo Story  -->
      <el-dialog title="Photo Story" :visible.sync="dialogFormVisible2">
            <div class="story--photo_preview mb-3" v-show="imgPreview">
            <div
              class="close--media_preview text-right"
              role="button"
              @click="closePreview"
            >
              <IconComponent
                icon="ep:circle-close-filled"
                class="file--icons"
                style="font-size: 40px"
              />
            </div>
            <img :src="imgSrc" alt="" />
          </div>


            <div class="d-flex justify-content-center" v-if="isActive">
              <input
                @change="onFileChange"
                type="file"
                accept="image/*"
                id="choose-file"
                name="choose-file"
              />
              <label class="choose--image" for="choose-file"
                ><IconComponent
                  icon="ic:outline-plus"
                  class="file--icons"
                  style="font-size:50px"
                />
              </label>
            </div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Please enter text (Optional)"
                v-model="payload.content">
              </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
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
      dialogFormVisible2: false,
      payload:{
        content: '',
      },
      imgPreview: false,
      imgSrc: '',
      dataObj:{
        media: null,
        content: ''
      },
      isActive: true
    };
  },
  methods: {
    goToTextPreview() {
       this.dialogFormVisible = true
    },
    goToPreview(){
      this.dialogFormVisible2 = true
    },
    addStory(){
      let payload = {
        content: this.payload.content
      }
      this.$axios.post('/user/stories/', payload)
      .then((res)=>{
        console.log(res)
        this.$notify({
          title: 'Done!',
          message: 'Story Added',
          type: 'success'
        })
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        this.dialogFormVisible = false
      })
    },
    onFileChange(e) {
      // alert('Hello World')
      this.imgPreview = true;
      var input = e.target;
      this.dataObj.media = input.files[0];
      console.log(this.dataObj.media);
      if (e.target.files.length > 0) {
        var src = URL.createObjectURL(e.target.files[0]);
        this.imgSrc = src;
        this.isActive = false;
        // document.getElementById('message').style.backgroundImage = null;
        // this.payload.color = "";
      }
    },
    closePreview() {
      this.imgPreview = false;
      this.isActive = true
    },
  },
  mounted() {
    
  },
};
</script>