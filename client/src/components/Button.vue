<template>
  <button type="submit" class='ans-btn'>
    {{choice}}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    choice: String
  }
}
</script>

<style scoped>
.ans-btn {
  border: 1px solid #00ADB5;
  padding: 15px;
  width: 6.5em;
  border-radius: 10px;
  transition: .15s ease-in;
}
.ans-btn:hover {
  background-color: #00ADB535;
}
</style>