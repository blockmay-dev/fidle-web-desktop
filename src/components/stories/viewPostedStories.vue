<template>
    <div>
        <div>
            <div class="preview">
                <div class="preview--screen d-flex align-items-center" style="gap:20px">
                    <div class="prev story--action" @click="prevImage" role="button">
                        <!-- <img src="https://images.unsplash.com/photo-1653661198822-171fb20fea83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80" alt="">   -->
                     <IconComponent icon="bi:arrow-left-circle-fill" style="font-size:40px"/>
                    </div>
                    <div class="main">
                        
                        <!-- <progress :value="timerValue" max="180" id="progressBar"></progress> -->
                        <div class="main--story">
                            
                            <div  class="" v-if="currentImage">
                                <div class="photo--story_preview" v-if="currentImage.media.file">
                                    <img :src="currentImage.media.file" alt="">
                                    <div class="content--text">
                                        {{ currentImage.content }}
                                    </div>
                                </div>
                                <div v-else class="text--story_preview"> text </div>
                                <div class="progress--container">
                                    <div class="progressbar">
                                        <div :style="{width: progressBar + '%' }"></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="next story--action" @click="nextImage" role="button" v-show="nextItem">
                        <!-- <img src="https://images.unsplash.com/photo-1653661198822-171fb20fea83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80" alt=""> -->
                        <IconComponent icon="bi:arrow-right-circle-fill" style="font-size:40px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            nextItem: true,
            autoSlideInterval: 15000,
            currentImage: null,
           //Index of the active image
            previousImage: null,
            nextImageView: null,
            startingImage: "1",
            nextViewItem: '',
            prevItem: '',

            activeImage: 0,
            //Hold the timeout, so we can clear it when it is needed
            autoSlideTimeout: null,
            //If the timer is stopped e.g. when hovering over the carousel
            stopSlider: false,
            //Hold the time left until changing to the next image
            timeLeft: '',
            //Hold the interval so we can clear it when needed
            timerInterval: null,
            //Every 10ms decrease the timeLeft
            countdownInterval: 10,
            images: [],
            timerValue: '',

            // url: 'https://api.risingwork.com/',
        }
    },
     computed: {
        // currentImage gets called whenever activeImage changes
        // and is the reason why we don't have to worry about the 
        // big image getting updated
        // currentImage() {
        //     this.timeLeft = this.autoSlideInterval;
        //     return this.images[this.activeImage];
        // },
        progressBar() {
            // this.timeLeft = this.autoSlideInterval;
            //Calculate the width of the progressbar
            return 100 - (this.timeLeft/this.autoSlideInterval) * 100;
        }
    },
        methods:{
            nextImage() {
            var active = this.activeImage+1;
            this.nextViewItem = active + 1
            if(active >= this.images.length) {
                active = 0;
            }
            this.activateImage(active);
            this.nextImageView = this.images[this.nextViewItem ];
              this.previousImage = this.images[this.prevItem ];
              console.log(this.previousImage);
              console.log(this.nextImageView);
              
        },
         prevImage() {
            var active = this.activeImage-1;
            this.prevItem = active - 1
            if(active < 0) {
                active = this.images.length - 1;
            }
            this.activateImage(active);   
            this.nextImageView = this.images[this.nextViewItem ];
              this.previousImage = this.images[this.prevItem ];

              console.log(this.previousImage); 
              console.log(this.nextImageView);        
        },
        activateImage(imageIndex) {
            this.activeImage = imageIndex;
            this.currentImage = this.images[this.activeImage];
            // console.log(this.currentImage);
        },
        //Wait until 'interval' and go to the next image;
        startTimer(interval) {
            if(interval && interval > 0 && !this.stopSlider) {
                var self = this;
                clearTimeout(this.autoSlideTimeout);
                this.autoSlideTimeout = setTimeout(function() {
                    self.nextImage();
                    self.startTimer(self.autoSlideInterval);
                }, interval);
            }
        },
        //Stop the timer when hovering over the carousel
        stopTimer() {
            clearTimeout(this.autoSlideTimeout);
            this.stopSlider = true;
            clearInterval(this.timerInterval);
        },
        //Restart the timer(with 'timeLeft') when leaving from the carousel
        restartTimer() {
            this.stopSlider = false;
            clearInterval(this.timerInterval);
            this.startCountdown();
            this.startTimer(this.timeLeft);
        },
        //Start countdown from 'autoSlideInterval' to 0
        startCountdown() {
            // if(!this.showProgressBar) return;
            var self = this;
            this.timerInterval = setInterval(function() {
                self.timeLeft -= self.countdownInterval;
                if(self.timeLeft <= 0) {
                    self.timeLeft = self.autoSlideInterval;
                }
            }, this.countdownInterval);

            
        },
        },
        mounted(){
            // document.getElementById("countdown"). = timeleft;
            
            
              this.images= this.$store.getters.getMyStories
              this.currentImage = this.images[this.activeImage];
              this.nextImageView = this.images[this.nextViewItem ];
              this.previousImage = this.images[this.prevItem ];
              console.log(this.previousImage);
              console.log(this.nextImageView);
            
        },
        created() {
        //Check if startingImage prop was given and if the index is inside the images array bounds
        if(this.startingImage 
            && this.startingImage >= 0
            && this.startingImage < this.images.length) {
            this.activeImage = this.startingImage;
        }
        //Check if autoSlideInterval prop was given and if it is a positive number
        if(this.autoSlideInterval
            && this.autoSlideInterval > this.countdownInterval) {
            //Start the timer to go to the next image
            this.startTimer(this.autoSlideInterval);
            this.timeLeft = this.autoSlideInterval;
            //Start countdown to show the progressbar
            this.startCountdown();
        }
        this.currentImage = this.images[this.activeImage];
        
    },
    
    
}
</script>
