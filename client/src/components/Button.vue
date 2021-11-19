<template>
  <button type="submit" class="ans-btn">
    {{ choice }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    choice: String
  }
};
</script>

<style scoped>
.ans-btn {
  border: 1px solid #00adb5;
  padding: 15px;
  width: 6.5em;
  border-radius: 10px;
  transition: 0.15s ease-in;
}
.ans-btn:hover {
  background-color: #00adb535;
}
</style>
