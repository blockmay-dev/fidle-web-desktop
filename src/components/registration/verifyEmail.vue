<template>
  <div>
    <div class="verify-email-container">
      <div class="verify-email-content">
        <div>
          <h1 class="font-weight-bold mb-2 text-center">Verify Email</h1>
          <p class="mb-3 text-center">A message will be sent to your email {email}</p>
          <button class="mb-3" type="submit" @click="next">Continue</button>
          <button class="edit-email" @click="cancel">Edit Email Address</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    next() {
      this.$emit("done");
    },
    cancel(){
      this.$emit('edit')
    }
  },
};
</script>