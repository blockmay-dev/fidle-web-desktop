<template>
  <div>
    <div>
      <div class="fidle--power_earning">
        <div class="fidle--power_earning-container">
            <div class="text-right mb-4" role="button" @click="closeModal">
                <IconComponent icon="ant-design:close-circle-outlined" style="font-size:20px"/>
            </div>
          <div class="mb-3 text-center">
            <img src="@/assets/img/fidlepower.svg" alt="" />
          </div>
          <h5 class="mb-3">EARN FPW Daily Tasks</h5>
          <ul>
            <li class="d-flex align-items-center" style="gap:8px"> 
                <span class="fdw-check">
                    <IconComponent icon="bi:check-circle" />
                </span>
                Create 3 Posts <span>Earn 5FPW</span></li>
            <li class="d-flex align-items-center" style="gap:8px">
                <span class="fdw-check">
                    <IconComponent icon="bi:check-circle" />
                </span>
                React on 5 Posts <span>Earn 3FPW</span></li>
            <li class="d-flex align-items-center" style="gap:8px">
                <span class="fdw-check">
                    <IconComponent icon="bi:check-circle" />
                </span>
              Share post to 2 Users outside the app <span>Earn 5FPW</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    methods:{
        closeModal(){
            this.$emit('closeModal')
        }
    }
}
</script>




